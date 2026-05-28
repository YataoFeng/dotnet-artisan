#!/usr/bin/env node
//
// check-self-doc.js — PostToolUse hook for .cs file quality reminders.
//
// After Write/Edit on a .cs file, checks only domain-meaningful files
// for a one-line purpose comment. Skips scaffolding, config, and
// boilerplate files.
//
// Output: JSON with additionalContext on stdout.
// Exit code: always 0 (never blocks).

"use strict";

const fs = require("fs");
const path = require("path");

try {
  const toolInputRaw = process.env.CLAUDE_TOOL_INPUT;
  if (!toolInputRaw) {
    console.log(JSON.stringify({ additionalContext: "" }));
    process.exit(0);
  }

  let toolInput;
  try {
    toolInput = JSON.parse(toolInputRaw);
  } catch {
    console.log(JSON.stringify({ additionalContext: "" }));
    process.exit(0);
  }

  const filePath = toolInput.file_path;
  if (!filePath || !filePath.endsWith(".cs")) {
    console.log(JSON.stringify({ additionalContext: "" }));
    process.exit(0);
  }

  const fileName = path.basename(filePath);

  // Skip common scaffolding / boilerplate files.
  const skipPatterns = [
    "Program.cs", "Startup.cs", "GlobalUsings.cs", "Usings.cs",
    /^.*Extensions\.cs$/, /^.*Registration\.cs$/, /^.*Module\.cs$/,
    /^I[A-Z]\w*Repository\.cs$/, /^[A-Z]\w*DbContext\.cs$/,
    /^.*Configuration\.cs$/, /^.*Middleware\.cs$/,
  ];
  for (const p of skipPatterns) {
    if (p instanceof RegExp && p.test(fileName)) {
      console.log(JSON.stringify({ additionalContext: "" }));
      process.exit(0);
    }
    if (typeof p === "string" && fileName === p) {
      console.log(JSON.stringify({ additionalContext: "" }));
      process.exit(0);
    }
  }

  // Read first 10 lines.
  let content;
  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch {
    console.log(JSON.stringify({ additionalContext: "" }));
    process.exit(0);
  }

  // Skip if no real domain code.
  const hasDomainCode = content.includes(" class ") || content.includes(" record ");
  if (!hasDomainCode) {
    console.log(JSON.stringify({ additionalContext: "" }));
    process.exit(0);
  }

  const lines = content.split("\n").slice(0, 10);
  const hasPurposeComment = lines.some(
    (line) =>
      line.trim().startsWith("//") &&
      line.length > 10 &&
      !line.includes("Copyright") &&
      !line.includes("License")
  );

  if (!hasPurposeComment) {
    const context =
      "[dotnet-artisan] Suggestion: consider adding a one-line comment at the top explaining what this class does. See SELF_DOCUMENTING.md for the 30-second rule.";
    console.log(JSON.stringify({ additionalContext: context }));
    process.exit(0);
  }

  console.log(JSON.stringify({ additionalContext: "" }));
} catch {
  console.log(JSON.stringify({ additionalContext: "" }));
}

process.exit(0);

#!/usr/bin/env node
//
// check-self-doc.js — PostToolUse hook for .cs file quality reminders.
//
// Only checks NEW domain files created by the AI. Does NOT check
// existing project files where the AI doesn't know the domain.
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

  // Skip scaffolding / boilerplate files.
  const skipPatterns = [
    "Program.cs", "Startup.cs", "GlobalUsings.cs", "Usings.cs",
    /^.*Extensions\.cs$/, /^.*Registration\.cs$/, /^.*Module\.cs$/,
    /^I[A-Z]\w*Repository\.cs$/, /^[A-Z]\w*DbContext\.cs$/,
    /^.*Configuration\.cs$/, /^.*Middleware\.cs$/,
  ];
  for (const p of skipPatterns) {
    if (p instanceof RegExp && p.test(fileName)) { process.exit(0); }
    if (typeof p === "string" && fileName === p) { process.exit(0); }
  }

  // Skip existing project files — if the file has pre-existing namespace
  // from an established project, the AI didn't create it from scratch.
  let content;
  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch {
    process.exit(0);
  }

  // Skip existing project files. If the file has a namespace, it's part
  // of an established project — the AI may not understand the domain and
  // should NOT modify or add comments it didn't write.
  if (content.includes("namespace ") || content.includes("using ")) {
    process.exit(0);
  }

  // At this point it's likely a new domain file created by the AI.
  const hasDomainCode = content.includes(" class ") || content.includes(" record ");
  if (!hasDomainCode) {
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
      "[dotnet-artisan] Suggestion: for new files, add a one-line comment explaining the class purpose. This helps future AI sessions. Skip if unsure about the domain.";
    console.log(JSON.stringify({ additionalContext: context }));
  }
} catch {
  // Silently ignore all errors — never block.
}

process.exit(0);

#!/usr/bin/env node
//
// check-self-doc.js — PostToolUse hook for .cs file quality reminders.
//
// After Write/Edit on a .cs file, checks if the file has a purpose comment
// at the top. If not, injects a gentle reminder about the 30-second rule.
//
// Output: JSON with additionalContext on stdout.
// Exit code: always 0 (never blocks).

"use strict";

const fs = require("fs");
const path = require("path");

try {
  // CLAUDE_TOOL_INPUT is a JSON string containing the tool's input parameters.
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

  // Read the file and check for a purpose comment in first 10 lines.
  let content;
  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch {
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

  if (!hasPurposeComment && lines.length > 0) {
    // Check it's not a trivial file (interfaces, enums, records without logic).
    const hasRealCode = content.includes("class ") || content.includes("record ") || content.includes("struct ");
    if (hasRealCode) {
      const context =
        "[dotnet-artisan] Reminder: new .cs file detected without a purpose comment. Add a one-line header explaining what this file does. See SELF_DOCUMENTING.md (30-second rule).";
      console.log(JSON.stringify({ additionalContext: context }));
      process.exit(0);
    }
  }

  console.log(JSON.stringify({ additionalContext: "" }));
} catch {
  console.log(JSON.stringify({ additionalContext: "" }));
}

process.exit(0);

---
name: commit-message
description: Generate concise git commit messages for this repository. Use when the user asks for a commit message, commit title, Conventional Commit-style subject, or wants Codex to inspect current git changes and propose the exact commit message text.
---

# Commit Message

Use `.opencode/commands/commitMessage.md` as the source of truth for the exact workflow and formatting rules.

1. Read `.opencode/commands/commitMessage.md` before generating a message.
2. Follow that command exactly, including the required git inspection commands, commit type selection, subject length, imperative mood, and output-only constraint.
3. If the OpenCode command references project conventions in `CODESTYLE.md`, read the relevant section before finalizing the message.
4. Do not duplicate or override the OpenCode command's rules here; update `.opencode/commands/commitMessage.md` if the shared convention changes.

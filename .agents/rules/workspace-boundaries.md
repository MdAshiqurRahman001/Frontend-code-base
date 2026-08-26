---
trigger: always_on
description: Strict rule enforcing workspace isolation and active command workspace boundaries.
---

# Workspace Isolation & Active Context Boundary

- **Never touch or modify files in any other workspace/project** unless explicitly requested by the user.
- **Strictly operate only in the active workspace/project** where the user is currently working, editing files, and issuing commands.
- Always check the active file path and working directory context before executing commands, edits, or creating new files.

---
trigger: always_on
description: Strict rule to never remove .env, never gitignore it, and always keep it committed to GitHub.
---

# Environment File (`.env`) Rules

- **Never delete, rename, move, or empty the `.env` file.**
- **Never add `.env` (or `.env*`, `*.env`, `.env.local`, etc.) to `.gitignore`.** Do not uncomment or re-introduce any env ignore pattern.
- **Always keep `.env` tracked and committed in Git/GitHub.** Include it in commits and pushes; never run `git rm` / `git rm --cached` on it.
- Keep `.env.example` in sync with `.env` whenever variables are added or changed.
- These rules override any default template, tool, or generator behavior that would ignore or remove `.env`.

---
description: Generate git commit message following project conventions
agent: plan
---

1. Run `git status` to see all changed files
2. Run `git diff` to understand the changes
3. Run `git log --oneline -5` to see recent commit style
4. Analyze changes and determine appropriate type:
   - `feat`: new feature added
   - `fix`: bug fix
   - `chore`: maintenance tasks, dependencies
   - `docs`: documentation updates
   - `test`: test changes
   - `refactor`: code restructuring without behavior change
5. Write subject in imperative mood, max 72 chars, no trailing period
6. Return only the commit message, nothing else

See Commit Message Conventions in [CODESTYLE.md](../../CODESTYLE.md) for details.

# BRANCHES MANAGEMENT: THE GIT FLOW METHOD

## 1. Work on a new branch

- when introducing a new feature, create a new **feature branch** : `feature/[featureName]`
- when fixing a bug, create a new **bugfix branch** : `bugfix/[bugName]`
- when experimenting with a feature you may not implement, create a new **experimentation branch** : `experimentation/[experimentation]`

## 2. Push the repository

As you finish working on a specific branch, commit & push the branch to the distant repository.

## 3. Make a pull request

Then create a _pull request (PR)_ for merging it to the `dev` branch.

### Naming conventions

- Always start with the keyword then separate your description with a `/` : `[keyword]/[description]`
- Use `_` to separate distinct words or word groups
- Use `-` to separate two words belonging to one word group
- Use only lowercase

---

# COMMITS MANAGEMENT: THE CONVENTIONAL COMMITS METHOD

## The keywords explained

| Type     | Description                                                                                            |
| -------- | ------------------------------------------------------------------------------------------------------ |
| feat     | A new feature                                                                                          |
| fix      | A bug fix                                                                                              |
| docs     | Documentation only changes                                                                             |
| style    | Changes that do not affect the meaning of the code (white-space, formatting, missing semicolons, etc.) |
| refactor | A code change that neither fixes a bug nor adds a feature                                              |
| perf     | Performance improvements                                                                               |
| test     | Adding missing tests or correcting existing tests                                                      |
| build    | Changes that affect the build system or external dependencies                                          |
| ci       | Changes to our continuous integration configuration files and scripts                                  |
| chore    | Other changes that don't modify src or test files                                                      |
| revert   | Reverts a previous commit                                                                              |

## A couple of rules to follow

1. Commits must be prefixed with a type, which consists of a verb, followed by a colon and a space.

2. An optional scope may be provided after a typeto describe a section of the codebase : `fix(pa­rser):`

3. A descri­ption must immedi­ately follow the type/scope prefix : `fix: component height when page is set to maximum width.`

4. A longer commit body may be provided after the short descri­ption. The body must begin one blank line after the descri­ption.

---

# GITHUB PROJECTS: THE KEYWORD/DESCRIPTION METHOD

Please follow the guidelines below when creating new tasks on Github Projects.

## Title Format

The title must be formatted as follows:

[Category] Brief task title

Examples:

[Route] Card / DELETE
[Component] Introduction

Please keep the titles short.

## Body Format

```md
### GOAL

[Please state what you need to achieve with this contribution]

### DESCRIPTION

[Please explain how you aim to achieve this goal]

### ISSUES

[Please list any issues encountered and the steps to reproduce them]
```

---

We appreciate your contributions and look forward to seeing your work!

# Dependency Tracker

It currently only works with issues.

# Usage

Create `.github/workflows/dependency-tracker.yaml` with the following content:

```yaml
name: Dependency Resolution

on:
  issues:
    types: [deleted, closed]

jobs:
  blocking_issues:
    runs-on: ubuntu-latest
    name: Checks for Dependent Issues
    steps:
      - uses: thesloppyguy/DependencyTracker@v2
```

# How it works

- It uses the following regex `/Dependent on:? ([#\d, ]+)/gi` to parse the issue Description and make a list of dependent issues.
- It is required that Issues have the following section for the Action to work properly:
  - Dependent on: list of comma separated issues eg: #1 , #2
- If none of the dependencies are open, "on hold" lable is removed from the issue.

# web-app-infra

## A custom GitHub Actions module for web-app-infra pipelines

This is a custom module for use by web-app repositories, such as kaleidoscope-deploy, htp-exp-deploy, and other repositories

## How To Use

1. Create a Pull Request from your local branch 
2. Wait for checks to complete, these are basic linting scripts from super-linter

## How To Test

Testing in this repo works by running the latest changes on the `test` branch. To test the repo:

1. Create a pull request into any branch, ideally main.
2. Linting will begin execution. To test the branch while this is occuring, make any comment on the repo.

After commenting anything, the pipeline under action.yaml will begin executing as normal.
.github/workflows/test-flow.yaml manages this execution. Any resources created by the custom module will automatically be deleted after creation.

Merging into main branch is blocked by the requirement for code review. Comment `GithubDeploy` to merge with main after approval. Do not remove this setting, bypass protections manually if needed.
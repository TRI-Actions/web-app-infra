# web-app-infra

## A custom GitHub Actions module for web-app-infra pipelines

This is a custom module for use by web-app repositories, such as kaleidoscope-deploy, htp-exp-deploy, and other repositories used by TRI.

## Prerequisites


## Action Functionality
This Action executes a series of steps. 

Step 1: Download terraform binary  
Step 2: Parse manifest file  
Step 3: Execute Pre-commit checks  
Step 4: Depending on manifest file settings, execute scripts in `app_build_scripts/before_scripts` directory  
Step 5: Execute Terraform Plan or Terraform Deploy if triggered by comment  
Step 6: Depending on manifest file settings, execute scripts in `app_build_scripts/after_scripts` directory  
Step 7: Alert users to any errors or potential deployment  


### Parameters
There are three inputs with this repo:

```
AWS_IAM_Role:
    description: 'Cross Account role arn to assume to deploy infrastructure'
    required: false
    type: String
  SSM_private_keys:
    description: "comma separated list of ssm key locations, no spaces"
    required: false
    type: String
  SSM_pat:
    description: "Location of pat token in SSM"
    required: false
    type: String
```

If no IAM role is set, it will use whatever is set by default.
SSM_private keys can have multiple key locations separated by a comma. Private keys are keys used to verify github repo retrieval.
SSM_pat can only use one personal access token location. PAT is used to verify github retrieval.

All variables can be omitted or used as needed.

## How to use in Github Actions Workflow:

```
jobs:
  pipeline:
    runs-on: ubuntu-latest
    name: ${{ github.event.issue.pull_request && 'deploy' || 'plan' }}
    permissions: write-all
 
    steps:
      - name: run composite module
        uses: TRI-Actions/web-app-infra@main
        with:
          AWS_IAM_Role: arn:aws:iam::1234567890123:role/{IAM_ROLE_NAME}
          SSM_private_keys: /key/location/1,/key/location/2
          SSM_pat: /pat/location
```

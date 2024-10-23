const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require('@actions/github');

async function run() {
  try {
    const app_build_before = core.getInput('app_build_before', { required: true });
    const app_build_after = core.getInput('app_build_after', { required: true });

    /*
    ######################## SETUP FOR PIPELINE ##############################
    */
    // Clone the repository
    
    // Checkout PR branch

    // Get Head Sha
    const pr = await github.rest.pulls.get({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: context.issue.number
    });
    const headSha = pr.data.head.sha;

    // Create Config Status Check
    let formatDate = () => {
      return new Date().toISOString()
    }
    let check = await github.rest.checks.create({
      owner: context.repo.owner,
      repo: context.repo.repo,
      name: 'GetConfig',
      head_sha: `${headSha}`,
      started_at: formatDate(),
      status: 'in_progress'
    })

    // Retrieve SSH key from SSM
    await exec.exec(`aws ssm get-parameter --name /tri-ie/SharedServices/JenkinsMaster/GitAccessPrivateKey --with-decryption --query Parameter.Value --output text > ~/.ssh/id_rsa`);
    await exec.exec('chmod 0400 ~/.ssh/id_rsa'); // Setup SSH known hosts 
    await exec.exec('mkdir -p ~/.ssh'); 
    await exec.exec('ssh-keyscan -t rsa github.shared-services.aws.tri.global >> ~/.ssh/known_hosts');
    
    // get label
    const { data: labels } = await github.rest.issues.listLabelsOnIssue({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: context.issue.number,
    });
    // We should check if the label is correct too. 
    // It should be an environment name and if not we can send a comment to warn users that they added a wrong label
    if (labels.length == 0) {
      github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: `Your pull request is missing the label. Please add the label of environment you want to deploy! (i.e staging)`
      })
      core.setFailed('Missing label!');
    } else {
      core.setOutput('environment', labels[0].name);
    }

    // Update Status Check
    formatDate = () => {
      return new Date().toISOString()
    }
    github.rest.checks.update({
      owner: context.repo.owner,
      repo: context.repo.repo,
      check_run_id:  '${{ steps.config_status_check.outputs.CHECK_ID }}',
      status: 'completed',
      completed_at: formatDate(),
      conclusion: '${{ steps.get-label.conclusion }}'
    })

    /*
    ######################## BEFORE SCRIPTS ##############################
    */

    // Create Status Check
    formatDate = () => {
      return new Date().toISOString()
    }
    check = await github.rest.checks.create({
      owner: context.repo.owner,
      repo: context.repo.repo,
      name: 'BeforeScripts',
      head_sha: `${headSha}`,
      started_at: formatDate(),
      status: 'in_progress'
    })

    
  }
  catch (error) { core.setFailed(error.message); }
}




#!/bin/bash

TFSEC_VERSION="v1.28.14"
TERRAFORM_DOCS_VERSION="v0.20.0"
TERRAFORM_VERSION="1.14.1"

# Update package list
sudo apt-get update

# Install tfsec
sudo curl -L https://github.com/aquasecurity/tfsec/releases/download/${TFSEC_VERSION}/tfsec-linux-amd64 -o /usr/local/bin/tfsec
sudo chmod +x /usr/local/bin/tfsec

# Install terraform-docs
sudo curl -L https://github.com/terraform-docs/terraform-docs/releases/download/${TERRAFORM_DOCS_VERSION}/terraform-docs-${TERRAFORM_DOCS_VERSION}-linux-amd64.tar.gz -o terraform-docs.tar.gz

sudo tar -xzf terraform-docs.tar.gz -C /usr/local/bin terraform-docs
sudo chmod +x /usr/local/bin/terraform-docs
rm -rf terraform-docs.tar.gz

# Install pre-commit
pip install pre-commit

# Install aws-cli
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip -o awscliv2.zip
sudo ./aws/install
rm -rf awscliv2.zip aws

# Install terraform
curl -L "https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip" -o terraform.zip
unzip -o terraform.zip
sudo mv terraform /usr/local/bin/terraform
sudo chmod +x /usr/local/bin/terraform
rm -rf terraform.zip

# Verify installations
echo "Verifying installations..."
echo "tfsec version: $(tfsec --version)"
echo "terraform-docs version: $(terraform-docs --version)"
echo "pre-commit version: $(pre-commit --version)"
echo "aws-cli version: $(aws --version)"
echo "Terraform version: $(terraform --version)"

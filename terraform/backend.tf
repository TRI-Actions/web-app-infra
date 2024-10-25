# ---------------------------------------------------------------------------------------------------------------------
# Backend
# ---------------------------------------------------------------------------------------------------------------------
terraform {
  backend "s3" {
    key            = "webapp-infra-test/$env/$env.tfstate"
    bucket         = "tri-tf-state-us-east-1"
    region         = "us-east-1"
    dynamodb_table = "tri_tf_state"
    encrypt        = true
  }
}
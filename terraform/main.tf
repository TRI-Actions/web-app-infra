#checkov:skip=CKV_AWS_26
resource "aws_sns_topic" "user_updates" {
  name = "test-topic"
}
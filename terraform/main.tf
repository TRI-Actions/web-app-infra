#tfsec:ignore:aws-cloudtrail-require-bucket-access-logging
module "s3" {
  source      = "git@github.com:TRI-IE/tf-s3-bucket.git?ref=0.1.3"
  bucket_name = "zables-test-bucket"

  bucket_policy = <<EOT
  {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "test",
            "Effect": "Allow",
            "Principal": {
                "Service": [
                    "cloudtrail.amazonaws.com"
                ]
            },
            "Action": "*",
            "Resource": "*",
        }
    ]
  }
EOT
}
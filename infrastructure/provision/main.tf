provider "aws" {
  region = "ap-northeast-1"
}

resource "aws_cognito_user_pool" "cognite_task_manager_pool" {
  name = "cognite-task-manager-pool"

  username_attributes = ["email"]
  auto_verified_attributes = ["email"]

  password_policy {
    minimum_length = 8
    require_lowercase = true
    require_numbers = true
    require_symbols = false
    require_uppercase = true
  }

  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
    email_subject = "Account Confirmation"
    email_message = "Your confirmation code is {####}"
  }

  schema {
    attribute_data_type = "String"
    name                = "email"
    required = true
    mutable = true
  }
}

resource "aws_cognito_user_pool_client" "task_manager_client" {
  name         = "task-manager-client"
  user_pool_id = aws_cognito_user_pool.cognite_task_manager_pool.id

  generate_secret = false
  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_USER_SRP_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH"
  ]
}
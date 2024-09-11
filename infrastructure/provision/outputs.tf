output "user_poor_id" {
  value = aws_cognito_user_pool.cognite_task_manager_pool.id
  description = "The ID of the Cognito User Pool"
}

output "user_pool_client_id" {
  value = aws_cognito_user_pool_client.task_manager_client.id
  description = "The ID of the Cognito User Pool Client"
}
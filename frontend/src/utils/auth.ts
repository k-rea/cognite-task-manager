import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { userPool } from "@/config/cognito";

export const signUp = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, [], [], (err, result) => {
      if (err) {
        reject(err);
        return
      }
      resolve(result?.user)
    })
  })
}

export const signIn = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    })

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    })

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        resolve(result)
      },
      onFailure: (err) => {
        reject(err)
      }
    })
  })
}

export const signOut = () => {
  const cognitoUser = userPool.getCurrentUser()
  if (cognitoUser) {
    cognitoUser.signOut()
  }
}
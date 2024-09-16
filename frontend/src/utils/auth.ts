import {CognitoUser, AuthenticationDetails, CognitoUserSession} from 'amazon-cognito-identity-js'
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

export const getCurrentUser = (): Promise<{ [p: string]: string } | undefined> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser()
    if (!cognitoUser) {
      reject(new Error("No user found"))
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cognitoUser.getSession((err: Error | null, _: CognitoUserSession | null) => {
      if (err) {
        reject(err);
        return
      }
      cognitoUser.getUserAttributes((err, attributes) => {
        if (err) {
          reject(err);
          return
        }
        const useData = attributes?.reduce((acc: {[key in string]: string}, attribute) => {
          acc[attribute.Name] = attribute.Value
          return acc
        }, {})
        resolve(useData);
      })
    })
  })
}
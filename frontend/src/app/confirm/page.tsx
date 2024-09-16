'use client';

import {useState} from "react";
import {CognitoUser} from "amazon-cognito-identity-js";
import {userPool} from "@/config/cognito";

export default function Confirm() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    })
    cognitoUser.confirmRegistration(code, true, (err)=> {
      if (err) {
        setMessage(`確認に失敗しました: ${err.message}`)
      }
      setMessage('確認成功。ログインしてください。')
    })
  }

  return (
    <div>
      <h1>アカウント確認</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Eメール"
          required
        />
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="確認コード"
          required
        />
        <button type="submit">確認</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

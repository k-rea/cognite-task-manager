'use client';

import {useState} from "react";
import {signUp} from "@/utils/auth";

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await signUp(email, password)
      setMessage('サインアップ成功！確認コードをEメールで確認してください。');
    } catch (error) {
      setMessage('サインアップに失敗しました: ' + (error as Error).message);
    }
  }

  return (
    <div>
      <h1>サインアップ</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Eメール"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          required
        />
        <button type="submit">サインアップ</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}
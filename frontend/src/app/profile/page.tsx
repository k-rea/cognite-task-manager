'use client'

import { useAuth } from "@/contexts/AuthContext";
import withAuth from "@/components/withAuth";

const ProfilePage = () => {
  const { user, signOut } = useAuth();

  return (
    <div>
      <h1>プロフィール</h1>
      {user && (
        <div>
          <p>メールアドレス: {user.email}</p>
          <button onClick={signOut}>ログアウト</button>
        </div>
      )}
    </div>
  )
}

export default withAuth(ProfilePage);
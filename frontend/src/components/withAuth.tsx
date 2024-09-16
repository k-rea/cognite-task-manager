'use client'

import { useRouter } from "next/navigation";
import React, {useEffect, useState} from "react";
import { useAuth } from "@/contexts/AuthContext";

const withAuth = <P extends object>(WrappedComponent: React.ComponentType) => {

  const WithAuthComponent = (props: P) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    useEffect(() => {
      if (mounted && !loading && !user) {
        router.replace('/login');
      }
    }, [user, loading, mounted, router]);

    if (loading || !mounted) {
      return <div>Loading...</div>;
    }

    if (!user) {
      return null;
    }


    return <WrappedComponent {...props} />;
  }

  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  WithAuthComponent.displayName = `WithAuth(${wrappedComponentName})`;

  return WithAuthComponent;
}

export default withAuth;
"use client";
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated" && !session) {
      router.push("/login");
    }
  }, [status, router]);

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className='text-white'>Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard content if not authenticated
  if (status === "unauthenticated") {
    return null; 
  }

  return (
    <div className='text-white p-6 min-h-[75.3vh] md:min-h-[80.3vh]'>
      <h1>Dashboard</h1>
      <p>Welcome, {session?.user?.email}!</p>
    </div>
  )
}

export default Dashboard

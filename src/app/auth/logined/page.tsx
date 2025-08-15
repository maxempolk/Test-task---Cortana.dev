import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function LoginedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold text-muted-foreground">You are already logged in!</h1>
      <Link href="/">
        <Button>
          Go to home page
        </Button>
      </Link>
    </div>
  )
}

export default LoginedPage
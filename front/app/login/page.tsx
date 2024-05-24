import LoginForm from '@/features/auth/components/LoginForm'
import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
    <div className=" max-w-sm mx-auto mt-10">
      <LoginForm />
      <div className="text-center mt-4">
        <Link href={"/signup"} className="text-white hover:underline text-xl">
          初めてご利用の方はこちら
        </Link>
      </div>
    </div>
  )
}

export default Login
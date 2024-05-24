import SignupForm from '@/features/auth/components/SignupForm'
import Link from 'next/link'
import React from 'react'

const SignUp = () => {
  return (
    <div className=" max-w-sm mx-auto mt-10">
      <SignupForm />
      <div className="text-center mt-4">
        <Link href={"/login"} className="text-white hover:underline text-xl">
          すでに登録済みの方はこちら
        </Link>
      </div>
    </div>
  )
}

export default SignUp
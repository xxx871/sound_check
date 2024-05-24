import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
    <div>
      <div className="text-center mt-4">
        <Link href={"/signup"} className="text-white hover:underline">
          初めてご利用の方はこちら
        </Link>
      </div>
    </div>
  )
}

export default Login
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="bg-white fixed bottom-0 w-full text-white border-gray-200 border-t">
      <div className="items-center bg-blue-900 text-center">
        <nav className="space-x-40 text-lg">
          <Link href="/" className="">
            利用規約
          </Link>
          <Link href="/" className="">
            プライバシーポリシー
          </Link>
          <Link href="/contact" className="">
            お問い合わせ
          </Link>
        </nav>
        <p className="text-xs">
          copyright ©2024. 音ぴしゃ
        </p>
      </div>
    </div>
  )
}

export default Footer
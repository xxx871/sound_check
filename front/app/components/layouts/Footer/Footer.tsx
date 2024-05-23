import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="text-white h-6 border-gray-200 border-t dark:border-gray-800">
      <div className="items-center bg-blue-900 text-center">
        <nav className="space-x-40">
          <Link href="/terms" className="">
            利用規約
          </Link>
          <Link href="/" className="">
            プライバシーポリシー
          </Link>
          <Link href="/" className="">
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
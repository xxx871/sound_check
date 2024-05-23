import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className="divide-y border-gray-200 dark:border-gray-800 border-b bg-blue-900">
      <div className="px-4 py-2 md:py-2 lg:px-6">
        <div className="items-center space-y-2 md:space-y-0 md:space-x-6 text-white font-palettemosaic">
          <Link href="/" className="float-left text-3xl font-bold tracking-tighter mr-4 border-2 p-2 rounded-full">
            おんぴしゃ
          </Link>
          <nav className="flex justify-end items-center space-x-6 text-2xl">
            <Link href="/about" className="font-medium text-white transition-colors hover:text-gray-300">
              遊び方
            </Link>
            <Link href="/rank" className="font-medium text-white transition-colors hover:text-gray-300">
              ランキング
            </Link>
            <Link href="/login" className="bg-black py-3 px-4 text-white rounded-md font-medium">
              ログイン
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Header
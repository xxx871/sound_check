import AuthClientButton from '@/features/auth/components/AuthClientButton';
import axiosInstance from '@/utils/axiosInstance';
import { cookies } from 'next/headers';
import Link from 'next/link'
import React from 'react'

const getAllCookies = (): { [key: string]: string } => {
  const cookieStore = cookies();
  const cookieObject = cookieStore.getAll().reduce((acc, cookie) => {
    acc[cookie.name] = cookie.value;;
    return acc;
  }, {} as { [key: string]: string });
  return cookieObject;
};

const getUserSession = async (): Promise<{ [key: string]: string }> => {
  const cookie = getAllCookies();
  const response = await axiosInstance.get("auth/sessions", {
    headers: {
      uid: cookie["uid"],
      client: cookie["client"],
      "access-token": cookie["access-token"]
    }
  });
  return response.data;
}

const Header = async () => {
  const userSession = await getUserSession();
  return (
    <header className="divide-y border-gray-200 dark:border-gray-800 border-b bg-blue-900">
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
            {userSession.is_login ? (
              <>
                <Link href="/profile">プロフィール</Link>
                <AuthClientButton
                  bgColor="bg-black"
                  textColor="text-white"
                  type="button"
                >
                  ログアウト
                </AuthClientButton>
              </>
            ) : (
            <Link href="/login" className="bg-black py-3 px-4 text-white rounded-md font-medium">
              ログイン
            </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
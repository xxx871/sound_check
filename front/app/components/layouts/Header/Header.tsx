
import { getUserSession } from '@/lib/session';
import Link from 'next/link'
import React from 'react'
import ModalTutorial from './ModalTutorial';
import LogoutButton from '@/features/auth/components/LogoutButton';
import Image from 'next/image';

const Header = async () => {
  const userSession = await getUserSession();
  const isLoggedIn = userSession ? userSession.is_login : false;

  return (
    <div className="divide-y border-gray-200 dark:border-gray-800 border-b bg-blue-900 h-16 flex items-center">
      <div className="px-4 md:py-2 lg:px-6 w-full">
        <div className="flex items-center justify-between space-y-2 md:space-y-0 md:space-x-6 text-white">
          <Link href="/" className="text-3xl font-bold font-palettemosaic flex items-center">
          <Image
            src="/note_rotated_new.png"
            alt="Header Icon"
            height={50}
            width={50}
          />
            おんぴしゃ
          </Link>
          <nav className="flex justify-end items-center space-x-6 text-2xl">
          <ModalTutorial />
            <Link href="/ranking" className="font-medium text-white transition-colors hover:text-gray-300">
              ランキング
            </Link>
            {isLoggedIn ? (
              <>
                <Link href="/profile">プロフィール</Link>
                <LogoutButton
                  type="button"
                >
                  ログアウト
                </LogoutButton>
              </>
            ) : (
              <Link href="/login" className="bg-black py-2 px-3 text-white rounded-md font-medium">
                ログイン
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Header
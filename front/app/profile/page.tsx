import { getProfile } from "@/lib/api/getProfile";
import UserProfile from "@/features/user/components/UserProfile";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from 'react'

const Profile = async () => {
  const userData = await getProfile();
  if (!userData) {
    redirect("/login");
  }
  const { name, user_high_note: highNote, user_low_note: lowNote, scores, gender } = userData;

  return (
    <div className="max-w-sm mx-auto mt-10 grig gap-6">
      <UserProfile
        name={name}
        gender={gender}
        highNote={highNote}
        lowNote={lowNote}
        scores={scores}
      />
      <div className="flex items-center text-white mt-4">
        <Link href="/profile/edit" className="bg-black px-4 py-2 rounded">
          編集
        </Link>
      </div>
    </div>
  )
}

export default Profile
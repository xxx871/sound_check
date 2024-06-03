"use client"

import Button from '@/features/auth/components/Button';
import InputField from '@/features/auth/components/InputField';
import { useEditForm } from '@/features/auth/hooks/useEditForm';
import { EditProfileProps } from '@/types/interface';
import React from 'react'

const EditProfile: React.FC<EditProfileProps> = ({ userData, genders, notes }) => {
  const { form, onSubmit, errorMessage } = useEditForm(userData, notes);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  
  return (
    <div className="max-w-sm mx-auto mt-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center mb-5 text-2xl font-medium text-white">ユーザー編集</h2>
        {errorMessage && (
          <div className="mb-4 text-white">
            {errorMessage}
          </div>
        )}
        <InputField
          id="name"
          label="ユーザー名"
          type="text"
          placeholder=''
          defaultValue={userData.name}
          errorMessage={errors.name?.message}
          register={register}
        />
        <div className="mt-4">
          <label htmlFor="gender" className="mb-1 block text-2xl text-white">性別</label>
          <select
            id="gender"
            {...register('gender')}
            defaultValue={userData.gender || ''}
            className="border border-gray-30 text-gray-900 text-sx rounded-sm focus:border-blue-500 w-full p-2">
            <option value="">未選択</option>
            {genders.map(gender => (
              <option key={gender.id} value={gender.name}>{gender.name}</option>
            ))}
          </select>
          {errors.gender && <span>{errors.gender.message}</span>}
        </div>
        <div className="mt-4">
          <label htmlFor="user_high_note" className="mb-1 block text-2xl text-white">音域高</label>
          <select
            id="user_high_note"
            {...register('user_high_note')}
            defaultValue={userData.user_high_note?.ja_note_name || ''}
            className="border border-gray-30 text-gray-900 text-sx rounded-sm focus:border-blue-500 w-full p-2">
            <option value="">未選択</option>
            {notes.map(note => (
              <option key={note.id} value={note.ja_note_name}>{note.ja_note_name}</option>
            ))}
          </select>
          {errors.user_high_note && <span>{errors.user_high_note.message}</span>}
        </div>
        <div className="mt-4">
          <label htmlFor="user_low_note" className="mb-1 block text-2xl text-white">音域低</label>
          <select
            id="user_low_note"
            {...register('user_low_note')}
            defaultValue={userData.user_low_note?.ja_note_name || ''}
            className="border border-gray-30 text-gray-900 text-sx rounded-sm focus:border-blue-500 w-full p-2">
            <option value="">未選択</option>
            {notes.map(note => (
              <option key={note.id} value={note.ja_note_name}>{note.ja_note_name}</option>
            ))}
          </select>
          {errors.user_low_note && <span>{errors.user_low_note.message}</span>}
        </div>
      <div className="mt-4">
        <Button type="submit" textColor="text-white" bgColor="bg-blue-500">保存</Button>
      </div>
      </form>
    </div>
  )
}

export default EditProfile

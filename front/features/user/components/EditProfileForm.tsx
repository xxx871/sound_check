"use client"

import { Gender, Note, User } from '@/types/interface';
import React from 'react'
import { useEditForm } from '../hooks/useEditForm';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ModalKeyboard from './ModalKeyboard';

export interface EditProfileProps {
  userData: User;
  genders: Gender[];
  notes: Note[];
}

const EditProfileForm: React.FC<EditProfileProps> = ({ userData, genders, notes }) => {
  const { form, onSubmit, errorMessage } = useEditForm(userData, notes);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center mb-5 text-3xl font-medium text-white">プロフィール編集</h2>
        <div className="text-white">
          <label htmlFor="name" className="mb-1 block text-2xl ">ユーザー名</label>
          <Input
            type="text"
            id="name"
            placeholder="xxx"
            {...register('name')}
          />
          <div className="text-white">
            {errors.name && <p>※{errors.name.message}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="gender" className="mb-1 block text-2xl text-white">性別</label>
          <select
            id="gender"
            {...register('gender')}
            defaultValue={userData.gender || ''}
            className="border border-gray-300 text-gray-900 text-sx rounded-sm focus:border-blue-500 w-full p-2"
          >
            <option value="">未選択</option>
            {genders.map(gender => (
              <option
                key={gender.id} value={gender.name}
              >
                {gender.name}
              </option>
            ))}
          </select>
          <div className="text-white">
            {errors.gender && <span>{errors.gender.message}</span>}
          </div>
        </div>
        <div>
          <label htmlFor="user_high_note" className="mb-1 block text-2xl text-white">音域高</label>
          <select
            id="user_high_note"
            {...register('user_high_note')}
            defaultValue={userData.user_high_note?.ja_note_name || ''}
            className="border border-gray-300 text-gray-900 text-sx rounded-sm focus:border-blue-500 w-full p-2"
          >
            <option value="">未選択</option>
            {notes.map(note => (
              <option
                key ={note.id} value={note.ja_note_name}
              >
                {note.ja_note_name}
              </option>
            ))}
          </select>
          <div className="text-white">
            {errors.user_high_note && <span>{errors.user_high_note.message}</span>}
          </div>
        </div>
        <div>
          <label htmlFor="user_low_note" className="mb-1 block text-2xl text-white">音域低</label>
          <select
            id="user_low_note"
            {...register('user_low_note')}
            defaultValue={userData.user_low_note?.ja_note_name || ''}
            className="border border-gray-300 text-gray-900 text-sx rounded-sm focus:border-blue-500 w-full p-2"
          >
            <option value="">未選択</option>
            {notes.map(note => (
              <option
                key ={note.id} value={note.ja_note_name}
              >
                {note.ja_note_name}
              </option>
            ))}
          </select>
          <div className="text-white">
            {errors.user_low_note && <span>{errors.user_low_note.message}</span>}
          </div>
        </div>
        <ModalKeyboard notes={notes} />
        <div className="mt-4">
          {errorMessage && (
            <div className="mb-4 text-white">{errorMessage}</div>
          )}
          <Button type="submit">保存</Button>
        </div>
      </form>
    </div>
  )
}

export default EditProfileForm
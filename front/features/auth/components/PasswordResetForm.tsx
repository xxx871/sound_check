"use client"

import React from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePasswordResetForm } from '../hooks/usePasswordResetForm';
import { LoadingButton } from '@/app/components/elements/LoadingButton';

const PasswordResetForm = () => {
  const { form, onSubmit, serverError, isLoading } = usePasswordResetForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center mb-5 text-3xl font-medium text-white">パスワードリセット申請</h2>
        <div className="text-white">
          <label htmlFor="email" className="mb-1 block text-2xl">メールアドレス</label>
          <Input
            type="email"
            id="email"
            placeholder="aaa@example.com"
            {...register('email')}
          />
          {errors.email &&<p>※{errors.email.message}</p>}
        </div>
        {serverError && <p className="text-white mt-4">{serverError}</p>}
        <div className="mt-4">
        <LoadingButton
            type="submit"
            variant="outline"
            className="w-32 h-12 text-lg text-white"
            isLoading={isLoading}
          >
            フォーム送信
          </LoadingButton>
        </div>
      </form>
    </div>
  )
}

export default PasswordResetForm
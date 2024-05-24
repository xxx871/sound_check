"use client"

import React from 'react'
import { useSignupForm } from '../hooks/useSignupForm';
import InputField from './InputField';
import { Button } from '@/app/components/elements/Button/Button';

const SignupForm = () => {
  const { form, onSubmit } = useSignupForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center mb-5 text-3xl font-medium text-white">新規登録</h2>
        <InputField
          id="name"
          label="ユーザー名"
          type="text"
          placeholder="ユーザー名"
          errorMessage={errors.name?.message}
          register={register}
        />
        <InputField
          id="email"
          label="メールアドレス"
          type="email"
          placeholder="メールアドレス"
          errorMessage={errors.email?.message}
          register={register}
        />
        <InputField
          id="password"
          label="パスワード"
          type="password"
          placeholder="パスワード"
          errorMessage={errors.password?.message}
          register={register}
        />
        <InputField
          id="password_confirmation"
          label="パスワード確認用"
          type="password"
          placeholder="パスワード確認用"
          errorMessage={errors.password_confirmation?.message}
          register={register}
        />
        <div className="mt-4">
          <Button type="submit">新規登録</Button>
        </div>
        </form>
      </div>
  )
}

export default SignupForm
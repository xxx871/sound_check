"use client"

import React from 'react'
import InputField from './InputField';
import { Button } from '@/app/components/elements/Button/Button';
import { useLoginForm } from '../hooks/useLoginForm';

const LoginForm = () => {
  const { form, onSubmit } = useLoginForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center mb-5 text-3xl font-medium text-white">ログイン</h2>
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
        <div className="mt-4">
          <Button type="submit">ログイン</Button>
        </div>
        </form>
      </div>
  )
}

export default LoginForm
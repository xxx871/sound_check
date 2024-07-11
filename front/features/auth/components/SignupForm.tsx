"use client"

import React from 'react'
import { useSignupForm } from '../hooks/useSignupForm';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/app/components/elements/LoadingButton';

const SignupForm = () => {
  const { form, onSubmit, serverError, isLoading } = useSignupForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center mb-5 text-3xl text-white font-medium">新規登録</h2>
        <div className="text-white">
          <label htmlFor="name" className="mb-1 block text-2xl ">ユーザー名</label>
          <Input
            type="text"
            id="name"
            placeholder="xxx"
            {...register('name')}
          />
          {errors.name && <p>※{errors.name.message}</p>}
        </div>
        <div className="text-white mt-4">
          <label htmlFor="email" className="mb-1 block text-2xl ">メールアドレス</label>
          <Input
            type="email"
            id="email"
            placeholder="aaa@example.com"
            {...register('email')}
          />
          {errors.email && <p>※{errors.email.message}</p>}
        </div>
        <div className="text-white mt-4">
          <label htmlFor="password" className="mb-1 block text-2xl ">パスワード</label>
          <Input
            type="password"
            id="password"
            placeholder="password"
            {...register('password')}
          />
          {errors.password && <p>※{errors.password.message}</p>}
        </div>
        <div className="text-white mt-4">
          <label htmlFor="password_confirmation" className="mb-1 block text-2xl ">パスワード確認</label>
          <Input
            type="password"
            id="password_confirmation"
            placeholder="password"
            {...register('password_confirmation')}
          />
          {errors.password_confirmation && <p>※{errors.password_confirmation.message}</p>}
        </div>
        {serverError && <p className="text-white mt-4">※{serverError}</p>}
        <div className="mt-4">
          <LoadingButton
            type="submit"
            variant="outline"
            className="w-32 h-12 text-lg text-white"
            isLoading={isLoading}
          >
            新規登録
          </LoadingButton>
        </div>
      </form>
    </div>
  )
}

export default SignupForm

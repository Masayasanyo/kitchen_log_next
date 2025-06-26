'use server';

import { z } from 'zod';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
import { supabase } from '@/app/lib/supabase';

const FormSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: 'ユーザーネームを入力してください。',
      })
      .min(1, { message: 'ユーザーネームを入力して下さい。' }),
    email: z
      .string({
        invalid_type_error: 'メールアドレスを入力してください。',
      })
      .min(1, { message: 'メールアドレスを入力して下さい。' })
      .email({ message: 'メールアドレスの形式で入力して下さい。' })
      .max(100, { message: 'メールアドレスの形式で入力して下さい。' }),
    password: z
      .string({
        invalid_type_error: 'パスワードを入力してください。',
      })
      .min(6, { message: 'パスワードは6文字以上で入力して下さい。' })
      .max(50, { message: 'パスワードは50文字以内で入力して下さい。' }),
    confirmedPassword: z
      .string({
        invalid_type_error: '確認用パスワードを入力してください。',
      })
      .min(6, { message: 'パスワードは6文字以上で入力して下さい。' })
      .max(50, { message: 'パスワードは50文字以内で入力して下さい。' }),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    path: ['confirmedPassword'],
    message: 'パスワードが一致しません。',
  });

export type State = {
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
    confirmedPassword?: string[];
  };
  message?: string | null;
};

export async function register(
  prevState: State | undefined,
  formData: FormData,
) {
  const validatedFields = FormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmedPassword: formData.get('confirmedPassword'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '会員登録に失敗しました。',
    };
  }

  const { username, email, password } = validatedFields.data;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const { error } = await supabase
    .from('users')
    .insert({ username: username, email: email, password: hashedPassword });
  if (error) {
    console.log(error.code);
    if (error.code === '23505') {
      return {
        message: 'このメールアドレスはすでに使用されています。',
      };
    }
    return {
      message: '会員登録に失敗しました。',
    };
  }
  await signIn('credentials', formData);
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          // return 'Invalid credentials.';
          return 'メールアドレスまたはパスワードが正しくありません。';
        default:
          // return 'Something went wrong.';
          return '予期しないエラーが発生しました。';
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: '/' });
}

'use server';

import { z } from 'zod';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
import { supabase } from '@/app/lib/supabase';

const FormSchema = z.object({
  id: z.string(),
  username: z.string({
    invalid_type_error: 'ユーザーネームを入力してください。',
  }),
  email: z.string({
    invalid_type_error: 'メールアドレスを入力してください。',
  }),
  password: z.string({
    invalid_type_error: 'パスワードを入力してください。',
  }),
  confirmedPassword: z.string({
    invalid_type_error: '確認用パスワードを入力してください。',
  }),
});

const Register = FormSchema.omit({ id: true });

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
  const validatedFields = Register.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmedPassword: formData.get('confirmed-password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '会員登録に失敗しました。',
    };
  }

  const { username, email, password, confirmedPassword } = validatedFields.data;

  if (password !== confirmedPassword) {
    return {
      message: 'パスワードが一致しません。',
    };
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const { error } = await supabase
    .from('users')
    .insert({ username: username, email: email, password: hashedPassword });
  if (error) {
    console.log(error);
    return {
      message: 'Failed to register.',
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
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: '/' });
}

'use client';
import Button from '@/components/atoms/Button';
import InputRegister from '@/components/molecules/InputRegister';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

interface LoginFields {
  email: string;
  password: string;
}
export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { makeSignIn } = useAuth();
  const router = useRouter();

  const [signinFields, setSigninFields] = useState<LoginFields>({
    email: '',
    password: '',
  });

  const writeSigninField = ({ ...value }: { [key: string]: string }) => {
    setSigninFields((prev) => {
      return { ...prev, ...value };
    });
  };

  const onSignin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log([...data.entries()]);

    if (isLoading) return;
    setIsLoading(true);
    try {
      await makeSignIn(signinFields.email, signinFields.password);
      router.replace('/');
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen h-auto">
      <div className="min-h-screen flex items-center">
        <div className="block mx-auto w-fit min-h-[400px] min-w-[400px] p-5 rounded-md dark:bg-zinc-900 text-zinc-100 ">
          <div className="flex justify-center mb-4">
            <h2 className="text-2xl font-bold">Login</h2>
          </div>
          <div className="space-y-4">
            <form className="space-y-4" onSubmit={onSignin}>
              <InputRegister
                label="Email"
                inputProps={{
                  type: 'email',
                  name: 'email',
                  onChange: ({ target }) => writeSigninField({ email: target.value }),
                  value: signinFields.email,
                }}
              />
              <InputRegister
                label="Password"
                inputProps={{
                  type: 'password',
                  name: 'password',
                  onChange: ({ target }) => writeSigninField({ password: target.value }),
                  value: signinFields.password,
                }}
              />
              <Button disabled={isLoading} type="submit">
                Sign In
              </Button>
            </form>
            <div className="flex justify-center">
              <p className="text-sm text-zinc-300">
                {/*  eslint-disable-next-line */}
                Don't have an account?{' '}
                <Link
                  href="/signup"
                  className="font-medium text-zinc-300 cursor-pointer hover:text-zinc-100"
                >
                  Sign up
                </Link>
              </p>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex-grow h-px bg-zinc-700" />
              <span className="text-sm font-bold text-zinc-300">OR</span>
              <div className="flex-grow h-px bg-zinc-700" />
              <div />
            </div>
            <Button variant="outlined" className="flex justify-center gap-2">
              <Image src="google-icon.svg" height={24} width={24} alt="google" />
              <span>Continue with Google</span>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

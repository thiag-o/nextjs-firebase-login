'use client';
import Button from '@/components/atoms/Button';
import InputRegister from '@/components/molecules/InputRegister';
import { useAuth } from '@/hooks/useAuth';

import { UserInterface } from '@/types/user.interface';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const { makeSignUp } = useAuth();
  const [signupFields, setSignupFields] = useState<UserInterface>({
    name: '',
    email: '',
    password: '',
  });

  const router = useRouter();

  const writeSignupField = ({ ...value }: { [key: string]: string }) => {
    setSignupFields((prev) => {
      return { ...prev, ...value };
    });
  };

  const onSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading) return;
    setIsLoading(true);
    try {
      await makeSignUp(signupFields);
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
        <div className="grid  mx-auto w-fit min-h-[400px] min-w-[400px] p-5 rounded-md dark:bg-zinc-900 text-zinc-100 ">
          <div className="flex relative justify-center items-center mb-4">
            <Link
              className="absolute left-0 text-sm text-zinc-300 hover:text-zinc-200 font-medium"
              href="/login"
            >
              {'< Login'}
            </Link>
            <h2 className="text-2xl font-bold">Sign up</h2>
          </div>
          <div className="space-y-4">
            <form className="space-y-4" onSubmit={onSignup}>
              <InputRegister
                label="Name"
                inputProps={{
                  type: 'text',
                  onChange: ({ target }) => {
                    writeSignupField({ name: target.value });
                  },
                  value: signupFields.name,
                }}
              />
              <InputRegister
                label="Email"
                inputProps={{
                  type: 'email',
                  value: signupFields.email,
                  onChange: ({ target }) => {
                    writeSignupField({ email: target.value });
                  },
                }}
              />
              <InputRegister
                label="Password"
                inputProps={{
                  type: 'password',
                  value: signupFields.password,
                  onChange: ({ target }) => {
                    writeSignupField({ password: target.value });
                  },
                }}
              />
              <Button className="self-end" type="submit" disabled={isLoading}>
                Sign up
              </Button>
            </form>
            <Button variant="outlined" className="flex justify-center gap-2">
              <Image src="google-icon.svg" height={24} width={24} priority alt="google" />
              Sign up with Google
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

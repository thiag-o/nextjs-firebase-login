'use client';
import Button from '@/components/atoms/Button';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, makeSignOut } = useAuth();
  const route = useRouter();

  const onSignOut = async () => {
    await makeSignOut();
    route.replace('/login');
  };

  return (
    <main className="min-h-screen p-4">
      <div className=" bg-zinc-900 min-w-64 w-fit p-4 rounded-md space-y-4">
        <div className="flex items-center gap-2">
          <div className="rounded-full h-10 w-10 bg-blue-900"></div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium text-zinc-300">{user?.name}</h3>
            <span className="text-sm text-zinc-300">{user?.email}</span>
          </div>
        </div>
        <Button variant="outlined" onClick={onSignOut}>
          Sign out
        </Button>
      </div>
    </main>
  );
}

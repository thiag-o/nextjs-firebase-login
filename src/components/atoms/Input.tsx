import React, { ComponentProps } from 'react';

type InputProps = ComponentProps<'input'>;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={
        'bg-transparent placeholder-zinc-600 text-zinc-200 outline-none flex-1 border border-zinc-700 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500  p-2 rounded-md' +
        ` ${className}`
      }
      {...props}
    />
  );
}

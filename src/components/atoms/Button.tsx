import React, { ComponentProps, ReactNode } from 'react';
import { VariantProps, tv } from 'tailwind-variants';

const buttonVariants = tv({
  base: 'w-full block py-2 font-medium rounded-md h-fit disabled:brightness-50',
  variants: {
    variant: {
      fill: 'bg-blue-800 hover:bg-blue-700',
      outlined: 'border border-zinc-500 rounded-md hover:border-zinc-400 hover:text-zinc-200"',
    },
  },
  compoundVariants: [
    {
      variant: 'outlined',
      class: 'text-zinc-300',
    },
  ],
  defaultVariants: {
    variant: 'fill',
  },
});

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export default function Button({ children, variant, className, ...rest }: ButtonProps) {
  return (
    <button className={`${buttonVariants({ variant })} ${className}`} {...rest}>
      {children}
    </button>
  );
}

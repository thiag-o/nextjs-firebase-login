import React, { ComponentProps } from 'react';
import Input from '../atoms/Input';

interface InputRegisterProps {
  label: string;
  inputProps: ComponentProps<'input'>;
}
export default function InputRegister({ label, inputProps }: InputRegisterProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-zinc-200 font-medium" htmlFor={label}>
        {label}
      </label>
      <Input {...inputProps} id={label} />
    </div>
  );
}

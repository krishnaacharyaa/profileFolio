import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface Props {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  schemaType?: string;
}

export function InputWithLabel({ label, name, type, placeholder, schemaType }: Props) {
  const { register } = useFormContext();
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor={name} className="text-base font-normal text-slate-500">
        {label}
      </Label>
      <Input
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(`${schemaType}.${name}`)}
      />
    </div>
  );
}

export function TextAreaWithLabel({ label, name, type, placeholder, schemaType }: Props) {
  const { register } = useFormContext();
  return (
    <div className="flex flex-col gap-3">
      <Label
        htmlFor={name} className="text-base font-normal text-slate-500"
      >
        {label}
      </Label>
      <Textarea
        // type={type}
        id={name}
        placeholder={placeholder}
        {...register(`${schemaType}.${name}`)}
      />
    </div>
  );
}

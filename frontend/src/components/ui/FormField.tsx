import { cn } from "@/lib/utils";

/**
 * Form primitives matching DESIGN_SYSTEM.md:
 * light grey fill, 1px border that turns Professional Blue on focus,
 * label in label-md style sitting above the control.
 */

const fieldBase =
  "w-full rounded-lg border border-outline-variant/60 bg-surface-container-low px-4 py-3 text-body-md text-on-surface placeholder:text-on-surface-variant/60 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

export function FieldLabel({ htmlFor, children }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-label-md font-medium text-on-surface"
    >
      {children}
    </label>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, id, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && id && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      <input id={id} className={cn(fieldBase, className)} {...props} />
    </div>
  );
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, id, className, ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && id && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      <textarea id={id} className={cn(fieldBase, "resize-y", className)} {...props} />
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export function Select({
  label,
  id,
  className,
  children,
  ...props
}: SelectProps) {
  return (
    <div className="w-full">
      {label && id && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      <select id={id} className={cn(fieldBase, "appearance-none", className)} {...props}>
        {children}
      </select>
    </div>
  );
}

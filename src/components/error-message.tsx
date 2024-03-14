import { AlertTriangle } from "lucide-react";

interface Props {
  message?: string;
}

export function ErrorMessage(props: Props) {
  if (!props.message) return null;

  return (
    <div className="bg-red-500/15 text-sm text-destructive rounded-md p-2 flex gap-x-2 items-center">
      <AlertTriangle className="w-4" />
      {props.message}
    </div>
  );
}

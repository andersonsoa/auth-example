import { CheckCircle } from "lucide-react";

interface Props {
  message?: string;
}

export function SuccessMessage(props: Props) {
  if (!props.message) return null;

  return (
    <div className="bg-emerald-500/15 text-sm text-emerald-600 rounded-md p-2 flex gap-x-2 items-center">
      <CheckCircle className="w-4" />
      {props.message}
    </div>
  );
}

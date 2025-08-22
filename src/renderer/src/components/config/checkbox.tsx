import { Check as CheckIcon } from "lucide-react";

type Props = {
  message: string;
  checked?: boolean;
  onChecked?: (checked: boolean) => void;
};

const Checkbox: React.FC<Props> = ({ message, onChecked, checked }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none text-white m-2">
      <input
        type="checkbox"
        className="peer sr-only"
        onChange={(e) => onChecked?.(e.target.checked)}
        checked={checked}
      />
      <span className="h-5 w-5 rounded-lg border border-gray-400 flex items-center justify-center transition-all duration-300 peer-checked:bg-redytb peer-checked:border-redytb">
        <CheckIcon
          size={14}
          className="text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
        />
      </span>
      <span className="text-sm leading-none flex items-center">{message}</span>
    </label>
  );
};

export default Checkbox;

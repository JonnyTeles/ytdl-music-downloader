import { Loader2 } from "lucide-react";

interface Props {
  message?: string;
  progress?: { done: number; total: number };
}

const LoadingOverlay: React.FC<Props> = ({ message = "Baixando músicas...", progress }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="animate-spin text-redytb w-12 h-12" />
        <p className="text-white text-lg font-semibold">{message}</p>
        {progress && (
          <p className="text-white text-sm">{`Baixadas: ${progress.done} / ${progress.total}`}</p>
        )}
      </div>
    </div>
  );
};

export default LoadingOverlay;

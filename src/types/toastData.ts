export type ToastType = "error" | "confirm" | "warm";
export type ToastData = {
  id: number;
  type: ToastType;
  title?: string;
  message?: string;
  closable?: boolean;
};

import Swal from "sweetalert2";

export type NotifyVariant = "success" | "error" | "warning" | "info" | "question";
export type Notify = {
  title: string;
  text: string;
  variant: NotifyVariant;
};
export function useSwal() {
  return Swal;
}

export function useNotify() {
  const notify = ({ title, text, variant }: Notify) => {
    return Swal.fire({
      title: title,
      text: text,
      icon: variant,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };
  return { notify };
}

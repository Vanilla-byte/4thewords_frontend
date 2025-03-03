import { useSwal } from "./useSwal";
const Swal = useSwal();

export function useConfirmDelete() {
  const confirmDelete = (id: string, onConfirm: (id: string) => void, onCancel?: (id: string) => void) => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.add("dark");
    }

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: {
        popup: "rounded-lg bg-white dark:bg-gray-800 shadow-lg",
        title: "text-gray-900 dark:text-white font-semibold",
        htmlContainer: "text-gray-600 dark:text-gray-300",
        confirmButton: "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg",
        cancelButton: "bg-gray-300 hover:bg-gray-400 text-gray-900 px-4 py-2 rounded-lg",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm(id);
      } else if (result.dismiss === Swal.DismissReason.cancel && onCancel) {
        onCancel(id);
      }
    });
  };

  return { confirmDelete };
}

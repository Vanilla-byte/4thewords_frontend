export const jsonToFormData = (data: Record<string, unknown>): FormData => {
  const formData = new FormData();

  const appendFormData = (key: string, value: unknown) => {
    if (value === null || value === undefined) return;
    formData.append(key, value.toString());
  };

  Object.entries(data).forEach(([key, value]) => appendFormData(key, value));

  return formData;
};

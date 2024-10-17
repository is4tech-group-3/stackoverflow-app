import { FormGroup } from '@angular/forms';

export function convertFormGroupToFormData(formGroup: FormGroup): FormData {
  const formData = new FormData();

  // Recorre los controles del formulario
  Object.keys(formGroup.controls).forEach(key => {
    const controlValue = formGroup.get(key)?.value;
    console.log("🚀 ~ Object.keys ~ controlValue:", controlValue)

    if (controlValue !== null && controlValue !== undefined) {
      formData.append(key, controlValue);
    }
  });

  return formData;
}

import { useCallback, useState } from 'react';

export default function useFormValidator() {

  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  function handleFormChange (evt) {

    const input = evt.target;
    const name = input.name;
    const value = input.value;

    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: input.validationMessage });
    setIsFormValid(input.closest('form').checkValidity());

  }

  const resetForm = useCallback((newFormValues = {}, newFormErrors = {}, newIsFormValid = false) => {

      setFormValues(newFormValues);
      setFormErrors(newFormErrors);
      setIsFormValid(newIsFormValid);

    },
    [setFormValues, setFormErrors, setIsFormValid]);

  return {
    formValues, formErrors, isFormValid, handleFormChange, resetForm, setFormValues, setIsFormValid, setFormErrors
  };

}
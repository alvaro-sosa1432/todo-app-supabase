export const inputForm = (
  typeForm,
  placeHolderValue,
  valueForm,
  accionForm,
) => {
  return (
    <input
      className="p-2 h-2"
      type={`${typeForm}`}
      placeholder={`${placeholderValue}`}
      value={value}
      onChange={accionForm}
      required
    />
  );
};

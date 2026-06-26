export const InputForm = ({
  labelName,
  typeForm,
  placeHolderValue,
  valueForm,
  accionForm,
}) => {
  return (
    <div className="flex flex-col gap-2 text-purple-300 ">
      <label className="uppercase font-semibold">{labelName}</label>
      <input
        type={typeForm}
        placeholder={placeHolderValue}
        value={valueForm}
        onChange={accionForm}
        className="p-2 bg-zinc-800 rounded-md text-purple-400 outline-0 w-full" //
      />
    </div>
  );
};

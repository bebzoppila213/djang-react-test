type CustomInputProps = {
  updateState: (id: number, checked: boolean) => void;
  label: string;
  name: string;
  id: number;
};

export default function CustomCheckbox({
  label,
  name,
  id,
  updateState,
}: CustomInputProps) {
  const uniqueId = "id" + Math.random().toString(16).slice(2);

  return (
    <div className="mb-3 form-check">
      <label htmlFor={uniqueId}>{label}</label>
      <input
        onChange={(event) => updateState(id, event.currentTarget.checked)}
        type="checkbox"
        name={name}
        id={uniqueId}
        className="mb-3 form-check-input"
      />
    </div>
  );
}

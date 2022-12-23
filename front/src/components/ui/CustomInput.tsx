import { useState } from "react";

type CustomInputProps = {
  updateState: (text: string) => void;
  label: string;
  defaultValue?: string,
  type?: 'checkbox' | "text",
  name?: string,
};

export default function CustomInput({ updateState, label, defaultValue = '', type = 'text', name = ''}: CustomInputProps) {
  const uniqueId = "id" + Math.random().toString(16).slice(2)



  return (
    <div className={type == "text" ? "form-group " : "mb-3 form-check"}>
      <label htmlFor={uniqueId}>{label}</label>
      <input
        // value={defaultValue}
        // onInput={(event) => updateState(event.currentTarget.value)}
        onChange={(event) => updateState(event.currentTarget.value)}
        type={type}
        name={name}
        id={uniqueId}
        // 
        className={type == "text" ? "mb-3 form-control " : "mb-3 form-check-input"}
      />
    </div>
  );
}

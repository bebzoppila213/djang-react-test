import axios from "axios";
import React, { useState } from "react";
import CustomInput from "./ui/CustomInput";
import { useUser } from "../state/user"
type RegisterFormStateType = {
  email: string;
  username: string;
  password: string;
};

export default function RegisterForm() {
  const [registerFormState, setRegisterFormState] = useState<RegisterFormStateType>({ email: "", username: "", password: "" });
  const {register } = useUser() 

  const updateFormState = (key: keyof RegisterFormStateType, value: string) => {
    setRegisterFormState({ ...registerFormState, [key]: value });
  };

  const sendForm = async (event: React.FormEvent) => {
    event.preventDefault();
    register(registerFormState)
  };

  return (
    <form onSubmit={sendForm} className="mb-3">
      <h3 >Форма Регистрации</h3>
      <CustomInput
        label="Введите вашу почту"
        updateState={(text) => updateFormState("email", text)}
      ></CustomInput>
      <CustomInput
        label="Введите ваш логин"
        updateState={(text) => updateFormState("username", text)}
      ></CustomInput>
      <CustomInput
        label="Введите ваш пароль"
        updateState={(text) => updateFormState("password", text)}
      ></CustomInput>
      <button type="submit" className="btn btn-primary">
        Зарегистрироватся
      </button>
    </form>
  );
}

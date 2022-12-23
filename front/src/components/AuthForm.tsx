import { useState } from "react";
import { useUser } from "../state/user";
import CustomInput from "./ui/CustomInput";

type AuthFormStateType = {
  username: string;
  password: string;
};

export default function AuthForm() {
  const [authFormState, setAuthForState] = useState<AuthFormStateType>({
    username: "",
    password: "",
  });
  const { auth } = useUser();

  const updateFormState = (key: keyof AuthFormStateType, value: string) => {
    setAuthForState({ ...authFormState, [key]: value });
  };

  const sendForm = async (event: React.FormEvent) => {
    event.preventDefault();
    auth(authFormState);
  };

  return (
    <form onSubmit={sendForm} className="mb-3">
        <h3 >Форма авторизацыы</h3>
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

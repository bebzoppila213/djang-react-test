import RegisterForm from "../components/RegisterForm";
import AuthForm from "../components/AuthForm";
export default function Main() {

    
  return (
    <div className="App">
      <div className="container">
        <RegisterForm></RegisterForm>
        <AuthForm></AuthForm>
      </div>
    </div>
  );
}

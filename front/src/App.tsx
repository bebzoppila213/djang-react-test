import { useEffect } from "react";
import RegisterForm from "./components/RegisterForm";
import { useUser } from "./state/user";
import { Route, Routes, Link } from "react-router-dom";
import Main from "./pages/Main";
import Categories from "./pages/Categories";
import Tests from "./pages/Tests";
import TestItem from "./pages/TestItem";
import Header from "./components/Header";
function App() {
  const { authToken } = useUser();

  useEffect(() => {
    authToken();
  }, []);

  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/tests/:id" element={<Tests />} />
        <Route path="/test/:id" element={<TestItem />} />
      </Routes>
    </div>
  );
}

export default App;

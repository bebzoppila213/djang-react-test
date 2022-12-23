import { useParams } from "react-router-dom";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import TestListItem from "../components/TestListItem";
import { useUser } from "../state/user";

type TestsRouterParams = {
  id: string;
};

interface ITest {
  id: number;
  title: string;
}

export default function Tests() {
  const params = useParams() as TestsRouterParams;
  const {user} = useUser()
  const [tests] = useFetch<ITest[]>(
    [],
    "http://127.0.0.1:8000/api/v1/tests",
    "get",
    user.token,
    {},
    { сategory: params.id }
  );

  return (
    <div className="tests mt-4">
      <div className="container">
        <div className="tests__inner">
          <h3 className="tests__title text-center">Выберите тест</h3>
          <div className="list-group">
            {tests.map((testItem) => (
              <TestListItem
                key={testItem.id}
                text={testItem.title}
                id={testItem.id}
              ></TestListItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

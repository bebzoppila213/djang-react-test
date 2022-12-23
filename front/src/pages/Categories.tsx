import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import CaregoriesListItem from "../components/CaregoriesListItem";
import { useUser } from "../state/user";

interface ICategory {
  title: string;
  id: number;
  poster: string;
}

export default function Categories() {
  const {user} = useUser()
  const [categoryState, errors] = useFetch<ICategory[]>(
    [],
    "http://127.0.0.1:8000/api/v1/category",
    "get",
    user.token
  );


  return (
    <div className="categoies mt-4">
      <div className="container">
        <div className="categoies__inner">
          <h3 className="categoies__title text-center">Выберите категорию</h3>
          <ul className="categoies-list">
            {categoryState.map((category) => (
              <CaregoriesListItem
                id={category.id}
                name={category.title}
                imgPath={"http://127.0.0.1:8000" + category.poster}
              ></CaregoriesListItem>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

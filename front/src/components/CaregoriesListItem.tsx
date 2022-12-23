import { Link } from "react-router-dom"
type CaregoriesListItemProps = {
    imgPath: string
    name: string,
    id: number
}

export default function CaregoriesListItem({imgPath, name, id}:CaregoriesListItemProps){

    return(
        <li className="categoies-list__item">
            <Link to={`/tests/${id}`}>
            <p className="categoies-list__name">{name}</p>
            <div className="bg-blur"></div>
            <img className="categoies-list__img" src={imgPath} alt="Какртинка" />
            </Link>
        </li>
    )
}
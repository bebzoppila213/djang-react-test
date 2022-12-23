import { Link } from "react-router-dom"


type TestListItemProps = {
    id: number,
    text: string
}

export default function TestListItem({id, text}: TestListItemProps) {

    return(
        <Link className="list-group-item list-group-item-action" to={`/test/${id}`}>{text}</Link>
    )
}
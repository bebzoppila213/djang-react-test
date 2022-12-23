import { Link } from "react-router-dom"
import { useUser } from "../state/user"



export default function Header(){
    const {user} = useUser()
    
    return(
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <h3>Добро пожаловать {user.username}</h3>
                    <Link className="btn btn-primary" to={`/categories`}>Картегории тестов</Link>
                    <Link className="btn btn-primary" to={`/`}>На страницу с авторизацией</Link>
                </div>
            </div>
        </header>
    )
}
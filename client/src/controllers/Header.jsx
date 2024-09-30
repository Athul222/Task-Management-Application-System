import { Link } from "react-router-dom"

export default function Header() {
    return (
        <>
            <header>
                <h1>TaskManager</h1>
                <nav>
                    <Link to='/'>Logout</Link>
                </nav>
            </header>
        </>

    )
}
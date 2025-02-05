import { Link, NavLink } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../contexts/AuthProvider";

// CSS
import styles from "./Navbar.module.css";

const Navbar = () => {
    const { user } = useAuthValue();

    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.brand}>
                Mini <span>Blog</span>
            </Link>
            <ul className={styles.links_list}>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                {!user && (
                    <>
                        <li>
                            <NavLink to="/login">Entrar</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register">Cadastrar</NavLink>
                        </li>
                    </>
                )}
                {user && (
                    <>
                        <li>
                            <NavLink to="/posts/create">Novo post</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard">Dashboard</NavLink>
                        </li>
                    </>
                )}
                <li>
                    <NavLink to="/about">Sobre</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;

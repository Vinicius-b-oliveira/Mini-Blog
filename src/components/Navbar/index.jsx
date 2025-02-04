// CSS
import styles from "./Navbar.module.css";

import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.brand}>
                Mini <span>Blog</span>
            </Link>
            <ul className={styles.links_list}>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about">Sobre</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;

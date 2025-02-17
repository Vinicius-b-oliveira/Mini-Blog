import { Link, NavLink } from "react-router-dom";

// Hooks
import { useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../contexts/AuthContext";

// Icons
import { Menu, X } from "lucide-react";

// CSS
import styles from "./Navbar.module.css";

const Navbar = () => {
    const { user } = useAuthValue();
    const { logout } = useAuthentication();

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContent}>
                <Link to="/" className={styles.brand}>
                    Mini <span>Blog</span>
                </Link>

                <button
                    className={styles.menuToggle}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <ul
                    className={`${styles.links_list} ${menuOpen ? styles.open : ""}`}
                >
                    <li>
                        <NavLink to="/" onClick={() => setMenuOpen(false)}>
                            Home
                        </NavLink>
                    </li>
                    {!user && (
                        <>
                            <li>
                                <NavLink
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Entrar
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/register"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Cadastrar
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Sobre
                                </NavLink>
                            </li>
                        </>
                    )}
                    {user && (
                        <>
                            <li>
                                <NavLink
                                    to="/posts/create"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Novo post
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Sobre
                                </NavLink>
                            </li>
                            <li>
                                <button
                                    className={styles.logoutButton}
                                    onClick={() => {
                                        logout();
                                        setMenuOpen(false);
                                    }}
                                >
                                    Sair
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

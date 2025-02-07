import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

// CSS
import styles from "./Home.module.css";

const Home = () => {
    const [query, setQuery] = useState("");
    const [posts] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className={styles.home}>
            <h1>Veja os nossos posts mais recentes</h1>
            <form className={styles.search_form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ou busque por tags..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-dark">Pesquisar</button>
            </form>

            <div>
                <h2>Posts</h2>
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>Nenhum post foi criado até o momento...</p>
                        <Link to="/posts/create" className="btn">
                            Criar primeiro post
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;

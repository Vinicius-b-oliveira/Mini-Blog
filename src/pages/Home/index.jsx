// Hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

// CSS
import styles from "./Home.module.css";

// Components
import PostDetail from "../../components/PostDetail";

const Home = () => {
    const [query, setQuery] = useState("");
    const { documents: posts, loading } = useFetchDocuments("posts");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (query) {
            return navigate(`/search?q=${query}`);
        }
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
                <button className={`btn btn-dark ${styles.search_btn}`}>
                    Pesquisar
                </button>
            </form>

            <div className={styles.posts_container}>
                {loading && <p>Carregando...</p>}
                {posts &&
                    posts.map((post) => (
                        <PostDetail key={post.id} post={post} />
                    ))}
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

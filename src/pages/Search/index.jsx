import { Link } from "react-router-dom";

// Hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

// Components
import PostDetail from "../../components/PostDetail";

// CSS
import styles from "./Search.module.css";

const Search = () => {
    const query = useQuery();
    const search = query.get("q");

    const { documents: posts } = useFetchDocuments("posts", search);

    return (
        <div className={styles.search_container}>
            <h1>Filtro de posts</h1>
            <div className={styles.posts_container}>
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>
                            Não encontramos nenhum post a partir da busca:{" "}
                            <span>{search}</span>
                        </p>
                    </div>
                )}

                {posts && (
                    <>
                        {posts.map((post) => (
                            <PostDetail key={post.id} post={post} />
                        ))}
                    </>
                )}

                <Link to="/" className="btn btn-dark">
                    Voltar
                </Link>
            </div>
        </div>
    );
};

export default Search;

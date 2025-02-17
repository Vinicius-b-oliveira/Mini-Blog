import styles from "./Post.module.css";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { Link, useParams, useNavigate } from "react-router-dom";

const Post = () => {
    const { id } = useParams();
    const { document: post, loading } = useFetchDocument("posts", id);

    const navigate = useNavigate();

    const searchTag = (tag) => {
        return navigate(`/search?q=${tag}`);
    };

    return (
        <div className={styles.post_container}>
            {loading && <p>Carregando post...</p>}
            {post && (
                <>
                    <img
                        src={post.image}
                        alt={post.title}
                        className={styles.post_image}
                    />
                    <h1>{post.title}</h1>
                    <p className={styles.post_body}>{post.body}</p>
                    <h3>Este post trata sobre:</h3>
                    <div className={styles.tags}>
                        {post.tags.map((tag) => (
                            <p key={tag} onClick={() => searchTag(tag)}>
                                <span>#</span>
                                {tag}
                            </p>
                        ))}
                    </div>

                    <Link to="/" className="btn btn-dark">
                        Voltar
                    </Link>
                </>
            )}
        </div>
    );
};

export default Post;

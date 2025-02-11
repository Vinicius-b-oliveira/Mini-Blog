import styles from "./Post.module.css";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { Link, useParams } from "react-router-dom";

const Post = () => {
    const { id } = useParams();
    const { document: post, loading } = useFetchDocument("posts", id);

    return (
        <div className={styles.post_container}>
            {loading && <p>Carregando post...</p>}
            {post && (
                <>
                    <img src={post.image} alt={post.title} />
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                    <h3>Este post trata sobre: </h3>
                    <div className={styles.tags}>
                        {post.tags.map((tag) => (
                            <p key={tag}>
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

import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { useAuthValue } from "../../contexts/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

const Dashboard = () => {
    const { user } = useAuthValue();
    const uid = user.uid;

    const { documents: posts, loading } = useFetchDocuments("posts", null, uid);
    const { deleteDocument } = useDeleteDocument("posts");

    if (loading) {
        <p>Carregando...</p>;
    }

    return (
        <div className={styles.dashboard}>
            <h2>Dashboard</h2>
            <p>Gerencie os seus posts</p>

            {posts && posts.length === 0 ? (
                <div className={styles.noposts}>
                    <p>Nenhum post foi criado até o momento...</p>
                    <Link to="/posts/create" className="btn">
                        Criar primeiro post
                    </Link>
                </div>
            ) : (
                <>
                    <div className={styles.table_container}>
                        {/* Cabeçalho só visível no desktop */}
                        <div className={styles.post_header}>
                            <span>Título</span>
                            <span>Ações</span>
                        </div>
                        {posts.map((post) => (
                            <div className={styles.post_row} key={post.id}>
                                <p className={styles.post_title}>
                                    {post.title}
                                </p>
                                <div className={styles.actions}>
                                    <Link
                                        to={`/posts/${post.id}`}
                                        className="btn btn-outline"
                                    >
                                        Ver
                                    </Link>
                                    <Link
                                        to={`/posts/edit/${post.id}`}
                                        className="btn btn-outline"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        className="btn btn-outline btn-danger"
                                        onClick={() => deleteDocument(post.id)}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;

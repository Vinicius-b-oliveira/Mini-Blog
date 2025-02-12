import styles from "./EditPost.module.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../contexts/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";

import ImagePreviewModal from "../../components/ImagePreviewModal";
import { Eye } from "lucide-react";

const EditPost = () => {
    const { id } = useParams();
    const { document: post } = useFetchDocument("posts", id);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setBody(post.body);
            setImage(post.image);

            const textTags = post.tags.join(", ");

            setTags(textTags);
        }
    }, [post]);

    const { updateDocument, response } = useUpdateDocument("posts");

    const { user } = useAuthValue();

    const navigate = useNavigate();

    const openPreviewModal = () => {
        setIsPreviewModalOpen(true);
    };

    const closePreviewModal = () => {
        setIsPreviewModalOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");

        try {
            new URL(image);
        } catch (error) {
            console.log(error.message);
            setFormError("A imagem precisa ser uma URL.");
        }

        const tagsArray = tags
            .split(",")
            .map((tag) => tag.trim().toLowerCase());

        if (!title || !image || !tags || !body) {
            setFormError("Por favor, preencha todos os campos!");
        }

        if (formError) {
            return;
        }

        const data = {
            title,
            image,
            body,
            tags: tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        };

        updateDocument(id, data);

        navigate("/");
    };

    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Editando post: {post.title}</h2>
                    <p>Altere os dados do post como desejar</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Titulo: </span>
                            <input
                                type="text"
                                name="title"
                                required
                                placeholder="Pense num bom título..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                        <div className={styles.image_input_container}>
                            <label>
                                <span>URL da imagem: </span>
                                <input
                                    type="text"
                                    name="image"
                                    required
                                    placeholder="Insira uma imagem que representa o seu post"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                />
                            </label>

                            <Eye
                                onClick={openPreviewModal}
                                className={styles.preview_icon}
                            />
                        </div>
                        <label>
                            <span>Conteúdo: </span>
                            <textarea
                                name="body"
                                required
                                placeholder="Insira o conteúdo do post"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            />
                        </label>
                        <label>
                            <span>Tags: </span>
                            <input
                                type="text"
                                name="tags"
                                required
                                placeholder="Insira as tags separadas por vírgula"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                        </label>

                        {!response.loading && (
                            <button className="btn">Editar</button>
                        )}

                        {response.loading && (
                            <button className="btn" disabled>
                                Aguarde...
                            </button>
                        )}
                        {response.error && (
                            <p className="error">{response.error}</p>
                        )}
                        {formError && <p className="error">{formError}</p>}
                    </form>
                </>
            )}

            {isPreviewModalOpen && (
                <ImagePreviewModal
                    closePreviewModal={closePreviewModal}
                    image={image}
                />
            )}
        </div>
    );
};

export default EditPost;

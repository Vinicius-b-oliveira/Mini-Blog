// Hooks
import { useState } from "react";

// Icons
import { Eye } from "lucide-react";

// Components
import ImagePreviewModal from "../ImagePreviewModal";

// CSS
import styles from "./PostForm.module.css";

const PostForm = ({
    handleSubmit,
    postData,
    setPostData,
    response,
    buttonText,
}) => {
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

    const openPreviewModal = () => {
        setIsPreviewModalOpen(true);
    };

    const closePreviewModal = () => {
        setIsPreviewModalOpen(false);
    };

    return (
        <>
            <form
                onSubmit={!postData.formError && handleSubmit}
                className={styles.post_form}
            >
                <label>
                    Título
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="Pense num bom título..."
                        value={postData.title}
                        onChange={(e) =>
                            setPostData({ ...postData, title: e.target.value })
                        }
                    />
                </label>

                <div className={styles.image_input_container}>
                    <label>
                        URL da imagem
                        <input
                            type="text"
                            name="image"
                            required
                            placeholder="Insira uma imagem para o post"
                            value={postData.image}
                            onChange={(e) =>
                                setPostData({
                                    ...postData,
                                    image: e.target.value,
                                })
                            }
                        />
                    </label>

                    {postData.image && (
                        <Eye
                            onClick={openPreviewModal}
                            className={styles.preview_icon}
                            aria-label="Visualizar imagem"
                        />
                    )}
                </div>

                <label>
                    Conteúdo
                    <textarea
                        name="body"
                        required
                        placeholder="Escreva o conteúdo do post"
                        value={postData.body}
                        onChange={(e) =>
                            setPostData({ ...postData, body: e.target.value })
                        }
                    />
                </label>

                <label>
                    Tags
                    <input
                        id="tags"
                        type="text"
                        name="tags"
                        required
                        placeholder="Insira tags separadas por vírgula"
                        value={postData.tags}
                        onChange={(e) =>
                            setPostData({ ...postData, tags: e.target.value })
                        }
                    />
                </label>

                <button
                    type="submit"
                    className="btn"
                    disabled={response.loading}
                >
                    {response.loading ? "Aguarde..." : buttonText}
                </button>

                {response.error && (
                    <p className="error" aria-live="polite">
                        {response.error}
                    </p>
                )}
                {postData.formError && (
                    <p className="error" aria-live="polite">
                        {postData.formError}
                    </p>
                )}
            </form>
            {isPreviewModalOpen && postData.image && (
                <ImagePreviewModal
                    closePreviewModal={closePreviewModal}
                    image={postData.image}
                />
            )}
        </>
    );
};

export default PostForm;

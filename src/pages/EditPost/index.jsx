// Hooks
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../contexts/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";

// Components
import PostForm from "../../components/PostForm";

// CSS
import styles from "./EditPost.module.css";

const EditPost = () => {
    const { id } = useParams();
    const { document: post } = useFetchDocument("posts", id);
    const { updateDocument, response } = useUpdateDocument("posts");
    const { user } = useAuthValue();
    const navigate = useNavigate();

    const [postData, setPostData] = useState({
        title: "",
        image: "",
        body: "",
        tags: "",
        formError: "",
    });

    useEffect(() => {
        if (post) {
            setPostData({
                title: post.title,
                image: post.image,
                body: post.body,
                tags: post.tags.join(", "),
                formError: "",
            });
        }
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setPostData({ ...postData, formError: "" });

        try {
            new URL(postData.image);
        } catch {
            setPostData({
                ...postData,
                formError: "A imagem precisa ser uma URL.",
            });
            return;
        }

        const tagsArray = postData.tags
            .split(",")
            .map((tag) => tag.trim().toLowerCase());

        if (
            !postData.title ||
            !postData.image ||
            !postData.tags ||
            !postData.body
        ) {
            setPostData({
                ...postData,
                formError: "Preencha todos os campos!",
            });
            return;
        }

        updateDocument(id, {
            title: postData.title,
            image: postData.image,
            body: postData.body,
            tags: tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        });

        navigate("/");
    };

    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Editando post: {post.title}</h2>
                    <p>Altere os dados do post como desejar</p>
                    <PostForm
                        handleSubmit={handleSubmit}
                        postData={postData}
                        setPostData={setPostData}
                        response={response}
                        buttonText="Salvar alterações"
                    />
                </>
            )}
        </div>
    );
};

export default EditPost;

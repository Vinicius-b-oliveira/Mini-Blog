// Hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../contexts/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

// Components
import PostForm from "../../components/PostForm";

// CSS
import styles from "./CreatePost.module.css";

const CreatePost = () => {
    const [postData, setPostData] = useState({
        title: "",
        image: "",
        body: "",
        tags: "",
        formError: "",
    });

    const { insertDocument, response } = useInsertDocument("posts");
    const { user } = useAuthValue();
    const navigate = useNavigate();

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

        insertDocument({
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
        <div className={styles.create_post}>
            <h2>Criar post</h2>
            <p>Escreva sobre qualquer assunto e compartilhe conhecimento!</p>
            <PostForm
                handleSubmit={handleSubmit}
                postData={postData}
                setPostData={setPostData}
                response={response}
                buttonText="Cadastrar"
            />
        </div>
    );
};

export default CreatePost;

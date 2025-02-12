import { X } from "lucide-react";
import styles from "./ImagePreviewModal.module.css";

const ImagePreviewModal = ({ closePreviewModal, image }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.image_preview_modal}>
                <div>
                    <h3>Preview da imagem</h3>
                    <X
                        onClick={closePreviewModal}
                        className={styles.close_icon}
                    />
                </div>
                <img src={image} alt="imagePreview" />
            </div>
        </div>
    );
};

export default ImagePreviewModal;

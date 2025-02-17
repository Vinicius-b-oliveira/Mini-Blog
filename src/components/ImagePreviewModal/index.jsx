import { X } from "lucide-react";

// CSS
import styles from "./ImagePreviewModal.module.css";

const ImagePreviewModal = ({ closePreviewModal, image }) => {
    return (
        <div className={styles.overlay} onClick={closePreviewModal}>
            <div
                className={styles.image_preview_modal}
                onClick={(e) => e.stopPropagation()}
            >
                <header className={styles.modal_header}>
                    <h3 className={styles.modal_title}>Preview da imagem</h3>
                    <button
                        onClick={closePreviewModal}
                        className={styles.close_button}
                        aria-label="Fechar pré-visualização"
                    >
                        <X />
                    </button>
                </header>
                <img
                    src={image}
                    alt="Pré-visualização da imagem selecionada"
                    className={styles.preview_image}
                />
            </div>
        </div>
    );
};

export default ImagePreviewModal;

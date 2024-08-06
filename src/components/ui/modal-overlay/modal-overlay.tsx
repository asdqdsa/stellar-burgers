import styles from './modal-overlay.module.css';

export const ModalOverlayUI = (
  { onClick }: { onClick: () => void },
  { ...rest }
) => (
  <div className={styles.overlay} onClick={onClick} data-cy='modal-overlay' />
);

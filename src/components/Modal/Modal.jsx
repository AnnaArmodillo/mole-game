import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';

function ModalInner({ closeModalHandler, children }) {
  useEffect(() => {
    function closeModalByEscape(event) {
      if (event.key === 'Escape') {
        closeModalHandler();
      }
    }
    document.addEventListener('keydown', closeModalByEscape);
    return () => {
      document.removeEventListener('keydown', closeModalByEscape);
    };
  }, []);
  function closeModalByClickX() {
    closeModalHandler();
  }
  return (
    <div className={styles.modalInner}>
      <button
        type="button"
        onClick={closeModalByClickX}
        className={styles.buttonClose}
      >
        <i className="fa-solid fa-xmark" />
      </button>
      {children}
    </div>
  );
}
export function Modal({ closeModalHandler, isModalOpen, children }) {
  function closeModalByClickWrapper(event) {
    if (event.target === event.currentTarget) {
      closeModalHandler();
    }
  }
  if (!isModalOpen) return null;
  return createPortal(
    <div
      onMouseDown={closeModalByClickWrapper}
      className={styles.modalOuter}
    >
      <ModalInner closeModalHandler={closeModalHandler}>{children}</ModalInner>
    </div>,
    document.getElementById('root'),
  );
}

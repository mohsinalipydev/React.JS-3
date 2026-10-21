import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useEmployee } from '../context/EmployeeContext';

function ConfirmDialog() {
  const { t } = useLanguage();
  const { confirmDialog } = useEmployee();
  const { message, confirm: onConfirm, cancel: onCancel } = confirmDialog;
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    cancelButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onCancel();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <div className="confirm-dialog-backdrop" onMouseDown={onCancel}>
      <section
        className="confirm-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id="confirm-dialog-title">{t('deleteDialogTitle')}</h2>
        <p id="confirm-dialog-message">{t(message)}</p>
        <div className="confirm-dialog-actions">
          <button
            ref={cancelButtonRef}
            type="button"
            className="confirm-dialog-cancel"
            onClick={onCancel}
          >
            {t('cancel')}
          </button>
          <button
            type="button"
            className="confirm-dialog-delete"
            onClick={onConfirm}
          >
            {t('confirmDelete')}
          </button>
        </div>
      </section>
    </div>
  );
}

export default ConfirmDialog;

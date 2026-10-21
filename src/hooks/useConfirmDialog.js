import { useState } from 'react';

const DEFAULT_CONFIRMATION_MESSAGE = 'deleteDialogMessage';

 function useConfirmDialog() {
  const [dialog, setDialog] = useState(null);

  function requestConfirmation({
    message = DEFAULT_CONFIRMATION_MESSAGE,
    onConfirm
  }) {
    setDialog({ message, onConfirm });
  }

  function confirm() {
    if (!dialog) return;

    dialog.onConfirm();
    setDialog(null);
  }

  function cancel() {
    setDialog(null);
  }

  return {
    isOpen: dialog !== null,
    message: dialog?.message ?? DEFAULT_CONFIRMATION_MESSAGE,
    requestConfirmation,
    confirm,
    cancel
  };
}

export default useConfirmDialog;
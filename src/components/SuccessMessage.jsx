
import { useLanguage } from '../context/LanguageContext';
import { useEmployee } from '../context/EmployeeContext';

function SuccessMessage({ type = 'success' }) {
  const { t } = useLanguage();
  const { success, deleteSuccess } = useEmployee();
  const message = type === 'delete' ? deleteSuccess : success;

  if (!message) {
    return null;
  }

  const className =
    type === 'delete'
      ? 'delete-success-message'
      : 'success-message';

  return <p className={className}>{t(message)}</p>;
}

export default SuccessMessage;

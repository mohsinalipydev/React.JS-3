import { useLanguage } from '../context/LanguageContext';
import { useEmployee } from '../context/EmployeeContext';

function StatusButton({ index }) {
  const { t } = useLanguage();
  const { employees, handleToggleStatus } = useEmployee();
  const status = employees[index].status;
  const active = status === 'Active';

  return (
    <button
      type="button"
      className={`status-button ${active ? 'status-active' : 'status-inactive'}`}
      onClick={() => handleToggleStatus(index)}
      aria-label={t(active ? 'setInactive' : 'setActive')}
    >
      {t(active ? 'active' : 'inactive')}
    </button>
  );
}

export default StatusButton;

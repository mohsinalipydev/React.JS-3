import EmployeeRow from './EmployeeRow';
import { useLanguage } from '../context/LanguageContext';
import { useEmployee } from '../context/EmployeeContext';

function EmployeeTable() {
  const { t } = useLanguage();
  const { employeeEntries, employees, searchQuery } = useEmployee();

  if (employeeEntries.length === 0) {
    return (
      <div className="empty-state">
        <p>
          {employees.length === 0
            ? t('noEmployees')
            : t('noSearchResults', { query: searchQuery.trim() })}
        </p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>{t('tableName')}</th>
            <th>{t('tableEmail')}</th>
            <th>{t('tableAge')}</th>
            <th>{t('tableGender')}</th>
            <th>{t('tableDepartment')}</th>
            <th>{t('tableStatus')}</th>
            <th>{t('tableActions')}</th>
          </tr>
        </thead>
        <tbody>
          {employeeEntries.map(({ employee, index }) => (
            <EmployeeRow key={`${employee.email}-${index}`} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;

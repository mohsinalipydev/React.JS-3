
import StatusButton from './StatusButton';
import { useLanguage } from '../context/LanguageContext';
import { useEmployee } from '../context/EmployeeContext';

function EmployeeRow({ index }) {
  const { t } = useLanguage();
  const { employees, handleEdit, handleDelete } = useEmployee();
  const employee = employees[index];
  const genderKey = {
    Male: 'male',
    Female: 'female',
    Other: 'other'
  }[employee.gender];
  const departmentKey = {
    Engineering: 'engineering',
    'Human Resources': 'humanResources',
    Finance: 'finance',
    Design: 'design',
    Marketing: 'marketing'
  }[employee.department];

  return (
    <tr>
      <td>{employee.name}</td>
      <td>{employee.email}</td>
      <td>{employee.age}</td>
      <td>{genderKey ? t(genderKey) : employee.gender}</td>
      <td>{departmentKey ? t(departmentKey) : employee.department}</td>

      <td>
        <StatusButton
          index={index}
        />
      </td>

      <td>
        <div className="action-buttons">
          <button
            type="button"
            className="edit-button"
            onClick={() => handleEdit(index)}
          >
            {t('edit')}
          </button>

          <button
            type="button"
            className="delete-button"
            onClick={() => handleDelete(index)}
          >
            {t('delete')}
          </button>
        </div>
      </td>
    </tr>
  );
}

export default EmployeeRow;

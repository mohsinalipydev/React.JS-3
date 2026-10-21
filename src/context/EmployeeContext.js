import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState
} from 'react';
import useConfirmDialog from '../hooks/useConfirmDialog';
import { employeeReducer, loadEmployees } from '../utils/employeeReducer';

const EmployeeContext = createContext(null);

export function EmployeeProvider({ children }) {
  const confirmDialog = useConfirmDialog();
  const [success, setSuccess] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    department: ''
  });
  const [employees, dispatch] = useReducer(
    employeeReducer,
    undefined,
    loadEmployees
  );

  const employeeEntries = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return employees
      .map((employee, index) => ({ employee, index }))
      .filter(({ employee }) =>
        `${employee.name} ${employee.email}`
          .toLowerCase()
          .includes(normalizedSearch)
      );
  }, [employees, searchQuery]);

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  function validateForm(data) {
    const newErrors = {};
    const name = data.name.trim();
    const email = data.email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      newErrors.name = 'nameRequired';
    } else if (name.length < 3) {
      newErrors.name = 'nameMinLength';
    }

    if (!email) {
      newErrors.email = 'emailRequired';
    } else if (!emailPattern.test(email)) {
      newErrors.email = 'invalidEmail';
    }

    const emailAlreadyExists = employees.some(
      (employee, index) =>
        index !== editIndex &&
        String(employee.email || '').trim().toLowerCase() === email.toLowerCase()
    );

    if (email && emailPattern.test(email) && emailAlreadyExists) {
      newErrors.email = 'duplicateEmail';
    }

    if (!data.age) {
      newErrors.age = 'ageRequired';
    } else {
      const age = Number(data.age);
      if (!Number.isInteger(age) || age <= 15) {
        newErrors.age = 'invalidAge';
      }
    }

    if (!data.gender) newErrors.gender = 'genderRequired';
    if (!data.department) newErrors.department = 'departmentRequired';

    return newErrors;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    const updatedForm = { ...formData, [name]: value };

    setFormData(updatedForm);

    if (submitted || errors[name]) {
      setErrors(validateForm(updatedForm));
    }
  }

  function showSuccess(message) {
    setSuccess(message);
    setTimeout(() => setSuccess(''), 2000);
  }

  function showDeleteSuccess() {
    setDeleteSuccess('deletedSuccess');
    setTimeout(() => setDeleteSuccess(''), 2000);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSuccess('');

    const newErrors = validateForm(formData);
    setErrors(newErrors);
    setSubmitted(true);

    const hasEmptyFields =
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.age ||
      !formData.gender ||
      !formData.department;

    if (hasEmptyFields || Object.keys(newErrors).length > 0) {
      return;
    }

    const employeeData = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      status: editIndex !== null ? employees[editIndex].status : 'Active'
    };

    if (editIndex !== null) {
      dispatch({ type: 'UPDATE_EMPLOYEE', index: editIndex, payload: employeeData });
      setEditIndex(null);
      showSuccess('updatedSuccess');
    } else {
      dispatch({ type: 'ADD_EMPLOYEE', payload: employeeData });
      showSuccess('addedSuccess');
    }

    setFormData({
      name: '',
      email: '',
      age: '',
      gender: '',
      department: ''
    });
    setErrors({});
    setSubmitted(false);
  }

  function handleEdit(index) {
    const employee = employees[index];

    setFormData({
      name: employee.name,
      email: employee.email,
      age: String(employee.age),
      gender: employee.gender,
      department: employee.department
    });
    setEditIndex(index);
    setSuccess('');
    setErrors({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancelEdit() {
    setEditIndex(null);
    setFormData({
      name: '',
      email: '',
      age: '',
      gender: '',
      department: ''
    });
    setErrors({});
    setSubmitted(false);
    setSuccess('');
  }

  function confirmDelete(index) {
    dispatch({ type: 'DELETE_EMPLOYEE', index });

    if (editIndex === index) {
      handleCancelEdit();
    } else if (editIndex !== null && editIndex > index) {
      setEditIndex(editIndex - 1);
    }

    setSuccess('');
    showDeleteSuccess();
  }

  function handleDelete(index) {
    confirmDialog.requestConfirmation({
      message: 'deleteDialogMessage',
      onConfirm: () => confirmDelete(index)
    });
  }

  function handleToggleStatus(index) {
    dispatch({ type: 'TOGGLE_STATUS', index });
  }

  function getFieldClass(field) {
    const isEmpty = field === 'name' ? !formData.name.trim() : !formData[field];
    return errors[field] || (submitted && isEmpty) ? 'input-error' : '';
  }

  const value = {
    employees,
    employeeEntries,
    success,
    deleteSuccess,
    searchQuery,
    setSearchQuery,
    errors,
    submitted,
    editIndex,
    formData,
    handleChange,
    handleSubmit,
    handleEdit,
    handleCancelEdit,
    handleDelete,
    handleToggleStatus,
    getFieldClass,
    confirmDialog
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployee() {
  const context = useContext(EmployeeContext);

  if (!context) {
    throw new Error('useEmployee must be used within EmployeeProvider');
  }

  return context;
}

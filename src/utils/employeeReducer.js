
export function loadEmployees() {
  try {
    const savedEmployees = JSON.parse(
      localStorage.getItem('employees')
    );

    if (!Array.isArray(savedEmployees)) {
      return [];
    }

    return savedEmployees.map((employee) => ({
      ...employee,
      status: employee.status || 'Active'
    }));
  } catch {
    return [];
  }
}

export function employeeReducer(employees, action) {
  switch (action.type) {
    case 'ADD_EMPLOYEE':
      return [...employees, action.payload];

    case 'UPDATE_EMPLOYEE':
      return employees.map((employee, index) =>
        index === action.index ? action.payload : employee
      );

    case 'DELETE_EMPLOYEE':
      return employees.filter(
        (employee, index) => index !== action.index
      );

    case 'TOGGLE_STATUS':
      return employees.map((employee, index) =>
        index === action.index
          ? {
              ...employee,
              status:
                employee.status === 'Active'
                  ? 'Inactive'
                  : 'Active'
            }
          : employee
      );

    default:
      return employees;
  }
}

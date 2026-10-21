import './App.css';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
import SuccessMessage from './components/SuccessMessage';
import ConfirmDialog from './components/ConfirmDialog';
import { useEmployee } from './context/EmployeeContext';
import { useLanguage } from './context/LanguageContext';

function App() {
  const { language, t, toggleLanguage } = useLanguage();
  const {
    employees,
    searchQuery,
    setSearchQuery,
    confirmDialog
  } = useEmployee();

  return (
    <div className="container" dir={language === 'ur' ? 'rtl' : 'ltr'}>
      <div className="app-heading">
        <h1>{t('appTitle')}</h1>
        <button
          type="button"
          className="language-toggle"
          onClick={toggleLanguage}
          aria-label={t('languageToggleLabel')}
        >
          {t('languageToggle')}
        </button>
      </div>

      <EmployeeForm />
      <SuccessMessage />

      <section className="employee-section" aria-labelledby="employees-heading">
        <div className="employee-list-heading">
          <div>
            <h2 id="employees-heading">{t('employeesHeading')}</h2>
            <p>{t('employeesDescription')}</p>
        </div>
          <span className="employee-count">
            {t('employeeCount', {
              count: employees.length,
              label: t(employees.length === 1 ? 'employeeSingular' : 'employeePlural')
            })}
          </span>
        </div>

        <div className="employee-toolbar">
          <label className="visually-hidden" htmlFor="employee-search">
            {t('searchLabel')}
          </label>
          <span className="search-icon" aria-hidden="true">
            <svg viewBox="0 0 20 20" focusable="false">
              <circle cx="8.8" cy="8.8" r="5.8" />
              <path d="m13.2 13.2 4 4" />
            </svg>
          </span>
          <input
            id="employee-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={t('searchPlaceholder')}
            autoComplete="off"
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setSearchQuery('')}
              aria-label={t('clear')}
            >
              {t('clear')}
            </button>
          )}
        </div>

        <SuccessMessage type="delete" />
        <EmployeeTable />
      </section>

      {confirmDialog.isOpen && <ConfirmDialog />}
    </div>
  );
}

export default App;

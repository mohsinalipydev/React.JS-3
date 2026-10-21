
import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useEmployee } from '../context/EmployeeContext';

function EmployeeForm() {
  const { t } = useLanguage();
  const {
    formData,
    handleChange,
    handleSubmit,
    errors,
    getFieldClass,
    editIndex,
    handleCancelEdit
  } = useEmployee();
  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  return (
    <form className="employee-form" onSubmit={handleSubmit} noValidate>
      <div className="employee-form-heading">
        <h2>{t(editIndex !== null ? 'updateEmployeeHeading' : 'addEmployeeHeading')}</h2>
        <p>{t('formDescription')}</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name">{t('fullName')}</label>
          <input
            ref={nameInputRef}
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={getFieldClass('name')}
            placeholder={t('namePlaceholder')}
          />
          {errors.name && <p className="error-text">{t(errors.name)}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">{t('workEmail')}</label>
          <input
            id="email"
            name="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
            className={getFieldClass('email')}
            placeholder={t('emailPlaceholder')}
          />
          {errors.email && <p className="error-text">{t(errors.email)}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="age">{t('age')}</label>
          <input
            id="age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            className={getFieldClass('age')}
            placeholder={t('agePlaceholder')}
          />
          {errors.age && <p className="error-text">{t(errors.age)}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="gender">{t('gender')}</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={getFieldClass('gender')}
          >
            <option value="">{t('selectGender')}</option>
            <option value="Male">{t('male')}</option>
            <option value="Female">{t('female')}</option>
            <option value="Other">{t('other')}</option>
          </select>
          {errors.gender && <p className="error-text">{t(errors.gender)}</p>}
        </div>

        <div className="form-group full-width">
          <label htmlFor="department">{t('department')}</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={getFieldClass('department')}
          >
            <option value="">{t('selectDepartment')}</option>
            <option value="Engineering">{t('engineering')}</option>
            <option value="Human Resources">{t('humanResources')}</option>
            <option value="Finance">{t('finance')}</option>
            <option value="Design">{t('design')}</option>
            <option value="Marketing">{t('marketing')}</option>
          </select>
          {errors.department && (
            <p className="error-text">{t(errors.department)}</p>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="primary-button">
          {t(editIndex !== null ? 'saveChanges' : 'addEmployee')}
        </button>

        {editIndex !== null && (
          <button
            type="button"
            className="secondary-button"
            onClick={handleCancelEdit}
          >
            {t('cancel')}
          </button>
        )}
      </div>
    </form>
  );
}

export default EmployeeForm;

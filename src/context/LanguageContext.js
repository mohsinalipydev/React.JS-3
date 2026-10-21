import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const translations = {
  en: {
    languageToggle: 'اردو',
    languageToggleLabel: 'Switch language to Urdu',
    appTitle: 'Employee.MS',
    formEyebrow: 'EMPLOYEE RECORD',
    addEmployeeHeading: 'Add an employee',
    updateEmployeeHeading: 'Update employee',
    formDescription: 'Enter the employee’s details below. All fields are required.',
    fullName: 'Full name',
    namePlaceholder: 'e.g. Mohsin Ali',
    workEmail: 'Work email',
    emailPlaceholder: 'name@company.com',
    age: 'Age',
    agePlaceholder: 'Enter age',
    gender: 'Gender',
    selectGender: 'Select gender',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    department: 'Department',
    selectDepartment: 'Select department',
    engineering: 'Engineering',
    humanResources: 'Human Resources',
    finance: 'Finance',
    design: 'Design',
    marketing: 'Marketing',
    saveChanges: 'Save changes',
    addEmployee: 'Add employee',
    cancel: 'Cancel',
    addedSuccess: 'Employee Added Successfully!',
    updatedSuccess: 'Employee Updated Successfully!',
    deletedSuccess: 'Deleted Successfully!',
    employeesHeading: 'Saved Employees',
    employeesDescription: 'Search and manage your employee records.',
    employeeCount: '{count} {label}',
    employeeSingular: 'employee',
    employeePlural: 'employees',
    searchLabel: 'Search employees by name or email',
    searchPlaceholder: 'Search by name or email...',
    clear: 'Clear',
    noEmployees: 'No employees yet. Add your first employee using the form above.',
    noSearchResults: 'No employees found for “{query}”. Try another name or email.',
    tableName: 'Name',
    tableEmail: 'Email',
    tableAge: 'Age',
    tableGender: 'Gender',
    tableDepartment: 'Department',
    tableStatus: 'Status',
    tableActions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    active: 'Active',
    inactive: 'Inactive',
    setInactive: 'Set employee inactive',
    setActive: 'Set employee active',
    deleteDialogTitle: 'Delete employee?',
    deleteDialogMessage: 'Are you sure you want to delete this employee?',
    confirmDelete: 'Confirm Delete',
    nameRequired: 'Name is required',
    nameMinLength: 'Name must be at least 3 characters',
    emailRequired: 'Email is required',
    invalidEmail: 'Please enter a valid email address!',
    duplicateEmail: 'This email already exists!',
    ageRequired: 'Age is required',
    invalidAge: 'Age must be a number greater than 15',
    genderRequired: 'Please select a gender',
    departmentRequired: 'Please select a department'
  },
  ur: {
    languageToggle: 'English',
    languageToggleLabel: 'زبان انگریزی میں تبدیل کریں',
    appTitle: 'ملازمین کا انتظام',
    formEyebrow: 'ملازم کا ریکارڈ',
    addEmployeeHeading: 'ملازم شامل کریں',
    updateEmployeeHeading: 'ملازم کی معلومات تبدیل کریں',
    formDescription: 'ملازم کی تفصیلات درج کریں۔ تمام خانے پُر کرنا ضروری ہیں۔',
    fullName: 'پورا نام',
    namePlaceholder: 'مثلاً محسن علی',
    workEmail: 'دفتری ای میل',
    emailPlaceholder: 'name@company.com',
    age: 'عمر',
    agePlaceholder: 'عمر درج کریں',
    gender: 'جنس',
    selectGender: 'جنس منتخب کریں',
    male: 'مرد',
    female: 'عورت',
    other: 'دیگر',
    department: 'شعبہ',
    selectDepartment: 'شعبہ منتخب کریں',
    engineering: 'انجینئرنگ',
    humanResources: 'انسانی وسائل',
    finance: 'مالیات',
    design: 'ڈیزائن',
    marketing: 'مارکیٹنگ',
    saveChanges: 'تبدیلیاں محفوظ کریں',
    addEmployee: 'ملازم شامل کریں',
    cancel: 'منسوخ کریں',
    addedSuccess: 'ملازم کامیابی سے شامل ہو گیا!',
    updatedSuccess: 'ملازم کی معلومات کامیابی سے تبدیل ہو گئیں!',
    deletedSuccess: 'ملازم کامیابی سے حذف ہو گیا!',
    employeesHeading: 'محفوظ ملازمین',
    employeesDescription: 'ملازمین کے ریکارڈ تلاش کریں اور ان کا انتظام کریں۔',
    employeeCount: '{count} {label}',
    employeeSingular: 'ملازم',
    employeePlural: 'ملازمین',
    searchLabel: 'نام یا ای میل سے ملازمین تلاش کریں',
    searchPlaceholder: 'نام یا ای میل سے تلاش کریں...',
    clear: 'صاف کریں',
    noEmployees: 'ابھی کوئی ملازم موجود نہیں۔ اوپر دیے گئے فارم سے پہلا ملازم شامل کریں۔',
    noSearchResults: '“{query}” کے لیے کوئی ملازم نہیں ملا۔ دوسرا نام یا ای میل تلاش کریں۔',
    tableName: 'نام',
    tableEmail: 'ای میل',
    tableAge: 'عمر',
    tableGender: 'جنس',
    tableDepartment: 'شعبہ',
    tableStatus: 'حیثیت',
    tableActions: 'اختیارات',
    edit: 'ترمیم',
    delete: 'حذف کریں',
    active: 'فعال',
    inactive: 'غیر فعال',
    setInactive: 'ملازم کو غیر فعال کریں',
    setActive: 'ملازم کو فعال کریں',
    deleteDialogTitle: 'ملازم حذف کریں؟',
    deleteDialogMessage: 'کیا آپ واقعی اس ملازم کو حذف کرنا چاہتے ہیں؟',
    confirmDelete: 'حذف کرنے کی تصدیق',
    nameRequired: 'نام درج کرنا ضروری ہے',
    nameMinLength: 'نام کم از کم 3 حروف کا ہونا چاہیے',
    emailRequired: 'ای میل درج کرنا ضروری ہے',
    invalidEmail: 'درست ای میل ایڈریس درج کریں!',
    duplicateEmail: 'یہ ای میل پہلے سے موجود ہے!',
    ageRequired: 'عمر درج کرنا ضروری ہے',
    invalidAge: 'عمر 15 سے زیادہ ہونی چاہیے',
    genderRequired: 'جنس منتخب کریں',
    departmentRequired: 'شعبہ منتخب کریں'
  }
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() =>
    localStorage.getItem('employee-language') === 'ur' ? 'ur' : 'en'
  );

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
    localStorage.setItem('employee-language', language);
  }, [language]);

  const value = useMemo(() => {
    function t(key, values = {}) {
      const template = translations[language][key] || translations.en[key] || key;
      return template.replace(/\{(\w+)\}/g, (_, name) => values[name] ?? '');
    }

    return {
      language,
      t,
      toggleLanguage: () => setLanguage((current) => current === 'en' ? 'ur' : 'en')
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }

  return context;
}

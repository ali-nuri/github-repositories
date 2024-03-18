import styles from './Select.module.css';

interface SelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const Select = ({ label, options, value, onChange }: SelectProps) => {
  return (
    <div className={styles.selectContaner}>
      <label className={styles.label} htmlFor={label}>
        {label}{' '}
      </label>
      <select
        className={styles.select}
        value={value}
        id={label}
        onChange={onChange}
      >
        <option value="">All</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

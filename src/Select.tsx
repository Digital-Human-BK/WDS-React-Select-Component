import React, { useState } from 'react';
import styles from './Select.module.css';

type SelectOption = {
  label: string;
  value: any;
};

type SelectProps = {
  options: SelectOption[];
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

const Select = ({ value, onChange, options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const clearOption = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.stopPropagation();
    onChange(undefined);
  };

  const selectOption = (
    ev: React.MouseEvent<HTMLLIElement>,
    option: SelectOption
  ) => {
    ev.stopPropagation();
    onChange(option);
    setIsOpen(false);
  };

  const optionSelectedHandler = (option: SelectOption): boolean => {
    return option === value;
  };

  return (
    <div
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>{value?.label}</span>
      <button onClick={clearOption} className={styles['clear-btn']}>
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>

      <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
        {options.map((option) => (
          <li
            onClick={(ev) => selectOption(ev, option)}
            key={option.label}
            className={`${styles.option} ${optionSelectedHandler(option) ? styles.selected : ''}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;

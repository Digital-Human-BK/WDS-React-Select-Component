import React, { useEffect, useState } from 'react';
import styles from './Select.module.css';

export type SelectOption = {
  label: string;
  value: number | string;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

const Select = ({ multiple, value, onChange, options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const clearOption = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.stopPropagation();
    multiple ? onChange([]) : onChange(undefined);
  };

  const selectOption = (
    ev: React.MouseEvent<HTMLLIElement> | React.MouseEvent<HTMLButtonElement>,
    option: SelectOption
  ) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((op) => op !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) {
        onChange(option);
      }
    }
    if (option === value) {
      return;
    }
    ev.stopPropagation();
    setIsOpen(false);
  };

  const optionSelectedHandler = (option: SelectOption): boolean => {
    return multiple ? value.includes(option) : option === value;
  };

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0);
    }
  }, [isOpen]);

  return (
    <div
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>
        {multiple
          ? value.map((v) => (
              <button
              className={styles['option-badge']}
                key={v.value}
                onClick={(ev) => {
                  selectOption(ev, v);
                }}
              >{v.label}<span className={styles['remove-btn']}>&times;</span></button>
            ))
          : value?.label}
      </span>
      <button onClick={clearOption} className={styles['clear-btn']}>
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>

      <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
        {options.map((option, index) => (
          <li
            onClick={(ev) => selectOption(ev, option)}
            onMouseEnter={() => {
              setHighlightedIndex(index);
            }}
            key={option.value}
            className={`${styles.option} ${
              optionSelectedHandler(option) ? styles.selected : ''
            } ${index === highlightedIndex ? styles.highlighted : ''}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;

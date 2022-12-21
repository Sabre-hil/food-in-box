import React, {
  useRef, useCallback, useState,
} from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styles from './Search.module.scss';
import searchLogo from '../../assets/search.svg';
import clearLogo from '../../assets/clear.svg';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');
  console.log('this is my value', value)

  const inputRef = useRef<HTMLInputElement>(null);

  const clearInput = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(debounce((str: string) => {
    dispatch(setSearchValue(str));
  }, 1500), []);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div>
      {location.pathname === '/' && (
      <div className={styles.mainBlock}>
        <div className={styles.searchBlock}>

          <img className={styles.searchLogo} src={searchLogo} alt="search" />
          <input
            ref={inputRef}
            value={value}
            onChange={onChangeInput}
            className={styles.search}
            type="text"
            placeholder="Поиск пиццы ..."
          />
          <div onClick={clearInput}>
            {value ? (<img className={styles.clearLogo} src={clearLogo} alt="clear" />) : ''}

          </div>
        </div>

      </div>
      )}
    </div>
  );
}

export default Search
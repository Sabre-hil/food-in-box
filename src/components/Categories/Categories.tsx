import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setCategotyId } from '../../redux/slices/filterSlice';

// eslint-disable-next-line react/display-name
const Categories: React.FC = memo(() => {
  const { categotyId } = useSelector(selectFilter);
  const dispatch = useDispatch();
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const activity = useCallback((index: number) => {
    dispatch(setCategotyId(index));
  }, [])

  return (
    <div className="categories">
      <ul>
      {categories?.map((item, index) => (
        <React.Fragment key={index}>
        <li onClick={() => activity(index)} className={categotyId === index ? 'active' : ''}>
{item}
        </li>
        </React.Fragment>
      ))}
      </ul>
    </div>
  );
})

export default Categories
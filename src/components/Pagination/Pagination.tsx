import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Pagination.module.scss';
import { setPageCount } from '../../redux/slices/filterSlice';
import { RootState } from '../../redux/store';


const Pagination: React.FC = () => {
  const pageCount = useSelector<RootState, number>((state) => state.filter.pageCount);
  const dispatch = useDispatch();
  return (
    <ReactPaginate
      className={styles.block}
      breakLabel="..."
      nextLabel=" >"
      onPageChange={(event) => dispatch(setPageCount(event.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel=" <"
      forcePage={pageCount - 1}
    />
  );
}
export default Pagination;

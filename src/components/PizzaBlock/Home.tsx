import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import PizzaBlock from './PizzaBlock';
import Skeleton from './Skeleton';
import Sort, { list } from '../Sort/Sort';
import Categories from '../Categories/Categories';
import { setFilters, selectFilter  } from '../../redux/slices/filterSlice';
import Pagination from '../Pagination/Pagination';
import { fethPizzas, selectPizzas, SearchPizzaParams } from '../../redux/slices/pizzasSlice';
import transSort  from '../../redux/slices/filterSlice';
import '../../scss/app.scss';
import { selectCart } from '../../redux/slices/cartSlice';

type Sort = {
  name: string,
  sortProperty: typeof transSort
}

const Home: React.FC = () => {
  const { items } = useSelector(selectPizzas);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {totalPrice} = useSelector(selectCart)
  const {
    categotyId, sort, pageCount, searchValue,
  } = useSelector(selectFilter);
  const [queryLoad, setQueryLoad] = useState(false);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = list.find((obj) => obj.sortProperty === params.sortBy);
      
      dispatch(setFilters({
        searchValue: params.searchPizzas,
        categotyId: +params.categotyId,
        pageCount: +params.pageNumber,
        sort: sort || list[0],
      }));
    }
  }, []);

  useEffect(() => {
    setQueryLoad(true);
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const searchPizzas = searchValue ? `filter=${searchValue}` : '';
    const pageNumber = pageCount ? `page=${pageCount}&limit=4&` : '';

    dispatch(fethPizzas({
      sortBy, order, searchPizzas, pageNumber, categotyId: String(categotyId),
    }));
    window.scrollTo(0, 0);
  }, [categotyId, sort, searchValue, pageCount]);

  useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categotyId,
      searchValue,
      pageCount,
    });
    if (queryLoad === true) {
      navigate(`?${queryString}`);
    } else { navigate('/'); }
  }, [categotyId, sort, searchValue, pageCount]);
  return (
    <>
      <div style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div style={{
            display: 'flex', justifyContent: 'space-between', padding: '20px 0px 20px 0px', alignItems: 'center', backgroundColor: 'white',
          }}
          >
            <Categories />
            <Sort />
          </div>
        </div>
      </div>
      <div style={{
        backgroundColor: 'white',
        paddingBottom: '40px',
      }}
      >
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          position: 'relative',
          paddingBottom: '40px',
          width: '90%',
          paddingTop: '30px',
          margin: 'auto',
        }}
        >
          {items.length ? (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gridTemplateRows: 'repeat(1, 1fr)',
                gridColumnGap: '20px',
                gridRowGap: '20px',
              }}
              >
                {items?.map((el) => (
                  <PizzaBlock key={el.id} {...el} />
                ))}
              </div>
              <div style={{
                textAlign: 'center',
                position: 'absolute',
                zIndex: '2',
                top: '93%',
                left: '39%',
              }}
              >
                <Pagination />
              </div>

            </>
          ) : (
            Array(4).fill(0)?.map((_, i) => (
              <div key={i} style={{ display: 'flex', flexWrap: 'wrap' }}>
                <span style={{
                  marginBottom: '65px',
                  marginRight: '20px',
                  paddingLeft: '20px',
                }}
                >
                  <Skeleton />

                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Home
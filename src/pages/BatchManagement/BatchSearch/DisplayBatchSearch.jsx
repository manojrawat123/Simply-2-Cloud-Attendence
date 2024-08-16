import React, { useContext, useEffect, useState } from 'react'
import SearchPage from '../../../ComonComponent/SearchPage/SearchPage';
import { DataContext } from '../../../context';
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import { useLocation } from 'react-router-dom';

const DisplayBatchSearch = () => {

  const {
    employeesDetail,
    getUserAdmin
  } = useContext(DataContext);

  useEffect(() => {
    getUserAdmin();
  }, []);

  if (!employeesDetail) {
    return <Loading />
  }

  const search_page_arr = [
    {
      type: 'option',
      name: 'teacher',
      id: 'teacher',
      'placeholder': "Search Batch",
      option: employeesDetail.map((element) => {
        return {
          value: element.id,
          label: ` ${element.name} - ${element.id}`
        }
      }),
    }
  ]

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  return (
    <div>
      <SearchPage
        route_page={query}
        search_page_arr={search_page_arr}
        title={"Search Batch"}
        type={'id'}
      />
    </div>
  )
}

export default DisplayBatchSearch;
import React, { useContext, useEffect } from 'react'
import { DateRange, Person } from '@mui/icons-material';
import { DataContext } from '../../../../context';
import SearchPage from '../../../../ComonComponent/SearchPage/SearchPage';
import Loading from '../../../../component/LoadingSpinner/LoadingSpinner';

const SearchStudent = () => {

    const {
        getBatchDisplayFunc,
        batchDisplayObj
    } = useContext(DataContext);

    useEffect(() => {
        getBatchDisplayFunc({ query: "query" });
    }, []);


    const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;
    if (!batchDisplayObj) {
        return <Loading />
    }

    const search_invoice_arr = [
        {
            type: "option",
            name: "id",
            placeholder: "Please Select Batch",
            label: "Please Select Batch",
            option: batchDisplayObj?.map((element, index) => {
                return {
                    label: `${element.batch_name} - (${element.batch_start_timing.slice(0, 5)} - ${element.batch_end_timing.slice(0, 5)}) - ${element.teacher}`,
                    value: element.id
                };
            }), 
            icon: <Person className={iconCss} />
        },
    ];

    return (
        <SearchPage title={"Search Students"} search_page_arr={search_invoice_arr} route_page={"display-student"} type={"id"}/>
    )
}

export default SearchStudent
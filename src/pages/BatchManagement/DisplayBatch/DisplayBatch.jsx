import React, { useContext, useEffect } from 'react'
import CustomTabel from '../../../ComonComponent/Tabels/Tabel'
import EditForms from '../../../ComonComponent/EditForms/EditForm'
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import displayBatchArr from './DisplayBatchArr';
import { DataContext } from '../../../context';
import CustomEditModal from '../../../ComonComponent/EditForms/EditModal';

const DisplayBatch = () => {
    const {
        getBatchPageFunc,
        addBatchPageObj
    } = useContext(DataContext);

    useEffect(() => {
        getBatchPageFunc({query : "query"});
    }, []);

    if (!addBatchPageObj) {
        return <Loading />
    }

    return (
        <div>
            <CustomTabel EditModal={CustomEditModal} getFunc={getBatchPageFunc} tabelObj={addBatchPageObj} topTableHeading={displayBatchArr} url_route={'batch'} title={'Batch Details'} />
        </div>
    )
}

export default DisplayBatch

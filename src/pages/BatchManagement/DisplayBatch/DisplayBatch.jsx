import React, { useContext, useEffect } from 'react'
import CustomTabel from '../../../ComonComponent/Tabels/Tabel'
import EditForms from '../../../ComonComponent/EditForms/EditForm'
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import displayBatchArr from './DisplayBatchArr';
import { DataContext } from '../../../context';
import CustomEditModal from '../../../ComonComponent/EditForms/EditModal';

const DisplayBatch = () => {
    const {
        getBatchDisplayFunc,
        batchDisplayObj
    } = useContext(DataContext);

    useEffect(() => {
        getBatchDisplayFunc({query : "query"});
    }, []);

    if (!batchDisplayObj) {
        return <Loading />
    }

    return (
        <div>
            <CustomTabel EditModal={CustomEditModal} getFunc={getBatchDisplayFunc} tabelObj={batchDisplayObj} topTableHeading={displayBatchArr} url_route={'batch'} title={'Batch Details'} />
        </div>
    )
}

export default DisplayBatch

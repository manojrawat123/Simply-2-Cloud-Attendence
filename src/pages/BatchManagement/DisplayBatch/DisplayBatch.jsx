import React, { useContext, useEffect } from 'react';
import CustomTabel from '../../../ComonComponent/Tabels/Tabel';
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import displayBatchArr from './DisplayBatchArr';
import { DataContext } from '../../../context';
import CustomEditModal from '../../../ComonComponent/EditForms/EditModal';
import { useParams } from 'react-router-dom';

const DisplayBatch = () => {
    const {
        getBatchDisplayFunc,
        batchDisplayObj
    } = useContext(DataContext);

    const { id } = useParams();

    useEffect(() => {
        getBatchDisplayFunc({
            query: "query"
        });
    }, []);

    if (!batchDisplayObj) {
        return <Loading />
    }

    return (
        <div>
            <CustomTabel
                EditModal={CustomEditModal}
                getFunc={getBatchDisplayFunc}
                tabelObj={id ? batchDisplayObj.filter((element) => {
                    return element.assigned_to == id
                }) : batchDisplayObj}
                topTableHeading={displayBatchArr}
                url_route={'batch'}
                title={'Batch Details'}
            />
        </div>
    )
}

export default DisplayBatch

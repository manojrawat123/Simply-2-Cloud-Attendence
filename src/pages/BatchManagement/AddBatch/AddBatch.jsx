import React, { useContext, useEffect } from 'react'
import CustomForms from '../../../ComonComponent/CutomForms/CustomForms'
import addBatchArr from './AddBatchArr'
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import { DataContext } from '../../../context';

const AddBatch = () => {


    const {
        getBatchPageFunc,
        addBatchPageObj
    } = useContext(DataContext);

    useEffect(() => {
        getBatchPageFunc({ 'page': 'page' });
    }, []);

    if (!addBatchPageObj) {
        return <Loading />
    }

    const updatedArr = addBatchArr.map((element, index) => {
        if (element.type == "dynamicoption") {
            if (element.name == "assigned_to") {
                element['option'] = addBatchPageObj?.user?.map((u_el, index) => {
                    return {
                        'label': u_el.name,
                        'value': u_el.id
                    }
                })
            }
            if (element.name == "brand") {
                element['option'] = addBatchPageObj?.brand?.map((b_el, bin) => {
                    return {
                        "label": b_el.brand_name,
                        "value": b_el.id
                    }
                })
            }
        }
        return element;
    })

    return (
        <div>
            <CustomForms fieldsArr={updatedArr}
                route_name={'batch'} title={"Add Batch"} pageFunc={getBatchPageFunc} query={{page : 'page'}}
            />
        </div>
    )
}

export default AddBatch

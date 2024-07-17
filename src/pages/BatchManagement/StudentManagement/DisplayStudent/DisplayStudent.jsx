import React, { useContext, useEffect } from 'react'
import { DataContext } from '../../../../context'
import Loading from '../../../../component/LoadingSpinner/LoadingSpinner';
import CustomTabel from '../../../../ComonComponent/Tabels/Tabel';
import CustomEditModal from '../../../../ComonComponent/EditForms/EditModal';
// import addStudentArr from '../AddStudent/AddStudentArr';
import displayStudentArr from './DisplayStudentArr';
import { useParams } from 'react-router-dom';

const DisplayStudent = () => {

    const {
        getStudentDisplayPageFunc,
        displayStudentObj,
        getBatchStudentById
    } = useContext(DataContext);

    const { id } = useParams();

    useEffect(() => {
        console.log(id);
        if (id) {
            getBatchStudentById(id);
        }
        else {
            getStudentDisplayPageFunc({ query: 'query' });
        }
    }, []);

    if (!displayStudentObj) {
        return <Loading />
    }

    console.log(displayStudentObj);

    const updatedArr = displayStudentArr.map((element, index) => {
        if (element.type == "dynamicoption") {
            if (element.name == "batch_id") {
                element['option'] = displayStudentObj?.batch?.map((u_el, index) => {
                    console.log(u_el);
                    return {
                        'label': `${u_el.batch_name} - ${u_el.assigned_to} (${u_el.batch_start_timing?.slice(0,5)} to ${u_el.batch_end_timing?.slice(0, 5)})`,
                        'value': u_el.id
                    }
                })
            }
        }
        return element
    });

    return (
        <div>
            <CustomTabel
                EditModal={CustomEditModal}
                getFunc={getStudentDisplayPageFunc}
                query={{ query: 'query' }}
                tabelObj={displayStudentObj.student}
                title={"Student List"}
                topTableHeading={updatedArr}
                url_route={'student'}
            />
        </div>
    )
}

export default DisplayStudent
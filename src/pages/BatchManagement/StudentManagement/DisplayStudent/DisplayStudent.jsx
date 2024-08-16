import React, { useContext, useEffect } from 'react'
import { DataContext } from '../../../../context'
import Loading from '../../../../component/LoadingSpinner/LoadingSpinner';
import CustomTabel from '../../../../ComonComponent/Tabels/Tabel';
import CustomEditModal from '../../../../ComonComponent/EditForms/EditModal';
// import addStudentArr from '../AddStudent/AddStudentArr';
import displayStudentArr from './DisplayStudentArr';
import { useParams } from 'react-router-dom';
import NoDataPage from '../../../../component/NoDataPage/NoDataPage';

const DisplayStudent = () => {

    const {
        getStudentDisplayPageFunc,
        displayStudentObj,
        getBatchStudentById
    } = useContext(DataContext);

    const { id } = useParams();

    useEffect(() => {
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


    const updatedArr = displayStudentArr.map((element, index) => {
        if (element.type == "dynamicoption") {
            if (element.name == "batch_id") {
                element['option'] = displayStudentObj?.batch?.map((u_el, index) => {
                    console.log(u_el);
                    return {
                        'label': `${u_el.batch_name} - ${u_el.assigned_to} (${u_el.batch_start_timing?.slice(0, 5)} to ${u_el.batch_end_timing?.slice(0, 5)})`,
                        'value': u_el.id
                    }
                })
            }
        }
        return element
    });

    return (
        <div>
            {
                displayStudentObj?.student?.length != 0 ? <CustomTabel
                    EditModal={CustomEditModal}
                    getFunc={getBatchStudentById}
                    query={{ query: 'query' }}
                    tabelObj={displayStudentObj.student}
                    title={"Student List"}
                    topTableHeading={updatedArr}
                    url_route={'student'}
                /> :
                    <div className='pt-20'>
                        <NoDataPage domain={"No Student Added"} height={"50vh"} subdomain={"No Data Here"} />
                    </div>
            }
        </div>
    )
}

export default DisplayStudent

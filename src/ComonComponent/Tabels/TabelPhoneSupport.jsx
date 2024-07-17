import React, { useContext, useState } from 'react';
import DeleteConfirm from '../../component/ConfirmButton/DeleteConfirm';
import { NavLink } from 'react-router-dom';
import { OpenInBrowser } from '@mui/icons-material';

const TabelPhoneSupport = ({ row_data, topTableHeading, EditModal, url_route, getFunc, query }) => {

    const [deleteButton, setDeleteButton] = useState();
    const [isModalOpen, setIsModalOpen] = useState();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const filterTabel = topTableHeading.filter(item => item.label !== "Action");

    return (
        <div className='md:hidden my-4 shadow-xl border rounded-xl px-2'>

            {confirmDelete ? <DeleteConfirm url_route={url_route} id={row_data.id} getFunc={getFunc} query={query} setConfirmDelete={setConfirmDelete} row_data={row_data} /> : null}
            <EditModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                row_data={row_data}
                topTableHeading={filterTabel}
                getFunc={getFunc}
                query={query}
                url_route={url_route}
            />
            {topTableHeading?.map((element, index) => {
                if (element.label == "Action") {
                    return <div className="py-2 px-4 border-b">
                        <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 mr-2"
                            onClick={() => {
                                setIsModalOpen(true);
                            }}
                        >Edit</button>
                        <button className={` text-white py-1 px-3 rounded ${row_data.active == false && "active" in row_data ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                            onClick={() => {
                                setConfirmDelete(true);
                            }}
                        >{"active" in row_data ? row_data.active == false ? "Activate" : "De-Activate" : "Delete"}</button>
                    </div>
                }
                return <>
                    <div className='grid grid-cols-3  my-2 text-gray-700  overflow-x-auto'>
                        <div className='text-gray-700 font-bold col-span-1'> {element.display != false ? element.label : null}</div>
                        <div className='col-span-2 font-semibold'>
                            {(element.label == "Increment" && !row_data[element.name]) ?
                                <div className="border-b">
                                </div>
                                : element.display != false ? <div className="border-b">
                                    <NavLink to={element.link ? `${element.link.link}/${row_data.id}` : null} className={element.link ? 'text-blue-600 underline' : null}>
                                        {row_data[element.name]}
                                    </NavLink>
                                </div> : null}
                        </div>
                    </div>
                </>
            })}

        </div>
    )
}

export default TabelPhoneSupport

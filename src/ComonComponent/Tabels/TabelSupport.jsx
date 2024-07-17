import axios from 'axios';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { split } from 'postcss/lib/list';
import { API_BASE_URL } from '../../config';
import { NavLink, Navigate, useLocation } from 'react-router-dom';
import Cookies from "js-cookies";
import DeleteConfirm from '../../component/ConfirmButton/DeleteConfirm';
import { OpenInBrowser } from '@mui/icons-material';

const TabelSupport = ({ row_data, topTableHeading, EditModal, url_route, getFunc, query }) => {

  const [isModalOpen, setIsModalOpen] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const filterTabel = topTableHeading.filter(item => item.label !== "Action");

  return (
    <>
      {console.log(row_data)}
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
      <tr className="hover:bg-gray-100 text-center">
        {topTableHeading?.map((element, index) => {
          if (element.label == "Action") {
            return <td className="py-2 px-4 border-b">
              <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 mr-2"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >Edit</button>
              <button className={`text-white py-1 px-3 rounded ${row_data.active == false && "active" in row_data ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                onClick={() => {
                  setConfirmDelete(true);
                }}
              >
                {"active" in row_data ? row_data.active == false ? "Activate" : "De-Activate" : "Delete"}
              </button>
            </td>
          }
          return <>{
            (element.label == "Increment") ?
              <td className="py-2 px-4 border-b"> {!row_data['increment'] ? `${row_data['billing_increment_1']} + ${row_data['billing_increment_n']}` : row_data['increment']}</td>
              :
              element.display != false ? <td className="py-2 px-4 border-b"><NavLink to={element.link ? `${element.link.link}/${row_data.id}` : null} className={element.link ? 'text-blue-600 underline' : null}>
                {Array.isArray(row_data[element.name]) ? row_data[element.name].map((ar_el, index) => {
                  return <>
                    {ar_el}{index + 1 != ar_el.length - 1 ? ", " : null}{index % 2 == 0 ? null : <br />}
                  </>;
                }) : row_data[element.name]}
              </NavLink>
              </td> : null}
          </>
        })}
      </tr>
    </>
  )
}

export default TabelSupport

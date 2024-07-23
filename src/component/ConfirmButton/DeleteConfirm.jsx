import axios from 'axios';
import React, { useState } from 'react'
import Cookies from 'js-cookies';
import { API_BASE_URL } from '../../config';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteConfirm = ({ id: props_id, url_route, getFunc, query, setConfirmDelete, row_data }) => {

  const [button, setButton] = useState(false);
  const { id : url_id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="fixed inset-3 flex items-center justify-center bg-gray-900  bg-opacity-75 z-40">
      <div className="bg-white p-4 rounded-lg">
        <p>{`Are you Sure You want to ${row_data?.active ? "Deactivate" : "Activate"}?`}</p>
        <div className="text-center mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mx-2"
            type='button'
            onClick={() => {
              setButton(true);
              const token = Cookies.getItem("accessToken");
              axios.delete(`${API_BASE_URL}/${url_route}/${props_id}/`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }).then((res) => {
                toast.success("Updated Successfully !!", { position: "top-center" });
                if (location.pathname.startsWith('/display-student/')) {
                  if (!url_id) {
                    navigate('/display-student');
                  }
                  else {
                    getFunc(url_id);
                  }
                }
                else if (query) {
                  getFunc(query);
                }
                else {
                  getFunc();
                }
                setConfirmDelete(false);
              }).catch((error) => {
                console.log(error);
                isValidSessionFunc()
                console.log(props.lastData);
              }).finally(() => {
                setButton(false);
              });
            }}
          >
            {
              <>{button ? <CircularProgress size={19} color='inherit' /> : "Confirm"} </>
            }
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mx-2"
            type='button'
            onClick={() => {
              setConfirmDelete(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirm

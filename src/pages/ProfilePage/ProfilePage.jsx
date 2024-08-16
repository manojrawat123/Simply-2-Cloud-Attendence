import React, { useContext, useEffect, useState } from 'react';
import Background from '../../component/Background';
import Btn, { Btn3 } from '../../component/Btn';
import { darkGreen, green } from '../../component/Constants';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import AsyncStorage from 'react-native';
import { DataContext } from '../../context';
import Toast from 'react-native-toast-message';
import LoadingSpinner from '../../component/LoadingSpinner/LoadingSpinner';

const ProfilePage = () => {
    const {
        checkinId,
        getCheckInId,
        showErrorToast,
        showSuccessToast,
        handleErrorFunc,
        setAttendenceObj
    } = useContext(DataContext);
    const [button, setButton] = useState(false);
    const [position, setPosition] = useState();
    const [token, setToken] = useState();
    const [employee, setEmployee] = useState();
    const [id, setId] = useState();

    useEffect(() => {
        async function fetchData() {
            await getPermissions();
            await getCheckInId();
        }
        fetchData();
    }, []);

    const getPermissions = async () => {
        try {
            const currentLocation = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            setPosition(currentLocation);
        } catch (error) {
            console.error('Error getting location:', error);
        }
    };

    const checkInFunc = async () => {
        setButton(true);
        try {
            axios.post(`${API_BASE_URL}/checkin/`, {
                latitude: position?.coords?.latitude,
                longitude: position?.coords?.longitude,
                user: id
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(async (response) => {
                await localStorage.setItem("attendence_id", `${response.data?.attendence_id}`);
                await getCheckInId();
                showSuccessToast("Congratulation", "You Checked In Successfully");
            }).catch((error) => {
                handleErrorFunc(error);
            }).finally(() => {
                setButton(false);
            });
        } catch (error) {
            handleErrorFunc(error);
            setButton(false);
        }
    }

    const checkOutFunc = async () => {
        setButton(true);
        try {
            const attendanceId = await localStorage.getItem("attendence_id");
            axios.put(`${API_BASE_URL}/checkin/${attendanceId}/`, {
                user: id,
                latitude: position?.coords.latitude,
                longitude: position?.coords.longitude,
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(async (response) => {
                await localStorage.removeItem("attendence_id");
                await getCheckInId();
                showSuccessToast("Congratulation", "You Checked Out Successfully")
            }).catch(async (error) => {
                if (error.response) {
                    if (error.response.status == 400) {
                        if (error.response.data.error == "Checkout should on the same day") {
                            await localStorage.removeItem("attendence_id");
                            await getCheckInId();
                        }
                    }
                }
                handleErrorFunc(error);
            }).finally(() => {
                setButton(false);
            })
        } catch (error) {
            handleErrorFunc(error);
            setButton(false);
        }
    }

    if (!employee) {
        return <LoadingSpinner />
    }

    return (
        <Background>
            <div style={{ margin: '40px 0 0 40px' }}>
                <h1 style={{ color: 'white', fontSize: 64 }}>Let's start</h1>
                <h1 style={{ color: 'white', fontSize: 64, marginBottom: 40 }}>Future</h1>
                <Toast ref={(ref) => Toast.setRef(ref)} />
                {
                    checkinId ?
                        button ? <LoadingSpinner /> : <Btn bgColor='white' textColor={darkGreen} btnLabel="Checkout" Press={checkOutFunc} />
                        :
                        button ? <LoadingSpinner /> : <Btn bgColor={green} textColor='white' btnLabel="Check In" Press={checkInFunc} />
                }
            </div>
            {!button ?
                <div style={{ margin: '40px 0 0 40px' }}>
                    <Btn3 textColor={"white"} btnLabel="Take Leave" Press={() => {
                        // Adjust navigation logic for web
                    }} width={"100%"} />
                    <Btn3 textColor={"white"} btnLabel="My Detail" Press={() => {
                        setAttendenceObj(false);
                    }} width={"100%"} />
                    {employee.is_superuser ? <Btn3 textColor={"white"} btnLabel="Employee Detail" Press={() => {
                        // Adjust navigation logic for web
                    }} width={"100%"} /> : null}
                </div> : null
            }
        </Background>
    );
}

export default ProfilePage;

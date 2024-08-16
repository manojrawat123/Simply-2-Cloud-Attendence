import React, { useContext, useEffect } from 'react'
import { DataContext } from '../../context';
import EditForms from '../../ComonComponent/EditForms/EditForm';
import profileUpdateArr from './ProfileArr';
import Loading from '../../component/LoadingSpinner/LoadingSpinner';



const UpdateProfile = () => {

    const { profileData, getProfileFunc } = useContext(DataContext);

    useEffect(()=>{
        getProfileFunc();
    }, []);

    if (!profileData){
        return <Loading />
    }

    console.log(profileData);

  return (
    <div className='pt-[5rem]'>
      <EditForms getFunc={getProfileFunc} row_data={profileData.user_data} topTableHeading={profileUpdateArr} url_route={'profile'}/>
    </div>
  )
}

export default UpdateProfile

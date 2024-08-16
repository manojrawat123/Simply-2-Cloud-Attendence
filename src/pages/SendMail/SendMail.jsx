import React, { useContext, useEffect } from 'react'
import CustomForms from '../../ComonComponent/CutomForms/CustomForms'
import sendMailArr from './SendMailArr'
import { DataContext } from '../../context';
import Loading from '../../component/LoadingSpinner/LoadingSpinner';

const SendMail = ({ }) => {

    const {
        sendMailPageFunc,
        sendEmailPageObj
    } = useContext(DataContext);

    useEffect(() => {
        sendMailPageFunc({ 'page': 'page' });
    }, [])

    if (!sendEmailPageObj) {
        return <Loading />
    }


    let updatedArr = sendMailArr.map((element) => {
        if (element.type == "dynamicoption") {
            if (element.name == "batch_id") {
                element['option'] = sendEmailPageObj.batch.map((b_element) => {
                    return {
                        label: b_element.batch_name,
                        value: b_element.id
                    }
                });
            }
            if (element.name == "template_id") {
                element['option'] = [
                    {
                        label: "Blank Template",
                        value: 0
                    },
                    ...sendEmailPageObj.email_template.map((t_element) => {
                        return {
                            label: t_element.template_name,
                            value: t_element.id,
                            data: t_element
                        }
                    })]
            }
        }
        return element;
    });

    return (
        <div>
            <CustomForms fieldsArr={updatedArr} route_name={'sendmail'} title={"Send Mail"} toastMessage={"Email Send Successfully"} />
        </div>
    )
}

export default SendMail

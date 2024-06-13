import InquiryList from "../../../components/list/InquiryList";
import {useEffect} from "react";
import {getInquiry} from "../../../modules/InquiryModules";
import {useNavigate} from "react-router-dom";


function InquiryUpdate() {

    const navigate = useNavigate();

    useEffect(() => {
        if (getInquiry === true) navigate('/inquiry');
    }, [getInquiry])



    return  (

        <>


            <InquiryList/>


        </>
    );

}

export default InquiryUpdate;
import InquiryList from "../../../components/list/InquiryList";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Button from "react-bootstrap/Button";
import {callInquiryListAPI} from "../../../apis/InquiryAPI";
import PagingBar from "../../../components/common/PagingBar";



function InquiryListView({data}) {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);





    const {getInquiry, inquiry} = useSelector(state => state.inquiryReducer);




    useEffect(() => {

        if (getInquiry === true) navigate(`/members/mypage/inquiry/view`);
    }, [getInquiry])

    const onClickGetInquiryListHandler = () => {

        dispatch(callInquiryListAPI({currentPage}));



    }


    return  (

        <>

            {inquiry &&
                <InquiryList data={inquiry.data}/>
            }
            <PagingBar pageInfo={inquiry.pageInfo} setCurrentPage={setCurrentPage}/>



            <div className="inquiry-regist-btn">
                <Button
                    variant="success"
                    onClick={onClickGetInquiryListHandler}
                >{''}
                    등록하기
                </Button>

                <Button
                    variant="outline-success"
                    onClick={() => navigate(-1)}
                >{''}
                    뒤로가기
                </Button>

            </div>


        </>
    );

}

export default InquiryListView;
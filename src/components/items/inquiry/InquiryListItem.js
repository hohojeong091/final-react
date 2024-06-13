import {useNavigate} from "react-router-dom";
import {Table} from "react-bootstrap";
import React from "react";


function InquiryListItem({inquiry: {inquiryCode, inquiryWriteDate, inquiryTitle, inquiryDetail, inquiryReplyStatus}}) {


    const navigate = useNavigate();

    const onClickViewDetailHandler = () => {
    navigate(`/inquiry/detail/${inquiryCode}`)
    }

    return (


            <div
                onClick={() => navigate(`/inquiry/${inquiryCode}`)}
            >

                <Table hover className="table text-center px-5 mt-4">

                    <thead>
                    <tr>
                        <th>문의 코드 </th>
                        <th>작성일</th>
                        <th>문의 제목</th>
                        <th>문의 내용</th>
                        <th>문의 처리 상태</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr onClick={onClickViewDetailHandler}>
                        {/*줄의 어디를 눌러도 상세보기 페이지로 넘어갈 수 있게 */}
                        <td key={inquiryCode} className="text-center">{inquiryCode}</td>
                        <td key={inquiryWriteDate} className="text-center">{inquiryWriteDate}</td>
                        <td key={inquiryTitle} className="text-center">{inquiryTitle}</td>
                        <td key={inquiryDetail} className="text-center">{inquiryDetail}</td>
                        <td key={inquiryReplyStatus} className="text-center">{inquiryReplyStatus}</td>

                    </tr>
                    </tbody>

                </Table>








        </div>

    );
}

export default InquiryListItem;
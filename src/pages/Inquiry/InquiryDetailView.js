

function InquiryDetailView ({inquiry : {inquiryCode, inquiryWriteDate, inquiryTitle, inquiryDetail, inquiryReplyStatus}}) {

    return (

        <>



                   문의 코드 <div key={inquiryCode} className="text-center">{inquiryCode}</div>
                   문의 작성일 <div key={inquiryWriteDate} className="text-center">{inquiryWriteDate}</div>
                   문의 제목 <div key={inquiryTitle} className="text-center">{inquiryTitle}</div>
                   문의 내용 <div key={inquiryDetail} className="text-center">{inquiryDetail}</div>
                   문의 처리 상태<div key={inquiryReplyStatus} className="text-center">{inquiryReplyStatus}</div>


        </>
    );
}

export default InquiryDetailView;
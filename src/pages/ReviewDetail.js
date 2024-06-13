import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

const ReviewDetail = () => {
    const location = useLocation();
    const { review } = location.state;
    const navigate = useNavigate();


    return (
        <div className="container">
            <div className="back-to-list">
                <span onClick={() => navigate(-1)} style={{cursor: 'pointer'}}>
                    〈 이전으로
                </span>{' '}
            </div>
            <div className="header">
                <div className="id">{review.reviewCode}</div>
                <div className="title">{review.reviewTitle}</div>
                <div className="author-date">
                    <span className="author">{review.memberNickname}</span>
                    <span className="date">{review.reviewDate}</span>
                </div>
            </div>
            <div className="content">
                <p>{review.reviewContent}</p>
                {/* 필요에 따라 추가적인 리뷰 정보를 표시할 수 있습니다. */}
            </div>
            <div className="seller-comment">
                <div className="seller">판매자</div>
                <div className="comment-box">구매 감사합니다!</div>
            </div>
        </div>
    );
};

export default ReviewDetail;

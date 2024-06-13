import React, { useEffect, useState } from 'react';
import '../style.css';
import {useNavigate, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReviewsAPICalls } from "../apis/ReviewAPICalls";
import ReportButton from "../components/items/ReportButton";

function Reviews() {
    const { productCode } = useParams();
    const dispatch = useDispatch();
    const { reviews } = useSelector(state => state.ReviewReducer);
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(ReviewsAPICalls({ productCode: 1 }));
    }, [dispatch, productCode]);

    const handleRowClick = (review) => {
        navigate(`/review-detail`, { state: { review } });
    };

    const handleReportClick = (event) => {
        event.stopPropagation();
        // 신고하기 버튼 클릭 시 수행할 동작
    };

    return (
        <div className="reviews-page">
            <header className="page-header">
                <h1>Product Reviews</h1>
            </header>
            <div className="review-list">
                {reviews && reviews.map(review => (
                    <div className="review-item" key={review.reviewCode}
                         onClick={() => handleRowClick(review)}
                         style={{ cursor: 'pointer' }}>
                        <div className="review-content">
                            <div className="review-header">
                                <h3 className="review-title">{review.reviewTitle}</h3>
                                <div className="review-meta">
                                    <span className="review-author">{review.memberNickname}</span>
                                    <span className="review-date">{review.reviewDate}</span>
                                </div>
                            </div>
                            <p className="review-text">{review.reviewContent}</p>
                            <div onClick={handleReportClick}></div>
                            {/* 리뷰 데이터를 ReportButton으로 전달합니다. */}
                            <ReportButton memberCode={review.memberCode} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Reviews;

import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

function PagingBar({ currentPage, totalPages, onPageChange }) {
    // 페이지 번호 목록 배열 생성
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="pagination-container">
            <Pagination>
                <Pagination.First onClick={() => onPageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
                {pageNumbers.map(page => (
                    <Pagination.Item key={page} active={page === currentPage} onClick={() => onPageChange(page)}>
                        {page}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>
        </div>
    );
}

export default PagingBar;
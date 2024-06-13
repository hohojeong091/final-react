function PaymentCancelPage() {

    // 결제 취소하려면 결제 테이블에서 paymentKey를 가져와야한다.
    // 그리고 cancelReason 취소 이유를 함꼐 보내줘야한다.
    // 부분 취소를 하려면 cancelAmount에 금액을 추가해야한다. (결제 테이블에 balanceAmount -cancelAmount 해주는 로직 구현해야함)

    return (
        <div>
            {/* 결제 취소 버튼 */}
            <button onClick={handlePaymentRequest}>결제 취소</button>
        </div>
    );
}

export default PaymentCancelPage;

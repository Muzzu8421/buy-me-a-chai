import PaymentPage from '@/components/PaymentPage';
import React from 'react';

const UserPaymentPage = ({ username }) => {
    return (
        <>
            <PaymentPage username={username} />
        </>
    );
};

export default UserPaymentPage;

import PaymentPage from '@/components/PaymentPage';
import React from 'react';

const UserPaymentPage = ({ params }) => {
    const username = params.username;
    return (
        <>
            <PaymentPage username={username} />
        </>
    );
};

export default UserPaymentPage;

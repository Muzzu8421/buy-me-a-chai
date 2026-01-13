import PaymentPage from '@/components/PaymentPage';
import React from 'react';

const UserPaymentPage = async ({ params }) => {
    const username = await params.username;
    return (
        <>
            <PaymentPage username={username} />
        </>
    );
};

export default UserPaymentPage;

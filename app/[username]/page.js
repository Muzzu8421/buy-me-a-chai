import PaymentPage from "@/components/PaymentPage";
import { notFound } from "next/navigation";
import connectDb from "@/db/connectDb";
import User from "@/models/User";
import React from "react";

const UserPaymentPage = async ({ params }) => {
  // If the user data is not found, render a 404 page
  await connectDb();
  const user = await User.findOne({ username: params.username });
  if (!user) {
    return notFound();
  } else {
    return (
      <>
        <PaymentPage username={params.username} />
      </>
    );
  }
};
export default UserPaymentPage;

export async function generateMetadata({ params }) {
  const { username } = await params;
  
  return {
    title: `Support ${username} - Get Me A Chai`,
    description: `Buy ${username} a chai and support their work`,
  }
}
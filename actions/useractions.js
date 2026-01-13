"use server";
import Razorpay from "razorpay";
import Payments from "@/models/Payments";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export const initiate = async (amount, to_user, paymentform) => {
  await connectDb();
  var instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  let options = {
    amount: Number.parseInt(amount) * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  let x = await instance.orders.create(options);

  //create a payment object which shows a pending payment in the database
  await Payments.create({
    name: paymentform.name,
    to_user: to_user,
    oid: x.id,
    message: paymentform.message,
    amount: amount,
  });
  return x;
};

export const fetchuser = async (username) => {
  await connectDb();
  let u = await User.findOne({ username: username }).lean();
  if (!u) {
    return null;
  }
  let user = u.toObject({ flattenObjectIds: true });
  return user;
};

export const fetchpayment = async (username) => {
  await connectDb();
  let p = await Payments.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .lean();
  if (!p || p.length === 0) {
    return null;
  }
  return p.map((payment) => ({
    ...payment,
    _id: payment._id.toString(),
    oid: payment.oid?.toString(),
    createdAt: payment.createdAt?.toISOString(),
    updatedAt: payment.updatedAt?.toISOString(),
  }));
};

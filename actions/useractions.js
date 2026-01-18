"use server";
import Razorpay from "razorpay";
import Payments from "@/models/Payments";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export const initiate = async (amount, to_user, paymentform) => {
  await connectDb();
  let user = await User.findOne({ username: to_user });
  if (!user) {
    throw new Error("Recipient user not found");
  } 
  const razorpayKeyId = user.razorpayId;
  const razorpayKeySecret = user.razorpaySecret;
  var instance = new Razorpay({
    key_id: razorpayKeyId,
    key_secret: razorpayKeySecret,
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
  let u = await User.findOne({ username: username });
  if (!u) {
    return null;
  } else {
    let user = u.toObject({ flattenObjectIds: true });
    return user;
  }
};

export const fetchpayment = async (username) => {
  await connectDb();
  let p = await Payments.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .lean();
  99;
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

export const updateProfile = async (data, oldusername) => {
  await connectDb();
  let ndata = {
    ...data,
    updatedAt: new Date() // Add timestamp
  };

  // If the username is being updated, check if username is available
  if (oldusername !== ndata.username) {
    let u = await User.findOne({ username: ndata.username });
    if (u) {
      return { error: "Username already exists" };
    }
    await User.updateOne({ email: ndata.email }, ndata);
    // Now update all the usernames in the Payments table
    await Payments.updateMany(
      { to_user: oldusername },
      { to_user: ndata.username },
    );
  } else {
    await User.updateOne({ email: ndata.email }, ndata);
  }
  
  return { success: true };
};
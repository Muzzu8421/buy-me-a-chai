import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payments from "@/models/Payments"; 
import connectDb from "@/db/connectDb";

export const POST = async (req) => {
    try {   
        await connectDb();
        let body = await req.formData();
        body = Object.fromEntries(body);

        console.log("Payment callback received:", body);

        // Check if razorpay order id exists in db
        let p = await Payments.findOne({oid: body.razorpay_order_id}); // Fixed: Capital P
        if (!p) {
            console.error("Order not found:", body.razorpay_order_id);
            return NextResponse.json({ error: "Order Id not found" }, { status: 404 });    
        }

        console.log("Found payment record:", p);

        // Verify payment signature  
        let xx = validatePaymentVerification({
            order_id: body.razorpay_order_id,
            payment_id: body.razorpay_payment_id,
        }, body.razorpay_signature, process.env.KEY_SECRET); 

        if (xx) {
            // Update payment status in db
            let update = await Payments.findOneAndUpdate( 
                {oid: body.razorpay_order_id}, 
                {done: true},
                {new: true}
            );
            
            console.log("Payment updated:", update);
            
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${update.to_user}?paymentdone=true`);
        } else {
            console.error("Payment verification failed");
            return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
        }

    } catch (error) {
        console.error("Payment callback error:", error);
        return NextResponse.json({ 
            error: "Payment processing failed", 
            details: error.message 
        }, { status: 500 });
    }
}

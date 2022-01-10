import axios from "axios";

export const RazorPayment = (authtoken, coupon) =>
  axios.post(
    `${process.env.REACT_APP_API}/razorpaycheck`,
    { couponApplied: coupon },
    {
      headers: {
        authtoken,
      },
    }
  );

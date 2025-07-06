
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const createPaymentIntent = async (amount) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects paise
      currency: "INR",
      payment_method_types: ["card"],
    });

    return paymentIntent;
  } catch (error) {
    console.error("Stripe PaymentIntent creation failed:", error);
    throw error;
  }
};

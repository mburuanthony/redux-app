import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "your_stripe_public_key"
    );
  }

  return stripePromise;
};

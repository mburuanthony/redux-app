import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51KVXfNLK16Zm81jkyPMiQMnTIqaKbknM1Z73DxY38wAvpvNShn0VMcFtbOrx6tGKT1guRiH3BQPx8LDUxKfPk9zH003neZuftC"
    );
  }

  return stripePromise;
};

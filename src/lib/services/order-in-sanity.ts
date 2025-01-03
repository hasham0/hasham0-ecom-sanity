import { MetadataTS } from "@/types";
import Stripe from "stripe";
import stripe from "@/lib/services/stripe";
import { backendClient } from "@/sanity/lib/backend-client";

async function createOrderInSanity(session: Stripe.Checkout.Session) {
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    total_details,
  } = session;

  const { orderNumber, customerName, customerEmail, clerkUserId } =
    metadata as MetadataTS;

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
    id,
    { expand: ["data.price.product"] },
  );

  const sanityProducts = lineItemsWithProduct.data.map((item) => ({
    _key: crypto.randomUUID(),
    product: {
      _type: "reference",
      _ref: (item.price?.product as Stripe.Product).metadata.id,
    },
    quantity: item.quantity || 0,
  }));

  const order = await backendClient.create({
    _type: "order",
    orderNumber: orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    clerkUserId: clerkUserId,
    customerName: customerName,
    email: customerEmail,
    stripeCustomerId: customerEmail,
    currency: currency,
    amountDiscount: total_details?.amount_discount
      ? total_details.amount_discount / 100
      : 0,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    status: "paid",
    orderDate: new Date().toISOString(),
  });

  return order;
}

export default createOrderInSanity;

"use server";

import stripe from "@/lib/services/stripe";
import { urlFor } from "@/sanity/lib/image";
import { CartItem, MetadataTS } from "@/types";
import Stripe from "stripe";

const createCheckoutSessionAction = async (
  items: CartItem[],
  metadata: MetadataTS,
) => {
  try {
    const itemsWithoutPrice = items.filter((item) => !item.product.price);

    if (itemsWithoutPrice.length > 0) {
      throw new Error("Some items do not have a price");
    }

    const isCustomerExist = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    const customerId =
      isCustomerExist.data.length > 0 ? isCustomerExist.data[0].id : "";

    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      metadata: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        clerkUserId: metadata.clerkUserId,
      },
      mode: "payment",
      allow_promotion_codes: true,
      payment_method_types: ["card"],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      line_items: items.map((item) => ({
        price_data: {
          currency: "USD",
          unit_amount: Math.round(Number(item.product.price) * 100),
          product_data: {
            name: item.product.name || "Unnamed Product",
            description: item.product.description,
            metadata: {
              id: item.product._id,
            },
            images: item.product.image
              ? [urlFor(item.product.image).url()]
              : undefined,
          },
        },
        quantity: item.quantity,
      })),
    };
    if (customerId) {
      sessionPayload.customer = customerId;
    } else {
      sessionPayload.customer_email = metadata.customerEmail;
    }
    const session = await stripe.checkout.sessions.create(sessionPayload);
    return session.url;
  } catch (error) {
    console.error("🚀 ~ error while creating checkout session:", error);
    throw error;
  }
};
export default createCheckoutSessionAction;

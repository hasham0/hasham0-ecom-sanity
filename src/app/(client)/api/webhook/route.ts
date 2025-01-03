import createOrderInSanity from "@/lib/services/order-in-sanity";
import stripe from "@/lib/services/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headerList = await headers();
    const signature = headerList.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "No stripe signature provided" },
        { status: 400 },
      );
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return NextResponse.json(
        { error: "Webhook secret is not configured" },
        { status: 500 },
      );
    }

    // Validate the webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error) {
      const err = error as unknown as { message: string };
      return NextResponse.json(
        { error: "Invalid webhook signature", details: err.message },
        { status: 400 },
      );
    }

    // Handle the `checkout.session.completed` event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      try {
        const order = await createOrderInSanity(session);
        return NextResponse.json({
          message: "Order created successfully",
          order: order._id,
        });
      } catch (error) {
        const err = error as unknown as { message: string };
        return NextResponse.json(
          { error: "Failed to create order", details: err.message },
          { status: 500 },
        );
      }
    }

    // Respond to other events with 200 status
    return NextResponse.json({ message: "Event ignored" }, { status: 200 });
  } catch (error) {
    const err = error as unknown as { message: string };
    return NextResponse.json(
      { error: "An unexpected error occurred", details: err.message },
      { status: 500 },
    );
  }
}

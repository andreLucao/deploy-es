import { Router, Request, Response } from "express";
import Stripe from "stripe";
import prisma from "../config/database";

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

async function updateAdProductSupply(adUuid: string, amount_purchased: number) {
   const adProduct = await prisma.adProduct.findUnique({
      where: { id: adUuid },
   });

   if (!adProduct) {
      throw new Error("Anúncio não encontrado");
   }

   if (adProduct.supply < amount_purchased) {
      throw new Error("Estoque insuficiente");
   }

   await prisma.adProduct.update({
      where: { id: adUuid },
      data: { supply: adProduct.supply - amount_purchased },
   });
}

async function updateUserBalance(buyerUuid: string, amount_purchased: number) {
   const company = await prisma.company.findUnique({
      where: { id: buyerUuid },
   });

   if (!company) {
      throw new Error("Company not found");
   }

   await prisma.company.update({
      where: { id: buyerUuid },
      data: { balance: company.balance + amount_purchased },
   });
}

async function updatePayment(
   adId: string,
   companyId: string,
   amount: number,
   creditsBought: number,
   stripePaymentIntentId: string,
   createdAt: Date
) {
   const adProduct = await prisma.adProduct.findUnique({
      where: { id: adId },
   });

   if (!adProduct) {
      throw new Error("Ad product not found");
   }

   if (adProduct.supply < creditsBought) {
      throw new Error("Ad product supply is less than credits bought");
   }

   const company = await prisma.company.findUnique({
      where: { id: companyId },
   });

   if (!company) {
      throw new Error("Company not found");
   }

   await prisma.payment.create({
      data: {
         adId,
         companyId,
         amount,
         currency: "brl",
         creditsBought,
         paymentMethod: "card",
         stripePaymentIntentId,
         createdAt,
      },
   });
}

router.post("/", async (req: Request, res: Response) => {
   const sig = req.headers["stripe-signature"] as string;
   const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

   if (!webhookSecret) {
      return res.status(500).send("Webhook secret not configured");
   }

   let event: Stripe.Event;

   try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
   } catch (error: any) {
      console.error("Webhook signature verification failed:", error.message);
      return res.status(400).send(`Webhook Error: ${error.message}`);
   }

   try {
      switch (event.type) {
         case "checkout.session.completed":
            const session = event.data.object as Stripe.Checkout.Session;

            const { buyerUuid, adUuid, amount, amount_purchased } =
               session.metadata || {};

            if (!buyerUuid || !adUuid || !amount_purchased) {
               console.error("Missing metadata:", session.metadata);
               return res.status(400).send("Error with metadata");
            }

            console.log("Processing payment:", {
               buyerUuid,
               adUuid,
               amount,
               amount_purchased,
            });

            await updateAdProductSupply(adUuid, parseInt(amount_purchased));
            await updateUserBalance(buyerUuid, parseInt(amount_purchased));
            await updatePayment(
               adUuid,
               buyerUuid,
               parseInt(amount),
               parseInt(amount_purchased),
               session.payment_intent as string,
               new Date()
            );

            console.log("Payment processed successfully");
            return res.status(200).json({ received: true });

         default:
            console.log(`Unhandled event type: ${event.type}`);
            return res.status(200).json({ received: true });
      }
   } catch (error: any) {
      console.error("Error processing webhook:", error);
      return res.status(500).send(`Server Error: ${error.message}`);
   }
});

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> origin/transaction-history--backend

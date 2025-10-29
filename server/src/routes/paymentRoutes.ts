import {Router, Request, Response} from "express";
import Stripe from "stripe";
import prisma from "../config/database";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const router = Router();

router.post('/create-payment', async (req: Request, res: Response) => {
  try {
    const { amount, buyerUuid, adUuid, amount_purchased } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'brl',
          unit_amount: Math.round(amount * 100), // Converter para centavos
          product_data: {
            name: 'Produto Personalizado',
            description: `Valor: R$ ${amount.toFixed(2)}`,
          },
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: 'https://seusite.com/cancelado',
      metadata: {
        buyerUuid,
        adUuid,
        amount_purchased: amount_purchased.toString(),
      },
    });

    res.json({
      success: true,
      payment_url: session.url,
      session_id: session.id
    });
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Erro ao criar pagamento' });
  }
});

/**
 * Get payment details by Stripe session ID or payment intent ID
 */
router.get('/payment-status/:sessionId', async (req: Request, res: Response): Promise<any> => {
  try {
    const { sessionId } = req.params;

    // Get the session from Stripe to find the payment intent
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session || !session.payment_intent) {
      return res.status(404).json({ error: 'Session or payment intent not found' });
    }

    // Find the payment by stripe payment intent ID
    const payment = await prisma.payment.findUnique({
      where: { stripePaymentIntentId: session.payment_intent as string },
      select: {
        orderNumber: true,
        amount: true,
        currency: true,
        creditsBought: true,
        createdAt: true,
        paymentMethod: true,
      }
    });

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    return res.json({
      success: true,
      orderNumber: payment.orderNumber,
      amount: payment.amount,
      currency: payment.currency,
      creditsBought: payment.creditsBought,
      createdAt: payment.createdAt,
      paymentMethod: payment.paymentMethod,
    });
  } catch (error) {
    console.error('Erro ao buscar pagamento:', error);
    return res.status(500).json({ error: 'Erro ao buscar dados do pagamento' });
  }
});

export default router;
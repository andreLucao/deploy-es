import {Router, Request, Response} from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const router = Router();

router.post('/create-payment', async (req: Request, res: Response) => {
  try {
    const { amount, buyerUuid, adUuid, amount_purchased } = req.body;

    // URLs dinâmicas baseadas em variáveis de ambiente
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const successUrl = `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/payment-cancelled?session_id={CHECKOUT_SESSION_ID}`;

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
      success_url: successUrl,
      cancel_url: cancelUrl,
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

export default router;
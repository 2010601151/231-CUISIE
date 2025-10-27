// server.js
const express = require('express');
const app = express();
const stripe = require('stripe')('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'); // Replace with your secret key
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const { cartItems } = req.body;

  const line_items = cartItems.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: { name: item.name },
      unit_amount: item.price * 100, // Stripe uses cents
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:5500/success.html', // replace with your URL
      cancel_url: 'http://localhost:5500/checkout.html',
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4242, () => console.log('Server running on port 4242'));

import express from "express";
import Stripe from "stripe";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

// ✅ Use your real secret key here (the one that starts with sk_live_...)
const stripe = new Stripe("sk_live_YOUR_SECRET_KEY_HERE");

app.use(cors());
app.use(bodyParser.json());

// Create a Stripe Checkout session
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { cart } = req.body;

    const line_items = cart.map(item => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: item.price * 100, // convert dollars to cents
      },
      quantity: item.qty,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "https://taste-liberia.vercel.app/success.html",
      cancel_url: "https://taste-liberia.vercel.app/cancel.html",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: "Payment creation failed" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

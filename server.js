import express from "express";
import Stripe from "stripe";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config(); // load .env variables

const app = express();

// ✅ Stripe secret key from environment variable
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({
  origin: "https://taste-liberia.vercel.app", // your Vercel frontend
}));
app.use(bodyParser.json());

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart || !cart.length) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const line_items = cart.map(item => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.round(Number(item.price) * 100), // cents
      },
      quantity: Number(item.qty),
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));

// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const stripe = require("stripe")("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"); // replace this with SECRET KEY

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/create-checkout-session", async (req, res) => {
  const { itemName, itemPrice } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: itemName,
            },
            unit_amount: parseInt(itemPrice),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://yourwebsite.com/success.html",
      cancel_url: "https://yourwebsite.com/cancel.html",
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));

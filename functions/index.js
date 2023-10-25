const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51O2bfkSIbTDARj5T4LxQ6BNvJZVVaSp7Ed0y2I5HiblaH4WWPBnWRBZYvj5BNNJCoZqECjUa9RD4XMbUCECHlDBi00XxOu8t2K");

const app = express();
app.use(cors({origin: true}));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payment/create", async (request, response) => {
  const total = request.query.total;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "INR",
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.api = functions.https.onRequest(app);

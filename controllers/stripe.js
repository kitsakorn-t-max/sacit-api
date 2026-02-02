const prisma = require("../config/prisma");
// แก้ไขบรรทัดนี้: เรียกใช้คีย์ผ่าน process.env
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.payment = async (req, res) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        orderedById: req.user.id,
      },
    });

    if (!cart) {
        return res.status(400).json({ message: "Cart not found" });
    }

    const amountTHB = cart.cartTotal * 100;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountTHB,
      currency: "thb",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
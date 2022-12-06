const paymentService = require("../services/paymentService");

const createPaymentHistory = async (req, res) => {
  const { orderId, paymentKey, amount } = req.body;

  await paymentService.createPaymentHistory(orderId, paymentKey, amount);

  return res.status(201).json({ message: "SUCCESS" });
};

const getPaymentHistory = async (req, res) => {
  const { orderId } = req.body;

  const paymentResponseData = await paymentService.getPaymentHistory(orderId);
  return res
    .status(200)
    .json({ message: "success", data: paymentResponseData });
};

module.exports = { createPaymentHistory, getPaymentHistory };

const paymentDao = require("../models/paymentDao");
const axios = require("axios");

const createPaymentHistory = async (orderId, paymentKey, amount) => {
  return await paymentDao.createPaymentHistory(orderId, paymentKey, amount);
};

const getPaymentHistory = async (orderId) => {
  const result = await axios.get(
    `https://api.tosspayments.com/v1/payments/orders/${orderId}`,
    {
      headers: {
        Authorization: `Basic ${process.env.SECRET_KEY}`,
      },
    }
  );
  return result.data;
};

module.exports = {
  createPaymentHistory,
  getPaymentHistory,
};

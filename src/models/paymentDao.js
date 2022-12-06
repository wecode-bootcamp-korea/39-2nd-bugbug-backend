const { database } = require("./dataSource");

const createPaymentHistory = async (orderId, paymentKey, amount) => {
  const result = await database.query(
    `
      INSERT INTO payments
      (
        order_id,
        payment_key,
        total_amount
      )
      VALUES
      (
        ?, 
        ?, 
        ?
      );
    `,
    [orderId, paymentKey, amount]
  );

  return result;
};

const getPaymentHistory = async (userId) => {
  const result = await database.query(
    `
      SELECT
      (
        p.order_id,
        p.order_name,
        p.total_amount
      FROM payments p
      WHERE p.order_id = ?
      )   
    `,
    [userId]
  );

  return result;
};

module.exports = {
  createPaymentHistory,
  getPaymentHistory,
};

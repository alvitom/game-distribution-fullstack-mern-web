const midtransClient = require("midtrans-client");
const crypto = require("crypto");

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

const verifySignature = (notification) => {
  const { order_id, status_code, gross_amount, signature_key } = notification;
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const hash = crypto.createHash("sha512");
  hash.update(order_id + status_code + gross_amount + serverKey);
  const expectedSignature = hash.digest("hex");

  return expectedSignature === signature_key;
};

module.exports = { snap, verifySignature };

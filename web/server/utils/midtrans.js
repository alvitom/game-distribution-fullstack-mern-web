const midtransClient = require("midtrans-client");
const crypto = require("crypto");

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

const verifySignature = ({ order_id, status_code, gross_amount, signature_key }) => {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const dataToHash = [order_id, status_code, gross_amount, serverKey].join('');
  const hash = crypto.createHash('sha512').update(dataToHash).digest('hex');

  return hash === signature_key;
};

module.exports = { snap, verifySignature };

const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createTransaction, getAllTransactions, getDetailTransaction, updateTransactionStatus } = require("../controllers/transactionCtrl");
const router = express.Router();

router.post("/", authMiddleware, createTransaction);
router.get("/", authMiddleware, getAllTransactions);
router.get("/:transactionId", authMiddleware, getDetailTransaction);
router.put("/status/:id", authMiddleware, isAdmin, updateTransactionStatus)

module.exports = router;

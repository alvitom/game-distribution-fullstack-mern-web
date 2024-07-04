const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createTransaction, getAllTransactions, getDetailTransaction, updateTransactionStatus, getAllTransactionUsers } = require("../controllers/transactionCtrl");
const router = express.Router();

router.post("/", authMiddleware, createTransaction);
router.get("/", authMiddleware, getAllTransactions);
router.get("/all-users", authMiddleware, isAdmin, getAllTransactionUsers);
router.get("/:transactionId", authMiddleware, getDetailTransaction);
router.put("/status/:id", authMiddleware, isAdmin, updateTransactionStatus)

module.exports = router;

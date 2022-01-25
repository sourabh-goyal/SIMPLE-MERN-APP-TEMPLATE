const express = require('express');
const router = express.Router();
import expenseController from './controllers/expenses';

router.get("/healthcheck", (_req, res) => {
    res.json({message: "ok"});
});

router.post("/addExpense", async (req, res) => {
    res.json(await expenseController.addExpense(req.body.params));
});

router.post("/getExpenses", async (req, res) => {
    res.json(await expenseController.viewExpenses(req.body.params));
});

router.post("/deleteExpense", async (req, res) => {
    res.json(await expenseController.deleteExpense(req.body.params));
})

router.post("/updateExpense", async (req, res) => {
    res.json(await expenseController.updateExpense(req.body.params));
})


module.exports = router;
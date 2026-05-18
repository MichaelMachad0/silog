const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ mensagem: "Veículos OK" });
});

module.exports = router;
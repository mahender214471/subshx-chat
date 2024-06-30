const express = require('express');
const router = express.Router();
const controlres = require("../controllers/userControlers")
router.post("/signup" , controlres.signup)
router.post("/login" , controlres.login)
module.exports  = router;
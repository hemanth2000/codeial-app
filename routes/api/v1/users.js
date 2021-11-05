const express = require("express");
const usersAPI = require("../../../controllers/api/v1/users_api");

const router = express.Router();

router.get("/", usersAPI.getUsers);
router.post("/create-session", usersAPI.createSession);

module.exports = router;

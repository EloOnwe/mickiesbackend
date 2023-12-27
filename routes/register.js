const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();
const bodyParser = require("body-parser");

const supabase = require("../supabaseConfig");

router.post(
  "/signup",
  [
    check("email", "Please provide valid Email").isEmail(),
    check("password", "Please provide more than 7 characters")
      .isLength({ min: 8 })
      .isLowercase(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", email);
      if (data.length > 0) {
        return res.status(202).json({ message: "User exits already" });
      } else if (!data.length > 0) {
        supabase.auth.signUp({ username, email, password });
        return res
          .status(201)
          .json({ message: "Successful, check your email for confirmation" });
      }

      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
);

module.exports = router;

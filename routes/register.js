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
    const { username, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        errors: errors.array(),
      });
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (data) {
        return res.status(201).json({
          data,
          message: "Check your email for confirmation",
        });
      }
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;

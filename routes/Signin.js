const router = require("express").Router();
const { check, validationResult } = require("express-validator");

const bodyParser = require("body-parser");
const supabase = require("../supabaseConfig");

router.post(
  "/login",
  [
    check("email", "Please provide valid Email").isEmail(),
    check("password", "Please provide more than 7 characters")
      .isLength({ min: 8 })
      .isLowercase(),
  ],
  async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        errors: errors.array(),
      });
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
      if (data) {
        return res.status(201).json({
          message: "login successful",
          data,
        });
      }
    } catch (error) {
      return res.status(402).json(error.message);
    }
  }
);

module.exports = router;

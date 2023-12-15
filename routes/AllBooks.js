const express = require("express");

const router = express.Router();
const bodyParser = require("body-parser");

const supabase = require("../supabaseConfig");

router.use(express());
router.use(bodyParser.json());

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("books").select();

    if (error) {
      throw error;
    }
    if (data) {
      res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

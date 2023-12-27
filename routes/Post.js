const express = require("express");

const router = express.Router();

const supabase = require("../supabaseConfig");

router.post("/book", async (req, res) => {
  const { title, author, isbn, year, description } = req.body;

  try {
    const { data, error } = await supabase
      .from("books")
      .insert([{ title, author, isbn, year, description }])
      .select();

    if (error) {
      throw error;
    }
    if (data) {
      return res.status(200).json({ message: "Successfully added" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
});

module.exports = router;

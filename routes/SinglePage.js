const express = require("express");

const router = express.Router();

const supabase = require("../supabaseConfig");

router.get("/book/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from("books")
      .select()
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }
    if (data) {
      res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
});

module.exports = router;

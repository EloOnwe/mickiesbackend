const express = require("express");

const router = express.Router();
const bodyParser = require("body-parser");

const supabase = require("../supabaseConfig");

router.put("/book/update/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the existing book data
    const { data: existingBook, error: fetchError } = await supabase
      .from("books")
      .select()
      .eq("id", id)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    if (!existingBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Update the book data with new information
    const updatedBook = {
      ...existingBook,
      ...req.body, // Assuming req.body contains the updated fields
    };

    // Update the book in the database
    const { data: updatedData, error: updateError } = await supabase
      .from("books")
      .update(updatedBook)
      .eq("id", id)
      .select();

    if (updateError) {
      throw updateError;
    }

    res.status(200).json({
      data: updatedData,
      message: "Update Successfu",
    });
  } catch (error) {
    console.error("Error updating book:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

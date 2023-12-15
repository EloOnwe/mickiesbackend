const express = require("express");

const router = express.Router();
const bodyParser = require("body-parser");

router.use(express());
router.use(bodyParser.json());

const supabase = require("../supabaseConfig");

//Route for deleting a single book
router.delete("/book/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the book exists
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

    // Delete the book from the database
    const { data: deletedData, error: deleteError } = await supabase
      .from("books")
      .delete()
      .eq("id", id);

    if (deleteError) {
      throw deleteError;
    }

    res.json({
      data: deletedData,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting book:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

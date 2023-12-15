const express = require("express");
const cors = require("cors");

const registerRoute = require("./routes/register.js");
const AllBooksRoute = require("./routes/AllBooks.js");
const singlePageRoute = require("./routes/SinglePage.js");
const PostRoute = require("./routes/Post.js");
const UpdateRoute = require("./routes/Update.js");
const DeleteRoute = require("./routes/Delete.js");
const SignUpRoute = require("./routes/register.js");
const loginRoute = require("./routes/Signin.js");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json()); // This replaces body-parser for JSON parsing
app.use(express.urlencoded({ extended: true }));

app.use(AllBooksRoute);
app.use(PostRoute);
app.use(singlePageRoute);
app.use(UpdateRoute);
app.use(DeleteRoute);
app.use(SignUpRoute);
app.use(loginRoute);

app.listen(port, () => {
  console.log("The server is running on port 5000");
});

const express = require("express");
const projectRoutes = require("./routes/projectRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const contactRoutes = require("./routes/contactRoutes");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "welcome to haniah's backend" });
});

app.use("/projects", projectRoutes);
app.use("/testimonials", testimonialRoutes);
app.use("/contacts", contactRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listeing to ${port}`));

const express = require("express");
const app = express.Router();
const fixArrayId = require("../helpers");

let testimonials = [
  {
    id: 1,
    name: "Craig Braaf",
    image: "https://i.postimg.cc/hjqv4s31/craig.png",
    paragraph: " Very bright person. She knows when to play hard and work hard",
  },
  {
    id: 2,
    name: "Tursha Arendse",
    image: "https://i.postimg.cc/y8jC3PdT/tursha-1.png",
    paragraph: " Haniah is a very hard working and determined young women",
  },
  {
    id: 3,
    name: "Lilitha Ngele",
    image: "https://i.postimg.cc/qB6rDybk/lilly-1.jpg",
    paragraph:
      " Haniah is very a good lady who works very hard to get what she wants",
  },
  {
    id: 4,
    name: "Muneeb Davids",
    image: "https://i.postimg.cc/RVQrH6sK/muneeb.png",
    paragraph:
      "Haniah is a team player together with good communicational skills",
  },
  {
    id: 5,
    name: "Na-aim Fredericks",
    image: "https://i.postimg.cc/9fYLQZJN/na-aim.jpg",
    paragraph:
      "Haniah is a very enthusiastic person who strives to do her best in any and every aspect of her projects that comes her way",
  },
  {
    id: 6,
    name: "Kyle Mc Bryne",
    image: "https://i.postimg.cc/3JqW4qdP/kyle.png",
    paragraph:
      "Haniah is a cheerful person, always a pleasure to work with being a team player and a great problem solver",
  },
];

// get all testimonials
app.get("/", (req, res) => {
  res.send(testimonials);
});

// get one testimonials
app.get("/:id", (req, res) => {
  const testimonial = testimonials.find(
    (testimonial) => testimonial.id == req.params.id
  );
  if (!testimonial) res.status(404).send({ msg: "testimonials not found" });
  res.send(testimonial);
});

//  create a testimonial (push to array)
app.post("/", (req, res) => {
  let { name, image, paragraph } = req.body;
  if (!name || !image || !paragraph)
    res.status(400).send({ msg: "not all information sent" });
  let newTestimonial = {
    id: testimonials.length + 1,
    name,
    image,
    paragraph,
  };
  testimonials.push(newTestimonial);
  res.send(newTestimonial);
});

// update a testimonial (update item in an array)
app.put("/:id", (req, res) => {
  // find testimonial index in testimonials
  let testimonial = testimonials.find(
    (testimonial) => testimonial.id == req.params.id
  );
  // if no testimonial found, send error
  if (!testimonial) res.status(404).send({ msg: "testimonial not found" });
  // get data from request body
  let { name, image, paragraph } = req.body;

  // write details to testimonial
  if (name) testimonial.name = name;
  if (image) testimonial.image = image;
  if (paragraph) testimonial.paragraph = paragraph;
  // send updated testimonial
  res.send(testimonial);
});

// delete a testimonial (remove from an array)
app.delete("/:id", (req, res) => {
  let testimonial = testimonials.find(
    (testimonial) => testimonial.id != req.params.id
  );
  let index = testimonials.indexOf(testimonial);
  testimonials.splice(index, 1);
  fixArrayId(testimonials);
  res.send({ msg: "item removed" });
});
module.exports = app;

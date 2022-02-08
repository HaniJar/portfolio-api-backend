const express = require("express");
const app = express.Router();
const fixArrayId = require("../helpers");

let projects = [
  {
    id: 1,
    title: "WriteRight",
    image: "https://i.postimg.cc/Y2m9MSQp/Write-Right.png",
    netlify: "https://quizzical-jackson-2415e7.netlify.app/",
    github: "https://github.com/HaniJar/My-Portfolio",
  },
  {
    id: 2,
    title: "Team-Task",
    image: "https://i.postimg.cc/XYFN615Q/Team-Task.png",
    netlify: "https://quirky-leakey-9c061c.netlify.app/",
    github: "https://github.com/HaniJar/Team-Task",
  },
  {
    id: 3,
    title: "E-commerce Website",
    image: "https://i.postimg.cc/65Zx82QQ/e-commerce.png",
    netlify: "https://agitated-edison-a8217c.netlify.app/",
    github: "https://github.com/HaniJar/New-Project",
  },
  {
    id: 4,
    title: "JavaScript Calculator",
    image: "https://i.postimg.cc/9FHCttK9/JS-Calc.png",
    netlify: "https://reverent-bartik-231cc6.netlify.app/",
    github: "https://github.com/HaniJar/JavaScript-Project",
  },
  {
    id: 5,
    title: "Point Of Sale",
    image: "https://i.postimg.cc/tgwLR9H6/POS.png",
    netlify: "https://hopeful-feynman-653872.netlify.app/",
    github: "https://github.com/HaniJar/POS-Project",
  },
];

// get all projects
app.get("/", (req, res) => {
  res.send(projects);
});

// get one project
app.get("/:id", (req, res) => {
  const project = projects.find((project) => project.id == req.params.id);
  if (!project) res.status(404).send({ msg: "project not found" });
  res.send(project);
});

//  create a project (push to array)
app.post("/", (req, res) => {
  let { title, image, netlify, github } = req.body;
  if (!title || !image || !netlify || !github)
    res.status(400).send({ msg: "not all information sent" });
  let newProject = {
    id: projects.length + 1,
    title,
    image,
    netlify,
    github,
  };
  projects.push(newProject);
  res.send(newProject);
});

// update a project (update item in an array)
app.put("/:id", (req, res) => {
  // find project index in projects
  let project = projects.find((project) => project.id == req.params.id);
  // if no project found, send error
  if (!project) res.status(404).send({ msg: "project not found" });
  // get data from request body
  let { title, image, netlify, github } = req.body;

  // write details to project
  if (title) project.title = title;
  if (image) project.image = image;
  if (netlify) project.netlify = netlify;
  if (github) project.github = github;
  // send updated project
  res.send(project);
});

// delete a project (remove from an array)
app.delete("/:id", (req, res) => {
  let project = projects.find((project) => project.id != req.params.id);
  let index = projects.indexOf(project);
  projects.splice(index, 1);
  fixArrayId(projects);
  res.send({ msg: "item removed" });
});
module.exports = app;

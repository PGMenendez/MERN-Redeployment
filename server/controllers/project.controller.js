// console.log("controller.js");
const Project = require('../models/project.model');

module.exports = {
    findAll: (req, res) => {
        Project.find().sort('dueDate')
        .then((allProjects) => res.json(allProjects))
        .catch((err) => res.json({message: "An error has happened.", error: err}));
    },
    findOne: (req, res) => {
        Project.findById(req.params.id)
        .then((Project) => res.json(Project))
        .catch((err) => res.json({message: "An error has happened in find one.", error: err}));
    },
    create: (req, res) => {
        console.log(req.body);
        Project.create(req.body)
        .then((newProject) => res.json(newProject))
        .catch((err) => res.json({message: "An error has happened.", error: err}));
    },
    update: (req, res) => {
        Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
        .then((updatedProject) => res.json(updatedProject))
        .catch((err) => res.json({message: "An error has happened in update.", error: err}));
    },
    delete: (req, res) => {
        console.log(req.params.Project_id);
        Project.findByIdAndDelete(req.params.Project_id)
        .then((successMsg) => res.json(successMsg))
        .catch((err) => res.json({message: "An error has happened.", error: err}));
    },
}
const express = require("express");
const router = express.Router();

let notes = [];
let nextId = 1;

router.post("/", (req, res) => {
    const { title, content } = req.body;
    const newNote = { id: nextId++, title: title || "", content: content || "" };
    notes.push(newNote);
    res.status(201).json(newNote);
});

router.get("/", (req, res) => { res.json(notes); });

router.get("/:id", (req, res) => {
    const note = notes.find(n => n.id === parseInt(req.params.id));
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
});

router.put("/:id", (req, res) => {
    const note = notes.find(n => n.id === parseInt(req.params.id));
    if (!note) return res.status(404).json({ message: "Note not found" });
    const { title, content } = req.body;
    note.title = title ?? note.title;
    note.content = content ?? note.content;
    res.json(note);
});

router.delete("/:id", (req, res) => {
    const index = notes.findIndex(n => n.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Note not found" });
    notes.splice(index,1);
    res.json({ message: "Note deleted" });
});

module.exports = router;

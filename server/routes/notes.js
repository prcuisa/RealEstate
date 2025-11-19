const express = require("express");
const router = express.Router();

// In-memory data store
let notes = [];
let nextId = 1;

/**
 * CREATE NOTE
 * POST /notes
 */
router.post("/", (req, res) => {
    const { title, content } = req.body || {};

    // Basic validation
    if (!title && !content) {
        return res.status(400).json({ message: "title or content required" });
    }

    const newNote = {
        id: nextId++,
        title: title || "",
        content: content || ""
    };

    notes.push(newNote);
    res.status(201).json(newNote);
});


/**
 * GET ALL NOTES
 * GET /notes
 */
router.get("/", (req, res) => {
    res.json(notes);
});


/**
 * GET ONE NOTE
 * GET /notes/:id
 */
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);

    const note = notes.find(n => n.id === id);
    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
});


/**
 * UPDATE NOTE
 * PUT /notes/:id
 */
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const note = notes.find(n => n.id === id);

    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }

    const { title, content } = req.body || {};

    // Update only provided fields
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;

    res.json(note);
});


/**
 * DELETE NOTE
 * DELETE /notes/:id
 */
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = notes.findIndex(n => n.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Note not found" });
    }

    notes.splice(index, 1);

    res.json({ message: "Note deleted" });
});


module.exports = router;

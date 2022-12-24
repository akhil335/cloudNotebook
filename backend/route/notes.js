const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const {
    body,
    validationResult
} = require("express-validator");
const router = express.Router();

//Router 1: routes/notes/getallnotes getting all notes
router.get("/getallnotes", fetchuser, async (req, res) => {
    try {
        //gettting user id
        const notes = await Note.find({
            user: req.user
        });

        res.send(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some problem occured");
    }
});

//Router 2: adding notes to db userId
router.post(
    "/addnote",
    fetchuser,
    [
        body("title", "Enter a valid title").isLength({
            min: 3,
        }),
        body(
            "description",
            "Description should be greater then 5 characters"
        ).isLength({
            min: 5,
        }),
    ],
    async (req, res) => {

        try {
            //validating data
            const errors = validationResult(req);

            //checking if error is empty or not
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                });
            }

            const {
                title,
                description,
                tag
            } = req.body;

            //sending note data to db user id
            const note = new Note({
                title,
                description,
                tag,
                user: req.user,
            });

            const savednote = await note.save()
            res.send(savednote);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("some problem occured");
        }
    }
);


//Router 3: routes/notes/updateNotes updating exiting note
router.put("/updatenote/:id", fetchuser, [
    body("title", "Enter a valid title").isLength({
        min: 3,
    }),
    body(
        "description",
        "Description should be greater then 5 characters"
    ).isLength({
        min: 5,
    }),
], async (req, res) => {

    try {
        const {
            title,
            description,
            tag
        } = req.body;

        //validating data
        const errors = validationResult(req);

        //checking if error is empty or not
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        //object for storing update notes 
        let newNote = {};

        if (title) {
            newNote.title = title
        };
        if (description) {
            newNote.description = description
        };
        if (tag) {
            newNote.tag = tag
        };

        //find the note id to be updated
        let note = await Note.findById(req.params.id)
        //checking params id available or not
        if (!note) {
            return res.status(404).send("not found")
        };

        //checking params id with db id to ensure user is authorized
        if (note.user.toString() !== req.user) {
            res.status(401).send("not allowed")
        }

        //finding id for update note
        note = await Note.findByIdAndUpdate(req.params.id, {
            $set: newNote
        }, {
            new: true
        })
        res.send(note._id);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("some problem occured");
    }
});


//Router 4: routes/notes/delete note from db
router.delete("/deletenote/:id", fetchuser, async (req, res) => {

    try {
        //find the note id to be delete
        let note = await Note.findById(req.params.id)
        //checking params id available or not
        if (!note) {
            return res.status(404).send("Not Found")
        };

        //checking params id with db id to ensure user is authorized
        if (note.user.toString() !== req.user) {
            res.status(401).send("Not Allowed")
        }

        //finding id for deleting note
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({
            "success": "Note has been deleted",
            id: note._id
        });

    } catch (error) {
        res.status(500).send("some problem occured");
    }
});


//export router
module.exports = router;
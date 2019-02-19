const express = require('express');

const Posts = require('./db.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "The posts information could not be retrieved."
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);

        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "The post information could not be retrieved."
        });
    }
});

router.post('/', async (req, res) => {
    const postInfo = req.body;

    if (!postInfo.title || !postInfo.contents)
        return res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
    });

    try {
        const post = await Posts.insert(postInfo);
        res.status(201).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "There was an error while saving the post to the database"
        });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const tools = require('../tools/tools');
const { ScreenRoom } = require("../../models/screenRoomModel");

router.get("/", async (req, res, next) => {
    const foundObjects = await tools.getAll( req, res, next, ScreenRoom)
    res.status(200).json(foundObjects)
});

router.get("/:id", async (req, res, next) => {
    const foundObject = await tools.getById( req, res, next, ScreenRoom)
    res.status(200).json(foundObject)
});


router.post('/', async (req, res, next) => {
    const createdObject = await tools.postData( req, res, next, ScreenRoom )
    res.status(201).json({ id: createdObject._id });
});

router.put("/:id", async (req, res, next) => {
    const editedObject = await tools.putData( req, res, next, ScreenRoom )
    res.status(204).send()
});

router.delete("/:id", async (req, res, next) => {
    const deletedObject = await tools.deleteData( req, res, next, ScreenRoom )
    res.status(204).send()
});

module.exports = router

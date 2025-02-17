import express from 'express';
const router = express.Router();

router.get("/", function (req, res) {
    res.send("Hey, it's working");
})

export default router;
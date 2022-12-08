import express from "express"
let router = express.Router()

router.get("/", (req, res) => {
    let courseId = req.body.courseId

    res.send(personalScheduel)
})

export default router
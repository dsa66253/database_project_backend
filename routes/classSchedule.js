import express from "express"
import { classSchedule } from "../sample/classSchedule.js"
let router = express.Router()
/**
 * @swagger
 * /classSchedule:
 *   get:
 *     summary: get class schedule by student id
 *     requestBody:
 *       content:
 *        application/json:
 *          type: object
 *         
 *              
 *     responses:
 * 
 *       '200':
 *         description: Ok
 */
router.get("/", (req, res) => {
    console.log("jel")
    let account = req.body.SId
    let personalScheduel = null
    classSchedule.forEach((e) => {
        if (e.SId === account) {
            personalScheduel = e
        }
    })
    res.send(personalScheduel)
})

export default router
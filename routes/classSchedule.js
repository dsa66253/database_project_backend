import express from "express"
import { classSchedule } from "../sample/classSchedule.js"
let router = express.Router()
/**
 * @swagger
 * /classSchedule:
 *   get:
 *     summary: get class schedule by student id**
 *     parameters:
 *      - name: body@@
 *        in: body
 *        required: true
 *        schema: 
 *          type: object
 *          properties:
 *            messageId:
 *              type: string
 *              example: r09525126@ntu.edu.tw
 *     responses:
 * 
 *       '200':
 *         description: Ok
 */
router.get("/", (req, res) => {
    console.log(req)
    let lang = req.headers.lang
    console.log(lang)
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
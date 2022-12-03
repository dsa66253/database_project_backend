import express from "express"
import { users } from "../sample/user.js"
let router = express.Router()
/**
 * @swagger
 * /user:
 *   get:
 *     summary: log in
 *     parameters:
 *      - name: username
 *        in: body
 *        sche: body
 *      - name: password
 *        in: body    
 *              
 *     responses:
 *       '200':
 *         description: Ok
 */
router.get('/', (req, res) => {
    // console.log(req)
    // console.log(req.query)
    let result = false
    users.forEach((e) => {
        if (e.SId === req.body.SId && e.password === req.body.password) {
            console.log(req.body)
            result = true
        }
    })
    // if req.query.account==

    res.send(result)
})

export default router
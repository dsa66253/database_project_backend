import express from "express"
import { users } from "../sample/user.js"
import query from "../db/query.js"
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
router.post('/', async (req, res) => {
    // console.log(req)
    // console.log(req.query)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Origin", "*")
    console.log("req.body.body", req.body.body)
    let userExist = false
    let SId = req.body.body.SId
    let sql = `SELECT * 
    FROM Student AS S
    WHERE S.SId=\"${SId}\"`
    let user = await query(sql)
    if (user.length===0){
        // create new user
        res.send(userExist)
        sql = `INSERT INTO Student(SId, Password)
        VALUES(\"${SId}\", \"${SId}\");`
        await query(sql)
    }else{
        userExist = true
        res.send(userExist)
    }
})
router.get('/', async (req, res) => {
    // console.log(req)
    // console.log(req.query)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Origin", "*")
    // console.log("req.body.body", req.body.body)
    // let userExist = false
    // let SId = req.body.body.SId
    console.log("getUser was called")
    res.send(true)
    
})

export default router
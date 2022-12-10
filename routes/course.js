import express from "express"
import query from "../db/query.js"
let router = express.Router()
// get course info mation by course id
router.get("/", async (req, res) => {
    let courseId = req.body.CId
    let courseInfo = null
    console.log(req.headers)
    let Lang = req.headers.lang
    // courseId = "11173"
    // 想一下為什麼不加distinct 會這麽多筆資料
    let sql = `SELECT distinct C.CId, CT.Content, S.Day, S.Time, S.LId, L.GoogleName, LT.Content
    FROM Course AS C, Course_Trans AS CT, Session AS S, Location AS L, Location_Trans AS LT, Teach_Course
    WHERE C.CId=${courseId} AND C.CId=CT.CId AND CT.Lang=\'${Lang}\' AND C.CId=S.CId AND S.LId=L.LId AND S.LId=LT.LId AND LT.Lang=\'${Lang}\';`
    console.log(sql)
    courseInfo = await query(sql)

    console.log(courseInfo)
    res.send(courseInfo)
})

export default router
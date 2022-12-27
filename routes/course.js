import express from "express"
import query from "../db/query.js"
let router = express.Router()
//todo location and course name are not shown
// get course info mation by course id
router.get("/", async (req, res) => {
    console.log("req.query", req.query)
    // console.log("req.query", req.query)
    let courseId = req.query.CId
    let courseInfo = null
    console.log("req.headers", req.headers)
    // let
    let Lang = req.headers.lang
    // courseId = "11173"
    // 想一下為什麼不加distinct 會這麽多筆資料
    let sql = `SELECT distinct C.CId, CT.Content AS CourseName, S.Day, S.Time, S.LId, L.GoogleName, LT.Content AS Location, T.Name AS TeacherName
    FROM Course AS C, Course_Trans AS CT, Session AS S, Location AS L, Location_Trans AS LT, Teach_Course AS TC, Teacher AS T
    WHERE C.CId=${courseId} AND C.CId=CT.CId AND CT.Lang=\'${Lang}\' AND C.CId=S.CId AND S.LId=L.LId AND S.LId=LT.LId AND LT.Lang=\'${Lang}\' AND TC.CId=C.CId AND TC.TId=T.TId`
    console.log(sql)
    try{
        courseInfo = await query(sql)
        console.log(courseInfo)
        res.send(courseInfo)
    }catch (e){
        console.log(e)
        res.status(400)
    }

})

export default router
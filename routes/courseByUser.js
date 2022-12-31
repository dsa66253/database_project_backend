import express from "express"
import query from "../db/query.js"
let router = express.Router()

router.get("/", async (req, res) => {
    console.log("get/courseByUser", "req.params", req.query)
    let SId = req.query.SId
    let Lang = req.headers.lang
    let sql = `SELECT DISTINCT TC.SId, C.CId, CT.Content AS CourseName, S.Day, S.Time, S.LId, L.GoogleName, LT.Content AS Location, T.Name AS TeacherName, T.Office AS TeacerOffice, T.GoogleName AS TeacherGoogleOffice
    FROM Take_Course AS TC, Course AS C, Course_Trans AS CT, Session AS S, Location AS L, Location_Trans AS LT, Teach_Course AS TCT, Teacher AS T
    WHERE TC.SId=\'${SId}\' AND TC.CId=C.CId AND C.CId=CT.CId AND CT.Lang=\'${Lang}\' AND C.CId=S.CId AND S.LId=L.LId AND S.LId=LT.LId AND LT.Lang=\'${Lang}\'AND C.CId=TCT.CId AND TCT.TId=T.TId;`
    console.log(sql)
    try{
        let courseInfo = await query(sql)
        // console.log(courseInfo)
        res.send(courseInfo)
    }catch(e){
        console.log(e)
        res.status(400)
    }

})
router.post("/", async (req, res) => {
    let CId = req.body.body.CId
    let SId = req.body.body.SId
    console.log("req.body", req.body)
    let success=false
    let sql = `INSERT INTO Take_Course(CId, SId)
    VALUES(\"${CId}\", \"${SId}\");`
    console.log(sql)
    try{
        let courseInfo = await query(sql)
        success=true
        res.send(success)
    }catch (e){
        console.log(e)
        res.send(success);
    }
})
router.delete("/", async (req, res) => {
    // console.log("req.body", req.body)
    // console.log("req.query", req.query)
    let CId = req.query.CId
    let SId = req.query.SId
    let success=false
    let sql = `DELETE 
    FROM Take_Course AS TC
    WHERE TC.CId=\"${CId}\" AND TC.SID=\"${SId}\";`
    console.log(sql)
    try{
        let courseInfo = await query(sql)
        success=true
        res.send(success)
    }catch (e){
        console.log(e)
        res.status(400).send(success);
    }
})

export default router
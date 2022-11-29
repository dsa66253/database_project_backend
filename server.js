import express from "express"
import dotenv from "dotenv"
import {users} from "./sample/user.js"
import {classSchedule} from "./sample/classSchedule.js"
import createConnection from "./db/connection.js"
import query from "./db/query.js"
const app = express()
dotenv.config()
const port = 4000


app.use(express.json()) // for parse the requeset body
app.get('/', (req, res) => {
  res.send('Hello Good World!!')
})
app.get("/test", async (req, res) => {
  // test issue an query to mysql server
  let result = await query("SELECT * FROM student;")
  console.log(result)
  res.json(result)
} )
app.get('/user', (req, res) => {
  let result = false
  users.forEach((e)=>{
    if (e.account===req.body.account && e.password===req.body.password){
      console.log(req.body)
      result=true
    }
  })
  // if req.query.account==

  res.send(result)
})
app.get("/classSchedule", (req, res)=>{
  let account = req.body.account
  let personalScheduel = null
  classSchedule.forEach((e)=>{
    if (e.SId===account){
      personalScheduel=e
    }
  })
  res.send(personalScheduel)
})

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})

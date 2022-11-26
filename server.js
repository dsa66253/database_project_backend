import express from "express"
import {users} from "./sample/user.js"
import {classSchedule} from "./sample/classSchedule.js"
const app = express()
const port = 4000

app.use(express.json()) // for parse the requeset body
app.get('/', (req, res) => {
  res.send('Hello Good World!!')
})
app.get('/user', (req, res) => {
  // console.log(req)
  // console.log(req.query)
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

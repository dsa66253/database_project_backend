import express from "express"
import {users} from "./sample/user.js"
import {classSchedule} from "./sample/classSchedule.js"
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
const options = {
  swaggerDefinition: {
    // 這邊會是你的api文件網頁描述
    info: {
      title: 'ec_web_demo API',
      version: '1.0.0',
      description: 'Generate ec_web_demo API document with swagger'
    }
  },
  // 這邊會是你想要產生的api文件檔案，我是直接讓swagger去列出所有controllers
  apis: ['./controllers/*.js']
};
const specs = swaggerJsdoc(options);


const app = express()
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
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

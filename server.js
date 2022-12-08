import express from "express"

import classSchedule from "./routes/classSchedule.js"
import user from "./routes/user.js"
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import dotenv from "dotenv"
const app = express()
const options = {
  swaggerDefinition: {
    // 這邊會是你的api文件網頁描述
    info: {
      title: 'database_project_backend',
      version: '1.0.0',
      description: 'Generate ec_web_demo API document with swagger'
    }
  },
  // 這邊會是你想要產生的api文件檔案，我是直接讓swagger去列出所有controllers
  apis: ['./routes/*.js']
};
const specs = swaggerJsdoc(options);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));



dotenv.config()
const port = 4000


app.use(express.json()) // for parse the requeset body
app.get('/', (req, res) => {
  res.send('Hello Good World!!')
})

app.use("/user", user)

app.use("/classSchedule", classSchedule)

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})

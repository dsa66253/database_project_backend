import express from "express"
import { getTransactionConn, testConnection } from "./db/db.js"
import classSchedule from "./routes/classSchedule.js"
import user from "./routes/user.js"
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import dotenv from "dotenv"
import courseByUser from "./routes/courseByUser.js"
import course from "./routes/course.js"
import cors from "cors"
let whiteList = ["http://140.112.26.145:3000", "http://localhost:3000"]
const app = express()
app.use(cors({
  origin: "*",
  methods:["GET", "PUT", "DELETE", "POST"]
}));

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
app.use("/courseByUser", courseByUser)
app.use("/classSchedule", classSchedule)
app.use("/course", course)

app.listen(port, () => {
  testConnection()
  console.log(`server is listening on port ${port}`)
})

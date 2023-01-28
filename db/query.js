import mysql from "mysql2"; //mysql2 can match mysql 8.0 encoded password

let query = (sql)=>{
    let connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE

    });
    connection.connect(function(err) {
        if (err) {
        console.error('error connecting: ' + err.stack);
        }
    })
    //* return Promise can let the caller use async logic
    return new Promise((resolve, reject)=>{
        let result = null
        result = connection.query(sql, 
            (error, results, fields)=> {
                if (error) {
                    reject(error)
                    connection.end()
                }
                resolve(results)
                connection.end()
            }
        )
    })
}

export default query
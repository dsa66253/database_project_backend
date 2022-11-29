import mysql from "mysql2";
let createConnection = ()=>{
    console.log(process.env.DB_HOST)
    console.log(process.env.DB_USER)
    console.log(process.env.DB_PORT)
    console.log(process.env.DB_PASSWORD)
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
    
    // connection.query("SELECT * FROM student;", 
    // (error, results, fields)=> {
    //     if (error) throw error;
    //     console.log(results)
    //     // connection.end();
    // }
    // )
    // console.log(connection)
    console.log('connected as id ' + connection.threadId);
    return connection
});
    


}
export default createConnection



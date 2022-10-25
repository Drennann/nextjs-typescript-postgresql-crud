import {Pool} from "pg";

let conn: any;

if(!conn){
    conn =
    new Pool({
        user: "postgres",
        password: "drennanpw",
        host: "localhost",
        port: 5432,
        database: "taskdb"
    })
}

export {conn};


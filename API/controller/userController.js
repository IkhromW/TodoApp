const db = require('../database/index')
let sql = `SELECT * FROM users` 
module.exports = {
   getUsers : (req,res) => {
    db.query(sql, (err, results) => {
        if(err){
            res.status(500).send(err)
        }
        
        res.status(200).send(results)
    });
  },
  registerUser : (req,res) => {
    let { username } = req.body
    let sqlGet =  sql + ` where username = '${username}';`
    let sqlregister = `INSERT into users set ?;`;
    db.query(sqlGet, (err,result) => {
        if(err){
            res.status(500).send(err)
        }
        if(result.length === 0){
            db.query(sqlregister, req.body, (err) => {
                if(err){
                    res.status(500).send(err)
                }
                db.query(sql, (err, result) => {
                    if(err){
                        res.status(500).send(err)
                    }
                    res.status(200).send(result)
                })
            })
        }
        else{
            res.send('username telah dipakai')
        }
    })
    
    
  },
  loginUser : (req,res) => {
    const { username, password } = req.body;
    let sql = `select * from users where username = '${username}' and password = '${password}';`;
    db.query(sql, (err, results) => {
        if(err) res.status(500).send(results);

        if(results && results.length > 0){
             return res.status(200).send(results)
        }
        else{
            res.status(200).send("User or Password Invalid")
        }     
    })
  },
  getAllTodo : ( req, res ) => {
        const { id } = req.params
        let sqlTodo = `select 
                        username, 
                        TodoList,
                        idusers_todo, 
                        Date 
                     from 
                        users join users_todo on users.id_users = users_todo.id_users 
                        join ToDo on users_todo.id_ToDo = ToDo.id_Todo
                     where users.id_users = ${id}
                     group by 
                        username,
                        TodoList,
                        idusers_todo,
                        Date;`
        
        db.query(sqlTodo , (err, results) => {
            if(err) res.status(500).send(err);

            if(results){
                return res.status(200).send(results)
            }
        })
   },
   addTodo : ( req, res ) => {
    const { id } = req.params
    const { TodoList, date } = req.body
    let sqlAdd = `INSERT into ToDo( TodoList ) values ('${TodoList}')`
    let sqlTodo = `SELECT * from ToDo`
    db.query(sqlAdd, (err, results) => {
        if(err) res.status(500).send(err)

        if(results){
           db.query(sqlTodo, (err2, results2) => {
                if(err2) console.log(err2);
                
                if(results2){
                    //console.log(TodoList, date);
                    
                    let sqlToUser = `INSERT into users_todo(id_users, id_ToDo, date) values ('${id}', '${results2[results2.length - 1].id_ToDo}', '${date}')`
                    console.log(results2);
                    
                    db.query(sqlToUser, (err3, results3) => {
                        if(err3) res.status(500).send(err3)

                        if(results3){
                            console.log('jkjkjkjk');
                            
                            db.query(sqlTodo, (res4) => {
                                if(res4){
                                    console.log(res4);
                                         
                                }
                            })
                            console.log(results3);
                            
                            res.status(200).send(results3)
                            
                        }
                    })
                }
           })

        }
    })
   },
   getUsersTodoById : (req, res) => {
       let { id } = req.params
       let sqlGet = `SELECT
                        username,
                        TodoList,
                        idusers_todo,
                        Date
                    FROM
                        users join users_todo on users.id_users = users_todo.id_users
                        join ToDo on users_todo.id_ToDo = ToDo.id_Todo
                    WHERE idusers_todo = "${id}"`
        db.query(sqlGet, (err,result) => {
            if(err) res.send(err).status(500)

            if(result) res.send(result).status(200)
        })
      
   },
   editTodo : (req, res) => {
       let { id } = req.params
       console.log(id);
       
       let { TodoList, date } = req.body
        console.log("edit")
       let sqlGet = `SELECT
                        username,
                        TodoList,
                        idusers_todo,
                        Date
                    FROM
                        users join users_todo on users.id_users = users_todo.id_users
                        join ToDo on users_todo.id_ToDo = ToDo.id_Todo
                    WHERE idusers_todo = "${id}"`
       db.query(sqlGet, (err, result) => {
           if(err) res.status(500).send(err)

           if(result){
              let sqlGetUsersTodobyId = `SELECT * from users_todo where idusers_todo = "${id}"`
              db.query(sqlGetUsersTodobyId, (err1, result1) => {
                  if(err1){
                    res.status(500).send(err1)
                  }
                  if(result1){
                    console.log(result1[0].id_Todo);
                    //res.send(result1[0].id_Todo);
                    let sqlUpdateDate = `UPDATE users_todo SET date = "${date}" WHERE idusers_todo= ${id}`;
                    db.query(sqlUpdateDate, (error,results) => {
                        if(error) res.status(500).send(error)

                        if(results) console.log(results);
                        
                    })
                    let sqlGetTodoById = `SELECT TodoList from ToDo where id_Todo = "${result1[0].id_Todo}"`
                    
                    db.query(sqlGetTodoById, (err2, result2) => {
                        if(err2) res.status(500).send(err2)

                        if(result2){
                            let sqlUpdateTodo = `UPDATE Todo SET TodoList = "${TodoList}" WHERE id_ToDo = ${result1[0].id_Todo}`
                            db.query(sqlUpdateTodo, (err3,result3) => {
                                if(err) res.status(500).send(err3)

                                if(result3) res.status(200).send(result3)
                            })
                        }
                    })
                  }
              })
              
              
           }
       }) 
   },
   deleteTodo : (req, res) => {
       
    let { id } = req.params
    let sqlDelete = `DELETE FROM users_todo WHERE idusers_todo = '${id}';`
    db.query(sqlDelete, ((err, result) => {
        if(err) res.status(500).send(err)

        if(result) res.status(200).send(result)
    }))
   
   }
}

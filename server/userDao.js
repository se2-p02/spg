'use strict';
/* Data Access Object (DAO) module for accessing users */

const db = require('./db');
const bcrypt = require('bcrypt');

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
      db.get(sql, [id], (err, row) => {
        if (err) 
          reject(err);
        else if (row === undefined)
          reject({error: 'User not found.'});
        else {
          // by default, the local strategy looks for "username": not to create confusion in server.js, we can create an object with that property
          const user = {id: row.id, username: row.email, role: row.role}
          resolve(user);
        }
    });
  });
};

exports.getUser = (username, password) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
      db.get(sql, [username], (err, row) => {
        if (err) 
          reject(err);
        else if (row === undefined) {
          resolve(false);
        }
        else {
          const user = {id: row.id, username: row.email, role: row.role};
            
          // check the hashes with an async call, given that the operation may be CPU-intensive (and we don't want to block the server)
          bcrypt.compare(password, row.hash).then(result => {
            if(result)
              resolve(user);
            else
              resolve(false);
          });
        }
    });
  });
};

exports.addUser = (name, surname, password, email, role) => {
  //console.log("Inside add user (userDao)");
  return new Promise((resolve, reject) => {
    console.log("Password: "+password);
    const sql = 'INSERT INTO users(id, name, surname, wallet, basket, hash, email, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    //console.log("before hashing");
    try {
      bcrypt.hash(password, 10, function(error, hash) {
        if(error) {
          //console.log("Error performing the hash: "+error);
          reject({error: 'Error performing the hash'});
          return;
        }
        const sql_to_max_id = 'SELECT MAX(id) AS id FROM users';
        db.all(sql_to_max_id, (err, row) => {
          if(err) {
            //console.log("Error taking the id: "+err);
            reject({error: 'Error taking the max(id)'});
            return;
          }
          var id = -1;
          if (row === undefined) {
            //console.log("Row undefined");
            reject({error: 'Error taking the max(id)'});
            id = 0;
          }
          else 
            id = row[0].id+1;
          //console.log("Id: "+id);
          db.run(sql, [id, name, surname, 0.0, null, hash, email, role], (err_insert, val) => {
            if(err_insert){
              //console.log("Error inserting the row in the db"+err_insert);
              reject(err_insert);
            }
            resolve(id);
          });
        })
      });
    } catch {
      //console.log("Catch: Error performing the hash");
      reject({error: 'Catch: Error performing the hash'});      
    }
  })
}

exports.deleteUser = (email) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM users WHERE email = ?'
    db.run(sql, [email], function (err) {
      if (err) {
          reject(err);
      }else{
          resolve(true);
      }
  });
  
});
}
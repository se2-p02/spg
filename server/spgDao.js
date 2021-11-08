" use strict ";

const dayjs = require('dayjs');
const db = require('./db');


<<<<<<< HEAD
// get all counters for a counter
exports.getClientsSummary = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users';
=======
// get all clients
exports.getClients = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, name, surname FROM users';
>>>>>>> 333d076f0e922f5f63ab32801f73a4ceadc56108
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
<<<<<<< HEAD
            const tasks = rows.map((t) => ({ id: t.id, name: t.name, surname: t.surname, wallet: t.wallet, email: t.email }));
            console.log("jdi")
            resolve(tasks);
=======
            const clients = rows.map((c) => ({ id: c.id, name: c.name, surname: c.surname }));
            resolve(clients);
>>>>>>> 333d076f0e922f5f63ab32801f73a4ceadc56108
        });
    });
};

<<<<<<< HEAD

=======
// get specific client
exports.getClient = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, name, surname, wallet, basket, email FROM users WHERE id = ?';
        db.all(sql, [id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const clients = rows.map((c) => ({ id: c.id, name: c.name, surname: c.surname, wallet: c.wallet, basket: c.basket, email: c.email }));
            resolve(clients[0]);
        });
    });
};
>>>>>>> 333d076f0e922f5f63ab32801f73a4ceadc56108

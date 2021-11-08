" use strict ";

const dayjs = require('dayjs');
const db = require('./db');


// get all clients
exports.getClients = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, name, surname FROM users';
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const clients = rows.map((c) => ({ id: c.id, name: c.name, surname: c.surname }));
            resolve(clients);
        });
    });
};

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
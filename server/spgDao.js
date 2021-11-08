" use strict ";

const dayjs = require('dayjs');
const db = require('./db');


// get all counters for a counter
exports.getClientsSummary = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users';
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const tasks = rows.map((t) => ({ id: t.id, name: t.name, surname: t.surname, wallet: t.wallet, email: t.email }));
            console.log("jdi")
            resolve(tasks);
        });
    });
};



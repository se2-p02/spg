" use strict ";

const dayjs = require('dayjs');
const db = require('./db');

// get all products
exports.getProducts = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT p.id, p.name, p.quantity, p.unit, p.farmer, f.name as farmerName, p.price FROM products p LEFT JOIN farmer f WHERE f.id = p.farmer ';
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const products = rows.map((p) => ({ id: p.id, name: p.name, quantity: p.quantity, unit: p.unit, farmer: p.farmer, farmerName: p.farmerName, price: p.price }));
            resolve(products);
        });
    });
}


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

// update specific client wallet
exports.updateWallet = (id, amount) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE users SET wallet=? WHERE id = ?';
        db.run(sql, [amount, id], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(id);
        });
    });
};




//get next order number
exports.getNextNumber = async () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT max (id) as id FROM orders';
        db.all(sql, function (err, rows) {
            if (err) {
                reject(err);
                return;
            }
            if (rows !== undefined) {
                const number = rows[0].id + 1;
                resolve(number);
            }
            else {
                resolve(1);
            }
        });
    });
};

exports.orderPrep = async (product) => {
    try {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE products SET quantity = quantity - ? WHERE name = ? ';
            db.run(sql, [product[1], product[0]], function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(true);
            });
        });
    } catch (err) {
        return;
    }
};

// insert a new order
exports.addOrder = async (order) => {
    try {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO orders (id, userID, products, address, date, time, amount, confPreparation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            db.run(sql, [order.id, null, order.products, null, order.date, order.time, order.amount, 0], function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(true);
            });
        });
    } catch (err) {
        return;
    }
};

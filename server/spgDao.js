" use strict ";
var dayjs = require('dayjs')
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

exports.getNextProducts = (user) => {
    return new Promise((resolve, reject) => {
        let sql;
        let params = [];
        const today = dayjs().day() // from 0 (Sunday) to 6 (Saturday)
        let difference_from_sunday = 0;
        if (today != 0) {
            difference_from_sunday = 7 - today;
        }
        const next_week = dayjs().add(today, 'day').toDate(); 
        
        console.log(next_week);
        params.push(next_week);

        if (user.role === "farmer") {
            sql = 'SELECT p.id, p.name, p.quantity, p.unit, p.farmer, f.name as farmerName, p.price, f.id as farmerId, p.availability FROM products p LEFT JOIN farmer f ON f.id = p.farmer WHERE p.availability > ? AND f.id = ?';
            params.push(user.id);
        }
        else {
            sql = 'SELECT p.id, p.name, p.quantity, p.unit, p.farmer, f.name as farmerName, p.price, p.availability FROM products p LEFT JOIN farmer f WHERE f.id = p.farmer AND p.availability > ?';

        }

        
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const products = rows.map((p) => ({ id: p.id, name: p.name, quantity: p.quantity, unit: p.unit, farmer: p.farmer, farmerName: p.farmerName, price: p.price, availability: p.availability }));
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
        const sql = 'SELECT id, name, surname FROM users WHERE id >= 0';
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
        const sql = 'SELECT id, name, surname, wallet, basket, email, role FROM users WHERE id = ?';
        db.all(sql, [id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const clients = rows.map((c) => ({ id: c.id, name: c.name, surname: c.surname, wallet: c.wallet, basket: c.basket, email: c.email, role: c.role }));
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
                    reject(500);
                    return;
                }
                resolve(true);
            });
        });
    } catch (err) {
        return;
    }
};

// delete test order
exports.deleteTestOrder = () => {
    try {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM orders WHERE id = -1';
            db.run(sql, function (err) {
                if (err) {
                    reject(err);
                    return;
                } else {
                    resolve(true);
                }
            });
        });
    } catch (err) {
        return;
    }
};

// get all orders
exports.getOrders = (id) => {
    if (id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM orders WHERE userID = ?';
            db.all(sql, [id], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const orders = rows.map((c) => ({ id: c.id, userID: c.userID, products: c.products, address: c.address, date: c.date, time: c.time, amount: c.amount, conf: c.confPreparation, fulfilled: c.fulfilled }));
                resolve(orders);
            });
        });
    }
    else {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM orders';
            db.all(sql, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const orders = rows.map((c) => ({ id: c.id, userID: c.userID, products: c.products, address: c.address, date: c.date, time: c.time, amount: c.amount, conf: c.confPreparation, fulfilled: c.fulfilled }));
                resolve(orders);
            });
        });
    }

};

exports.updateOrderFulfilled = async (id) => {
    try {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE orders SET fulfilled=1 WHERE id = ? ';
            db.run(sql, id, function (err) {
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

exports.getClock = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT serverTime FROM clock';
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve({ serverTime: rows[0].serverTime });
        });
    });
};

exports.setClock = (clock) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE clock SET serverTime=?';
        db.run(sql, [clock], (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(true);
        });
    });
};


//updating the basket field in the user table
exports.updateBasket = (items,id) => {
    
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE users SET basket=? WHERE id = ?';
        db.run(sql, [items, id], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(id);
        });
    });
};
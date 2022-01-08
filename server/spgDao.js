" use strict ";
var dayjs = require('dayjs')
const db = require('./db');

// get all products
exports.getProducts = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT p.id, p.name, p.quantity, p.unit, p.farmer, f.name as farmerName, p.price, p.filter FROM products p LEFT JOIN farmer f WHERE f.id = p.farmer ';
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const products = rows.map((p) => ({ id: p.id, name: p.name, quantity: p.quantity, unit: p.unit, farmer: p.farmer, farmerName: p.farmerName, price: p.price, filter: p.filter }));
            resolve(products);
        });
    });
}

exports.confirmProductsOrder = (orderId, orderInfo) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE orders SET products=? WHERE id = ?';
        db.all(sql, [orderInfo.products, orderId], (err, rows) => {
            if (err) {
                console.log(err)
                reject(err);
                return;
            }
            resolve(true);
        });

    })

}

exports.getNextProducts = (role, user, time, week) => {
    return new Promise((resolve, reject) => {
        let sql;
        let params = [];

        const today = dayjs(time); //dayjs().day() // from 0 (Sunday) to 6 (Saturday) --> to consider real time and not the virtual clock
        let difference_from_sunday = 0;
        if (today.day() != 0) {
            difference_from_sunday = 7 - today.day();
        }
        const next_week = today.add(difference_from_sunday, 'day');
        if (week === 'current') {
            params.push(next_week.subtract(7, 'day').format('YYYY-MM-DD'));
            params.push(next_week.format('YYYY-MM-DD'));
        }
        else {
            params.push(next_week.format('YYYY-MM-DD'));
            params.push(next_week.add(7, 'day').format('YYYY-MM-DD'));
        }


        if (role === "farmer") {
            sql = 'SELECT p.id, p.name, p.quantity, p.unit, p.farmer, f.name as farmerName, p.price, p.filter, f.id as farmerId, p.availability, p.confirmed, p.image FROM products p LEFT JOIN farmer f ON f.id = p.farmer WHERE p.availability >= ? AND p.availability < ? AND f.id = ?';
            params.push(user.id);
        }
        else {
            sql = 'SELECT p.id, p.name, p.quantity, p.unit, p.farmer, f.name as farmerName, p.price, p.filter, p.availability, p.confirmed, p.image FROM products p LEFT JOIN farmer f WHERE f.id = p.farmer AND p.availability >= ? AND p.availability < ?';

        }

        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const products = rows.map((p) => ({ id: p.id, name: p.name, quantity: p.quantity, unit: p.unit, filter: p.filter, farmer: p.farmer, farmerName: p.farmerName, price: p.price, confirmed: p.confirmed, availability: p.availability, image: p.image }));
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
        const sql = 'SELECT id, name, surname, wallet, basket, email, role, phoneNumber, city, address, country FROM users WHERE id = ?';
        db.all(sql, [id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const clients = rows.map((c) => ({ id: c.id, name: c.name, surname: c.surname, wallet: c.wallet, basket: c.basket, email: c.email, role: c.role, phone: c.phoneNumber, city: c.city, address: c.address, country: c.country }));
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
        return await new Promise((resolve, reject) => {
            const sql = 'UPDATE products SET quantity = quantity - ? WHERE id = ? ';
            db.run(sql, [product.quantity, product.id], function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(true);
            });
        });
    } catch (err) {
        console.log(err);
        return err;
    }
};

//update the product table after removing one item from the order when modifying the order
exports.updateProductQuantity = async (product) => {
    try {
        return await new Promise((resolve, reject) => {
            const sql = 'UPDATE products SET quantity = quantity + ? WHERE id = ? ';
            db.run(sql, [product.quantity, product.id], function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(true);
            });
        });
    } catch (err) {
        console.log(err);
        return err;
    }
};

// insert a new order
exports.addOrder = async (order) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO orders (id, userID, products, address, date, time, amount, confPreparation, fulfilled, paid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.run(sql, [order.id, order.user, order.products, order.address, order.date, order.time, order.amount, 0, 0, order.paid], function (err) {
            if (err) {
                reject(500);
                return;
            }
            resolve(true);
        });
    }).catch(err => { return (err) });
};

//modify the order
exports.modifyOrder = (products, address, amount, id) => {
    try {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE orders SET products=?, address=?, amount=? WHERE id=?';
            db.run(sql, [products, address, amount, id], function (err, rows) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(id);
            });
        });
    } catch (err) {
        console.log(err);
        return err;
    }
};

// insert a new product
exports.addProduct = async (product, farmer, time) => {
    console.log(product)
    return new Promise((resolve, reject) => {
        const today = dayjs(time); //dayjs().day() // from 0 (Sunday) to 6 (Saturday) --> to consider real time and not the virtual clock
        let difference_from_sunday = 0;
        if (today.day() != 0) {
            difference_from_sunday = 7 - today.day();
        }
        const next_week = today.add(difference_from_sunday, 'day').format('YYYY-MM-DD');
        const sql = `INSERT INTO products (id, name, quantity, unit, farmer, confirmed, delivered, price, availability, filter, image)
            SELECT MAX(id) + 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            FROM products`;
        db.run(sql, [product.name, product.quantity, product.unit, farmer.id, 0, 0, product.price, next_week, product.filter, product.file], function (err) {
            if (err) {
                console.log(err, "prova" + product.unit);
                reject(500);
                return;
            }
            resolve(true);
        });
    }).catch(err => { return (err) });

};

// update a product
exports.updateProduct = async (product, id, action) => {
    return new Promise((resolve, reject) => {
        let sql;
        let arrayParam = [];
        if (action.update === true) {
            sql = `UPDATE products SET name = ?, quantity = ?, unit = ?, price = ?, filter = ?, image = ? WHERE id = ?`;
            arrayParam = [...[product.name, product.quantity, product.unit, product.price, product.filter, product.file]];
        }
        if (action.confirm === true) {

            sql = `UPDATE products SET confirmed = 1 WHERE id = ?`;
        }
        arrayParam.push(id);


        db.run(sql, arrayParam, function (err) {
            if (err) {
                reject({ err: "error in query" });
                return;
            }
            resolve(true);
        });
    }).catch(() => { return { err: "error in query" }; });
};

// get image
exports.getImage = async (productId) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT image FROM products WHERE id = ?`;
        db.all(sql, [productId], function (err, rows) {
            if (err) {
                reject({ err: "error in query" });
                return;
            }
            resolve(rows[0].image);
        });
    }).catch(() => { return { err: "error in query" }; });
};

// delete a product
exports.deleteProduct = async (id) => {

    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM products WHERE id = ?`;
        db.run(sql, id, function (err) {
            if (err) {
                reject({ err: "error in query" });
                return;
            }
            resolve(true);
        });
    }).catch((err) => { return { err: "error in query" }; });
}



// delete test order
exports.deleteTestOrder = () => {

    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM orders WHERE id = -1';
        db.run(sql, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    }).catch((err) => { return (err) });

};

// delete a specific order
exports.deleteOrder = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM orders WHERE id = ?';
        db.run(sql, [id], function (err, row) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    }).catch(err => { return (err) });

};

// get all orders
exports.getOrders = (id, orderId) => {
    let sql;
    let params = [];
    if (id) {
        sql = 'SELECT * FROM orders WHERE userID = ?';
        params.push(id);
    }
    else if (orderId) {
        sql = 'SELECT * FROM orders WHERE id = ?';
        params.push(orderId);
    }
    else {
        sql = 'SELECT * FROM orders';
    }
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const orders = rows.map((c) => ({ id: c.id, userID: c.userID, products: JSON.parse(c.products), address: JSON.parse(c.address), date: c.date, time: c.time, amount: c.amount, conf: c.confPreparation, fulfilled: c.fulfilled, paid: c.paid, status: c.status }));
            resolve(orders);
        });
    });

};

// get unretrieved orders
exports.getUnretrievedOrders = (datetime) => {
    const sql = "SELECT * FROM orders WHERE date > ? AND fulfilled = 0"
    return new Promise((resolve, reject) => {
        db.all(sql, [datetime], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const orders = rows.map((c) => ({ id: c.id, userID: c.userID, products: JSON.parse(c.products), address: JSON.parse(c.address), date: c.date, time: c.time, amount: c.amount, conf: c.confPreparation, fulfilled: c.fulfilled, paid: c.paid }));
            console.log(orders)
            resolve(orders);
        });
    });

};

// get all orders with a certain status
exports.getOrdersByStatus = (status) => {
    return new Promise((resolve, reject) => {
        var sql;
        var props = [];
        if (status == "not_available") {
            sql = 'SELECT * FROM orders WHERE NOT status = ? OR status is NULL';
            props.push("available")
        }
        else {
            sql = 'SELECT * FROM orders WHERE status = ?';
            props.push(status)
        }
        db.all(sql, props, (error, row) => {
            if (error) {
                reject(error);
                return;
            }
            const orders = row.map((c) => ({ id: c.id, userID: c.userID, products: c.products, address: c.address, date: c.date, time: c.time, amount: c.amount, conf: c.confPreparation, fulfilled: c.fulfilled, paid: c.paid }));
            resolve(orders);
        });
    });
};


exports.updateOrderFulfilled = async (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE orders SET fulfilled=1 WHERE id = ? ';
        db.run(sql, id, function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(true);
        });
    }).catch(err => { return (err) });

};

exports.updateOrderPaid = async (order) => {
    try {
        const wallet = await this.getWallet(order.userID);
        if (order.amount > wallet[0].wallet) return { err: 'Not enough money in wallet.' };
        else return new Promise((resolve, reject) => {
            const sql = 'UPDATE users SET wallet=? WHERE id=?';
            db.run(sql, [wallet[0].wallet - order.amount, order.userID], function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                const sql_1 = 'UPDATE orders SET paid=1 WHERE id=?';
                db.run(sql_1, [order.id], function (error) {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve({ info: 'Order paid.' });
                });
            });
        });
    } catch (err) {
        console.log(err);
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
exports.updateBasket = (items, id) => {
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

// get wallet amount
exports.getWallet = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'select wallet from users where id=?';
        db.all(sql, [id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const wallet = rows;
            resolve(wallet);
        });
    });
};

// get max id of products
exports.getMaxProdId = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT MAX(id) as maxId FROM products';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows[0].maxId);
        });
    });
};

// get max id of orders
exports.getMaxOrderId = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT MAX(id) as maxId FROM orders';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows[0].maxId);
        });
    });
};

// get all deliveries
exports.getDeliveries = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM F_deliveries';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const deliveries = rows.map((c) => ({ id: c.id, product: c.productId, farmer: c.farmerId, quantity: c.quantity, orderId: c.orderId }));
            resolve(deliveries);
        });
    });
};

// delete delivery
exports.deleteDeliveries = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM F_deliveries WHERE id=?';
        db.run(sql, [id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(true);
        });
    });
};

// insert a new delivery
exports.createDelivery = async (delivery) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO F_deliveries (productId, farmerId, quantity, orderId) VALUES (?, ?, ?, ?)';
        db.run(sql, [delivery.id, delivery.farmer, delivery.quantity, delivery.orderId], function (err) {
            if (err) {
                reject(500);
                return;
            }
            resolve(true);
        });
    }).catch(err => { return (err) });

};

// get single product
exports.getProduct = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM products WHERE id = ?';
        db.all(sql, [id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const product = rows.map((c) => ({ id: c.id, name: c.name, farmer: c.farmer }));
            resolve(product[0]);
        });
    });
};

// get single farmer
exports.getFarmer = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM farmer WHERE id = ?';
        db.all(sql, [id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const farmer = rows.map((c) => ({ id: c.id, name: c.name }));
            resolve(farmer[0]);
        });
    });
};

exports.subtractQuantities = (quantity, id) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE F_deliveries SET quantity = quantity - ? where productId = ?'
        db.run(sql, [quantity, id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
        })
        resolve(true)
    })
}

exports.setOrderStatus = (status, id) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE orders SET status = ? where id = ?'
        db.run(sql, [status, id], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
        })
        resolve(true);
    })
}

// get telegram bot name
exports.getTelegram = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM telegram';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const telegram = rows.map((c) => ({ name: c.name, token: c.token }));
            resolve(telegram[0]);
        });
    });
};

// delete Telegram Subscriber
exports.deleteTelegramSubscriber = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM telegramSubscribers WHERE telegramId=?';
        db.run(sql, [id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(true);
        });
    });
};

// create Telegram Subscriber
exports.createTelegramSubscriber = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO telegramSubscribers (telegramId) VALUES (?)';
        db.run(sql, [id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(true);
        });
    });
};

// get Telegram Subscribers
exports.getTelegramSubscribers = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM telegramSubscribers';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const telegramSubscribers = rows.map((c) => ({ telegramId: c.telegramId }));
            resolve(telegramSubscribers);
        });
    });
};

exports.setTelegramId = (telegramId, action) => {

    return new Promise((resolve, reject) => {

        let sql;
        let params = [];
        params.push(telegramId);
        if (action.telegramId) {
            sql = 'UPDATE users SET telegramId = ? WHERE telegramId = ?'
            params.push(action.telegramId);
        }
        else if (action.id) {
            sql = 'UPDATE users SET telegramId = ? WHERE id = ?'
            params.push(action.id);
        } else return false;

        db.run(sql, params, (err, row) => {
            if (err) {
                reject(err);
                return;
            }
        })
        resolve(true);
    })
}
const URL = "http://localhost:3000"

async function confirmOrder(order){

    let myURL = "/api/orders/"+order.id+"/confirmProducts/"
    const response = await fetch(myURL,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({elem:order})
        });
    if (response.ok){
        return true
    }
    else return { 'error': 'Failed to update Products status of an order' }
}

async function loadProducts() {
    let myURL = URL + "/api/products";
    const response = await fetch(myURL);
    if (response.ok) {
        return response.json(); //fetchedProducts
    } else return { 'error': 'Failed to load Products from server' }
}

async function loadClients() {
    let myURL = URL + "/api/clients";
    const response = await fetch(myURL);
    if (response.ok) {
        return response.json(); //fetchedClients
    } else return { 'error': 'Failed to load clients from server' }
}

async function loadOrders(id) {
    let myURL = URL + "/api/orders";
    if (id) myURL += "/" + id;
    const response = await fetch(myURL);
    if (response.ok) {
        return response.json();
    } else return { 'error': 'Failed to load Orders from server' }
}

async function loadClient(id) {
    let myURL = URL + "/api/clients/" + id;
    const response = await fetch(myURL);
    if (response.ok) {
        return response.json(); //fetchedClient
    } else return { 'error': 'Failed to load client from server' }
}

async function sendOrder(order) {
    const response = await fetch(URL + "/api/orders/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });
    if (response.ok) {
        return response.json();
    } else return { 'error': 'Failed to store data on server' }
}

async function updateOrder(id) {
    const response = await fetch(URL + `/api/updateOrder/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ fulfilled: true }),

        });
    if (response.ok) {
        return true;
    } else return { 'error': 'Failed to store data on server' }
}

async function payOrder(order) {
    const response = await fetch(URL + `/api/orders/pay`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });
    if (response.ok) {
        return true;
    } else return { 'error': 'Failed to store data on server' }
}



async function updateBasket(id, items) {
    const response = await fetch(URL + `/api/clients/basket/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(items),

        });
    if (response.ok) {
        return true;
    } else return { 'error': 'Failed to store data on server' }
}

async function modifyOrder(id, items) {
    const response = await fetch(URL + `/api/orders/modify/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(items),

        });
    if (response.ok) {
        return true;
    } else return { 'error': 'Failed to store data on server' }
}

async function updateProduct(product, action) {
    //action is something like { confirm: true }
    console.log(JSON.stringify({product: product, action: action}))
    const response = await fetch(URL + `/api/products/${product.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({product: product, action: action}),

        });
    if (response.ok) {
        return true;
    } else return { 'error': 'Failed to store data on server' }
}

async function createProduct(product) {
    console.log(product)
    const response = await fetch(URL + `/api/products`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),

        });
    if (response.ok) {
        return true;
    } else return { 'error': 'Failed to store data on server' }
}

async function deleteProduct(id) {
    const response = await fetch(URL + `/api/products/${id}`,
        {
            method: "DELETE"
        });
    if (response.ok) {
        return true;
    } else return { 'error': 'Failed to delete data from the server' }
}

async function login(user) {
    const response = await fetch(URL + "/api/sessions/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
    if (response.ok) {
        return response.json();
    } else return { 'error': 'Failed to login: invalid username/password' }
}

async function logout() {
    const response = await fetch(URL + "/api/sessions/current/",
        {
            method: "DELETE"
        });
    if (response.ok) {
        return 1;
    } else return { 'error': 'Failed to logout' }
}

async function isLoggedIn() {
    try {
        const response = await fetch(URL + "/api/sessions/current/");
        if (response.ok) {
            return response.json();
        } else return { 'error': 'User is not logged in' };
    } catch (err) {
        return { 'error': 'User is not logged in' };
    }
}

async function addNewUser(name, surname, password, email, phoneNumber, city, address, country) {
    try {
        console.log("Preparing the request in the API file...");
        const response = await fetch(URL + "/api/addNewUser",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: name, surname: surname, password: password, email: email, phoneNumber: phoneNumber, city: city, address: address, country: country }),
            });
        if (response.ok) {
            return response.json(); // userId
        } else {
            return { 'error': 'Failed to store data on server' };
        }
    }
    catch (err) {
        return { 'error': 'Failed' };
    }
}

async function loadNextProducts(role, week) {
    let myURL = URL + "/api/nextProducts";
    if(role){
        myURL += "?role="+role
    }
    if(role && week === 'current'){
        myURL += "&week=current"
    }
    const response = await fetch(myURL);
    if (response.ok) {
        return response.json();
    } else return { 'error': 'Failed to load the new products from server' }
}

async function getClock() {
    const response = await fetch(URL + "/api/clock");
    if (response.ok) {
        return response.json();
    }
    else return { 'error': 'Failed to load clock from server' };
}

async function setClock(clock) {
    const response = await fetch(URL + "/api/clock",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ serverTime: clock })
        });
    if (response.ok) {
        return {};
    } else {
        return { 'error': 'Failed to store data on server' };
    }
}

//get wallet amount of the user
async function loadWallet(id) {
    let myURL = URL + "/api/wallet/" + id;
    const response = await fetch(myURL);
    if (response.ok) {
        return response.json(); //fetchedWallet
    } else return { 'error': 'Failed to load client from server' }
}

async function loadAvailableOrders(status) {
    let myURL = URL + "/api/orderswithstatus/"+status;
    const response = await fetch(myURL);
    if (response.ok) {
        return response.json();
    } else return { 'error': 'Failed to load Orders from server' }
}

async function loadDeliverableProducts() {
    let myURL = URL + "/api/deliverableProducts";
    const response = await fetch(myURL);
    if (response.ok) {
        return response.json();
    } else return { 'error': 'Failed to load Products from server' }
}

async function loadDeliveries() {
    let myURL = URL + "/api/deliveries";
    const response = await fetch(myURL);
    if (response.ok) {
        return response.json();
    } else return { 'error': 'Failed to load Deliveries from server' }
}

async function createDelivery(product) {
    try {
        const response = await fetch(URL + "/api/deliveries",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });
        if (response.ok) {
            return response.json();
        } else {
            return { 'error': 'Failed to store data on server' };
        }
    }
    catch (err) {
        return { 'error': 'Failed' };
    }
}

async function confirmOrderForPickUp(order) {
    try {
        const response = await fetch(URL + "/api/confirmOrderForPickup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
            });
        if (response.ok) {
            return response.json();
        } else {
            return { 'error': 'Failed to store data on server' };
        }
    }
    catch (err) {
        return { 'error': 'Failed' };
    }
}

const API = { loadProducts, loadClients, sendOrder, loadClient, createProduct, updateProduct, deleteProduct, login, logout, isLoggedIn, loadOrders, updateOrder, payOrder, addNewUser, loadNextProducts, getClock, setClock, updateBasket, loadWallet, confirmOrder, loadAvailableOrders, loadDeliveries, loadDeliverableProducts, createDelivery, confirmOrderForPickUp,modifyOrder };
export default API;
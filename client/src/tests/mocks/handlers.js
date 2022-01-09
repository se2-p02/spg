import { rest } from 'msw'

export const handlers = [
    // Handles a GET /api/deliverableProducts
    rest.get('http://localhost:3000/api/deliverableProducts', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    TerraGrossa: [
                        {
                            id: 2,
                            quantity: 2,
                            farmer: 3,
                            status: 2,
                            name: "Eggs",
                            orderId: 1
                        }
                    ],
                    FattoriaBella: [
                        {
                            id: 7,
                            quantity: 1,
                            farmer: 7,
                            status: 2,
                            name: "Cheese",
                            orderId: 1
                        }
                    ]
                }
            ),
        )
    }),
    // Handles a GET /api/deliveries
    rest.get('http://localhost:3000/api/deliveries', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                [
                    {
                        id: 5,
                        product: {
                            id: 2,
                            name: "Eggs",
                            farmer: 7
                        },
                        farmer: {
                            id: 3,
                            name: "TerraGrossa"
                        },
                        quantity: 2,
                        orderId: 1
                    }
                ]
            ),
        )
    }),
    rest.get('http://localhost:3000/api/orders', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                [
                    { id: 1, userID: 2, products: [{id:1, name:'Flour', quantity:2.0, farmer:7, status:0}], address: {address: 'Via Roma 3', deliveryOn: '2002-22-10'}, date: 'eee', time: 'ooo', amount: 10.0, conf: 0, fulfilled: 0, paid: 0 }
                ]
            ),
        )
    }),
    rest.get('http://localhost:3000/api/unretrievedOrders/2021-11-30', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                [
                    { id: 1, userID: 2, products: [{id:1, name:'Flour', quantity:2.0, farmer:7, status:0}], address: {address: 'Via Roma 3', deliveryOn: '2021-11-27'}, date: '2021-11-27', time: 'ooo', amount: 10.0, conf: 0, fulfilled: 0, paid: 0 },
                    { id: 2, userID: 2, products: [{id:1, name:'Milk', quantity:3.0, farmer:7, status:0}], address: {address: 'Via Roma 3', deliveryOn: '2021-11-27'}, date: '2021-11-27', time: 'ooo', amount: 10.0, conf: 0, fulfilled: 0, paid: 0 }
                ]
            ),
        )
    }),
    rest.get('http://localhost:3000/api/clients', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                [
                    {
                        id: 1,
                        name: "Nino",
                        surname: "Frassica",
                        role: "employee"
                    },
                    {
                        id: 2,
                        name: "Gigi",
                        surname: "Riva",
                        role: "client"
                    }
                ]
            ),
        )
    }),
    rest.get('http://localhost:3000/api/orderswithstatus/available', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                [
                    { id: 1, userID: 2, products: [{id:1, name:'Flour', quantity:2.0, farmer:7, status:0}], address: {address: 'Via Roma 3', deliveryOn: '2002-22-10'}, date: 'eee', time: 'ooo', amount: 10.0, conf: 0, fulfilled: 0, paid: 0 }
                ]
            ),
        )
    }),
    rest.get('http://localhost:3000/api/nextProducts', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                [
                    {
                        id: 2,
                        name: "Milk",
                        quantity: 1,
                        unit: "pcs",
                        filter: "Dairy and Eggs",
                        farmer: 7,
                        farmerName: "FattoriaBella",
                        price: 7,
                        confirmed: 1,
                        availability: "2021-11-29",
                        image: "eggs.jpg"
                    },
                    {
                        id: 9,
                        name: "Findus",
                        quantity: 3,
                        unit: "kg",
                        filter: "Fish",
                        farmer: 7,
                        farmerName: "FattoriaBella",
                        price: 5,
                        confirmed: 0,
                        availability: "2021-11-28",
                        image: "findus.png"
                    },
                    
                ]
            ),
        )
    }),
    rest.get('http://localhost:3000/api/orders', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                [
                    {
                        id: 1,
                        userID: 2,
                        products: [
                            {
                                id: 4,
                                quantity: 2,
                                unit: "kg",
                                price: 10.3,
                                farmer: 7,
                                status: 0,
                                name: "Cheese"
                            }
                        ],
                        address: {
                            address: "STORE PICKUP",
                            deliveryOn: "2021-12-01 11:30"
                        },
                        date: "2021-11-30",
                        time: "09:22",
                        amount: 20.6,
                        conf: 0,
                        fulfilled: 0,
                        paid: 1,
                        status: "not_available"
                    }
                ]
            ),
        )
    })
    
]




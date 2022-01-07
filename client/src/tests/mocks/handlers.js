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
    rest.get('http://localhost:3000/api/unretrievedOrders/:datetime', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                [
                    { id: 1, userID: 2, products: [{id:1, name:'Flour', quantity:2.0, farmer:7, status:0}], address: {address: 'Via Roma 3', deliveryOn: '2021-11-27'}, date: '2021-11-27', time: 'ooo', amount: 10.0, conf: 0, fulfilled: 0, paid: 0 },
                    { id: 2, userID: 2, products: [{id:1, name:'Milk', quantity:3.0, farmer:7, status:0}], address: {address: 'Via Roma 3', deliveryOn: '2021-11-27'}, date: '2021-11-27', time: 'ooo', amount: 10.0, conf: 0, fulfilled: 0, paid: 0 }
                ]
            ),
        )
    })
]
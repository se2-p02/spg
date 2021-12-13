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
]
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import MyFarmerOrders from "../components/MyFarmerOrders";
import moment from 'moment'
import renderWithRouter from './setupTestsRouter'


describe('Test MyFarmerOrders', () => {
    it("tests components", async () => {
        renderWithRouter(<MyFarmerOrders
            clock={moment('2021-11-27 7:55')}
            setClock={jest.fn()}
            user={{ id: 7, role: "farmer", username: "farmer@farmer.farmer" }} />, "/farmer/orders");

        await waitFor(()=>{
            expect(screen.getByText("Order #1")).toBeInTheDocument();
            expect(screen.getByText("User #2")).toBeInTheDocument();
            expect(screen.getByText("Products")).toBeInTheDocument();
            expect(screen.getByText("Delivery")).toBeInTheDocument();
            expect(screen.getByText("Amount")).toBeInTheDocument();
        })

    });

});
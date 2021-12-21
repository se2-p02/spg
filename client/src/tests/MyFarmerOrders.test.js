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

        let elem = screen.getByText("User")
        expect(elem).toBeInTheDocument();

        elem = screen.getByText("Products")
        expect(elem).toBeInTheDocument()

        elem = screen.getByText("Address")
        expect(elem).toBeInTheDocument()

        elem = screen.getByText("Date")
        expect(elem).toBeInTheDocument()

        elem = screen.getByText("Time")
        expect(elem).toBeInTheDocument()


    });

    it("tests components' behaviour", async () => {
        renderWithRouter(<MyFarmerOrders
            clock={moment('2021-11-25 7:55')}
            setClock={jest.fn()}
            user={{ id: 7, role: "farmer", username: "farmer@farmer.farmer" }} />, "/farmer/orders");

        await waitFor(() => {
            const element = screen.getByTestId('buttonGreen0');
            expect(element).toBeInTheDocument();
            act(() => fireEvent.click(element));
        });

    });
});
import React from "react";
import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import MyOrders from "../components/MyOrders";
import moment from 'moment'
import renderWithRouter from './setupTestsRouter'


describe('Test MyFarmerOrders', () => {
    it("tests components", async () => {
        renderWithRouter(<MyOrders
            clock={moment('2021-11-27 7:55')}
            setClock={jest.fn()}
            user={{ id: 1, role: "employee", username: "admin@admin.admin" }} />, "/employee/orders");
        /*
            let elem = screen.getByText("Order")
            expect(elem).toBeInTheDocument();

            elem = screen.getByText("User")
            expect(elem).toBeInTheDocument()

            elem = screen.getByText("Products")
            expect(elem).toBeInTheDocument()

            elem = screen.getByText("Delivery")
            expect(elem).toBeInTheDocument()

            elem = screen.getByText("Amount")
            expect(elem).toBeInTheDocument()

            elem = screen.getByText("Fulfilled")
            expect(elem).toBeInTheDocument()

            elem = screen.getByText("Modify")
            expect(elem).toBeInTheDocument()
*/


        });

        
    

});
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
        
            let elem = screen.getByText("userID")
            expect(elem).toBeInTheDocument();

            elem = screen.getByText("id")
            expect(elem).toBeInTheDocument()

            elem = screen.getByText("products")
            expect(elem).toBeInTheDocument()

            elem = screen.getByText("address")
            expect(elem).toBeInTheDocument()

            elem = screen.getByText("date")
            expect(elem).toBeInTheDocument()

            elem = screen.getByText("time")
            expect(elem).toBeInTheDocument()

            elem = screen.getByText("amount")
            expect(elem).toBeInTheDocument()

            elem = screen.getByText("fulfilled")
            expect(elem).toBeInTheDocument()

            elem = screen.getByText("Modify")
            expect(elem).toBeInTheDocument()

            elem = screen.getByText("Back")
            expect(elem).toBeInTheDocument()

        });

        it("tests components", async () => {
            renderWithRouter(<MyOrders
                clock={moment('2021-11-27 7:55')}
                setClock={jest.fn()}
                user={{ id: 1, role: "employee", username: "admin@admin.admin" }} />, "/employee/orders");
            
            let elem = screen.getByText("Back")
            fireEvent.click(elem)
            expect(window.location.pathname).toMatch('/employee')

    
            });
    

});
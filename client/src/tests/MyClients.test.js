import React from "react";
import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import MyClients from "../components/MyClients";
import moment from 'moment'
import renderWithRouter from './setupTestsRouter'


describe('Test MyClients', () => {
    it("tests components", async () => {
        renderWithRouter(<MyClients
            clock={moment('2021-11-27 7:55')}
            setClock={jest.fn()}
        />, "/employee/clients");

        let elem = screen.getByText("Id")
        expect(elem).toBeInTheDocument();

        elem = screen.getByText("Name")
        expect(elem).toBeInTheDocument()

        elem = screen.getByText("Surname")
        expect(elem).toBeInTheDocument()

        elem = screen.getByText("Add Client")
        expect(elem).toBeInTheDocument()

        elem = screen.getByText("Back")
        expect(elem).toBeInTheDocument()

    });

    it("tests back button", async () => {
        renderWithRouter(<MyClients
            clock={moment('2021-11-27 7:55')}
            setClock={jest.fn()}
        />, "/employee/clients");

        let elem = screen.getByText("Back")
        fireEvent.click(elem)
        expect(window.location.pathname).toMatch('/employee')
    });

    it("tests add client button", async () => {
        renderWithRouter(<MyClients
            clock={moment('2021-11-27 7:55')}
            setClock={jest.fn()}
        />, "/employee/clients");

        let elem = screen.getByText("Add Client")
        fireEvent.click(elem)
        expect(window.location.pathname).toMatch('/employee/form')
    });

});
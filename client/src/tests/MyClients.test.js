import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MyClients from '../components/MyClients'
import React from 'react'
import { act } from "react-dom/test-utils"
import renderWithRouter from './setupTestsRouter'


describe('Test MyClient', () => {

    test('renders the clients list',  () => {
        renderWithRouter(<MyClients />);
        var element = screen.getByTestId("table")
        expect(element).toBeInTheDocument();
        element = screen.getByTestId("id")
        expect(element).toBeInTheDocument();
        element = screen.getByTestId("name")
        expect(element).toBeInTheDocument();
        element = screen.getByTestId("surname")
        expect(element).toBeInTheDocument();
        element = screen.getByTestId("add_client")
        expect(element).toBeInTheDocument();
        // await waitFor(() => {expect(screen.getByText("Nino")).toBeInTheDocument()})

    });
    test('test the button', async () => {
        renderWithRouter(<MyClients />);
        var element = screen.getByTestId("add_client")
        expect(element).toBeInTheDocument();

        act(() => {
            fireEvent.click(element)
        });
        // await waitFor(() => {expect(screen.getByTestId("form")).toBeInTheDocument()})

        


    });
})
import { render, screen, waitFor } from "@testing-library/react";
import MyStatistics from '../components/MyStatistics'
import React from 'react'
import renderWithRouter from "./setupTestsRouter";
import moment from "moment"


describe('Test MyStatistics', () => {
    test('renders the page with the statistics', async () => {
        renderWithRouter(<MyStatistics
            clock="2021-11-30"
            user={{ id: 2, role: "farmer", username: "farmer@farmer.farmer" }} />, "/manager/unretrievedOrders");

        var element = screen.getByText("Week");
        expect(element).toBeInTheDocument();
        element = screen.getByTestId("order_week");
        expect(element).toBeInTheDocument();
        element = screen.getByTestId("product_week");
        expect(element).toBeInTheDocument();
        element = screen.getByTestId("order_month");
        expect(element).toBeInTheDocument();
        element = screen.getByTestId("product_month");
        expect(element).toBeInTheDocument();
        element = screen.getByText("Month");
        expect(element).toBeInTheDocument();
        element = screen.getByTestId("container");
        expect(element).toBeInTheDocument();

    })

    test('tests values', async () => {
        renderWithRouter(<MyStatistics
            clock={moment('2021-11-25 08:55')}
            user={{ id: 2, role: "farmer", username: "farmer@farmer.farmer" }} />, "/manager/unretrievedOrders");

        await waitFor(() => {
            var element = screen.getAllByText("Cheese: 2")
            expect(element[0]).toBeInTheDocument()
            expect(element[1]).toBeInTheDocument()
        })

    })

});
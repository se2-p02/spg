import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import API from "../components/API";
import MyMyProducts from "../components/MyMyProducts";
import moment from 'moment'

describe('Test MyMyproducts', () => {
    it("tests components", async () => {
        render(<MyMyProducts
            clock={moment('2021-11-27 9:55')}
            setClock={jest.fn()}
            user={{ id: 7, role: "farmer", username: "farmer@farmer.farmer" }}
            cart={[]}
            setCart={jest.fn()}
            showCart={true} />);
        
        var elem = screen.getByText("Id");
        expect(elem).toBeInTheDocument();
        elem = screen.getByText("Name");
        expect(elem).toBeInTheDocument();
        elem = screen.getByText("Quantity");
        expect(elem).toBeInTheDocument();
        elem = screen.getByText("Price");
        expect(elem).toBeInTheDocument();
        elem = screen.getByText("Modify");
        expect(elem).toBeInTheDocument();
        elem = screen.getByText("Confirm");
        expect(elem).toBeInTheDocument();

    });
    it("tests error messages", async () => {
        render(<MyMyProducts
            clock={moment('2021-11-27 8:55')}
            setClock={jest.fn()}
            user={{ id: 7, role: "farmer", username: "farmer@farmer.farmer" }}
            cart={[]}
            setCart={jest.fn()}
            showCart={true} />);
        var button = screen.getByTestId("apbw");
        expect(button).toBeInTheDocument();
        expect(button.innerHTML).toBe("New product");

        act(() => {
            fireEvent.click(screen.getByTestId("apbw"));
        });
        var button = screen.getByTestId("submit");
        expect(button).toBeInTheDocument();
        expect(button.innerHTML).toBe("Submit");
    });

});
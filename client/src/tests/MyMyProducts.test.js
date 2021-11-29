import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import API from "../components/API";
import MyMyProducts from "../components/MyMyProducts";
import moment from 'moment'

describe('Test MyMyproducts', () => {
    beforeAll(async () => {
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
        expect(button.innerHTML).toBe("Add new product");

        act(() => {
            fireEvent.click(screen.getByTestId("apbw"));
        });
        var button = screen.getByTestId("submit");
        expect(button).toBeInTheDocument();
        expect(button.innerHTML).toBe("Submit");
    });

    afterAll(() => {
    });
});
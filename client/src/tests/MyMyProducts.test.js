import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
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
    it("tests modal", async () => {
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

        button = screen.getByTestId("close");
        expect(button).toBeInTheDocument();
        expect(button.innerHTML).toBe("Close");

        var elem = screen.getByPlaceholderText("Name")
        expect(elem).toBeInTheDocument();

        elem = screen.getByTestId("name")
        expect(elem).toBeInTheDocument();

        elem = screen.getByTestId("qnt")
        expect(elem).toBeInTheDocument();

        elem = screen.getByTestId("qnt_form")
        expect(elem).toBeInTheDocument();

        elem = screen.getByTestId("unit")
        expect(elem).toBeInTheDocument();

        elem = screen.getByTestId("unit_form")
        expect(elem).toBeInTheDocument();

        elem = screen.getByTestId("price")
        expect(elem).toBeInTheDocument();

        elem = screen.getByTestId("price_form")
        expect(elem).toBeInTheDocument();

        elem = screen.getByTestId("cat")
        expect(elem).toBeInTheDocument();

        elem = screen.getByTestId("cat_form")
        expect(elem).toBeInTheDocument();

        elem = screen.getByTestId("img_form")
        expect(elem).toBeInTheDocument();

        elem = screen.getByTestId("img")
        expect(elem).toBeInTheDocument();

    });
    it("tests time error", async () => {
        render(<MyMyProducts
            clock={moment('2021-11-30 9:55')}
            setClock={jest.fn()}
            user={{ id: 7, role: "farmer", username: "farmer@farmer.farmer" }}
            cart={[]}
            setCart={jest.fn()}
            showCart={true} />);

        var alert = screen.getAllByTestId("alert1");
        expect(alert[0]).toBeInTheDocument();
    });

    it("tests error in modal", async () => {
        render(<MyMyProducts
            clock={moment('2021-11-27 8:55')}
            setClock={jest.fn()}
            user={{ id: 7, role: "farmer", username: "farmer@farmer.farmer" }}
            cart={[]}
            setCart={jest.fn()}
            showCart={true} />);
        act(() => {
            fireEvent.click(screen.getByTestId("apbw"));
        });

        act(() => {
            fireEvent.click(screen.getByTestId("submit"));
        });

        var err = screen.getByText("Name cannot be empty")
        expect(err).toBeInTheDocument();
        err = screen.getByText("Quantity should be greater than 0")
        expect(err).toBeInTheDocument();
        err = screen.getByText("Price should be greater than 0")
        expect(err).toBeInTheDocument();


        act(() => {
            fireEvent.change(screen.getByPlaceholderText('Name'), {
                target: { value: 'test' },
            });
        });

        err = screen.getByText("Quantity should be greater than 0")
        expect(err).toBeInTheDocument();
        err = screen.getByText("Price should be greater than 0")
        expect(err).toBeInTheDocument();

        act(() => {
            fireEvent.change(screen.getByTestId("qnt_form"), {
                target: { value: '2' },
            });
        });

        err = screen.getByText("Price should be greater than 0")
        expect(err).toBeInTheDocument();

    });

});
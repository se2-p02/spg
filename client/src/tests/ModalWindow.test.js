import { render, screen } from '@testing-library/react';
import React from 'react'
import ModalWindow from '../components/ModalWindow';

describe("modal window.js tests", () => {
    test("renders modal window for alert", async () => {

        render(<ModalWindow show={true} onHide={()=>jest.fn()} text={"One or more orders have an amount greater than your wallet. Please top it up."} header={"Insufficient balance!"}/>);
        var element = screen.getByTestId("modal-window")
        expect(element).toBeInTheDocument();

        var element = screen.getByTestId("close-btn")
        expect(element).toBeInTheDocument();

        var element = screen.getByTestId("modal-title")
        expect(element).toBeInTheDocument();

        var element = screen.getByTestId("modal-text")
        expect(element).toBeInTheDocument();

    });
});

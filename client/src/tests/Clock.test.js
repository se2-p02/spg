import { render, screen } from '@testing-library/react';
import React from 'react'
import MyClock from '../components/MyClock';
import moment from 'moment'

describe("Clock tests", () => {
    test("renders modal window for alert", async () => {
        render(<MyClock  value={new Date(moment('2021-11-27 9:55'))} setValue={jest.fn()} clock={moment('2021-11-27 9:55')}/>);

        let elem = screen.getByTestId("clock")
        expect(elem).toBeInTheDocument();

    });
});

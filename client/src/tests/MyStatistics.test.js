import { render, screen } from "@testing-library/react";
import MyStatistics from '../components/MyStatistics'
import React from 'react'
import renderWithRouter from "./setupTestsRouter";


describe('Test MyStatistics', () => {
  test('renders the page with the statistics', () => {
    render(<MyStatistics
      clock={moment('2021-11-27 7:55')}
      user={{ id: 7, role: "farmer", username: "farmer@farmer.farmer" }}/>);

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

})

});
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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
            await waitFor( () => {
                expect(screen.getByText("Order #1")).toBeInTheDocument()
                expect(screen.getByText("User #2")).toBeInTheDocument()
                expect(screen.getByText("Placed")).toBeInTheDocument()
                expect(screen.getByTestId("elem")).toBeInTheDocument()
                expect(screen.getByTestId("header")).toBeInTheDocument()
                expect(screen.getByTestId("body")).toBeInTheDocument()

                act(()=>{
                    fireEvent.click(screen.getByTestId("elem"))
                })
                expect(screen.getByText("MODIFY")).toBeInTheDocument()
                expect(screen.getByText("HAND OUT")).toBeInTheDocument()

            })
        });
        it("tests buttons MODIFY BUTTON", async () => {    
            renderWithRouter(<MyOrders
                full={0}
                cart={[]}
                setOrderId={()=>{jest.fn()}}
                setCart={()=>{jest.fn()}}
                setMOrderUId={()=>{jest.fn()}}
                setModify={()=>{jest.fn()}}
                setOldQuantities={()=>{jest.fn()}}
                setFil={()=>{jest.fn()}}
                clock={moment('2021-11-27 7:55')}
                setClock={jest.fn()}
                user={{ id: 1, role: "employee", username: "admin@admin.admin" }} />, "/employee/orders");
                await waitFor( () => {
    
                    act(()=>{
                        fireEvent.click(screen.getByTestId("elem"))
                    })
                    expect(screen.getByText("MODIFY")).toBeInTheDocument()
                    expect(screen.getByText("HAND OUT")).toBeInTheDocument()
                    act(()=>{
                        fireEvent.click(screen.getByText("MODIFY"))
                    })
                    expect(window.location.pathname).toBe("/employee/products")
    
                })
            });

            it("tests buttons MODIFY BUTTON", async () => {    
                renderWithRouter(<MyOrders
                    full={0}
                    cart={[]}
                    setOrderId={()=>{jest.fn()}}
                    setCart={()=>{jest.fn()}}
                    setMOrderUId={()=>{jest.fn()}}
                    setModify={()=>{jest.fn()}}
                    setOldQuantities={()=>{jest.fn()}}
                    setFil={()=>{jest.fn()}}
                    clock={moment('2021-11-27 7:55')}
                    setClock={jest.fn()}
                    user={{ id: 1, role: "employee", username: "admin@admin.admin" }} />, "/employee/orders");
                    await waitFor( () => {
        
                        act(()=>{
                            fireEvent.click(screen.getByTestId("elem"))
                        })
                        expect(screen.getByText("MODIFY")).toBeInTheDocument()
                        expect(screen.getByText("HAND OUT")).toBeInTheDocument()
                        act(()=>{
                            fireEvent.click(screen.getByText("HAND OUT"))
                        })
        
                    })
                });
   

});
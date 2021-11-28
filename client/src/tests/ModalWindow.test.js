import { render, screen } from '@testing-library/react';
import ModalWindow from '../components/ModalWindow';
const puppeteer = require('puppeteer');

describe("modal window.js tests", () => {
    let browser;
    let page;
  
    beforeAll(async () => {
      browser = await puppeteer.launch();
      page = await browser.newPage();
    });

    it("renders modal window for alert", async () => {
        await page.goto("http://localhost:3000/client");
    
            render(<ModalWindow />);
            var element = screen.findByTestId("modal-window")
            expect(element).toBeInTheDocument();
            
            var element = screen.findByTestId("close-btn")
            expect(element).toBeInTheDocument();
        
            var element = screen.findByTestId("modal-title")
            expect(element).toBeInTheDocument();
        
            var element = screen.findByTestId("modal-text")
            expect(element).toBeInTheDocument();
          
      });

      afterAll(() => browser.close());
    });

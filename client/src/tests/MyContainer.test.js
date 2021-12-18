import React from 'react'
import MyContainer from '../components/MyContainer'
import renderWithRouter from './setupTestsRouter'

test('renders container', () => {
  renderWithRouter(<MyContainer />, "/");
    expect(window.location.pathname).toEqual('/login');
  });
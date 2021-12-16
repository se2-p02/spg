import React from 'react'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

/*
function renderWithRouter(
  ui,
  {
    route = '/',
    history = window.history.replaceState({}, '', "/wmanager")
  } = {}
) {
  return {
    ...render(
      <BrowserRouter >
        <Routes>
          <Route path="/wmanager" element={<MyWManager />}></Route>
          <Route
            path="*"
            element={() => {
              return (<></>);
            }}
          />
        </Routes>
      </BrowserRouter >)
  }
}
*/

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(
    <BrowserRouter>
      <Routes>
        <Route path={route} element={ui} />
        <Route
          path="*"
          element={() => {
            return (<></>);
          }}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default renderWithRouter;
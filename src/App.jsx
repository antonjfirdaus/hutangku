import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Containers
const Layout = React.lazy(() => import('./views/layout'))

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse">Loading....</div>
  </div>
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/*" element={<Layout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App

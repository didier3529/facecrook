import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import LandingPage from '../pages/LandingPage'
import FeedView from '../pages/FeedView'
import SettingsPage from '../pages/SettingsPage'

function PrivateRoute({ element }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  return isAuthenticated
    ? element
    : <Navigate to="/" replace state={{ from: location }} />
}

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
}

export default function ConfigureRouteAccess() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/feed" element={<PrivateRoute element={<FeedView />} />} />
        <Route path="/settings" element={<PrivateRoute element={<SettingsPage />} />} />
      </Routes>
    </Router>
  )
}
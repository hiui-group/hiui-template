import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from '../layout'
import * as Pages from '../views'

export const RootRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/*" element={<MainLayout />}>
        <Route path="home" element={<Pages.Home />} />
        <Route path="about" element={<Pages.About />} />
      </Route>
      <Route path="/*" element={<Navigate to="/home" replace={true} />} />
    </Routes>
  )
}

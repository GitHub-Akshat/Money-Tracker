import { Routes, Route, Navigate } from "react-router-dom"

import Layout from "./components/Layout"
import ProtectedRoute from "./components/ProtectedRoute"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import AddTransaction from "./pages/AddTransaction"
import EditTransaction from "./pages/EditTransaction"
import DeleteTransaction from "./pages/DeleteTransaction"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
          />
          <Route path="/add" element={
            <ProtectedRoute>
              <AddTransaction />
            </ProtectedRoute>
          } />
          <Route path=":id/edit" element={
            <ProtectedRoute>
              <EditTransaction />
            </ProtectedRoute>
          } />
          <Route path=":id/delete" element={
            <ProtectedRoute>
              <DeleteTransaction />
            </ProtectedRoute>
          } />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
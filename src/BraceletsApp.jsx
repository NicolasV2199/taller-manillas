import { Navigate, Route, Routes } from "react-router-dom"

import { NavBar } from "./Components/NavBar"
import { HomePage } from "./Pages/HomePage"
import { OrdersPage } from "./Pages/OrdersPage"


export const BraceletsApp = () => {
  return (
    <>
      <NavBar/>

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/orders" element={<OrdersPage/>} />

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>

    </>
  )
}
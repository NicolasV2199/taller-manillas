import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { usePurchase } from "../hooks/usePurchase";

/*global Swal */

export const OrdersPage = () => {

  const { format } = usePurchase();

  const [orders, setorders] = useState([]);

  const getOrders = () => {
    try {
      onSnapshot(collection(db, 'orders'), (query) => {
        const sortedOrders = query.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .sort((a, b) => a.currency.localeCompare(b.currency));
        setorders(sortedOrders);
      })

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrders();
  }, [])

  const showAlert = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOrder(id);
      }
    })
  }

  const deleteOrder = async(id) => {
    try {
      await deleteDoc(doc(db, 'orders', id));
      Swal.fire(
        'Deleted!',
        'Your order has been deleted.',
        'success'
      )
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <>
      <div className="app-container">
        <div className="card main-card">
          <h1 className="text-center">List of orders</h1>
          <div className="table-responsive">
            <table className="table table-hover align-middle text-start">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th className="text-center">Bracelets Qty</th>
                  <th>Material</th>
                  <th>Charm</th>
                  <th>Type</th>
                  <th>Currency</th>
                  <th className="text-center">Final Price</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>

                {
                  orders.length <= 0 && (<tr><td className="text-center" colSpan={9}>No data available. Create orders first</td></tr>)
                }

                {
                  orders.map((o, index) => (
                    <tr key={o.id}>
                      <td>{index + 1}</td>
                      <td>{o.customer}</td>
                      <td className="text-center">{o.quantity}</td>
                      <td>{o.material}</td>
                      <td>{o.charm}</td>
                      <td>{o.type}</td>
                      <td>{o.currency}</td>
                      <td className="text-end">{format.format(o.finalPrice)}</td>
                      <td className="text-center">
                        <button className="btn btn-danger" onClick={() => showAlert(o.id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
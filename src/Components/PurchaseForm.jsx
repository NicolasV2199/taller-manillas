import { useEffect, useState } from "react";
import options from "../helpers/options"
import { useForm } from "../hooks/useForm";

import { db } from '../firebase';
import { collection, doc, addDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";

/*global Swal */

const [materials, charms, types] = options;

export const PurchaseForm = () => {

  const { onInputChange, onResetForm, material, charm, type, currency, quantity, customer } = useForm({
    material: 'Leather',
    charm: 'Hammer',
    type: 'Gold',
    customer: '',
    currency: 'Dolars',
    quantity: '',
  });

  const [finalPrice, setfinalPrice] = useState(0);
  const [combinations, setcombinations] = useState([]);
  const [orders, setorders] = useState([]);

  useEffect(() => {
    getCombinations();
  }, []);

  useEffect(() => {
    if (quantity) {
      getFinalPrice();
    }
  }, [quantity, currency, material, charm, type])

  const getCombinations = () => {
    try {
      onSnapshot(collection(db, 'combinations'), (query) => {
        setcombinations(query.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      })
    } catch (error) {
      console.log(error);
    }
  }


  const submitBuy = () => {
    const validQuantity = quantity ?? undefined;
    const validCustomer = customer ?? undefined;
    if (validQuantity && validCustomer) {
      createOrder();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops, there was an error...',
        text: 'Please, Fill the form correctly!',
      })
    }
  }

  const createOrder = () => {
    const html = `
      <br>
      <h1 style="text-align: left;">Order Details: </h1>
      <ul style="text-align: left;">
        <li>Customer: ${customer}</li>
        <li>Bracelets quantity: ${quantity}</li>
        <li>Material: ${material}</li>
        <li>Charm: ${charm}</li>
        <li>Type: ${type}</li>
      </ul>
      <br>
      <h2>FINAL PRICE: $${finalPrice} ${currency}</h2>
    `;

    Swal.fire({
      title: 'Please confirm your order details',
      html,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Confirm Order',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        saveOrder();
      }
    })
  }

  const saveOrder = async () => {
    try {
      const data = await addDoc(collection(db, 'orders'), {
        customer,
        quantity,
        material,
        charm,
        type,
        finalPrice,
        currency,
      })
      setorders([...orders, {
        customer,
        quantity,
        material,
        charm,
        type,
        finalPrice,
        currency,
        id: data.id,
      }])

      onResetForm();

      Swal.fire(
        'Success!',
        'Your order has been created.',
        'success'
      )

    } catch (error) {
      Swal.fire(
        'Error!',
        `${error.message}`,
        'error'
      )
    }
  }

  const getFinalPrice = () => {
    const clientCombination = combinations.find(c => c.material == material && c.charm == charm && c.type == type);

    if(clientCombination){
      currency == 'Dolars' 
        ? setfinalPrice(quantity * clientCombination.price) 
        : setfinalPrice(quantity * clientCombination.price * 5000);
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center flex-wrap">

        {/* MATERIALS */}
        <div className="card material-card my-2 mx-3">
          <h3 className="text-center">{materials.title}</h3>
          <img src={materials.image} alt="" className="my-4 rounded" />
          <select className="form-select" aria-label="Default select example" value={material} name="material" onChange={onInputChange}>
            {
              materials.list.map((item) => (
                <option key={item.id} value={item.value}>{item.name}</option>
              ))
            }
          </select>
        </div>

        {/* CHARMS */}
        <div className="card material-card my-2 mx-3">
          <h3 className="text-center">{charms.title}</h3>
          <img src={charms.image} alt="" className="my-4 rounded" />
          <select className="form-select" aria-label="Default select example" value={charm} name="charm" onChange={onInputChange}>
            {
              charms.list.map((item) => (
                <option key={item.id} value={item.value}>{item.name}</option>
              ))
            }
          </select>
        </div>

        {/* TYPES */}
        <div className="card material-card my-2 mx-3">
          <h3 className="text-center">{types.title}</h3>
          <img src={types.image} alt="" className="my-4 rounded" />
          <select className="form-select" aria-label="Default select example" value={type} name="type" onChange={onInputChange}>
            {
              types.list.map((item) => (
                <option key={item.id} value={item.value}>{item.name}</option>
              ))
            }
          </select>
        </div>

      </div>

      <div className="row mt-3">

        {/* Customer Name */}
        <div className="form-group col-md-4 my-1">
          <label htmlFor="name">Customer Name</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              name="customer"
              value={customer}
              id="name"
              onChange={onInputChange}
            />
          </div>
        </div>

        {/* Currency */}
        <div className="form-group col-md-4 my-1">
          <label htmlFor="currency">Currency</label>
          <div className="input-group">
            <select className="form-select" id="currency" value={currency} name="currency" onChange={onInputChange}>
              <option value="Dolars">Dolars</option>
              <option value="Pesos">Colombian pesos</option>
            </select>
          </div>
        </div>

        {/* Bracelets Quantity */}
        <div className="form-group col-md-4 my-1">
          <label htmlFor="quantity">Bracelets quantity</label>
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              value={quantity}
              name="quantity"
              onChange={onInputChange}
              id="quantity"
              placeholder="Enter the number of bracelets you want"
            />
          </div>
        </div>

      </div>

      <div className="row mt-5">

        {
          quantity > 0 && (
            <div className="col-md-12">
              <h3 className="uppercase text-center">Final price: {`$ ${finalPrice} ${currency}`}</h3>
            </div>
          )
        }

        <div className="col-md-12 text-end mt-4">
          <button className="btn btn-primary" onClick={submitBuy}>
            Confirm Purchase
          </button>
        </div>
      </div>

    </>
  )
}
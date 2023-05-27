
/*global Swal */

import { useEffect, useState } from "react";
import { db } from '../firebase';
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { useForm } from "./useForm";


export const usePurchase = () => {

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
      <h2>FINAL PRICE: ${format.format(finalPrice)} ${currency}</h2>
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
      await addDoc(collection(db, 'orders'), {
        customer,
        quantity,
        material,
        charm,
        type,
        finalPrice,
        currency,
      })

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

    if (clientCombination) {
      currency == 'Dolars'
        ? setfinalPrice(quantity * clientCombination.price)
        : setfinalPrice(quantity * clientCombination.price * 5000);
    }
  }

  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });




  return {
    /* useForm */
    onInputChange, 
    onResetForm, 
    material, 
    charm, 
    type, 
    currency, 
    quantity, 
    customer,

    finalPrice,
    submitBuy,
    createOrder,
    format,

  }
}
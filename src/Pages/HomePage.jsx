// import { useState } from "react"
import { NavBar } from "../Components/NavBar"
import { OptionsList } from "../Components/OptionsList"

const options = [
  {
    title: "Material",
    image: '/assets/images/materiales.jpeg',
    list: [
      {
        id: 1,
        name: 'Leather',
        value: 'Leather',
      },
      {
        id: 2,
        name: 'Rope',
        value: 'Rope',
      },
    ]
  },
  {
    title: "Charm",
    image: '/assets/images/dijes.jpeg',
    list: [
      {
        id: 3,
        name: 'Hammer',
        value: 'Hammer',
      },
      {
        id: 4,
        name: 'Anchor',
        value: 'Anchor',
      },
    ]
  },
  {
    title: "Type",
    image: '/assets/images/tipos.jpeg',
    list: [
      {
        id: 5,
        name: 'Gold',
        value: 'Gold',
      },
      {
        id: 6,
        name: 'Pink Gold',
        value: 'Gold',
      },
      {
        id: 7,
        name: 'Silver',
        value: 'Silver',
      },
      {
        id: 8,
        name: 'Nickel',
        value: 'Nickel',
      },
    ]
  },

]

export const HomePage = () => {
  return (
    <>
      <NavBar />
      <div className="home-container">
        <div className="card main-card">
          <h1 className="text-center">Sale of personalized bracelets</h1>
          <p className="text-center">Our high quality bracelets can be made with different materials, please choose the materials you want for your bracelets below: </p>

          <OptionsList options={options} />

          <div className="row mt-3">

            <div className="form-group col-md-4">
              <label htmlFor="name">Buyers name</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  id="name"
                />
              </div>
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="quantity">Bracelets quantity</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  placeholder="Enter the number of bracelets you want"
                />
              </div>
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="quantity">Bracelets quantity</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  placeholder="Enter the number of bracelets you want"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary">
                    Confirm
                  </button>
                </div>
              </div>
            </div>

            {/* <div className="form-group col-md-4">
              <label htmlFor="currency">Currency</label>
              <div className="input-group">
                <select className="form-select" id="currency">
                  <option value="Dolars">Dolars</option>
                  <option value="Pesos">Colombian pesos</option>
                </select>
              </div>
            </div> */}

          </div>

          <div className="row mt-5">
            <div className="col-md-12">
              <h2 className="uppercase text-center">Final price: Dolares: $5000 Pesos Colombianos: $25.000.000</h2>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
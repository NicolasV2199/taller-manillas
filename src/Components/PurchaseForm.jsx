import options from "../helpers/options"
import { usePurchase } from "../hooks/usePurchase";

const [materials, charms, types] = options;

export const PurchaseForm = () => {

  const {
    onInputChange, 
    material, 
    charm, 
    type, 
    currency, 
    quantity, 
    customer,

    finalPrice,
    submitBuy,
    format,
  } = usePurchase();

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
              <h3 className="uppercase text-center">Final price: {`${format.format(finalPrice)} ${currency}`}</h3>
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
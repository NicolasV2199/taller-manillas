import { useState } from "react"

export const OptionCard = ({ option }) => {


  const [selectValue, setSelectValue] = useState();


  return (
    <>
      <div className="card material-card my-2 mx-3">
        <h3 className="text-center">{option.title}</h3>
        <img src={option.image} alt="" className="my-4 rounded" />
        <select className="form-select" aria-label="Default select example" value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
          {
            option.list.map((item) => (
              <option key={item.id} value={item.value}>{item.name}</option>
            ))
          }
        </select>
      </div>
    </>
  )
}
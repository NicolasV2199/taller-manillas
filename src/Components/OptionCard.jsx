import { useState } from "react"

export const OptionCard = ({ option }) => {


  const [selectValue, setSelectValue] = useState();


  return (
    <>
      <div className="card m-3 p-3">
        <h3 className="text-center">{option.title}</h3>
        <img src={option.image} alt="" />
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
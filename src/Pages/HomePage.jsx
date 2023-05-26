// import { useState } from "react"
import { OptionsList } from "../Components/OptionsList"

const options = [
  {
    title: "Material",
    image: 'https://i.pinimg.com/originals/06/83/2f/06832f9477c1a91538e9a5892530fd71.jpg',
    list: [{
        id: 1,
        name: 'Cuero',
        value: 'Cuero',
      },
      {
        id: 2,
        name: 'Cuerda',
        value: 'Cuerda',
      },
    ]
  },
  {
    title: "Dije",
    image: 'https://i.pinimg.com/originals/06/83/2f/06832f9477c1a91538e9a5892530fd71.jpg',
    list: [{
        id: 3,
        name: 'Martillo',
        value: 'Martillo',
      },
      {
        id: 4,
        name: 'Ancla',
        value: 'Ancla',
      },
    ]
  },
  {
    title: "Tipo",
    image: 'https://i.pinimg.com/originals/06/83/2f/06832f9477c1a91538e9a5892530fd71.jpg',
    list: [{
        id: 5,
        name: 'Oro, Oro Rosado',
        value: 'Oro',
      },
      {
        id: 6,
        name: 'Plata',
        value: 'Plata',
      },
      {
        id: 7,
        name: 'Niquel',
        value: 'Niquel',
      },
    ]
  },
 
]

export const HomePage = () => {
  return (
    <>
      <div className="home-container">
        <h1 className="text-center">Venta de Manillas Personalizadas</h1>
        <p>Nuestras manillas de alta calidad pueden ser fabricadas con distintos materiales, por favor escoja a continuación los materiales que desea para sus manillas: </p>

        <OptionsList options={options} />

      </div>
    </>
  )
}
import { OptionCard } from "./OptionCard"


export const OptionsList = ({ options }) => {

  return (
    <>
      <div className="d-flex justify-content-center flex-wrap">
        {
          options.map((option) => (
            <OptionCard key={option.title} option={option}/>
          ))
        }
      </div>
    </>
  )
}
import { PurchaseForm } from "../Components/PurchaseForm"

export const HomePage = () => {

  return (
    <>
      <div className="app-container">
        <div className="card main-card">
          <h1 className="text-center">Sale of personalized bracelets</h1>
          <p className="text-center">Our high quality bracelets can be made with different materials, please choose the materials you want for your bracelets below: </p>
          <PurchaseForm />
        </div>
      </div>
    </>
  )
}
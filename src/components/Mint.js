import React from 'react'
//import { useState } from 'react';

const Mint = (props) => {
// const[inputValue, setValue] = useState('')

function handleSubmit(event){
event.preventDefault()
props.mint(event.currentTarget.elements.nftInput.value)
 
}

  return (
    <div> 

<div className="row">
            <main
              role="main"
              className="col-lg-12 d-flex text-center mt-5 pt-2"
            >
              <div className="content mr-auto ml-auto col-lg-8">
                <h1 className="font-weight-light text-uppercase">
                  NFT-MarketPlace-Csusm
                </h1>

                <form
                  className="form-inline form-control-lg"
                  onSubmit={ handleSubmit}
                  >
                  <input
                    id = 'nftInput'
                    type="text"
                    name="text"
                    placeholder="add a file location"
                    className="  mr-1 col-lg-10 col-md-10 col-sm-10 ml-auto "
                    // value={inputValue}
                    // onChange={(e) => setValue(e.target.value)}
                    required
                  />

                  <input
                    type="submit"
                    value="Mint NFT"
                    
                    className="btn btn-success"
                  />
                  
                </form>
              </div>
            </main>
          </div>


    </div>
  )
}

export default Mint
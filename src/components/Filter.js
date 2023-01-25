import React from 'react'

const Filter = (props) => {
const checked = props.checked
const setState = props.setState

  return (
    <div>
         <form className="ml-5 badge badge-info">
              <label className="mb-0" htmlFor="checkbox">
                Show only your NFTs
              </label>
              <input
                className="ml-2"
                type="checkbox"
                id="checkbox"
                checked={checked}
                onChange={() => {
                  setState({ checked: !checked });
                }}
              />
            </form>

    </div>
  )
}

export default Filter
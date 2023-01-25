import React from 'react'
import Filter from './Filter'

const Navbar = ({logo, account}) => {
  return (
    <div>
          <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap">
          <div className="navbar-brand  col-sm-3 col-md-3">
            <a className="navbar-brand" href="#" />
            <img src={logo} />
            <span className="ml-2">Research Edition</span>
          </div>
         

          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap text-white">
              Account address:{" "}
              <span className="text-dark badge badge-warning ">
                {/* {this.state.account} */}
                {account}
              </span>
            </li>
          </ul>
        </nav>

    </div>
  )
}

export default Navbar
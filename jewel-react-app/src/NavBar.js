import React, { Component } from 'react'; 

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container px-4 px-lg-5">
            <a className="navbar-brand" href="/">
              <span className="navbar-brand mb-0 h1" style={{fontFamily: 'Castellar', fontSize: '35px'}}>Radiance</span>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb mb-lg-0 ms-lg-4 p-3">
                      <li className="nav-item"><a className="nav-link active" aria-current="page" href="/">Home</a></li>
                      <li className="nav-item"><a className="nav-link active" href="/AddJewellery">Add Jewellery</a></li>
                      <li className="nav-item"><a className="nav-link active" href="/AboutUs">About Us</a></li>
                      <li className="nav-item"><a className="nav-link" href="#">Contact us</a></li>
                  </ul>
              </div>
          </div>
        </nav>
    )
   }
}
export default NavBar;
import React from 'react';

const Navbar = ({ onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand">
        <img alt="Logo GOV.CO" src="https://www.adres.gov.co/PublishingImages/Header%20Logos/img-govco.svg"></img>
        </span>
        <div className="d-flex">
          <button className="btn btn-outline-light" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

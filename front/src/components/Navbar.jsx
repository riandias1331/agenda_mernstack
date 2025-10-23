import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            📒 Agenda App
          </Link>
        </div>
        
        <div className="navbar-user">
          {user ? (
            <>
              <span className="user-email">Olá, {user.email}</span>
              <button onClick={onLogout} className="btn-logout">
                Sair
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                Entrar
              </Link>
              <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>
                Registrar
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
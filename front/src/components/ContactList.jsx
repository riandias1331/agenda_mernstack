import React from 'react'

const ContactList = ({ contacts, onEdit, onDelete }) => {
  if (contacts.length === 0) {
    return (
      <div className="contacts-list">
        <div style={{ padding: '2rem', textAlign: 'center', color: '#7f8c8d' }}>
          <p>Nenhum contato cadastrado ainda.</p>
          <p>Clique em "Novo Contato" para adicionar seu primeiro contato!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="contacts-list">
      {contacts.map(contact => (
        <div key={contact._id} className="contact-item">
          <div className="contact-info">
            <h3>
              {contact.name} 
              {contact.lastName && ` ${contact.lastName}`}
            </h3>
            <p>
              {contact.phone}
              {contact.email && ` • ${contact.email}`}
            </p>
          </div>
          <div className="contact-actions">
            <button 
              onClick={() => onEdit(contact)}
              className="btn-secondary"
            >
              Editar
            </button>
            <button 
              onClick={() => onDelete(contact._id)}
              className="btn-danger"
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ContactList
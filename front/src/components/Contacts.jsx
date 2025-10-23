import React, { useState, useEffect } from 'react'
import ContactForm from './ContactForm'
import ContactList from './ContactList'

const Contacts = () => {
  const [contacts, setContacts] = useState([])
  const [editingContact, setEditingContact] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/contacts', {
        credentials: 'include'
      })
      
      if (response.ok) {
        const data = await response.json()
        setContacts(data)
        setError('')
      } else {
        setError('Erro ao carregar contatos')
      }
    } catch (error) {
      setError('Erro de conexão ao carregar contatos')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingContact(null)
    setShowForm(true)
  }

  const handleEdit = (contact) => {
    setEditingContact(contact)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este contato?')) return
    
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      
      if (response.ok) {
        setContacts(contacts.filter(contact => contact._id !== id))
      } else {
        setError('Erro ao excluir contato')
      }
    } catch (error) {
      setError('Erro de conexão ao excluir contato')
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingContact(null)
  }

  const handleFormSubmit = async (contactData) => {
    try {
      let response
      
      if (editingContact) {
        // Atualizar contato existente
        response = await fetch(`/api/contacts/${editingContact._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(contactData),
          credentials: 'include'
        })
      } else {
        // Criar novo contato
        response = await fetch('/api/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(contactData),
          credentials: 'include'
        })
      }
      
      if (response.ok) {
        setShowForm(false)
        setEditingContact(null)
        fetchContacts() // Recarregar lista
        setError('')
      } else {
        const data = await response.json()
        setError(data.error || 'Erro ao salvar contato')
      }
    } catch (error) {
      setError('Erro de conexão ao salvar contato')
    }
  }

  if (loading) {
    return (
      <div className="contacts-container">
        <div className="loading">
          <p>Carregando contatos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="contacts-container">
      <div className="contacts-header">
        <h2>Meus Contatos</h2>
        <button onClick={handleCreate} className="btn-primary">
          + Novo Contato
        </button>
      </div>
      
      {error && <div className="error">{error}</div>}
      
      <ContactList 
        contacts={contacts} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
      
      {showForm && (
        <ContactForm
          contact={editingContact}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}
    </div>
  )
}

export default Contacts
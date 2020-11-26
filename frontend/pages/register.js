import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import api from './_utils/api'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleRegister = async (event) => {
    event.preventDefault()

    try {
      await api.post('/users', { name, email, password })

      router.push('/')
    } catch {
      alert('Algo de errado não está certo. Tente novamente!')
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh' }}>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="name">Seu nome</label>
          <input
            className="form-control"
            id="name"
            type="text"
            placeholder="Nome"
            value={name}
            onChange={event => setName(event.target.value)}
            style={{ width: '300px' }}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Seu e-mail</label>
          <input
            className="form-control"
            id="email"
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Sua senha</label>
          <input
            className="form-control"
            id="password"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <Link href="/">
            Voltar
          </Link>

          <button className="btn btn-primary" type="submit">Registrar</button>
        </div>
      </form>
    </div>
  )
}

export default Register
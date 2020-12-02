import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import api from './_utils/api'
import { isAuthenticated } from './_utils/auth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const response = await api.post('/auth', { email, password })

      if (response.data) {
        api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`

        localStorage.setItem('@user:token', response.data.token)
      }

      router.push('/tasks')
    } catch {
      alert('Algo de errado não está certo. Tente novamente!')
    }
  }

  useEffect(() => {
    isAuthenticated() && router.push('/tasks')
  }, [])

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh' }}>
      <Head>
        <title>Task List | Login</title>
      </Head>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            className="form-control"
            id="email"
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={event => setEmail(event.target.value)}
            style={{ width: '300px' }}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
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
          <button className="btn btn-secondary" type="submit">Entrar</button>

          <Link href="/register">
            Registrar
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import { FaClipboardCheck } from 'react-icons/fa'
import { FiLogOut, FiPlusCircle } from 'react-icons/fi'

import { StatusName } from './_utils/statusData'

import TableData from './_components/TableData'

import api from './_utils/api'

import styles from '../styles/Tasks.module.css'
import { isAuthenticated } from './_utils/auth'

const TaskList = () => {
  const router = useRouter()

  const [user, setUser] = useState([])
  const [tasks, setTasks] = useState([])

  const titleRef = useRef('')
  const descriptionRef = useRef('')

  const loadTasks = async () => {
    const response = await api.get('tasks', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('@user:token')
      }
    })

    if (response.data) {
      setTasks(response.data)
    }
  }

  const addTask = async (event) => {
    event.preventDefault()

    const newTask = {
      title: titleRef.current,
      description: descriptionRef.current,
      status: StatusName['NOT_STARTED']
    }

    try {
      await api.post('tasks', newTask, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('@user:token')
        }
      })

      const inputTitle = document.getElementById('title')
      const inputDescription = document.getElementById('description')

      titleRef.current = ''
      descriptionRef.current = ''

      inputTitle.value = ''
      inputDescription.value = ''
      inputTitle.focus()

      loadTasks()
    } catch (err) {
      alert('Opa! Estamos com problemas internos')

      window.location.reload()
    }
  }

  const updateTask = async (id) => {
    try {
      if (tasks.filter(t => t.id === id)[0].status === StatusName['NOT_STARTED']) {
        await api.put(`tasks/${id}`, {
          status: StatusName['IN_PROGRESS']
        }, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('@user:token')
          }
        })
      } else if (tasks.filter(t => t.id === id)[0].status === StatusName['IN_PROGRESS']) {
        await api.put(`tasks/${id}`, {
          status: StatusName['COMPLETED']
        }, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('@user:token')
          }
        })
      } else {
        await api.put(`tasks/${id}`, {
          status: StatusName['NOT_STARTED']
        }, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('@user:token')
          }
        })
      }
    } catch (err) {
      alert('Opa! Estamos com problemas internos')

      window.location.reload()
    }

    loadTasks()
  }

  const deleteTask = async (id) => {
    try {
      await api.delete(`tasks/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('@user:token')
        }
      })

      loadTasks()
    } catch (err) {
      alert('Opa! Estamos com problemas internos')

      window.location.reload()
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    localStorage.clear()

    router.push('/')
  }

  useEffect(() => {
    document.getElementById('title').focus()

    !isAuthenticated() && router.push('/')

    const loadUser = async () => {
      const response = await api.get('user', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('@user:token')
        }
      })

      if (response.data) {
        setUser(response.data)
      }
    }

    loadUser()
    loadTasks()
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Lista de Tarefas</title>
        <link rel="image/ico" href="../public/favicon.ico" />
      </Head>

      <div className={styles.header}>
        <h1 className={styles.title}>
          <FaClipboardCheck size={40} color="#333" /> &nbsp;
          Lista de Tarefas
        </h1>

        {user && (
          <div className={styles.user}>
            <h3>Olá, {user.name}</h3>

            <button className="btn btn-danger" style={{ marginBottom: 5, marginLeft: 15 }} onClick={handleLogout}>
              <FiLogOut size={20} color="#eee" />
            </button>
          </div>
        )}
      </div>

      <form className={styles.form} onSubmit={addTask} method="POST">
        <input
          type="text"
          id="title"
          placeholder="Título"
          onChange={event => titleRef.current = event.target.value}
          autoFocus
          required
        />

        <input
          type="text"
          id="description"
          onChange={event => descriptionRef.current = event.target.value}
          placeholder="Descrição"
        />

        <button type="submit" className={styles.buttonAdd}>
          <FiPlusCircle size={20} color="#2c3e50" />
          Nova Tarefa
        </button>
      </form>

      <TableData
        tasks={tasks}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />

      {!tasks.length && (
        <div className={styles.container}>
          <span>Sem dados para mostrar</span>
        </div>
      )}
    </div>
  )
}

export default TaskList
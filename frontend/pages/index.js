import Head from 'next/head'
import { useState, useRef, useEffect } from 'react'
import { FaClipboardCheck } from 'react-icons/fa'
import { FiPlusCircle, FiCheck } from 'react-icons/fi'

import { StatusName } from './_utils/statusData'

import TableData from './_components/TableData'

import styles from '../styles/Tasks.module.css'
import api from './_utils/api'

const TaskList = () => {
  const [tasks, setTasks] = useState([])

  const titleRef = useRef('')
  const descriptionRef = useRef('')

  const loadTasks = async () => {
    const response = await api.get('tasks')

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
      await api.post('tasks', newTask)

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
      await api.put(`tasks/${id}`, {
        status: StatusName['COMPLETED']
      })
    } catch (err) {
      alert('Opa! Estamos com problemas internos')

      window.location.reload()
    }

    loadTasks()
  }

  const deleteTask = async (id) => {
    try {
      await api.delete(`tasks/${id}`)

      loadTasks()
    } catch (err) {
      alert('Opa! Estamos com problemas internos')

      window.location.reload()
    }
  }

  useEffect(() => {
    document.getElementById('title').focus()

    loadTasks()
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Lista de Tarefas</title>
        <link rel="image/ico" href="../public/favicon.ico" />
      </Head>

      <h1 className={styles.title}>
        <FaClipboardCheck size={40} color="#333" /> &nbsp;
        Lista de Tarefas
      </h1>

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
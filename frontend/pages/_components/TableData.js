import { Table } from 'reactstrap'
import { FiTrash2, FiEdit, FiCheckSquare } from 'react-icons/fi'
import moment from 'moment'

import styles from '../../styles/Table.module.css'

const TableData = ({ tasks, updateTask, deleteTask }) => (
  <Table bordered className={styles.table}>
    <thead className="thead-dark">
      <tr>
        <th>Ações</th>
        <th>Título</th>
        <th>Descrição</th>
        <th>Data | Hora</th>
        <th>Status</th>
      </tr>
    </thead>

    {tasks.length > 0 && (
      <tbody>
        {tasks.map(task => (
          <tr key={task.id} className={styles.actions}>
            <td align="center">
              <FiCheckSquare
                size={20}
                color="#16a085"
                onClick={() => updateTask(task.id)}
              />
              <FiTrash2
                size={20}
                color="#c0392b"
                onClick={() => deleteTask(task.id)}
              />
            </td>
            <td
              className={task.status !== 'Não iniciado' && styles.completed}
            >
              {task.title}
            </td>
            <td
              className={task.status !== 'Não iniciado' && styles.completed}
            >
              {task.description}
            </td>
            <td
              className={task.status !== 'Não iniciado' && styles.completed}
            >
              {moment(task.updated_at).format('DD/MM/YYYY HH:mm')}
            </td>
            <td
              className={task.status !== 'Não iniciado' && styles.completed}
            >
              <em>
                <strong
                  className={task.status === 'Não iniciado' ? styles.notStarted : styles.completed}
                >
                  {task.status}
                </strong>
              </em>
            </td>
          </tr>
        ))}
      </tbody>
    )}
  </Table>
)

export default TableData
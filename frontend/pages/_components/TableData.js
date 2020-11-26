import { Table } from 'reactstrap'
import { FiTrash2, FiCheckSquare, FiXSquare, FiPlusSquare } from 'react-icons/fi'
import moment from 'moment'

import { StatusName } from '../_utils/statusData'

import styles from '../../styles/Table.module.css'

const TableData = ({ tasks, updateTask, deleteTask }) => {
  return (
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
              <td align="center" style={{ background: '#f2eed3' }}>
                {task.status === StatusName['NOT_STARTED']
                  ? (
                    <FiPlusSquare
                      size={20}
                      color="#2980b9"
                      onClick={() => updateTask(task.id)}
                    />
                  )
                  : task.status === StatusName['IN_PROGRESS']
                    ? (
                      <FiCheckSquare
                        size={20}
                        color="#16a085"
                        onClick={() => updateTask(task.id)}
                      />
                    )
                    : (
                      (
                        <FiXSquare
                          size={20}
                          color="#c2665d"
                          onClick={() => updateTask(task.id)}
                        />
                      )
                    )
                }

                <FiTrash2
                  size={20}
                  color="#c0392b"
                  onClick={() => deleteTask(task.id)}
                  style={{ marginBottom: 2, marginLeft: 5 }}
                />
              </td>
              <td
                className={
                  task.status === StatusName['NOT_STARTED']
                    ? styles.notStarted
                    : task.status === StatusName['IN_PROGRESS']
                      ? styles.progress
                      : styles.completed
                }
              >
                {task.title}
              </td>
              <td
                className={
                  task.status === StatusName['NOT_STARTED']
                    ? styles.notStarted
                    : task.status === StatusName['IN_PROGRESS']
                      ? styles.progress
                      : styles.completed
                }
              >
                {task.description}
              </td>
              <td
                className={
                  task.status === StatusName['NOT_STARTED']
                    ? styles.notStarted
                    : task.status === StatusName['IN_PROGRESS']
                      ? styles.progress
                      : styles.completed
                }
              >
                {moment(task.updated_at).format('DD/MM/YYYY HH:mm')}
              </td>
              <td
                className={
                  task.status === StatusName['NOT_STARTED']
                    ? styles.notStarted
                    : task.status === StatusName['IN_PROGRESS']
                      ? styles.progress
                      : styles.completed
                }
              >
                <em>
                  <strong
                    className={
                      task.status === StatusName['NOT_STARTED']
                        ? styles.notStarted
                        : task.status === StatusName['IN_PROGRESS']
                          ? styles.progress
                          : styles.completed
                    }
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
}

export default TableData
import { useState } from 'react'

import styles from './index.module.css'

function IndexPopup() {
  const [data, setData] = useState('')

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 16
      }}
      className={styles.container}>
      <h2>
        Welcome to your
        <a href="https://www.plasmo.com"> Plasmo</a> Extension!
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href="https://docs.plasmo.com">View Docs</a>
    </div>
  )
}

export default IndexPopup
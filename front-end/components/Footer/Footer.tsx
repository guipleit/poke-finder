import React from 'react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <div className={styles.footer}>
          <h1 className={styles.title}>Developed by Guilherme Leite: <a className={ styles.gitLink } href='https://github.com/guipleit'>Github</a></h1>
    </div>
  )
}

import React from 'react'
import styles from '@/styles/app/(main)/oem/datatable.module.scss'
import { Datatable } from '@/components/oem/Participation'

const Page = () => {
  return (
    <div className={styles.container}>
        <h1>Participation</h1>
        <Datatable/>
    </div>
  )
}

export default Page
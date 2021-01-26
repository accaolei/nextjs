import React, { useState } from 'react'
import styles from '../../styles/editor.module.css'
import Head from 'next/head';
import { MyEditor } from '../../components/editor';
import {SerializeHtml} from '../../components/serializing';

const LIST_TYPES = ['numbered-list', 'bulleted-list']

export default function Index() {
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'Hello, 一个编辑器.' }],
    },
  ])

  const onChange = (values)=>{
    console.log(values)
    setValue(values)
    console.log(SerializeHtml(values))
  }


  return (
    <div className={styles.editor}>
      <Head>
        <title>基于slate的编辑器</title>
      </Head>
      <MyEditor value={value} onChange={onChange} />
    </div>
  )
}

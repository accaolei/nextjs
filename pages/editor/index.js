import React, { useEffect, useMemo, useState } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import styles from '../../styles/editor.module.css'
import Head from 'next/head';

export default function Index(){
    const editor = useMemo(() => withReact(createEditor()), [])
    // Add the initial value when setting up our state.
    const [value, setValue] = useState([
        {
        type: 'paragraph',
        children: [{ text: 'Hello, 一个编辑器.' }],
        },
    ])

    return (
        <div className={styles.editor}>
            <Head>
                <title>基于slate的编辑器</title>
            </Head>
            <Slate
                editor={editor}
                value={value}
                onChange={newValue => setValue(newValue)}
            >
                <Editable />
            </Slate>
        </div>
    )
}

import React, { useEffect, useMemo, useState } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import styles from '../../styles/editor.module.css'

export default function Index(){
    const editor = useMemo(() => withReact(createEditor()), [])
    // Add the initial value when setting up our state.
    const [value, setValue] = useState([
        {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
        },
    ])

    return (
        <div className={styles.editor}>
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

import React, { useState,useMemo } from 'react'
import {Slate,Editable,withReact} from 'slate-react'
import {createEditor,Node} from 'slate'
import { withHistory } from 'slate-history'

const initialValue = [
    {
        children:[
            {text: "plain text"}
        ]
    }
]

const serialize =nodes =>{
    return nodes.map(n=>Node.string(n)).join("\n")
}

export default function Index(){
    const [value,setValue] = useState(initialValue)
    const editor = useMemo(()=>withReact(createEditor()),[])
    return (
        <div>
            <Slate editor={editor} value={value} onChange={value=>{
                setValue(value)
                console.log(serialize(value))
            }}>
                <Editable placeholder="enter some plain text..." />
            </Slate>
        </div>
    )
}

import React, { useCallback, useMemo, useState } from 'react'
import { createEditor, Editor, Transforms, Element as SlateElement } from 'slate'
import { Slate, Editable, withReact, useSlate,useSelected,useFocused } from 'slate-react'
import { IconButton, Icon, Toolbar } from './components';
import { BoldOutlined, ItalicOutlined, UnderlineOutlined,PictureOutlined } from '@ant-design/icons'
import { css, cx } from '@emotion/css'

const LIST_TYPES = ['numbered-list', 'bulleted-list']


export const MyEditor = ({value,onChange})=>{
    const editor = useMemo(() => withImages(withReact(createEditor())), [])
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const onKeyDown = (editor, event) => {
        console.log(editor)
        const ref = Editor.pointRef(editor)
        console.log(ref)
        switch (event.key) {

        case "&":
            event.preventDefault()
            editor.insertText('and')
        }
    }
    return(
        <Slate
        editor={editor}
        value={value}
        
        onChange={newValue => onChange(newValue)}
      >
        <Toolbar>
          {/* <MarkButton format="bold" icon={<BoldOutlined />} />
          <MarkButton format="italic" icon={<ItalicOutlined />} />
          <MarkButton format="underline" icon={<UnderlineOutlined />} /> */}
          <BlockButton format="heading-one" icon="1" />
          <BlockButton format="heading-two" icon="2" />
          <BlockButton format="block-quote" icon="”" />
          <InsertImageButton />
        </Toolbar>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          
          onKeyDown={event => onKeyDown(editor, event)}
        />
      </Slate>
    )
}

const withImages = editor => {
  const { insertData, isVoid } = editor

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = data => {
    const text = data.getData('text/plain')
    const { files } = data

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result
            insertImage(editor, url)
          })

          reader.readAsDataURL(file)
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

const insertImage = (editor,url)=>{
  const text = {text: ''}
  const image = {type:'image',url,children:[text]}
  Transforms.insertNodes(editor,image)
  Transforms.insertNodes(editor,{type: 'paragraph', children:[text]})
}

const InsertImageButton = ()=>{
  const editor = useSlate()
  return (
    <IconButton onMouseDown={event=>{
      event.preventDefault()
      const url = 'https://yiyu-mp.oss-cn-zhangjiakou.aliyuncs.com/logo_bg.png?x-oss-process=style/ya'
      insertImage(editor,url)
    }}>
      <Icon><PictureOutlined /></Icon>
    </IconButton>
  )
}


const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <IconButton
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </IconButton>
  )
}


const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      LIST_TYPES.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
      ),
    split: true,
  })
  const newProperties= {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  }
  Transforms.setNodes(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}


const BlockButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <IconButton
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </IconButton>
  )
}

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  })

  return !!match
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}
const Element = (props) => {
  const { attributes, children, element } = props
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'image':
      return <ImageElement {...props} />
    default:
      return <p {...attributes}>{children}</p>
  }
}

const ImageElement = ({ attributes, children, element }) => {
  const selected = useSelected()
  const focused = useFocused()
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img
          src={element.url}
          className={css`
            display: block;
            max-width: 100%;
            max-height: 20em;
            box-shadow: ${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'};
          `}
        />
      </div>
      {children}
    </div>
  )
}

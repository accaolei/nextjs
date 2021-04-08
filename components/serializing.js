import {Node,Text} from 'slate'
import escapeHtml from 'escape-html'


export const PlainSerialize =nodes =>{
    return nodes.map(n=>Node.string(n)).join("\n")
}

export const Serialize = node=>{
    console.log(node,'node')
    let children = ''
    // if(node.children){
    //      children = node.children.map(n => Serialize(n)).join('')
    // }
    console.log(children,'d22')
    

    switch (node.type) {
        case 'quote':
            return `<blockquote><p>${children}</p></blockquote>`
        case 'paragraph':
            return `<p>${node.children[0].text}</p>`
        case 'link':
            return `<a href="${escapeHtml(node.url)}">${children}</a>`
        case 'image':
            return `<div><img style="display: block;max-width: 100%;" src="${node.url}"></img></div>`
        case 'block-quote':
            return `<blockquote >${node.children[0].text}</blockquote>`
        case 'heading-one':
            return `<h1>${node.children[0].text}</h1>`
        case 'heading-two':
            return `<h2 >${node.children[0].text}</h2>`
        default:
            return children
    }
}

export const SerializeHtml = nodes =>{
    const children = nodes.map(n=>Serialize(n)).join('')
    return children
}

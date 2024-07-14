import { h } from 'hastscript'
import { visit } from 'unist-util-visit'

const proofEnvironments = ['dfn', 'prop', 'thm', 'lem', 'cor']

export const directivePlugin = () => {
  return (tree) => {
    tree.proofCounter = 0

    visit(tree, (node) => {
      if (node.type === 'inlineCode') {
        const data = node.data || (node.data = {})
        data.hName = 'code'

        data.hProperties = h('code', { class: 'inline-code' } || {}).properties
      }
      if (node.type === 'textDirective') {
        if (node.name === 'section') {
          const data = node.data || (node.data = {})
          data.hName = 'h3'

          data.hProperties = h('h3', { class: 'section' } || {}).properties
        }
      }
      if (node.type === 'containerDirective') {
        if (proofEnvironments.includes(node.name)) {
          const labeledChild = containerLabelProcess(node)

          if (labeledChild != null) {
            const firstChild = fetchFirstChild(node)
            insertChildAsFirstChild(firstChild, labeledChild)
          }

          const data = node.data || (node.data = {})

          data.hName = 'div'
          data.hProperties = h(
            'div',
            { class: `theorem ${node.name}` } || {}
          ).properties
        }

        if (node.name === 'proof') {
          const data = node.data || (node.data = {})
          data.hName = 'div'

          data.hProperties = h('div', { class: 'proof' } || {}).properties
        }
      }
    })
  }
}

const fetchFirstChild = (node) => {
  if (node.children == null || node.children.length === 0) {
    return null
  }

  const firstChild = node.children.at(0)

  return firstChild
}

const fetchOutLabeledChild = (node) => {
  if (node.children == null || node.children.length === 0) {
    return null
  }

  const labeledChild = node.children.find((child) => {
    if (child.data == null) {
      return false
    }

    return child.data.directiveLabel
  })

  node.children = node.children.filter((child) => {
    if (child.data == null) {
      return true
    }

    return !child.data.directiveLabel
  })

  return labeledChild
}

const insertChildAsFirstChild = (node, child) => {
  if (node != null && node.children != null) {
    node.children = [child, ...node.children]
  }
}

const containerLabelProcess = (node) => {
  const labeledChild = fetchOutLabeledChild(node)
  if (labeledChild == null) {
    return null
  }

  const labeledChildData = labeledChild.data || (labeledChild.data = {})
  labeledChild.hName = 'label'
  labeledChildData.hName = 'label'
  labeledChildData.hProperties = h('label', { class: `label` } || {}).properties

  return labeledChild
}

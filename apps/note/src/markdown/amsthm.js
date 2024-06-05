import { visit } from 'unist-util-visit'

const mapThmType = (thmType) => {
  if (thmType === 'dfn') {
    return 'Def'
  } else if (thmType === 'prop') {
    return 'Prop'
  } else if (thmType === 'thm') {
    return 'Thm'
  } else if (thmType === 'lem') {
    return 'Lem'
  } else if (thmType === 'eg') {
    return 'e.g'
  } else {
    return 'Def'
  }
}

const isThm = (node) => {
  return ['dfn', 'prop', 'thm', 'lem', 'eg'].includes(node.name)
}
const isProof = (node) => {
  return node.name === 'proof'
}
const isFigcaption = (node) => {
  return node.name === 'figcaption'
}

const proofProcess = (node) => {
  // remove label node
  node.children = node.children.filter((child) => {
    return !(child.data && child.data.directiveLabel)
  })

  if (!node.children || node.children.length === 0) {
    return
  }

  node.children[0].children = [
    {
      type: 'text',
      value: 'proof.',
      data: {
        hName: 'span',
        hProperties: {
          class: 'amsthm-proof'
        }
      }
    },
    ...node.children[0].children
  ]

  const classes = ['amsthm']

  if (node.attributes && node.attributes.class) {
    classes.push(node.attributes.class)
  }

  node.data = node.data || {}
  node.data.hProperties = {
    class: classes.join(' ')
  }
}

const thmProcess = (node, tree) => {
  if (!node.children || node.children.length === 0) {
    return
  }

  tree.thmid += 1
  const thmType = mapThmType(node.name)

  const labelNode = node.children.find((child) => {
    return child.data && child.data.directiveLabel
  })

  // remove label node
  node.children = node.children.filter((child) => {
    return !(child.data && child.data.directiveLabel)
  })

  if (labelNode) {
    labelNode.data.hProperties = {
      class: 'amsthm-label'
    }
    labelNode.children[0].value = `${thmType}. ${tree.thmid} (${labelNode.children[0].value})`
    labelNode.data.hName = 'span'
    node.children[0].children = [labelNode, ...node.children[0].children]
  } else {
    node.children[0].children = [
      {
        type: 'text',
        value: `${thmType}. ${tree.thmid}`,
        data: {
          hName: 'span',
          hProperties: {
            class: 'amsthm-label'
          }
        }
      },
      ...node.children[0].children
    ]
  }

  const classes = ['amsthm']

  if (node.attributes && node.attributes.class) {
    classes.push(node.attributes.class)
  }

  node.data = node.data || {}
  node.data.hProperties = {
    class: classes.join(' ')
  }
}

const figcaptionProcess = (node, tree) => {
  if (!node.children || node.children.length === 0) {
    return
  }

  node.data = node.data || {}
  node.data.hName = 'figcaption'

  tree.figcaptionid += 1

  node.children[0].children = [
    {
      type: 'text',
      value: `図${tree.figcaptionid}.`,
      data: {
        hName: 'span',
        hProperties: {
          style: 'margin-right: 4px;'
        }
      }
    },
    ...node.children[0].children
  ]
}

export const amsthm = () => {
  function transformer(tree) {
    tree.thmid = 0
    tree.figcaptionid = 0

    visit(tree, 'containerDirective', (node) => {
      if (isThm(node)) {
        thmProcess(node, tree)
      }

      if (isProof(node)) {
        proofProcess(node)
      }

      if (isFigcaption(node)) {
        figcaptionProcess(node, tree)
      }
    })
  }

  return transformer
}

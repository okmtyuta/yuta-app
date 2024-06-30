import { h } from 'hastscript'
import { visit } from 'unist-util-visit'

export const directivePlugin = () => {
  return (tree) => {
    tree.proofCounter = 0

    visit(tree, (node) => {
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        if (node.name === 'theorem' || node.name === 'proof') {
          if (node.name === 'theorem') {
            tree.proofCounter += 1
            const firstChild = node.children.at(0)
            if (firstChild != null) {
              firstChild.value = `${firstChild.value}. ${tree.proofCounter}`
            }
          }

          const data = node.data || (node.data = {})
          const tagName = node.type === 'textDirective' ? 'span' : 'div'

          data.hName = tagName
          data.hProperties = h(tagName, node.attributes || {}).properties
        }
      }
    })
  }
}

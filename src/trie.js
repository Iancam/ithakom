// trie.js;

export const Tree = {
  /**
   * childrenSelector takes a node produced by iteratee and returns a list of child nodes
   * merge takes a node and list of children and assigns the children to the node
   * iteratee takes a node and
   */
  map: (childrenIterator, merge) => (tree, iteratee) => {
    const recurser = (node, parent, path) => {
      const mappedNode = iteratee(node, path, parent);
      const children = childrenIterator(mappedNode)((child, key) =>
        recurser(child, mappedNode, [...path, key])
      );
      return merge(node, children);
    };
    return recurser(tree);
  }
};

export const trie = () => {
  let tree = {};
  return {
    add: (inpPath, value) => {
      let path = inpPath.reverse();
      let parent = tree;
      let cursor = tree;
      let key = null;
      while (path.length) {
        key = path.pop();
        if (!cursor[key]) {
          cursor[key] = {};
        }
        parent = cursor;
        cursor = cursor[key];
      }
      if (value) {
        parent[key] = value;
      }
      return cursor.value;
    },
    get: inpPath => {
      let path = inpPath.reverse();
      let key = null;
      let cursor = tree;
      let parent = tree;
      while (path.length) {
        key = path.pop();
        if (!cursor[key]) {
        }
      }
    },
    tree
  };
};

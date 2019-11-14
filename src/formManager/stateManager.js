import { useState } from "react";
import { trie } from "../trie";

/**
 *
 * @param {{_id: string}} node
 */
const idFactory = (maxTraversal, selector) => node => {
  let retval = [];
  let n = node;
  for (let x = 0; x < maxTraversal; x++) {
    if (!n) return retval.reverse().join(".");
    const { id, parent } = selector(n);
    retval.push(id);
    n = parent;
  }

  throw {
    msg: "exceeded Maximum Depth, does your tree structure have a loop?",
    id: retval.reverse().join(".")
  };
};

/**
 *
 * @param {number} nesting maximum depth of the node
 *
 * pushes the structure of the data tree into the keys,
 * making them '.' delimited paths.
 * this facilitates getting and setting form values
 *
 * when we want to access the structured form, we reconstitute
 * it as a trie.
 */
export function usePathState(
  nesting = 5,
  selector = ({ id, parent }) => ({ id, parent })
) {
  const id = idFactory(nesting, selector);
  const [form, setForm] = useState({});

  const setValue = id => value => {
    const old = form[id];
    return setForm({ ...form, [id]: { ...old, value } });
  };
  const stateManager = node => {
    form[id(node)] || setForm({ ...form, [id(node)]: { ...node } });
    return { set: setValue(id(node)), get: () => form[id(node)] };
  };
  return {
    stateManager,
    flatState: form,
    state: (selector = node => node) => {
      const formTree = trie();
      Object.keys(form).forEach(path => {
        formTree.add(path.split("."), selector(form[path]));
      });
      return formTree.tree;
    }
  };
}

import { BST } from './bst';

export function deleteBST(root: BST | null, value: number): BST | null {
  if (root === null) {
    return null;
  }

  if (value < root.value) {
    root.left = deleteBST(root.left, value);

    return root;
  }

  if (value > root.value) {
    root.right = deleteBST(root.right, value);

    return root;
  }

  if (root.left === null) {
    return root.right;
  } else if (root.right === null) {
    return root.left;
  } else {
    let succParent = root;
    // Find successor
    let succ = root.right;
    while (succ.left !== null) {
        succParent = succ;
        succ = succ.left;
    }

    // TODO: check
    // Delete successor. Since successor
    // is always left child of its parent
    // we can safely make successor's right
    // right child as left of its parent.
    // If there is no succ, then assign
    // succ->right to succParent->right
    if (succParent != root) {
      succParent.left = succ.right;
    } else {
      succParent.right = succ.right;
    }

    root.value = succ.value;

    return root;
  }
}

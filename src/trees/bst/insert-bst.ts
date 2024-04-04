import { BST, createBST } from './bst';

// A new key is always inserted at the leaf by maintaining the property of the binary search tree.
export function insertBST(root: BST, value: number): BST {
  if (value < root.value) {
    if (root.left) {
      return insertBST(root.left, value);
    } else {
      root.left = createBST(value, null, null);

      return root.left;
    }
  }

  if (value > root.value) {
    if (root.right) {
      return insertBST(root.right, value);
    } else {
      root.right = createBST(value, null, null);

      return root.right;
    }
  }

  return root;
}

import { BST } from './bst';

export function searchTree(tree: BST | null, value: number): BST | null {
  if (tree === null || tree.value === value) {
    return null;
  }

  if (value < tree.value) {
    return searchTree(tree.left, value);
  }

  return searchTree(tree.right, value);
}

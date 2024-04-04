import { TreeLike, createNode } from '../common/basic';

export type BST = TreeLike;

export const createBST = createNode;

export function createBSTFromArray(arr: number[]): BST | null {
  return createBSTFromArrayUtil(arr, 0, arr.length - 1);

  function createBSTFromArrayUtil(arr: number[], start: number, end: number): BST | null {
    if (end < start) {
      return null;
    }

    const mid = ((start + end) / 2) | 0;

    const root = createBST(arr[mid], null, null);

    root.left = createBSTFromArrayUtil(arr, start, mid - 1);
    root.right = createBSTFromArrayUtil(arr, mid + 1, end);

    return root;
  }
}

export function rebalanceTree(tree: BST): BST {
  const arr: number[] = [];

  inorderTraverse(tree, value => arr.push(value))

  return createBSTFromArray(arr)!;
}

// Inorder Traversal: At first traverse left subtree then visit the root and then traverse the right subtree.
export function inorderTraverse(tree: TreeLike | null, onNode: (node: number) => void): void {
  if (tree && tree.left) {
    inorderTraverse(tree.left, onNode);
  }

  if (tree) {
    onNode(tree.value);
  }

  if (tree && tree.right) {
    inorderTraverse(tree.right, onNode);
  }
}

// Preorder Traversal: At first visit the root then traverse left subtree and then traverse the right subtree.
export function preorderTraverse(tree: TreeLike | null, onNode: (node: number) => void): void {
  if (tree) {
    onNode(tree.value);
  }

  if (tree && tree.left) {
    preorderTraverse(tree.left, onNode);
  }

  if (tree && tree.right) {
    preorderTraverse(tree.right, onNode);
  }
}

// Postorder Traversal: At first traverse left subtree then traverse the right subtree and then visit the root.
export function postorderTraverse(tree: TreeLike | null, onNode: (node: number) => void): void {
  if (tree && tree.left) {
    postorderTraverse(tree.left, onNode);
  }

  if (tree && tree.right) {
    postorderTraverse(tree.right, onNode);
  }

  if (tree) {
    onNode(tree.value);
  }
}

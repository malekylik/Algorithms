import { createBST } from '../bst/bst';
import { TreeLike } from '../common/basic';

// A path is defined as a simple path if the frequency of the value of any one of the nodes in the path is at least half of the length of the path rounded down to the next greater integer.
// The length of a path from A to node B is the number of nodes you encounter in that unique path while going from A to B.

// Properties of Red Black Tree:
// The Red-Black tree satisfies all the properties of binary search tree in addition to that it satisfies following additional properties –

// 1. Root property: The root is black.
// 2. External property: Every leaf (Leaf is a NULL child of a node) is black in Red-Black tree.
// 3. Internal property: The children of a red node are black. Hence possible parent of red node is a black node.
// 4. Depth property: All the leaves have the same black depth.
// 5. Path property: Every simple path from root to descendant leaf node contains same number of black nodes.

// Rules That Every Red-Black Tree Follows:
// 1. Every node has a color either red or black.
// 2. The root of the tree is always black.
// 3. There are no two adjacent red nodes (A red node cannot have a red parent or red child).
// 4. Every path from a node (including root) to any of its descendants NULL nodes has the same number of black nodes.
// 5. Every leaf (e.i. NULL node) must be colored BLACK.

// Interesting points about Red-Black Tree:
// 1. The black height of the red-black tree is the number of black nodes on a path from the root node to a leaf node. Leaf nodes are also counted as black nodes. So, a red-black tree of height h has black height >= h/2.
// 2. Height of a red-black tree with n nodes is h <= 2 log2(n + 1).
// 3. All leaves (NIL) are black.
// 4. The black depth of a node is defined as the number of black nodes from the root to that node i.e the number of black ancestors.
// 5. Every red-black tree is a special case of a binary tree.

// Applications:
// 1. Most of the self-balancing BST library functions like map, multiset, and multimap in C++ ( or  java packages like java.util.TreeMap and java.util.TreeSet ) use Red-Black Trees.
// 2. It is used to implement CPU Scheduling Linux. Completely Fair Scheduler uses it.
// 3. It is also used in the K-mean clustering algorithm in machine learning for reducing time complexity.
// 4. Moreover, MySQL also uses the Red-Black tree for indexes on tables in order to reduce the searching and insertion time.
// 5 .Red Black Trees are used in the implementation of the virtual memory manager in some operating systems, to keep track of memory pages and their usage.
// 6. Many programming languages such as Java, C++, and Python have implemented Red Black Trees as a built-in data structure for efficient searching and sorting of data.
// 7. Red Black Trees are used in the implementation of graph algorithms such as Dijkstra’s shortest path algorithm and Prim’s minimum spanning tree algorithm.
// 8. Red Black Trees are used in the implementation of game engines.

// n the Red-Black tree, we use two tools to do the balancing.
// 1. Recoloring
// 2 .Rotation

// Recoloring is the change in color of the node i.e. if it is red then change it to black and vice versa.
// Moreover, we always try recoloring first, if recoloring doesn’t work, then we go for rotation.
// The algorithms have mainly two cases depending upon the color of the uncle. If the uncle is red, we do recolor. If the uncle is black, we do rotations and/or recoloring.

export interface RBTree extends TreeLike {
  left: RBTree | null;
  right: RBTree | null;
  parent: RBTree | null;
  color: 'Red' | 'Black';
};

export function createRBTree(value: number, color: 'Red' | 'Black'): RBTree {
  const node = createBST(value, null, null);
  const rbTree = node as RBTree;

  rbTree.parent = null;
  rbTree.color = color;

  return rbTree;
};

export function createRootRBTree(value: number): RBTree {
  return createRBTree(value, 'Black');
};

export function isRBNodeBlack(node: RBTree | null): boolean {
  return node === null || node.color === 'Black';
}

export function rotateLeft(node: RBTree) {
  const right = node.right;
  const rightLeft = right ? right.left : null;

  if (right) {
    right.left = node;
    right.parent = node.parent;
  }

  node.right = rightLeft;
  node.parent = right;

  if (rightLeft !== null) {
    rightLeft.parent = node;
  }

  return right;
}

export function rotateRight(node: RBTree) {
  const left = node.left;
  const leftRight = left ? left.right : null


  if (left) {
    left.right = node;
    left.parent = node.parent;
  }


  node.left = leftRight;
  node.parent = left;


  if (leftRight !== null) {
    leftRight.parent = node;
  }

  return left;
}

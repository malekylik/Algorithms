import { TreeLike } from './common/basic';
import { printTree } from './common/print';

type BST = TreeLike;

function createNode(value: number, left: TreeLike | null, right: TreeLike | null): TreeLike {
  return ({
    value, left, right
  });
}

const createBST = createNode;

// A new key is always inserted at the leaf by maintaining the property of the binary search tree.
function insertBST(root: BST, value: number): BST {
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

function deleteBST(root: BST | null, value: number): BST | null {
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

function createBSTFromArray(arr: number[]): BST | null {
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

function rebalanceTree(tree: BST): BST {
  const arr: number[] = [];

  inorderTraverse(tree, value => arr.push(value))

  return createBSTFromArray(arr)!;
}

// Inorder Traversal: At first traverse left subtree then visit the root and then traverse the right subtree.
function inorderTraverse(tree: TreeLike | null, onNode: (node: number) => void): void {
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
function preorderTraverse(tree: TreeLike | null, onNode: (node: number) => void): void {
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
function postorderTraverse(tree: TreeLike | null, onNode: (node: number) => void): void {
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

function searchTree(tree: TreeLike | null, value: number): TreeLike | null {
  if (tree === null || tree.value === value) {
    return null;
  }

  if (value < tree.value) {
    return searchTree(tree.left, value);
  }

  return searchTree(tree.right, value);
}

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

// const tree =
//   createNode(3,
//     createNode(2,
//         createNode(1, null, null), null), createNode(15,
//                                             createNode(14, null, null), createNode(16, null, null)));

// const tree =
//   createNode(3,
//     createNode(2,
//         createNode(1, null, null), null), null);

// const tree = createBSTFromArray([1, 5, 6, 9, 14, 17, 20]);

// -- Now, after these rotations, re-color according to rotation case (check algorithm for details).

type RBTree = TreeLike & {
  left: RBTree | null;
  right: RBTree | null;
  parent: RBTree | null;
  color: 'Red' | 'Black';
};

function createRBTree(value: number, color: 'Red' | 'Black'): RBTree {
  const node = createBST(value, null, null);
  const rbTree = node as RBTree;

  rbTree.parent = null;
  rbTree.color = color;

  return rbTree;
};

function createRootRBTree(value: number): RBTree {
  return createRBTree(value, 'Black');
};

function isRBNodeBlack(node: RBTree | null): boolean {
  return node === null || node.color === 'Black';
}

function rotateLeft(node: RBTree) {
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

function rotateRight(node: RBTree) {
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

// Algorithm:
// Let x be the newly inserted node.
// Perform standard BST insertion and make the color of newly inserted nodes as RED.
// If x is the root, change the color of x as BLACK (Black height of complete tree increases by 1).
// Do the following if the color of x’s parent is not BLACK and x is not the root.
// a) If x’s uncle is RED (Grandparent must have been black from property 4)
// (i) Change the color of parent and uncle as BLACK.
// (ii) Color of a grandparent as RED.
// (iii) Change x = x’s grandparent, repeat steps 2 and 3 for new x.
// b) If x’s uncle is BLACK, then there can be four configurations for x, x’s parent (p) and x’s grandparent (g) (This is similar to AVL Tree)
// (i) Left Left Case (p is left child of g and x is left child of p)
// (ii) Left Right Case (p is left child of g and x is the right child of p)
// (iii) Right Right Case (Mirror of case i)
// (iv) Right Left Case (Mirror of case ii)
// Re-coloring after rotations:
// For Left Left Case [3.b (i)] and Right Right case [3.b (iii)], swap colors of grandparent and parent after rotations
// For Left Right Case [3.b (ii)]and Right Left Case [3.b (iv)], swap colors of grandparent and inserted node after rotations
function insterRedBlackTree(root: RBTree, value: number): RBTree {
  return _insterRedBlackTree(root, value);

  function _insterRedBlackTree(root: RBTree, value: number): RBTree {
    const newNode = insertNewNode(root, null, value);

    // parent is the root, so it's black - no need to balance
    if (newNode.parent === root) {
      return getNewRoot(newNode);
    }

    const isRecolored = recolor(newNode);

    if (!isRecolored) {
      const rotationsStatus = rotate(newNode);

      recolorAfterRotation(newNode, rotationsStatus);
    }

    return getNewRoot(newNode);

    function insertNewNode(root: RBTree | null, parent: RBTree | null, value: number): RBTree {
      if (root === null) {
        const node = createRBTree(value, 'Red');

        node.parent = parent;
        if (parent && value < parent.value) {
          parent.left = node;
        } else if (parent) {
          parent.right = node;
        }

        return node;
      }

      if (value < root.value) {
        return insertNewNode(root.left, root, value);
      } else if (value > root.value) {
        return insertNewNode(root.right, root, value);
      }

      return root;
    }

    function recolor(node: RBTree | null): boolean {
      if (node === null) {
        return false;
      }

      if (node.parent === null) {
        node.color = 'Black';
      }

      const parent = node.parent;
      const grandparent = parent ? parent.parent : null;
      const uncle = grandparent ? (
        grandparent.left === parent ? grandparent.right : grandparent.left
      ) : null;

      if (!isRBNodeBlack(parent) && parent?.parent !== null) {
        if (!isRBNodeBlack(uncle)) {
          if (parent) {
            parent.color = 'Black';
          }
  
          if (uncle) {
            uncle.color = 'Black';
          }
  
          if (grandparent) {
            grandparent.color = 'Red';
          }
  
          return recolor(grandparent) || true;
        }
      }

      return false;
    }

    function rotate(node: RBTree) {
      const parent = node.parent;
      const grandparent = parent ? parent.parent : null;

      const isLeftLeftRotation = grandparent?.left === parent && parent?.left === node;
      const isLeftRightRotation = grandparent?.left === parent && parent?.right === node;
      const isRightLeftRotation = grandparent?.right === parent && parent?.left === node;
      const isRightRightRotation = grandparent?.right === parent && parent?.right === node;

      if (isLeftLeftRotation) {
        if (node.parent && node.parent.parent) {
          rotateRight(node.parent.parent);
        }
      }

      if (isRightRightRotation) {
        if (node.parent && node.parent.parent) {
          rotateLeft(node.parent.parent);
        }
      }

      if (isLeftRightRotation && node.parent) {
        const grandparent = parent.parent;
        rotateLeft(node.parent);

        if (grandparent) {
          rotateRight(grandparent);
        }
      }

      if (isRightLeftRotation && node.parent) {
        const grandparent = parent.parent;
        rotateRight(node.parent);

        if (grandparent) {
          rotateLeft(grandparent);
        }
      }

      return {
        isLeftLeftRotation, isRightRightRotation,
        isLeftRightRotation, isRightLeftRotation,
      };
    }

    function recolorAfterRotation(node: RBTree, rotationsStatus: { isLeftLeftRotation: boolean; isRightRightRotation: boolean; isLeftRightRotation: boolean; isRightLeftRotation: boolean }) {
      const parent = node.parent;


      if (rotationsStatus.isRightRightRotation || rotationsStatus.isLeftRightRotation) {
        if (parent) {
          const grandparent = parent ? parent.left : null;
          const grantparentColot = grandparent ? grandparent.color : 'Black';

          if (grandparent) {
            grandparent.color = parent.color;
          }
          parent.color = grantparentColot;
        }
      }

      if (rotationsStatus.isLeftLeftRotation || rotationsStatus.isRightLeftRotation) {
        if (parent) {
          const grandparent = parent ? parent.right : null;
          const grantparentColot = grandparent ? grandparent.color : 'Black';

          if (grandparent) {
            grandparent.color = parent.color;
          }
          parent.color = grantparentColot;
        }
      }
    }

    function getNewRoot(node: RBTree): RBTree {
      let newRoot = node;

      while (newRoot.parent !== null) {
        newRoot = newRoot.parent;
      }
  
      return newRoot;
    }
  }
}

// const rotationTreeTest = createNode(
//   50, createNode(17, createNode(9, null, null), createNode(23, null, null)), createNode(76, null, null)
// );

// let rotationTreeTest = createRootRBTree(50);

// rotationTreeTest.left = createRBTree(17, 'Black');
// rotationTreeTest.right = createRBTree(76, 'Black');

// rotationTreeTest.left.parent = rotationTreeTest;
// rotationTreeTest.right.parent = rotationTreeTest;

// rotationTreeTest.left.left = createRBTree(9, 'Black');
// rotationTreeTest.left.right = createRBTree(23, 'Black');

// rotationTreeTest.left.left.parent = rotationTreeTest.left;
// rotationTreeTest.left.right.parent = rotationTreeTest.left;

// rotationTreeTest = rotateRight(rotationTreeTest);
// rotationTreeTest.left = rotateRight(rotationTreeTest.left);
// console.log('\n' + printTree(rotationTreeTest) + '\n');

// rotationTreeTest.left.right = rotateLeft(rotationTreeTest.left.right);
// console.log('\n' + printTree(rotationTreeTest) + '\n');

// rotationTreeTest = rotateLeft(rotationTreeTest);

// console.log('\n' + printTree(rotationTreeTest) + '\n');

const tree1 = createBSTFromArray([10, 20, 30, 100, 150, 200, 300]);

console.log('\n' + printTree(tree1) + '\n');

// if (tree1) {
//   insertBST(tree1, 400);
//   insertBST(tree1, 250);
//   insertBST(tree1, 500);

//   deleteBST(tree1, 10);
//   }

// console.log('\n' + printTree(tree1) + '\n');

// const balanceTree = rebalanceTree(tree1!);

// console.log('\n' + printTree(balanceTree) + '\n');

// console.log('--- RBTree ---');


// let tree = createBST(3, null, null);
// insertBST(tree, 21);
// insertBST(tree, 32);
// insertBST(tree, 15);

// console.log('\n' + printTree(tree) + '\n');

// let rbTree = createRootRBTree(3);

// rbTree = insterRedBlackTree(rbTree, 21);
// rbTree = insterRedBlackTree(rbTree, 32);
// rbTree = insterRedBlackTree(rbTree, 15);

// console.log('\n' + printTree(rbTree, (node) => `(${node ? String(node.value) : String(null)}|${node ? node.color : 'Black'})`) + '\n');

// console.log('inorder');
// inorderTraverse(tree, (node) => { console.log(node) });
// console.log('preorder');
// preorderTraverse(tree, (node) => { console.log(node) });
// console.log('postorder');
// postorderTraverse(tree, (node) => { console.log(node) });

// console.log(searchTree(tree, 101));

// AVL Tree
// Re-balancing is done when the heights of two child subtrees of a node differ by more than one.

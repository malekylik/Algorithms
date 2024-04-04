import { RBTree, createRBTree, isRBNodeBlack, rotateLeft, rotateRight } from './rbtree';

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
export function insterRedBlackTree(root: RBTree, value: number): RBTree {
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

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

// const tree1 = createBSTFromArray([10, 20, 30, 100, 150, 200, 300]);

// console.log('\n' + printTree(tree1) + '\n');

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

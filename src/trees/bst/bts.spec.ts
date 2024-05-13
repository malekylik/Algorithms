import { createBST } from './bst';

describe('BST', () => {
  it('Should create tree without children', () => {
    const rootValue = 5;
    const tree = createBST(rootValue, null, null);

    expect(tree.value).toBe(rootValue);
    expect(tree.left).toBe(null);
    expect(tree.right).toBe(null);
  });
});
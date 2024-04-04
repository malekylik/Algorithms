import { TreeLike, getNumberOfElementInLevel } from './basic';

export function printTree<T extends TreeLike>(tree: T | null, getNodeValue?: (node: T | null) => string): string {
  const levels: (T | null)[][] = [];
  let biggestValueSize = 4;
  const _getNodeValue = getNodeValue ?? (node => node ? String(node.value) : String(null))

  function _printTree(tree: T | null, level: number, elementNumber: number) {
    if (levels[level] === undefined) {
      levels[level] = new Array(getNumberOfElementInLevel(level + 1)).fill(null) as (T | null)[];
    }

    if (tree) {
      levels[level][elementNumber - 1] = tree;

      if (String(tree.value).length > biggestValueSize) {
        biggestValueSize = String(tree.value).length;
      }

      if (tree.left) {
        _printTree(tree.left as T, level + 1, (elementNumber * 2) - 1);
      }

      if (tree.right) {
        _printTree(tree.right as T, level + 1, elementNumber * 2);
      }
    } else {
      levels[level][elementNumber - 1] = null;

      if (biggestValueSize < 4) {
        biggestValueSize = 4;
      }
    }
  }

  _printTree(tree, 0, 1);

  const elementPadding = 4;
  const rowSize = (getNumberOfElementInLevel(levels.length) + 1) * (elementPadding);

  return levels
    .map((level, levelI) =>
      level.map((v) => ' '.repeat(rowSize / getNumberOfElementInLevel(levelI + 1) + 1) + _getNodeValue(v).padStart(biggestValueSize, ' ')).join(''))
    .join('\n')
}

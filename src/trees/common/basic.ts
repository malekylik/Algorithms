export type TreeLike = {
  value: number;
  left: TreeLike | null;
  right: TreeLike | null;
};

export function getNumberOfElementInLevel(level: number) {
  return 1 << ((level - 1) || 0);
}
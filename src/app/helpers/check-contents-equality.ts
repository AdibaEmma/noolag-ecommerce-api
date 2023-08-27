export const areContentsEqual = (contentsA: any[], contentsB: any[]): boolean => {
  if (!contentsA || !contentsB || contentsA.length !== contentsB.length) {
    return false;
  }

  const sortedContentsA = contentsA.slice().sort((a, b) => a.id - b.id);
  const sortedContentsB = contentsB.slice().sort((a, b) => a.id - b.id);

  return JSON.stringify(sortedContentsA) === JSON.stringify(sortedContentsB);
};

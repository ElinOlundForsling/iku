export const reorder: Reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  const resultIndex = result.map((t, i) => {
    t.index = i;
    return t;
  });

  return resultIndex;
};

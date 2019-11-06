export const keyBy = (keyf, arr) => {
  return arr.reduce((agg, curr) => {
    const key = typeof keyf === "function" ? keyf(curr) : keyf;
    agg[curr[key]] = curr;
    return agg;
  }, {});
};

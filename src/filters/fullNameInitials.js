export default value => {
  return value
    .split(" ")
    .map(n => n[0])
    .join("");
};

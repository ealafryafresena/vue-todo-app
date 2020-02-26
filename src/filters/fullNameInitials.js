export default value => {
  const valueSplitted = value.split(" ");
  const firstLastWord = [
    valueSplitted[0],
    valueSplitted[valueSplitted.length - 1]
  ];
  return firstLastWord.map(n => n[0]).join("");
};

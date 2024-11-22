let arr = [1, 2, 32, 4];
let newArr = arr.filter((iterm, index) => {
  return index != 2;
});
console.log(newArr);

let arr = [1, 4, 5, 5, 6, 8];
let nums = arr.reduce((prev, cur) => {
  if (prev.includes(cur)) {
    return prev;
  } else {
    return prev.concat(cur);
  }
}, []);
console.log(nums);

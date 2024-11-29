let pageItem = 2;
let allItem = 13;
let page =
  allItem % pageItem === 0 ? allItem : parseInt(allItem / pageItem) + 1;
console.log(page);

function doubleEncode(str) {
  if (!str) return "";
  let arr = str.split("");
  let newArr = [];

  // for (let c of arr) {
  //   console.log(c)
  //   // newArr.push(encodeURIComponent(encodeURIComponent(c)));
  //   newArr.push(encodeURIComponent(encodeURIComponent(c)));
  // }
  // console.log(newArr)
  // let newStr = newArr.join("");
  // return newStr;
  return encodeURI(str)
}

console.log(encodeURIComponent('$(w)'))
// %20%24%28w%29%20 
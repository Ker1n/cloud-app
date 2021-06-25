export const validationFileName = (str, symbols) => {
  let result;
  let arr = [...str];
  let type = [];
  let cutName = [];

  arr.reverse();

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === ".") {
      type.push(".");
      break;
    }
    type.push(arr[i]);
  }

  arr.reverse();

  for (let i = 0; i < arr.length; i++) {
    if (i === symbols) {
      cutName.push("...") &&
        cutName.push(
          arr[arr.length - type.length - 3],
          arr[arr.length - type.length - 2],
          arr[arr.length - type.length - 1]
        );
      break;
    }
    cutName.push(arr[i]);
  }

  type.reverse();
  let format = type.join("");
  result = cutName.join("") + format;
  return result;
};

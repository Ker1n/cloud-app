export const validationDirName = (str, symbols) => { 
    let result;
    let arr = [...str];
    let cutName = [];
    for (let i = 0; i < arr.length; i++) {
        if(i === symbols) { 
            cutName.push("...") && cutName.push(arr[arr.length -3],arr[arr.length -2], arr[arr.length-1])
            break;
        }
        cutName.push(arr[i]);
    }
    result = cutName.join("");
    return result
}
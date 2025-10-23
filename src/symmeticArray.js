const gen2dArray = (rows, cols) => {
  const array = []
  for(let i = 0; i< rows; i ++){
    const row = []
    for(let j = 0; j<cols; j++) {
      const element = Math.round(Math.random());
      row.push(element)
    }
    array.push(row);
  }
  return array;
}

const genSymmentry = (array) => {
  const rows = array.length;
  const col = array[0].length;
  const numberOfSwaps = 0; 
  console.log("rows: "+ rows + " Col: "+col);

  for(let i = 0 ; i < Math.ceil(rows/2); i++){
    for(let j = 0 ; j < Math.ceil(col/2); j++){
      const sum = array[i][j] + array[rows-i-1][j] + array[i][col-j-1] + array[rows-i-1][col-j-1]
      console.log("i: "+i +" j: "+j)
      console.log("sum: "+ sum);
      console.log(array[i][j])
      console.log(array[rows-i-1][j])
      console.log(array[i][col-j-1])
      if(sum > 2) {
        console.log("replace 1");
        array[i][j] = 1;
        array[rows-i-1][j] = 1;
        array[i][col-j-1] = 1;
        array[rows-i-1][col-j-1] = 1;
      } else {
        console.log("replace 0")
        array[i][j] = 0;
        array[rows-i-1][j] = 0;
        array[i][col-j-1] = 0;
        array[rows-i-1][col-j-1] = 0;
      }
    }
  }
  //console.table(array)
  return array;
}

const printArray = (array) => console.table(array);

const  genArray = gen2dArray(55,55)
printArray(genArray)
console.table(genSymmentry(genArray))


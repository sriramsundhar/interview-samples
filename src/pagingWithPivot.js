// simple program for paging around a pivot element in a circular way

import { expect } from 'chai';
const dbList = [73, 18, 52, 19, 42, 77, 60, 39, 20, 12, 16, 109, 3]

const getPivotIndex = (dbList, pivotId) => {
  for(let i=0;i<dbList.length;i++) {
    if(dbList[i] == pivotId) {
      return i
    }
  }
}
const getIndexsBasedOnPageNoAndPageSize = (pivotIndex,pageSize,pageNumber, sizeOfDbList) => {
  // startIndex 4 + 2*0 = 4
  // endIndex 4 + 2*0 + 2 - 1 = 5
  // startIndex 4 + 2*1 = 6
  // endIndex 4 + 2*1 + 2 - 1 = 7
  // startIndex 4 + 3*0 = 4
  // endIndex 4 + 3*0 + 3 - 1 = 6
  // startIndex 4 + 3*1 = 7
  // endIndex 4 + 3*1 + 3 - 1 = 9

  const startIndex = (pivotIndex + pageSize * pageNumber) 
  const endIndexExcluded = (pivotIndex + pageSize * pageNumber + pageSize)
  return {
    startIndex: startIndex % (sizeOfDbList ),
    endIndex: endIndexExcluded % (sizeOfDbList)
  }

}

const getPage = (dbList, pivotId, pageSize, pageNumber) => {
  const	pivotIndex = getPivotIndex(dbList, pivotId);
  const startAndEndIndex = getIndexsBasedOnPageNoAndPageSize(pivotIndex,pageSize,pageNumber, dbList.length)
  console.log(startAndEndIndex)
  if(pageSize*pageNumber > dbList.length) {
    return []
  } else if (pageSize * pageNumber + pageSize > dbList.length) {
    return dbList.slice(startAndEndIndex.startIndex, pivotIndex)
  } else if(startAndEndIndex.endIndex < startAndEndIndex.startIndex) {
    return  [...dbList.slice(startAndEndIndex.startIndex), ...dbList.slice(0, startAndEndIndex.endIndex)]
  } else {
    return dbList.slice(startAndEndIndex.startIndex, startAndEndIndex.endIndex)
  }
}
//console.log(getPage(dbList, 42, 3,3))
//console.log(getPage(dbList, 42, 3,2))
//console.log(getPage(dbList, 42, 3,1))
//console.log(getPage(dbList, 42, 3,0))
//console.log(getPage(dbList, 42, 3,4))
//console.log(getPage(dbList, 42, 3,5))
console.log(getPage(dbList, 42, 4,0))
console.log(getPage(dbList, 42, 4,1))
console.log(getPage(dbList, 42, 4,2))
console.log(getPage(dbList, 42, 4,3))
console.log(getPage(dbList, 42, 4,5))
expect(getPage(dbList,42,4,0)).to.deep.equal([42,77,60,39])
expect(getPage(dbList,42,4,1)).to.deep.equal([20,12,16,109])
expect(getPage(dbList,42,4,2)).to.deep.equal([3,73,18,52])
expect(getPage(dbList,42,4,3)).to.deep.equal([19])
expect(getPage(dbList,42,4,4)).to.deep.equal([])

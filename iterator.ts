
// we can add value for property [Symbol.iterator] if this has no default iterator.  Like objects - they do not have default iterator
const planet = {
  name: 'Saturn', 
  diameter: 40000, 
  system: 'Andromeda',
  angularVelocity: 350, 
  [Symbol.iterator]: function () {
    const values = Object.values(this);
    let index = 0;
    return {
      next(){
        if(index < values.length - 1){
          index++;
          return {value:values[index], done:false }
        }else{
          return {value:values[index], done:true}
        }
      }
    };
  }
}

console.log('[Symbol.iterator]:')
console.log([...planet]);
for(let val of planet){
  console.log(val);
}

// Or we can create common iterator creation function that will iterate over entries 
function createIteratorOf(obj: Object){
    const entries = Object.entries(obj);
    let index = 0;
    return {
      hasNext(){
        return entries[index + 1];
      },

      next(){
        index++;
        if(index < entries.length - 1){
          return {value: entries[index], done: false}
        }else{
          return {value:entries[index], done: true}
        }
      }
    }
  
}



console.log('createIteratorOf:');
const planetIterator = createIteratorOf(planet);
while(planetIterator.hasNext()){
  console.log('next entries: ', planetIterator.next().value);
}


//iteration over Set 
console.log('Iteration over SET:');
const mySet = new Set(['firstItem', 'secondOne', 33, {name: 'Alex'}, 33, 'firstItem']);
console.log(mySet);
console.log('--- for .. of');
for(let val of mySet){
  console.log(val);
}
console.log('--- .forEach');
mySet.forEach((val)=>console.log(val))

//iteration over Map
console.log('Iteration over MAP:');
const myMap = new Map<any, any>([[{name: 'Alex'}, {status: 'fired'}], [1, 2], ['planet', undefined]]);
console.log(myMap);
console.log('--- for .. of');
for(let val of myMap){
  console.log(val);
}
console.log('--- .forEach');
myMap.forEach((val, index)=>console.log(index, val))

// Singleton 
class Store {

  private static instance: {id: string, name: string};


  constructor(){
  }

  static getInstance(id:string, name:string){
    if(!Store.instance){
      Store.instance = {id, name};
    }
    return Store.instance;
  }
}

const myStore1 = Store.getInstance('id_1', 'SettingsStore_1');
const myStore2 = Store.getInstance('id_2', 'SettingsStore_2'); // will be the same myStore1 

console.log('myStore1', myStore1)
console.log('myStore2', myStore2)

// Facttory pattern
// We have Calendar, ZoneFactory and Zone 

abstract class Zone {
  protected abstract  displayName: string;
  protected abstract  offset: number
  protected abstract  id: string
  
  abstract getDisplayName():string;
  abstract getOffset():number;
}

class ZoneEastern extends Zone{
    id = 'zone_eastern_id';
    displayName = 'ZoneEastern';
    offset = 3;
    constructor(){
    super();
    }
  getDisplayName(){return this.displayName};
  getOffset(){return this.offset};

}

class ZoneWestern extends Zone{
    id = 'zone_western_id';
    displayName = 'ZoneWestern';
    offset = 10;
    constructor(){
      super();
    }
   getDisplayName(){return this.displayName};
   getOffset(){return this.offset};

}

class ZoneDefault extends Zone{
    id = 'zone_default_id';
    displayName = 'ZoneDefault';
    offset = 10;
    constructor(){
      super();
    }
   getDisplayName(){return this.displayName};
   getOffset(){return this.offset};

}

//FACTORY
class ZoneFactory {
 static createZone(factoryId:string):Zone{
    switch(factoryId){
      case 'zone_eastern_id':
      return new ZoneEastern();
      case 'zone_western_id':
      return new ZoneWestern();
      default:
      return new ZoneDefault();
    }
  }
}

abstract class Calendar { 
  abstract zone:Zone;
  print():void{
    console.log('Zone name: ', this.zone.getDisplayName(), 'offset: ',  this.zone.getOffset());
  };
  
  abstract createCalendar():Calendar;
}

class WesternCalendar extends Calendar {
  // use factory
  zone = ZoneFactory.createZone('zone_western_id');

// another factory
  createCalendar(){
    return {
      zone: this.zone,
      print: this.print,
      createCalendar: this.createCalendar
    }
  }
}
const wc = new WesternCalendar();
const westerCalendar = wc.createCalendar();
console.log(westerCalendar);
westerCalendar.print();

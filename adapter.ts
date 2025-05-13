// Adapter Pattern
// Duck can be tested in DuckSimulator
// How to test Drone in the same DuckSimulator? - use Adapter Pattern

interface IDuck {
  fly():void;
  quack(): void;
}

class Duck implements IDuck{
  fly(){
    console.log('Duck flies');
  }

  quack(){
    console.log('Duck quacks');
  }
}

class DuckSimulator {
  duck:Duck;

  constructor(d:Duck){
    this.duck = d;
  }

  testDuck(){
    this.duck.fly();
    this.duck.quack();
  }

}

interface IDrone {
  beep():void;
  takeOff():void;
  spinRotors():void;
}

class Drone implements IDrone {
  beep(){
    console.log('Drone => Beep!');
  }

  takeOff(){
    console.log('Drone => takeOff!');
  }

  spinRotors(){
    console.log('Drone => spinRotors!');
  }
}

// How to adapt Drone to test in DuckSimulator ? - create adapter which implements Duck interface!
class DroneAdapter implements Duck {
  drone:Drone;

  constructor(drone: Drone){
    this.drone = drone;
  }

  quack(){
    this.drone.beep();
  }

  fly(){
    this.drone.takeOff();
    this.drone.spinRotors();
  }

}

const drone = new Drone();
const droneAdapter = new DroneAdapter(new Drone);
const duckSimulator = new DuckSimulator(droneAdapter);
duckSimulator.duck.fly();// "Drone => takeOff!"   "Drone => spinRotors!" 
duckSimulator.duck.quack(); // "Drone => Beep!" 

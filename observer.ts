// Observer pattern 
interface Subject {
  registerObserver(observer:Observer):void;
  removeObserver(observer:Observer):void;
  notifyObservers(observer:Observer):void; // ALL observers are notified
}

interface Observer {
  id:string;
  update():void;
}

// We have the weather station (Subject) 
// and we need that some entities to be able to get notifications about wather data (updates)

class WeatherStation implements Subject{
  private _temperature: number;
  private _windSpeed:number;
  private _pressure:number;
  private observers: Observer [] = [];

  constructor(t:number, w:number, p: number){
    this._temperature = t;
    this._windSpeed = w;
    this._pressure = p;
  }

  registerObserver(observer:Observer){
    this.observers.push(observer);
  }

  removeObserver(observer:Observer){
    this.observers = this.observers.filter(o => o.id !== observer.id)
  }

  notifyObservers(){
    this.observers.forEach(observer => observer.update()); // KEY POINT!
  }

  set temperature(v:number){this._temperature = v; this.notifyObservers()};
  set pressure(v:number){this._pressure = v, this.notifyObservers()};
  set windSpeed(v:number){this._windSpeed = v, this.notifyObservers()};

  get temperature(){return this._temperature};
  get windSpeed(){return this._windSpeed};
  get pressure(){return this._pressure};

}

class UserInterface implements Observer{
  id: string;
  weatherStation: WeatherStation;

  constructor(ws:WeatherStation){
    this.weatherStation = ws;
    this.id = Math.random().toString();
  }

  update(){
    this.show();
  }

  show(){
    console.log('💁‍♂️ Showing data on UI:');
    console.log(`T: ${this.weatherStation.temperature}`)
    console.log(`Wind: ${this.weatherStation.windSpeed}`)
    console.log(`Pressure: ${this.weatherStation.pressure}`)
  }
}

class Logger implements Observer{
  id: string;
  weatherStation: WeatherStation;

  constructor(ws:WeatherStation){
    this.weatherStation = ws;
    this.id = Math.random().toString();
  }

  update(){
    this.log();
  }

  log(){
    console.log('㏒ Loggin data in console:');
    console.log(`T: ${this.weatherStation.temperature}`);
    console.log(`Wind: ${this.weatherStation.windSpeed}`);
    console.log(`Pressure: ${this.weatherStation.pressure}`);
  }

}

class Alerter implements Observer{
  id: string;
  weatherStation: WeatherStation;

  constructor(ws:WeatherStation){
    this.weatherStation = ws;
    this.id = Math.random().toString();
  }

  update(){
    this.alert();
  }

  alert(){
    console.log('‼️ Alerting:');
    console.log(`T: ${this.weatherStation.temperature}`);
    console.log(`Wind: ${this.weatherStation.windSpeed}`);
    console.log(`Pressure: ${this.weatherStation.pressure}`);
  }
}

console.log('----Creating instances----');
const myWeatherStation = new WeatherStation(0, 0, 0);
const ui = new UserInterface(myWeatherStation);
const logger = new Logger(myWeatherStation);
const alerter = new Alerter(myWeatherStation);

console.log('----Registering observers----');
myWeatherStation.registerObserver(ui);
myWeatherStation.registerObserver(logger);
myWeatherStation.registerObserver(alerter);

// now we have the array of observers [ui, logger, alerter]

// when say temperature changes (via setter for instance)
console.log('----Update Temperature----');
myWeatherStation.temperature = 29;
// all observers will be notified and run their update() methods

console.log('----Removing UI observer----');
ui.weatherStation.removeObserver(ui);
console.log('----Updating Wind Speed----');
myWeatherStation.windSpeed = 15;

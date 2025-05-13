abstract class  PhoneCameraApp {
  abstract edit(): void
  protected sharingBehavior!:SharingStrategy 
  constructor(sb:SharingStrategy){
    this.setSharingBehavior(sb);
  }
  private setSharingBehavior(sb:SharingStrategy){
    this.sharingBehavior = sb;
  }
  take(){
    console.log('PhoneCameraApp - take')
  }
  save(){
    console.log('PhoneCameraApp - save')
  }
}

class BasicCameraApp extends PhoneCameraApp {
  constructor(){
    super(new ShareViaEmail());
  }
  edit(){
    console.log('Basic_CameraApp - edit')
  }
  share(){
    console.log('BasicCameraApp');
    this.sharingBehavior.share();
  }
}

class CameraPlusApp extends PhoneCameraApp {
  constructor(){
    super(new ShareViaSocialMedia());
  }
   edit(){
    console.log('Camera_Plus_App - edit')
  }

  share(){
    console.log('CameraPlusApp');
    this.sharingBehavior.share();
  }
}

interface SharingStrategy {
  share():void;
}  

class ShareViaEmail implements SharingStrategy{
  share(){
    console.log('Share => Send Email');
  }
}

class ShareViaSocialMedia implements SharingStrategy {
  share(){
    console.log('Share => Post in Social Media');
  }
}

const basicApp = new BasicCameraApp();
const plusApp = new CameraPlusApp();

basicApp.take();
basicApp.save();
basicApp.edit();
basicApp.share();


plusApp.take();
plusApp.save();
plusApp.edit();
plusApp.share();

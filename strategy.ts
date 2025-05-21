abstract class  PhoneCameraApp {
  abstract edit(): void
  protected sharingBehavior!:SharingStrategy 
  constructor(sb:SharingStrategy){
    this.setSharingBehavior(sb); // (4) - abstract class (Context) has a setter of Strategy Behavior
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
    super(new ShareViaEmail(new Email())); // (5) - email -> concrete strategy behavior -> set  'sharingBehavior'
  }
  edit(){
    console.log('Basic_CameraApp - edit')
  }

  share(){
    console.log('BasicCameraApp');
    this.sharingBehavior.share(); // (6) - this.email.sendEmail();
  }
}

class CameraPlusApp extends PhoneCameraApp {
  constructor(){
    super(new ShareViaSocialMedia(new SocialMedia())); // (5')
  }

  edit(){
    console.log('Camera_Plus_App - edit')
  }

  share(){
    console.log('CameraPlusApp');
    this.sharingBehavior.share(); // (6')
  }
}

//// STRATEGY!
interface SharingStrategy {
  share():void; // (1) - define strategy interface
}  

class Email {
  sendEmail(){
     console.log('Share => Send Email');
  }
}

class SocialMedia {
  publishPost(){
      console.log('Share => Post in Social Media');
  }
}

class ShareViaEmail implements SharingStrategy{
  constructor(private email:Email){
    this.email = email;
  }
  share(){ // (2) impelement specific case of the straregy behavior
   this.email.sendEmail();
  }
}

class ShareViaSocialMedia implements SharingStrategy {
  constructor(private account:SocialMedia){
    this.account = account;
  }
  share(){ // (3) impelement specific case of the straregy behavior
   this.account.publishPost();
  }
}

const basicApp = new BasicCameraApp(); // Client 1
const plusApp = new CameraPlusApp(); // Client 2

basicApp.take();
basicApp.save();
basicApp.edit();
basicApp.share(); // strategy


plusApp.take();
plusApp.save();
plusApp.edit();
plusApp.share(); // strategy

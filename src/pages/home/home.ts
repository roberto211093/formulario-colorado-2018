import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NavController, AlertController } from 'ionic-angular';
import firebase from 'firebase';
//import uuidv4 from 'uuid/v4';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  registerForm: FormGroup;
  
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController
  ) {
    this.buildForm();
  }

  doSave() {
    let config = {
      apiKey: "AIzaSyDIpjQHOfSyJcfVApKO9DJidjio-FAoM_8",
      authDomain: "formulario-colorado.firebaseapp.com",
      databaseURL: "https://formulario-colorado.firebaseio.com",
      projectId: "formulario-colorado",
      storageBucket: "formulario-colorado.appspot.com",
      messagingSenderId: "867644682177"
    };
    firebase.initializeApp(config);
    let firestore = firebase.firestore();

    let docRef = firestore.doc("clientes/"+this.registerForm.value['rut']);
    let name = this.registerForm.value['name'];
    let country = this.registerForm.value['country'];
    let recommend = this.registerForm.value['recommend'];
    let experience = this.registerForm.value['experience'];
    docRef.set({
      name: name,
      country: country,
      recommend: recommend,
      experience: experience
    }).then(function(){
     /* alert = this.alertCtrl.create({
        title: '¡Genial!',
        subTitle: "Registraste con éxito a " + this.registerForm.value['name'],
        buttons: ['OK']
      });
      alert.present();*/
      this.registerForm.setValue({rut:null,name:null,country:null,recommend:null,experience:null});
    }).catch(function(err){
    console.log(err);
      /*let alert = this.alertCtrl.create({
        title: '¡Error!',
        subTitle: "NO registraste con éxito a " + this.registerForm.value['name'],
        buttons: ['OK']
      });    
      alert.present();*/
    });
    // console.log(JSON.stringify(this.registerForm.value));
    //uuidv4();
    //let userId = firebase.auth().currentUser.uid;
    // alert.present();
    //this.registerForm.setValue({name:null,country:null,recommend:null});
  }
  /*
  writeUserData(userId, name, country, recommend) {
    //userId = firebase.auth().currentUser.uid;
    //this.writeUserData( 'Nr4rLKjqipZnTg2BOO9S', this.registerForm.value['name'], this.registerForm.value['country'], this.registerForm.value['recommend']);
    firebase.database().ref('usuarios/').push().set({
      name: name,
      country: country,
      recommend : recommend
    });
  }*/

  private buildForm() {
    this.registerForm = this.formBuilder.group({
      rut:  ['', [Validators.required, Validators.maxLength(15)]],
      name: ['', [Validators.required, Validators.maxLength(15)]],
      country: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(3)]],
      recommend: ['', Validators.required],
      experience: ['', Validators.required],
      /*check: false,
      date: '',
      peso: 0,
      banda: '',
      bandas: '',
      notifications: false*/
    });
  }

}

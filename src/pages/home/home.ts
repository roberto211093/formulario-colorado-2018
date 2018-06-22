import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NavController, AlertController } from 'ionic-angular';

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
    console.log(JSON.stringify(this.registerForm.value));
    let alert = this.alertCtrl.create({
      title: '¡Genial!',
      subTitle: "Registraste con exito a " + this.registerForm.value['name'],
      buttons: ['OK']
    });
    alert.present();
    this.registerForm.setValue({name:'',country:'',recommend:null});
  }

  private buildForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(15)]],
      country: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(3)]],
      recommend: ['', Validators.required],
      /*check: false,
      date: '',
      peso: 0,
      banda: '',
      bandas: '',
      notifications: false*/
    });
  }

}

import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {Storage} from "@ionic/storage";
/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {
  public notLogin:boolean = true;
  public logined:boolean = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public storage: Storage
  ) {
  }

  showModal(){
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }

  ionViewDidEnter(){
    this.loadUserPage();
  }

  loadUserPage(){
    this.storage.get('UserId').then((val)=>{
      if(val!=null){//如果不等于空，即有UserId
        this.notLogin = false;
        this.logined = true;
      }else{//如果等于空
        this.notLogin = true;
        this.logined = false;
      }
    });
  }

}

import { Component } from '@angular/core';
import {NavController, NavParams, ViewController, LoadingController, ToastController} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BaseUI{
  mobile:any;
  nickname:any;
  password:any;
  confirmPassword:any;
  errorMessage:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl:ViewController,
              public loadingCtrl: LoadingController,
              public rest:RestProvider,
              public toastCtrl:ToastController
  ) {
    super()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  gotoLogin(){
    this.navCtrl.pop();//nav导航的子页面返回
  }
  doRegister(){
    if(this.password != this.confirmPassword){
      super.showToast(this.toastCtrl,"两次输入的密码不匹配");
    }else{
      var loading = super.showLoading(this.loadingCtrl,"注册中...");
      this.rest.register(this.mobile,this.nickname,this.password)
        .subscribe(
          f=>{
            if(f["Status"]=="OK"){
              loading.dismiss();
              super.showToast(this.toastCtrl,"注册成功");
              this.dismiss();
            }else{
              this.dismiss();
              super.showToast(this.toastCtrl,f["StatusContent"]);
            }
          },
          error => this.errorMessage = <any>error);
    }


  }

}

import { Component } from '@angular/core';
import {
  NavController, NavParams, LoadingController, ModalController, ToastController,
  ViewController
} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";


@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseUI{
  headface:string = "http://img.mukewang.com/user/57a322f00001e4ae02560256-40-40.jpg";
  nickname:string = "加载中";
  errorMessage:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public rest:RestProvider,
              public loadCtrl:LoadingController,
              public modalCtrl: ModalController,
              public toastCtrl:ToastController,
              public ViewCtrl:ViewController
  ) {
    super();
  }
  ionViewDidEnter(){
    this.loadUserPage();
  }

  loadUserPage(){
    this.storage.get('UserId').then((val)=>{
      if(val != null){//如果不等于空，即有UserId
        //加载用户数据
        var loading = super.showLoading(this.loadCtrl,"加载中");
        this.rest.getUserInfo(val)
          .subscribe(
            userinfo => {
              this.nickname = userinfo["UserNickName"];
              this.headface = userinfo["UserHeadface"] + "?" + (new Date().valueOf());
              loading.dismiss();
            },
            error => this.errorMessage = <any>error);

      }
    });
  }

  updateNickName() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        var loading = super.showLoading(this.loadCtrl, "修改中...");
        this.rest.updateNickName(val, this.nickname)
          .subscribe(
            f => {
              if (f["Status"] == "OK") {
                loading.dismiss();
                super.showToast(this.toastCtrl, "昵称修改成功。");
              }
              else {
                loading.dismiss();
                super.showToast(this.toastCtrl, f["StatusContent"]);
              }
            },
            error => this.errorMessage = <any>error);
      }
    });
  }

  logout(){
    this.storage.remove('UserId');
    this.ViewCtrl.dismiss();
  }



}

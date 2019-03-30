/**
 * Created by cyb on 2019/3/30.
 */
import {Loading, LoadingController, Toast, ToastController} from 'ionic-angular';
//UI层的所有公用方法的抽象类
export abstract class BaseUI{
  constructor(){}

  protected showLoading(loadingCtrl:LoadingController,message:string):Loading{
    let loader = loadingCtrl.create({
      content:message,
      dismissOnPageChange:true//页面变化时自动关闭loading
    });
    loader.present();
    return loader;
  }

  protected showToast(toastCtrl:ToastController,message:string):Toast{
    let toast = toastCtrl.create({
      message:message,
      duration:3000,//默认展示的时长
      position:'bottom'
    });
    toast.present();
    return toast;
  }
}

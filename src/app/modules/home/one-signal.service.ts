import { StorageService } from '../../providers/storage/storage.service';
import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import { environment } from '../../../environments/environment';

// tslint:disable-next-line:variable-name
let OneSignal;
const url = '';

@Injectable()
export class OneSignalService {

  /**
   * To check if OneSignal is already initialized.
   */
  public oneSignalInit;

  /**
   * Store OneSignalId in localStorage.
   */
  public oneSignalId: any;

  /**
   * User Session management token.
   */
  public userSession: any;

  /**
   * @ignore
   */
  constructor(
    private storageService: StorageService,
  ) {
    console.log('OneSignal Service Init', this.oneSignalInit);
  }

  /**
   * Call this method to start the onesignal process.
   */
  public init() {
    // if exists one signal init
    if (this.oneSignalInit) {
      console.log('Already Initialized');
      return null;
    }

    // add script
    this.addScript('https://cdn.onesignal.com/sdks/OneSignalSDK.js', (callback) => {
      console.log('OneSignal Script Loaded', callback);
      this.initOneSignal();
    });
  }

  /**
   *
   * @param fileSrc
   * @param callback
   */
  addScript(fileSrc, callback) {
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = callback;
    script.src = fileSrc;
    head.appendChild(script);
  }

  /**
   *
   */
  async initOneSignal() {

    // get onesignal plugin
    OneSignal = window['OneSignal'] || [];

    // get user id from storage
    const sub: string = jwtDecode(await this.storageService.retrieve('token'))['sub'];

    // send tag
    OneSignal.sendTag('user_id', sub, (tagsSent) => {
      console.log('OneSignal Tag Sent', tagsSent);
    });

    // init one signal with app id
    console.log('Init OneSignal');
    OneSignal.push(['init', {
      appId: environment.one_signal_app_id,
      safari_web_id: environment.one_signal_safari_web_id,
      autoRegister: true,
      allowLocalhostAsSecureOrigin: true,
      notifyButton: {
        enable: false,
      },
    }]);

    // one signal initialized
    console.log('OneSignal Initialized');
    this.checkIfSubscribed();
  }

  /**
   *
   */
  subscribe() {
    OneSignal.push(() => {
      console.log('Register For Push');
      OneSignal.push(['registerForPushNotifications']);
      OneSignal.on('subscriptionChange', (isSubscribed) => {
        console.log('The user\'s subscription state is now:', isSubscribed);
        this.listenForNotification();
        OneSignal.getUserId().then((userId) => {
          console.log('User ID is', userId);
          this.oneSignalId = userId;
          this.updateLocalUserProfile();
        }).catch((error) => {
          console.log(error);
        });
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

  /**
   *
   */
  listenForNotification() {
    console.log('Initalize Listener');
    OneSignal.on('notificationDisplay', (event) => {
      console.log('OneSignal notification displayed:', event);
      this.listenForNotification();
    }, (error) => {
      console.log(error);
    });
  }

  /**
   *
   */
  getUserID() {
    OneSignal.getUserId().then((userId) => {
      console.log('User ID is', userId);
      this.oneSignalId = userId;
    }).catch((error) => {
      console.log(error);
    });
  }

  /**
   *
   */
  checkIfSubscribed() {
    OneSignal.push(() => {
      /* These examples are all valid */
      OneSignal.isPushNotificationsEnabled((isEnabled) => {
        if (isEnabled) {
          console.log('Push notifications are enabled!');
          this.getUserID();
        } else {
          console.log('Push notifications are not enabled yet.');
          this.subscribe();
        }
      }, (error) => {
        console.log('Push permission not granted', error);
      });
    });
  }

  /**
   * Store OneSignal ID in your server for sending push notificatios.
   */
  updateLocalUserProfile() { }

}

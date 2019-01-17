// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'http://localhost:8080',
  images_url: 'http://localhost:8080/uploads',
  one_signal_app_id: '507f568f-0ab8-4a57-93ba-e4bd39b43527',
  one_signal_safari_web_id: 'web.onesignal.auto.55479a10-4eda-4299-901a-290da3fd1836',
  login: {
    user_email: 'admin@reportcorporate.com',
    user_password: '123456',
  },
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

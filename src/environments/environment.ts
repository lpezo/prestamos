// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API: "https://us-central1-prestaaltoke.cloudfunctions.net/app/api/",
  montos: [
    {"monto": 100},
    {"monto": 200},
    {"monto": 250},
    {"monto": 300},
    {"monto": 350},
    {"monto": 400},
    {"monto": 450},
    {"monto": 500},
    {"monto": 600},
    {"monto": 700},
    {"monto": 800},
    {"monto": 900},
    {"monto": 1000}
  ],
  cuotas: [
    {"cuota": 1},
    {"cuota": 2},
    {"cuota": 3},
    {"cuota": 4},
    {"cuota": 5},
    {"cuota": 6},
    {"cuota": 7},
    {"cuota": 8}
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

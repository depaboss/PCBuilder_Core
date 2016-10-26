(function(){
  'use strict';

  angular.module('App')
    .controller('UserController', UserController);

    UserController.$inject = [];

    function UserController(){
      var vc = this;
      vc.users=[{
        nome:'triangolo',
        cognome: 'triangola',
        eta: 25,
        citta: 'triangolandia'
      },{
        nome: 'pinco',
        cognome: 'palla',
        eta: 22,
        citta: 'pincopallandia'
      },{
        nome: 'birillo',
        cognome: 'birilla',
        eta: 62,
        citta: 'birillandia'
      }]
      vc.stile= "border: 2px solid green";

      vc.saluta = function(){
        console.info(vc.risSaluta);
        vc.risSaluta = " Ciao " + vc.user.nome +" "+ vc.user.cognome + " di " + vc.user.eta + " anni!! ";
        console.info(vc.risSaluta);

      };

    };
  

})();

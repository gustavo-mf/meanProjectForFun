// public/angularApp.js
 
// Criamos um módulo Angular chamado home
const home = angular.module('home', []);
 
(function(app) {
	'use strict';
	app.controller('homeController', function($scope, $http) {
		let refresh = function (){
  		$http.get('/api/home').then(function(resp) {
  			$scope.sucess = resp.data['sucess'];
  			$scope.danger = resp.data['danger'];
  		}, function(resp) {
    		console.log('Error: ' + resp);
  		});
		};
		refresh();
	})
})(home);

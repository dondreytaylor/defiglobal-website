'use strict';

angular.module('Application', [
  'ngRoute',
  'Application.controllers',
  'Application.factory'
]).
config(['$locationProvider', '$interpolateProvider', '$routeProvider', function($locationProvider, $interpolateProvider, $routeProvider) {

    // URL prefix
    $locationProvider.html5Mode(true);

    // Application routing
    $routeProvider
      .when("/", {
          templateUrl : "/static/views/pages/landing.html"
      })
      .when("/ourmission", {
          templateUrl : "/static/views/pages/ourmission.html"
      })
      .when("/contactus", {
          templateUrl : "/static/views/pages/contactus.html"
      })
      .when("/info/defi", {
          templateUrl : "/static/views/pages/info-defi.html"
      })
      .when("/info/bitcoin", {
          templateUrl : "/static/views/pages/info-bitcoin.html"
      })
      .when("/info/ethereum", {
          templateUrl : "/static/views/pages/info-ethereum.html"
      })
      .when("/info/stablecoins", {
          templateUrl : "/static/views/pages/info-stablecoins.html"
      })
      .otherwise("/");
}]);

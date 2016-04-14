"use strict";

(function(){
  angular
  .module("primary", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    "$locationProvider",
    router
  ])
  .factory("Primary", [
    "$resource",
    Primary
  ])
  .controller("primaryController", [
    primaryController
  ]);

  function router($stateProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("index", {
      url: "/",
      templateUrl: "assets/html/primaries-index",
      controller: "primaryController",
      controllerAs: "indexVM"
    })
  }

  function Primary($resrouce){
    var Primaries = $resource("/api", {}, {
      update: {method: "PUT"}
    })
    Primaries.all = Primaries.query();
    return Primaries
  };

  function primaryController(Primaries){
    var vm = this
    vm.primaries = Primaries.all
  }
})();

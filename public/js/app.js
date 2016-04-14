"use strict";

(function(){
  angular
  .module("primary", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    "urlProvider",
    router
  ])

  function router($stateProvider){
    $stateProvider
    .state("index", {
      
    })
  }
})

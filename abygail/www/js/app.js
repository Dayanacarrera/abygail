// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = Detector.webgl? new THREE.WebGLRenderer( { antialias: true } ): new THREE.CanvasRenderer();

var blue = 0xE0E6F8;
var yellow = 0x58D3F7;
var purple = 0x0000FF;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 20;

var tubeGeometry = new THREE.CylinderGeometry(0.3,0.3,6,32);
var ballGeometry = new THREE.SphereGeometry(0.8,32,32);
var blueMaterial = new THREE.MeshBasicMaterial( { color: blue } );
var yellowMaterial = new THREE.MeshBasicMaterial( { color: yellow } );
var purpleMaterial = new THREE.MeshBasicMaterial( { color: purple } );

var dna = new THREE.Object3D();
var holder = new THREE.Object3D();


for (var i = 0; i <= 40; i++) {
  var blueTube = new THREE.Mesh(tubeGeometry, blueMaterial);
  blueTube.rotation.z = 90 * Math.PI/180; 
  blueTube.position.x = -3;

  var yellowTube = new THREE.Mesh(tubeGeometry, yellowMaterial );
  yellowTube.rotation.z = 90 * Math.PI/180;
  yellowTube.position.x = 3;


  var ballRight = new THREE.Mesh( ballGeometry, purpleMaterial );
  ballRight.position.x = 6;

  var ballLeft = new THREE.Mesh( ballGeometry, purpleMaterial );
  ballLeft.position.x = -6;

  var row = new THREE.Object3D();
  row.add(blueTube);
  row.add(yellowTube);
  row.add(ballRight);
  row.add(ballLeft);

  row.position.y = i*2;
  row.rotation.y = 30*i * Math.PI/180;

  dna.add(row);

};


dna.position.y = -40;

scene.add(dna);

dna.position.y = -40;
holder.add(dna)
scene.add(holder);

var CubeConfigData = function() {
  this.zoom = 20;
};

var view = new CubeConfigData();
var gui = new dat.GUI();
gui.close();

gui.add( view, 'zoom', 0, 20 ).onChange( function(value) {
  camera.position.z = value;
});


var render = function () {

  requestAnimationFrame(render);

  holder.rotation.x += 0.01;
  holder.rotation.y += 0.01;
  renderer.render(scene, camera);
}

render();
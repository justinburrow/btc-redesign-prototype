'use strict';

var btcApp = angular.module('btcApp', ['ui.router']);

btcApp.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'home.html'
  }).state('other', {
    url: '/other',
    templateUrl: 'other.html'
  });
});

btcApp.controller('mainCtrl', function ($rootScope, $scope, $window) {
  var vm = this;

  vm.showNav = false;
  vm.showProfile = false;
  vm.showAlerts = false;
  vm.curPos = 0;

  $rootScope.$on('$stateChangeStart', function () {
    vm.loading = true;
    angular.element('.holder').css('position', 'relative');
  });
  $rootScope.$on('$stateChangeSuccess', function () {
    setTimeout(function () {
      vm.loading = false;
      $scope.$apply();
    }, 1000);
  });

  vm.showNavCalc = function () {
    if (vm.showNav == false) {
      vm.curPos = $window.pageYOffset;
      angular.element('.holder').css('top', -Math.abs(vm.curPos)).css('position', 'fixed');
      vm.showNav = true;
    } else {
      angular.element('.holder').css('top', 0).css('position', 'relative');
      setTimeout(function () {
        window.scrollTo(0, vm.curPos);
      }, 1);
      vm.showNav = false;
    }
  };

  vm.closer = function () {
    if (vm.showNav || vm.showProfile) {
      vm.showNav = false;
      vm.showProfile = false;
      angular.element('.holder').css('position', 'relative').css('top', 0);
      setTimeout(function () {
        window.scrollTo(0, vm.curPos);
      }, 1);
    }
  };
});

$(document).ready(function () {

  var notifyTruncate = function notifyTruncate() {
    var showChar = 130;
    var ellipsestext = '...';
    var moretext = 'view';
    $('header .notification-text').each(function () {
      var content = $(this).html();
      if (content.length > showChar) {
        var c = content.substr(0, showChar);
        var h = content.substr(showChar - 1, content.length - showChar);
        var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><a href="#">' + moretext + '</a>';
        $(this).html(html);
      }
    });
    $('.notifications-mob .notification-text').each(function () {
      var showChar = 85;
      var content = $(this).html();
      if (content.length > showChar) {
        var c = content.substr(0, showChar);
        var h = content.substr(showChar - 1, content.length - showChar);
        var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><a href="' + $(this).data('link') + '">' + moretext + '</a>';
        $(this).html(html);
      }
    });
  };

  $('.account-details').hover(function () {
    if (!$('.account-details-target-area').is(':animated')) {
      if ($('.account-details-target-area').css('display') == 'none') {
        $('.account-details-target-area').fadeIn(400);
      } else {
        $('.account-details-target-area').fadeOut(100);
      }
    }
  });

  $('.nav-holder .top > li').click(function () {
    if ($(this).hasClass('open')) {
      $(this).removeClass('open');
    } else {
      $('.nav-holder .top > li').removeClass('open');
      $(this).addClass('open');
    }
  });

  notifyTruncate();
});
//# sourceMappingURL=main.js.map

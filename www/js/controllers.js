//var token =
// "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjU2NDIxMDAsImV4cCI6MTQ2NTY0NTcwMCwibmJmIjoxNDY1NjQyMTAwLCJqdGkiOiI0ZDQ0MGMxMGNmYjQ5ZWI2N2Q2MzhkMDA1MDBjM2M0ZCJ9.1ReCOjpPf-NyNcxnS6rDw2jxLcnS40rrAqN3ThZ8hIk";
angular.module('xperience.controllers', [])
	.controller('AuthCtrl', function ($scope, $location, $stateParams, $ionicHistory, $http, $state, $auth, $rootScope, API_URL) {
		$scope.loginData  = {}
		$scope.loginError = false;
		$scope.loginErrorText;
		$scope.login  = function () {
			var credentials = {
				email: $scope.loginData.email,
				password: $scope.loginData.password
			}
			console.log(credentials);
			$auth.login(credentials).then(function () {
				// Return an $http request for the authenticated user
				$http.get(API_URL + 'authenticate/user').success(function (response) {
					// Stringify the retured data
					var user = JSON.stringify(response.user);
					// Set the stringified user data into local storage
					localStorage.setItem('user', user);
					// Getting current user data from local storage
					$rootScope.currentUser = response.user;
					// $rootScope.currentUser = localStorage.setItem('user');;
					$ionicHistory.nextViewOptions({disableBack: true});
					$state.go('tab.dash');
				}).error(function () {
					$scope.loginError     = true;
					$scope.loginErrorText = error.data.error;
					console.log($scope.loginErrorText);
				})
			});
		}
		$scope.signup = function () {
			var data = {
				email: $scope.signup.email,
				password: $scope.signup.password,
				username: $scope.signup.username,
				dob: $scope.signup.dob,
			}
			$auth.signup(data).then(function () {
				$http.post(API_URL + '').success(function (response) {
				})
			})
		}
	})
	.controller('TabsCtrl', function ($scope, ionicMaterialInk, $ionicModal, $ionicPopover, $timeout) {
		$scope.isExpanded        = false;
		$scope.hasHeaderFabLeft  = false;
		$scope.hasHeaderFabRight = false;
		var navIcons             = document.getElementsByClassName('ion-navicon');
		for (var i = 0; i < navIcons.length; i++) {
			navIcons.addEventListener('click', function () {
				this.classList.toggle('active');
			});
		}
		////////////////////////////////////////
		// Layout Methods
		////////////////////////////////////////
		$scope.hideNavBar   = function () {
			document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
		};
		$scope.showNavBar   = function () {
			document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
		};
		$scope.noHeader     = function () {
			var content = document.getElementsByTagName('ion-content');
			for (var i = 0; i < content.length; i++) {
				if (content[i].classList.contains('has-header')) {
					content[i].classList.toggle('has-header');
				}
			}
		};
		$scope.setExpanded  = function (bool) {
			$scope.isExpanded = bool;
		};
		$scope.setHeaderFab = function (location) {
			var hasHeaderFabLeft  = false;
			var hasHeaderFabRight = false;
			switch (location) {
				case 'left':
					hasHeaderFabLeft = true;
					break;
				case 'right':
					hasHeaderFabRight = true;
					break;
			}
			$scope.hasHeaderFabLeft  = hasHeaderFabLeft;
			$scope.hasHeaderFabRight = hasHeaderFabRight;
		};
		$scope.hasHeader    = function () {
			var content = document.getElementsByTagName('ion-content');
			for (var i = 0; i < content.length; i++) {
				if (!content[i].classList.contains('has-header')) {
					content[i].classList.toggle('has-header');
				}
			}
		};
		$scope.hideHeader   = function () {
			$scope.hideNavBar();
			$scope.noHeader();
		};
		$scope.showHeader   = function () {
			$scope.showNavBar();
			$scope.hasHeader();
		};
		$scope.clearFabs    = function () {
			var fabs = document.getElementsByClassName('button-fab');
			if (fabs.length && fabs.length > 1) {
				fabs[0].remove();
			}
		};
		ionicMaterialInk.displayEffect();
	})
	.controller('StoriesCtrl', function ($scope, $state, $timeout, ionicMaterialInk, ionicMaterialMotion, Stories, API_URL, $http) {
		// Form data for the login modal
		$scope.isExpanded           = false;
		$scope.stories              = [];
		$scope.hasHeaderFabLeft     = false;
		$scope.hasHeaderFabRight    = false;
		$scope.lastpage             = 1;
		$scope.noMoreItemsAvailable = false;
		var navIcons                = document.getElementsByClassName('ion-navicon');
		for (var i = 0; i < navIcons.length; i++) {
			navIcons.addEventListener('click', function () {
				this.classList.toggle('active');
			});
		}
		////////////////////////////////////////
		// Layout Methods
		////////////////////////////////////////
		$scope.hideNavBar   = function () {
			document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
		};
		$scope.showNavBar   = function () {
			document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
		};
		$scope.noHeader     = function () {
			var content = document.getElementsByTagName('ion-content');
			for (var i = 0; i < content.length; i++) {
				if (content[i].classList.contains('has-header')) {
					content[i].classList.toggle('has-header');
				}
			}
		};
		$scope.setExpanded  = function (bool) {
			$scope.isExpanded = bool;
		};
		$scope.setHeaderFab = function (location) {
			var hasHeaderFabLeft  = false;
			var hasHeaderFabRight = false;
			switch (location) {
				case 'left':
					hasHeaderFabLeft = true;
					break;
				case 'right':
					hasHeaderFabRight = true;
					break;
			}
			$scope.hasHeaderFabLeft  = hasHeaderFabLeft;
			$scope.hasHeaderFabRight = hasHeaderFabRight;
		};
		$scope.hasHeader    = function () {
			var content = document.getElementsByTagName('ion-content');
			for (var i = 0; i < content.length; i++) {
				if (!content[i].classList.contains('has-header')) {
					content[i].classList.toggle('has-header');
				}
			}
		};
		$scope.hideHeader   = function () {
			$scope.hideNavBar();
			$scope.noHeader();
		};
		$scope.showHeader   = function () {
			$scope.showNavBar();
			$scope.hasHeader();
		};
		$scope.init         = function () {
			$scope.lastpage = 1;
			var limit       = 5;
			Stories.all($scope.lastpage, limit, function (response) {
				console.log(response);
				$scope.stories     = response.data.data;
				$scope.currentpage = response.current_page;
				ionicMaterialInk.displayEffect();
				ionicMaterialMotion.ripple();
			})
		};
		$scope.doRefresh    = function () {
			$scope.init();
			$scope.$broadcast('scroll.refreshComplete');
			$scope.noMoreItemsAvailable = false;
			ionicMaterialInk.displayEffect();
			ionicMaterialMotion.ripple();
		}
		$scope.loadMore = function (limit) {
			console.log("Load More Called");
			if (!limit) {
				limit = 5;
			}
			$scope.lastpage += 1;
			Stories.all($scope.lastpage, limit, function (response) {
				//console.log(response);
				if (response.data.next_page_url == null) {
					$scope.noMoreItemsAvailable = true;
					console.log($scope.noMoreItemsAvailable);
				}
				//console.log($scope.stories.data);
				$scope.stories = $scope.stories.concat(response.data.data);
				$scope.$broadcast('scroll.infiniteScrollComplete');
				$scope.currentpage = response.current_page;
				ionicMaterialInk.displayEffect();
				ionicMaterialMotion.ripple();
			})
		};
		ionicMaterialInk.displayEffect();
		ionicMaterialMotion.ripple();
		$scope.init();
	})
	.controller('StoryDetailCtrl', function ($scope, $stateParams, Stories) {
	})
	.controller('QuestionsCtrl', function ($scope, $http, Questions, API_URL, $state, $timeout, ionicMaterialInk, ionicMaterialMotion) {
		/*$timeout(function () {

		 }, 10);*/
		$scope.init     = function () {
			$scope.lastpage = 1;
			var limit       = 5;
			Questions.all($scope.lastpage, limit, function (response) {
				console.log(response);
				$scope.questions   = response.data.data;
				$scope.currentpage = response.current_page;
				ionicMaterialInk.displayEffect();
				ionicMaterialMotion.ripple();
			})
		};
		$scope.loadMore = function (limit) {
			console.log("Load More Called");
			if (!limit) {
				limit = 5;
			}
			$scope.lastpage += 1;
			Questions.all($scope.lastpage, limit, function (response) {
				//console.log(response);
				if (response.data.next_page_url == null) {
					$scope.noMoreItemsAvailable = true;
					console.log($scope.noMoreItemsAvailable);
				}
				//console.log($scope.stories.data);
				$scope.questions = $scope.questions.concat(response.data.data);
				$scope.$broadcast('scroll.infiniteScrollComplete');
				$scope.currentpage = response.current_page;
				ionicMaterialInk.displayEffect();
				ionicMaterialMotion.ripple();
			})
		};
		$scope.doRefresh = function () {
			$scope.init();
			$scope.$broadcast('scroll.refreshComplete');
			$scope.noMoreItemsAvailable = false;
			ionicMaterialInk.displayEffect();
			ionicMaterialMotion.ripple();
		}
		$scope.init();
		ionicMaterialInk.displayEffect();
		ionicMaterialMotion.ripple();
	})
	.controller('QuestionDetailCtrl', function ($scope, $stateParams, Questions) {
		$scope.question = Questions.get($stateParams.questionId);
		console.log($stateParams.questionId);
		$scope.options = {
			loop: false,
			effect: 'fade',
			speed: 500,
		}
		$scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
			// data.slider is the instance of Swiper
			$scope.slider = data.slider;
		});
		$scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
			console.log('Slide change is beginning');
		});
		$scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {
			// note: the indexes are 0-based
			$scope.activeIndex   = data.slider.activeIndex;
			$scope.previousIndex = data.slider.previousIndex;
		});
	})
	.controller('ChatsCtrl', function ($scope, Chats) {


		// With the new view caching in Ionic, Controllers are only called
		// when they are recreated or on app start, instead of every page change.
		// To listen for when this page is active (for example, to refresh data),
		// listen for the $ionicView.enter event:
		//
		//$scope.$on('$ionicView.enter', function(e) {
		//});
		$scope.chats  = Chats.all();
		$scope.remove = function (chat) {
			Chats.remove(chat);
		};
	})
	.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
		$scope.chat = Chats.get($stateParams.chatId);
	})
	.controller('PeopleCtrl', function ($ionicScroll, $scope, $rootScope) {
	})
	.controller('PeopleDetailCtrl', function ($ionicScroll, $scope, $rootScope) {
	})
	.controller('AccountCtrl', function ($scope, $state, $auth,$location, $rootScope, $timeout, ionicMaterialMotion, API_URL, ionicMaterialInk) {
		// Set Header
		$scope.$parent.showHeader();
		$scope.$parent.clearFabs();
		$scope.isExpanded = false;
		$scope.$parent.setExpanded(false);
		$scope.$parent.setHeaderFab(false);
		// Set Motion
		$scope.logoutUser = {checked: false};
		$timeout(function () {
			ionicMaterialMotion.slideUp({
				                            selector: '.slide-up'
			                            });
		}, 300);
		$rootScope.currentUser = JSON.parse(localStorage.getItem('user'));
		console.log($rootScope.currentUser);
		$timeout(function () {
			ionicMaterialMotion.fadeSlideInRight({
				                                     startVelocity: 3000
			                                     });
		}, 700);
		// Set Ink
		ionicMaterialInk.displayEffect();
		$scope.settings      = {
			enableFriends: true
		};
		$scope.userLoggedOut = function () {
			if ($scope.logoutUser.checked == true) {
				$auth.logout().then(function () {
					// Remove the authenticated user from local storage
					localStorage.removeItem('user');
					// Remove the current user info from rootscope
					$rootScope.currentUser = null;
					$state.go('login');
					$scope.logoutUser = {checked: false};
				});
			}
		};
		$scope.go = function (link) {
			$location.path(link);
		}
		//$scope.emailNotification = 'Subscribed';
	});









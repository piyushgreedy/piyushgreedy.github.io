var mainApp = angular.module("securepoolin", ['securepoolin.controllers','duScroll','angular-parallax']);

/* This is the directive used to check the scroll height of the screen dynamically */
mainApp.directive("scroll", function ($window) {
    return function (scope, element, attrs) {
        angular.element($window).bind("scroll", function () {

            console.log(this.pageYOffset);

            if(this.pageYOffset>120){

                scope.sectiononeleftzindexup=0;
                scope.sectiononeleftzindexdown=1;

                scope.sectiononerightzindexup=1;
                scope.sectiononerightzindexdown=0;
            }
            else{

                scope.sectiononeleftzindexup=0;
                scope.sectiononeleftzindexdown=1;

                scope.sectiononerightzindexup=1;
                scope.sectiononerightzindexdown=0;
            }

            scope.$apply();
        });
    };
});

mainApp.directive('myDirective', ['$window', function ($window) {
    return {
        link: link,
        restrict: 'E',
    };
    function link(scope, element, attrs) {
        scope.width = $window.innerWidth;
        angular.element($window).bind('resize', function () {
            scope.width = $window.innerWidth;



            scope.$digest();
        });
    }
}]);

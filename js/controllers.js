var app = angular.module('poolin.controllers', [])

app.controller("myCtrl", function ($scope, $timeout, $window, $interval, $document, $filter, $http, ngDialog, $rootScope) {


    $scope.showAccount = 0; //Used to toggle the Account section using ng-if
    $scope.onloadimage = 1;  //Show Splash screen initially on loading
    $scope.containershow = 0; //used to show container when loading completes
    $scope.navshow = 0;       //Toggle visibility of navbar using navshow
    $scope.logozindexblue = 1; //Giving z index to the top left poolin blue icon
    $scope.logozindexwhite = 0; //Giving z index to the top left poolin whie icon
    $scope.mobilenumber = "";   //Storing the mobile numbe of the input number
    $scope.filldetailsmodal = 0;
    $scope.user = {             //Store the User account details when entered/
        emailaddress: "",
        phonenumber: "",
        password: "",
        fbId: null,
        fbEmail: null,
        csrf: "7cf00f4ce6bf0d5158312f2955288c6e"
    };

    $scope.customnavbarshow = 0;
    $scope.customnavbarhide = 1;

    $scope.changemyaccountcol = 0;

    if ($window.innerWidth > 993) {  //Checks If screen width is greater than 993px
        $scope.showbrowsertrue = 1;         //Toggle the section two of How it Works
        $scope.showmobiletrue = 0;   //Togglelin the section two of How it Works
        $scope.martop8 = 0;          //Margin when when column seperates
        $scope.showseperatorlarge = 1;  //Show Large LIne
        $scope.showseperatorsmall = 0;  //Show small line according to screen width
        $scope.mobiletextaligncenter = 0;
        $scope.colcentered = 0;


    } else {
        $scope.mobiletextaligncenter = 1;
        $scope.colcentered = 1;
        $scope.showbrowsertrue = 0;
        $scope.showmobiletrue = 1;
        $scope.martop8 = 1;
        $scope.showseperatorlarge = 0;
        $scope.showseperatorsmall = 1;
    }

    $scope.hideaccountbrowser = 1;


    if ($window.innerWidth > 500) {  //Checks If screen width is greater than 993px
        $scope.showaccountbrowser = 0;
        $scope.hideaccountbrowser = 1;

    } else {
        $scope.showaccountbrowser = 1;
        $scope.hideaccountbrowser = 0;
    }

    $scope.togglesidebar = 0;


    /*$timeout(function () {            //Timeout Used to Show topsection when web page open intially after white background.
     $scope.logozindexblue = 1;    //Toggle the value of top section
     $scope.logozindexwhite = 0;

     $timeout(function () {
     $scope.showtagline = 1;
     $scope.lightbackground = 1;
     $scope.iconbarchange = 1;
     $scope.navbarbackgroundcolourwhite = 1;
     }, 300);
     }, 800);*/


    $scope.splashdisplaynone = 0;
    $scope.splashanimation = 0;
    $scope.splashlogoanimation = 0

    $timeout(function () {
        $scope.splashlogoanimation = 1;
    }, 1500);

    $timeout(function () {
        $scope.splashanimation = 1;

        $timeout(function () {
            $scope.splashdisplaynone = 1;

        }, 4500);

    }, 3000);

    $scope.lightbackground = 1;
    $scope.iconbarchange = 1;
    $scope.navbarbackgroundcolourwhite = 1;
    $scope.logozindexblue = 1;    //Toggle the value of top section
    $scope.logozindexwhite = 0;

    $scope.autoscrollmobile = 0;  //When user see the section than only autoscroll


    $scope.formsubmitted = function () {

        console.log($scope.user);            //Check the User Data From cpnsole

        $scope.isformemailvalid = $scope.validateEmail($scope.user.emailaddress);
        $scope.isformnumbervalid = !(isNaN($scope.user.phonenumber));
        $scope.formpasswordlength = ($scope.user.password).length;
        $scope.formemaillength = ($scope.user.emailaddress).length;
        $scope.formnumberlength = ($scope.user.phonenumber).length;

        if ($scope.formemaillength > 0 && $scope.formnumberlength === 0 && $scope.formpasswordlength > 0) {

            if ($scope.isformemailvalid) {
                document.getElementById('login-form').submit();
            }

            else {
                ngDialog.open({
                    template: '<div class="text-center"> <h4 style="color:white;margin-top:5%;font-size:1.1em"> Please Enter valid Email Address !' +
                    '</h4> <button class="modalokbutton btn" ng-click="closeSelf()"> Ok</button> </div>',
                    plain: true,
                    scope: $scope
                });
            }
        }


        if ($scope.formemaillength === 0 && $scope.formnumberlength > 0 && $scope.formpasswordlength > 0) {

            if ($scope.isformnumbervalid && $scope.formnumberlength === 10) {
                document.getElementById('login-form').submit();
            }

            else {
                ngDialog.open({
                    template: '<div class="text-center"> <h4 style="color:white;margin-top:5%;font-size:1.1em"> Please Enter Correct Number !' +
                    '</h4> <button class="modalokbutton btn" ng-click="closeSelf()"> Ok</button> </div>',
                    plain: true,
                    scope: $scope
                });
            }

        }


        if (($scope.formemaillength === 0 && $scope.formpasswordlength === 0) || ($scope.formnumberlength === 0 && $scope.formpasswordlength === 0)) {
            ngDialog.open({
                template: '<div class="text-center"> <h4 style="color:white;margin-top:5%;font-size:1.1em"> Please Enter Correct Details !' +
                '</h4> <button class="modalokbutton btn" ng-click="closeSelf()"> Ok</button> </div>',
                plain: true,
                scope: $scope
            });
        }

        if ($scope.formnumberlength > 0 && $scope.formemaillength > 0) {
            ngDialog.open({
                template: '<div class="text-center"> <h4 style="color:white;margin-top:5%;font-size:1.1em">' +
                ' Please Enter Either Email address or Mobile Number !' +
                '</h4> <button class="modalokbutton btn" ng-click="closeSelf()"> Ok</button> </div>',
                plain: true,
                scope: $scope
            });
        }


    }

    $scope.openforgotmodal = function () {

        ngDialog.open({
            template: '<div class="text-center"> <h5 style="color:white;margin-top:5%;font-size:1.1em"> No worries! Just enter the Email-ID/mobile number that you have used on Mypoolin and we will send across your old password on the same email/mobile number. You can also set a new password below !' +
            '</h4>' +
            '</div>' +
            ' <input type="text" placeholder="Enter email/mobile number" ng-model="modalemailid" style="border-radius: 5px;padding:5px">' +
            '<div class="text-center" style="margin-top:3px"> ' +
            '<button class="modalokbuttonaccount btn" ng-click="openSelfParamsold(modalemailid)">Send Old Password</button>' +
            '<button class="modalokbuttonaccount btn" style="margin-left:3px" ng-click="openSelfParamsoldchange(modalemailid)">Change Password</button></div> ',
            plain: true,
            scope: $scope
        });

    }

    $scope.openSelfParamsold = function (gettext) {

        $scope.emailidfrommodal = gettext;

        $scope.closeSelf();


        if (angular.isUndefined($scope.emailidfrommodal)) {
            ngDialog.open({
                template: '<div class="text-center"> <h4 style="color:white;margin-top:5%;font-size:1.1em">Whoops! Please Fill Correct Details!' +
                '</h4> <button class="modalokbutton btn" ng-click="closeSelf()"> Ok</button> </div>',
                plain: true,
                scope: $scope
            });
        }

        else {

            var isEmail = isNaN($scope.emailidfrommodal);
            console.log("isEmail" + isEmail);

            $http.post('https://mypoolin.com/flexpool/Forpass', {'email': $scope.emailidfrommodal, 'isEmail': isEmail})

                .success(function (data, status, headers, config) {
                    console.log(data);
                })

                .error(function (data, status) { // called asynchronously if an error occurs
                    console.log(data);
                });

            /* var req = {
             method: 'POST',
             url: 'https://mypoolin.com/flexpool/Forpass',
             data: {email: '$scope.emailidfrommodal', isEmail: ''},
             contentType: 'application/json'
             }

             $http(req).then(function (success) {
             console.log(success); //success callback
             }, function (failure) {
             console.log(failure);  //failure callback
             });*/
        }

    }

    $scope.openSelfParamsoldchange = function (gettext) {

        $scope.emailidfrommodal = gettext;
        $scope.closeSelf();

        if (angular.isUndefined($scope.emailidfrommodal)) {
            ngDialog.open({
                template: '<div class="text-center"> <h4 style="color:white;margin-top:5%;font-size:1.1em">Whoops! Please Fill Correct Details!' +
                '</h4> <button class="modalokbutton btn" ng-click="closeSelf()"> Ok</button> </div>',
                plain: true,
                scope: $scope
            });
        }

        else {

            ngDialog.open({
                template: '<div class="text-center"> <h5 style="color:white;margin-top:5%;font-size:1.1em">{{emailidfrommodal}} No worries! Just enter the Email-ID/mobile number that you have used on Mypoolin and we will send across your old password on the same email/mobile number. You can also set a new password below !' +
                '</h4>' +
                '</div>' +
                ' <input type="text" placeholder="Your Old Password" ng-model="modalemailid" style="border-radius: 5px;padding:5px">' +
                ' <input type="text" placeholder="Enter New Password" ng-model="modalnewemailid" style="border-radius: 5px;padding:5px;display: block;margin-top:2px;margin-bottom:2px"> ' +
                ' <input type="text" placeholder="Retype New Password" ng-model="modalretypenewemailid" style="border-radius: 5px;padding:5px">' +
                '<div class="text-center" style="margin-top:3px"> ' +
                '<button class="modalokbuttonaccount btn" ng-click="changeSelfParamsold(modalemailid,modalnewemailid,modalretypenewemailid)">Change Password</button>' +
                '</div> ',
                plain: true,
                scope: $scope
            });
        }
    }

    $scope.changeSelfParamsold = function (oldpassword, newpassword, renewpassword) {


        var matchpass = angular.equals(newpassword, renewpassword);
        $scope.closeSelf();

        if (matchpass) {

            $scope.email = $scope.emailidfrommodal;
            $scope.new_password1 = newpassword;
            $scope.oldPassword = oldpassword;

            var isEmail = isNaN($scope.emailidfrommodal);
            console.log("isEmail:" + isEmail);

            $http.post('https://mypoolin.com/flexpool/Forpass', {
                'email': $scope.email,
                'isEmail': isEmail,
                'old': $scope.oldPassword,
                'pass': $scope.new_password1
            })

                .success(function (data, status, headers, config) {
                    console.log(data);
                })

                .error(function (data, status) { // called asynchronously if an error occurs
                    console.log(data);
                });


            /*var req = {
             method: 'POST',
             url: 'https://mypoolin.com/flexpool/Forpass',
             data: {email: '$scope.email', isEmail: '', old: '$scope.oldPassword', pass: '$scope.new_password1'},
             contentType: 'application/json'
             }

             $http(req).then(function (success) {
             console.log(success); //success callback
             }, function (failure) {
             console.log(failure);  //failure callback
             });*/

        }
        else {

            ngDialog.open({
                template: '<div class="text-center"> <h4 style="color:white;margin-top:5%;font-size:1.1em">Whoops! Password does not Matches!' +
                '</h4> <button class="modalokbutton btn" ng-click="closeSelf()"> Ok</button> </div>',
                plain: true,
                scope: $scope
            });
        }
    }

    $scope.showcallsymbol = 0;
    $scope.showcall = 1;

    $scope.showbot = 1;
    $scope.hidebot = 1;

    $scope.showcallus = function () {
        if (!$scope.colcentered) {
            $scope.showcallsymbol = 1;
            $scope.showcall = 0;
        }
    }

    $scope.hidecallus = function () {
        $scope.showcallsymbol = 0;
        $scope.showcall = 1;

    }

    $scope.showthebot = function () {
        if (!$scope.colcentered) {
            $scope.showbot = 1;
            $scope.hidebot = 0;
        }
    }

    $scope.hidethebot = function () {
        $scope.showbot = 0;
        $scope.hidebot = 1;
    }


    $scope.getlinkmobile = function () {

        console.log($scope.mobilenumber);

        if (($scope.mobilenumber).length < 10 || isNaN($scope.mobilenumber)) {
            $scope.modaltextdisplay = "Whoops.. please check the mobile number entered";
            console.log("invalid mobile");
        }
        else {

            console.log("valid mobile");
            console.log($scope.mobilenumber);

            $scope.modaltextdisplay = "Awesome! The app download link is being sent to your phone";


            $http.post('https://mypoolin.com/confirmation.php', {'mobile': $scope.mobilenumber})

                .success(function (data, status, headers, config) {
                    console.log(data);
                })

                .error(function (data, status) { // called asynchronously if an error occurs
                    console.log(data);
                });


            /* var req = {
             method: 'POST',
             url: 'https://mypoolin.com/confirmation.php',
             data: {mobile: '$scope.mobilenumber'},
             contentType: 'application/json'
             }

             $http(req).then(function (success) {
             console.log(success); //success callback
             }, function (failure) {
             console.log(failure);  //failure callback
             });*/
        }

        ngDialog.open({
            template: '<div class="text-center"> <h4 style="color:white;margin-top:5%;font-size:1.1em">{{modaltextdisplay}}' +
            '</h4> <button class="modalokbutton btn" ng-click="closeSelf()"> Ok</button> </div>',
            plain: true,
            className: 'ngdialog-theme-default',
            scope: $scope
        });

    }

    $scope.closeSelf = function () {
        ngDialog.closeAll();
    }

    $scope.showAccount = 0;
    $scope.hideaccountbot = 0;

    $scope.gotToAccounts = function () {
        if ($scope.logozindexwhite === 0) {
            $scope.showAccount = !$scope.showAccount;
            $scope.hideaccountbot = !$scope.hideaccountbot;

        }

        if ($scope.logozindexwhite === 1) {
            if ($scope.showAccount === 0 || $scope.showAccount === false) {
                $scope.showAccount = 1;
                $scope.hideaccountbot = !$scope.hideaccountbot;
            }
        }

        $document.scrollTopAnimated(0).then(function () {
            console && console.log('You just scrolled to the top!');
        });

        $scope.makebackgroundnormal();
    }


    /*$scope.$on('$includeContentLoaded', function (event, target) {
     console.log(event);  //this $includeContentLoaded event object
     console.log(target); //path to the included resource, 'snippet.html' in this case

     if(target=="html/footer.html"){
     var date = new Date();
     $scope.ddMMyyyy = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm:ss');
     console.log("Time until DOMready: winodw", $scope.ddMMyyyy);
     $scope.onloadimage = 0;
     $scope.navshow=1;
     $scope.containershow=1;

     $timeout(function () {
     $scope.showtagline = 1;
     $scope.lightbackground = 1;
     $scope.navbarbackgroundcolourwhite = 1;
     $scope.iconbarchange = 1;
     }, 1000);
     }

     });*/


    $scope.showtagline = 0;
    $scope.starttimerlogo = 1;
    $scope.endtimerlogo = 0;

    $scope.planplayfade = 0;
    $scope.splitsettlefade = 0;

    $scope.splittexttwo = 0;
    $scope.splittextthree = 0;
    $scope.splittextfour = 0;
    $scope.makebodyblur = 0;
    $scope.dontmakebodyblur = 1;

    $scope.makebackgroundblur = function () {
        $scope.makebodyblur = 1;
        $scope.howitworksanimate = 1;
    }

    $scope.makebackgroundnormal = function () {
        $scope.makebodyblur = 0;
        $scope.howitworksanimate = 0;

    }

    $scope.scrolltogetstarted = function () {

        var someElement = angular.element(document.getElementById('section-3'));
        $document.scrollToElement(someElement, -220, 1000);
        $scope.makebackgroundnormal();
    }

    $scope.scrolltoworking = function () {

        $document.scrollTopAnimated(520).then(function () {
            console && console.log('You just scrolled to the working!');
        });

        $scope.makebackgroundnormal();
    }

    $scope.scrolltohome = function () {

        $document.scrollTopAnimated(0).then(function () {
            console && console.log('You just scrolled to the top!');
        });


        $scope.makebackgroundnormal();


    }


    $scope.splitsettleimageonefading = 0;   //used to fade screenshot one of splitsettle
    $scope.splitsettleimagetwofading = 0;   //used to fade screenshot two of splitsettle
    $scope.splitsettleimagethreefading = 0;  //used to fade screenshot three of splitsettle
    $scope.splitsettleimagefourfading = 0;   //used to fade screenshot four of splitsettle

    $scope.splitandsettletimerone = null;    //used to set intial timer null

    $scope.splitsettleimageonefading = 1;  //Initially show the screenshot in split and settle section
    $scope.splitsettletextonedefault = 1;                 //Initially show the text in split and settle section
    $scope.splitandsettletextchange = 0;   //toggle display of the text
    $scope.autoscrollmouseeneter = null;   // when user see the screen than only autoscroll should work

    $scope.iconzoominitial = 1;
    $scope.iconzoominitialtextone = 0;
    $scope.iconzoominitialtextwo = 0;
    $scope.iconzoominitialtexthree = 0;
    $scope.iconzoominitialtextfour = 0;

    //Timer start function.
    $scope.StartTimerSettle = function () {

        $scope.autoscrollmouseenetersplit = $timeout(function () {

            if ($scope.autoscrollmobile === 1) {

                $scope.iconzoominitial = 0;
                $scope.iconzoominitialtextone = 1;

                $scope.splitsettlefade = 1;
                $scope.splitsettletextonedefault = 0;
                $scope.splittextone = 1;
                $scope.splitandsettletextchange = 1;
                $scope.callAtInterval();
                $timeout.cancel($scope.autoscrollmouseenetersplit);

            }
            else {
                $scope.StartTimerSettle();
            }

        }, 1);


    };

    $scope.splitsettletextonedefault = 1;
    $scope.splittextone = 0;

    //Timer stop function.
    $scope.StopTimerSettle = function () {

        $timeout.cancel($scope.autoscrollmouseenetersplit);

        $scope.splitsettlefade = 0;
        $scope.splitandsettletextchange = 0;

        $scope.iconzoominitial = 1;
        $scope.iconzoominitialtextone = 0;
        $scope.iconzoominitialtextwo = 0;
        $scope.iconzoominitialtexthree = 0;
        $scope.iconzoominitialtextfour = 0;

        $timeout.cancel($scope.splitandsettletimerone);
        $scope.splitsettletextonedefault = 1;
        $scope.splittextone = 0;
        $scope.splittexttwo = 0;
        $scope.splittextthree = 0;
        $scope.splittextfour = 0;

        $scope.splitsettleimageonefading = 1;
        $scope.splitsettleimagetwofading = 0;
        $scope.splitsettleimagethreefading = 0;
        $scope.splitsettleimagefourfading = 0;

    };


    $scope.callAtInterval = function () {

        $scope.splitandsettletimerone = $timeout(function () {

            $scope.splittextone = 0;
            $scope.splittexttwo = 1;
            $scope.splittextthree = 0;
            $scope.splittextfour = 0;
            $scope.splitsettletextonedefault = 0;                 //Initially show the text in split and settle section

            $scope.splitsettleimageonefading = 0;
            $scope.splitsettleimagetwofading = 1;
            $scope.splitsettleimagethreefading = 0;
            $scope.splitsettleimagefourfading = 0;

            $scope.iconzoominitialtextone = 0;
            $scope.iconzoominitialtextwo = 1;
            $scope.iconzoominitialtexthree = 0;
            $scope.iconzoominitialtextfour = 0;

            $scope.splitandsettletimerone = $timeout(function () {

                $scope.splittextone = 0;
                $scope.splittexttwo = 0;
                $scope.splittextthree = 1;
                $scope.splittextfour = 0;
                $scope.splitsettleimageonefading = 0;
                $scope.splitsettleimagetwofading = 0;
                $scope.splitsettleimagethreefading = 1;
                $scope.splitsettleimagefourfading = 0;

                $scope.iconzoominitialtextone = 0;
                $scope.iconzoominitialtextwo = 0;
                $scope.iconzoominitialtexthree = 1;
                $scope.iconzoominitialtextfour = 0;

                $scope.splitandsettletimerone = $timeout(function () {

                    $scope.splittextone = 0;
                    $scope.splittexttwo = 0;
                    $scope.splittextthree = 0;
                    $scope.splittextfour = 1;
                    $scope.splitsettleimageonefading = 0;
                    $scope.splitsettleimagetwofading = 0;
                    $scope.splitsettleimagethreefading = 0;
                    $scope.splitsettleimagefourfading = 1;

                    $scope.iconzoominitialtextone = 0;
                    $scope.iconzoominitialtextwo = 0;
                    $scope.iconzoominitialtexthree = 0;
                    $scope.iconzoominitialtextfour = 1;

                    $scope.splitandsettletimerone = $timeout(function () {

                        $scope.splittextone = 1;
                        $scope.splittexttwo = 0;
                        $scope.splittextthree = 0;
                        $scope.splittextfour = 0;
                        $scope.splitsettleimageonefading = 1;
                        $scope.splitsettleimagetwofading = 0;
                        $scope.splitsettleimagethreefading = 0;
                        $scope.splitsettleimagefourfading = 0;
                        $scope.iconzoominitialtextone = 1;
                        $scope.iconzoominitialtextwo = 0;
                        $scope.iconzoominitialtexthree = 0;
                        $scope.iconzoominitialtextfour = 0;

                        $scope.callAtInterval();
                    }, 2700);
                }, 2700);
            }, 2700);
        }, 2700);
    }


    $scope.plantextone = 0;  //text line one of plan and play
    $scope.plantextonefadebackground = 1;

    $scope.plantexttwo = 0;//text line two of plan and play
    $scope.plantextthree = 0;//text line three of plan and play
    $scope.plantextfour = 0;//text line four of plan and play

    $scope.planimageonefading = 0;  //used to fade screenshot one of plan and play
    $scope.planimagetwofading = 0;  //used to fade screenshot two of plan and play
    $scope.planimagethreefading = 0; //used to fade screenshot three of plan and play
    $scope.planimagefourfading = 0; //used to fade screenshot four of plan and play

    $scope.plantimerone = null;  //used to set intial timer null for plan and play section

    $scope.planimageonefading = 1;  //Initially show the screenshot in plan and play section

    $scope.planandplaytextchange = 0; //toggle display of the text plan and play

    $scope.iconzoominitialplay = 1;
    $scope.iconzoominitialtextoneplay = 0;
    $scope.iconzoominitialtextwoplay = 0;
    $scope.iconzoominitialtexthreeplay = 0;
    $scope.iconzoominitialtextfourplay = 0;

    //Timer start function.
    $scope.StartTimerPlay = function () {

        $scope.autoscrollmouseeneterplay = $timeout(function () {
            if ($scope.autoscrollmobile === 1) {

                $scope.iconzoominitialplay = 0;
                $scope.iconzoominitialtextoneplay = 1;

                $scope.plantextone = 1;  //text line one of plan and play
                $scope.plantextonefadebackground = 0;
                $scope.planplayfade = 1;
                $scope.planandplaytextchange = 1;
                $scope.callAtIntervalPlay();
                $timeout.cancel($scope.autoscrollmouseeneterplay);

            }
            else {
                $scope.StartTimerPlay();
            }

        }, 1);

    };


    //Timer stop function.
    $scope.StopTimerPlay = function () {

        $scope.planplayfade = 0;
        $scope.planandplaytextchange = 0;
        $timeout.cancel($scope.autoscrollmouseeneterplay);
        $timeout.cancel($scope.plantimerone);
        $scope.plantextone = 0;  //text line one of plan and play
        $scope.plantextonefadebackground = 1;
        $scope.plantexttwo = 0;
        $scope.plantextthree = 0;
        $scope.plantextfour = 0;

        $scope.planimageonefading = 1;
        $scope.planimagetwofading = 0;
        $scope.planimagethreefading = 0;
        $scope.planimagefourfading = 0;

        $scope.iconzoominitialplay = 1;
        $scope.iconzoominitialtextoneplay = 0;
        $scope.iconzoominitialtextwoplay = 0;
        $scope.iconzoominitialtexthreeplay = 0;
        $scope.iconzoominitialtextfourplay = 0;

    };


    $scope.callAtIntervalPlay = function () {

        $scope.plantimerone = $timeout(function () {

            $scope.plantextone = 0;
            $scope.plantexttwo = 1;
            $scope.plantextthree = 0;
            $scope.plantextfour = 0;
            $scope.planimageonefading = 0;
            $scope.planimagetwofading = 1;
            $scope.planimagethreefading = 0;
            $scope.planimagefourfading = 0;

            $scope.iconzoominitialtextoneplay = 0;
            $scope.iconzoominitialtextwoplay = 1;
            $scope.iconzoominitialtexthreeplay = 0;
            $scope.iconzoominitialtextfourplay = 0;

            $scope.plantimerone = $timeout(function () {

                $scope.iconzoominitialtextoneplay = 0;
                $scope.iconzoominitialtextwoplay = 0;
                $scope.iconzoominitialtexthreeplay = 1;
                $scope.iconzoominitialtextfourplay = 0;

                $scope.plantextone = 0;
                $scope.plantexttwo = 0;
                $scope.plantextthree = 1;
                $scope.plantextfour = 0;
                $scope.planimageonefading = 0;
                $scope.planimagetwofading = 0;
                $scope.planimagethreefading = 1;
                $scope.planimagefourfading = 0;

                $scope.plantimerone = $timeout(function () {

                    $scope.plantextone = 0;
                    $scope.plantexttwo = 0;
                    $scope.plantextthree = 0;
                    $scope.plantextfour = 1;
                    $scope.planimageonefading = 0;
                    $scope.planimagetwofading = 0;
                    $scope.planimagethreefading = 0;
                    $scope.planimagefourfading = 1;

                    $scope.iconzoominitialtextoneplay = 0;
                    $scope.iconzoominitialtextwoplay = 0;
                    $scope.iconzoominitialtexthreeplay = 0;
                    $scope.iconzoominitialtextfourplay = 1;

                    $scope.plantimerone = $timeout(function () {

                        $scope.plantextone = 1;
                        $scope.plantexttwo = 0;
                        $scope.plantextthree = 0;
                        $scope.plantextfour = 0;
                        $scope.planimageonefading = 1;
                        $scope.planimagetwofading = 0;
                        $scope.planimagethreefading = 0;
                        $scope.planimagefourfading = 0;

                        $scope.iconzoominitialtextoneplay = 1;
                        $scope.iconzoominitialtextwoplay = 0;
                        $scope.iconzoominitialtexthreeplay = 0;
                        $scope.iconzoominitialtextfourplay = 0;

                        $scope.callAtIntervalPlay();
                    }, 2700);
                }, 2700);
            }, 2700);
        }, 2700);
    }

    $scope.starttimernodisplaytrue = 1;  //bluelogo visible upon scrolling
    $scope.starttimernodisplaynone = 0;  //toggle the top left logo

    $scope.endtimerlogodisplaynone = 1;  //whitelogo visible upon scrolling
    $scope.endtimerlogodisplaytrue = 0;  //toggle the top left logo


    $scope.firstDivHide = 0;
    $scope.secondDivHide = 0;
    $scope.firstDivShow = 1;
    $scope.secondDivShow = 1;

    $scope.showline = 1;  //Toggle the line visibility
    $scope.hideline = 0;  //Toggle the line visibility

    $scope.iconbarchange = 0; //Toggle the icons visibility


    $scope.lefttorightsliderone = 0;  //sliding left to right slide one
    $scope.righttoleftsliderone = 0;  //sliding right to left slide one
    $scope.lefttorightslidertwo = 0;  //sliding left to right slide two
    $scope.righttoleftslidertwo = 0;  //sliding right to left slide two
    $scope.lefttorightsliderthree = 0; //sliding left to right slide three
    $scope.righttoleftsliderthree = 0;  //sliding right to left slide three
    $scope.lefttorightsliderfour = 0; //sliding left to right slide four
    $scope.righttoleftsliderfour = 0;  //sliding right to left slide four

    $scope.showslideronedisplay = 1;  //Show initially the slider one in section three
    $scope.hideslideronedisplay = 0;  //hide initially the slider one in section three

    $scope.showslidertwodisplay = 0;  //Show the slider two in section three
    $scope.hideslidertwodisplay = 1;  //hide the slider two in section three

    $scope.showsliderthreedisplay = 0;  //Show the slider three in section three
    $scope.hidesliderthreedisplay = 1;  //hide the slider three in section three

    $scope.showsliderfourdisplay = 0;   //Show the slider four in section three
    $scope.hidesliderfourdisplay = 1;   //hide the slider four in section three

    $scope.forgot_email = "";

    $scope.forgotpassword = function () {

        console.log($scope.forgot_email);
        $scope.isemailvalid = $scope.validateEmail($scope.forgot_email);
        console.log($scope.isemailvalid);

        if ($scope.isemailValid) {
            $scope.forgotemailinvalid = "Awesome ! Check your Email";
        }
        else {

            $scope.forgotemailinvalid = "Whoops! Email is not Valid";


            /*var req = {
             method: 'POST',
             url: 'https://mypoolin.com/flexpool/Forpass',
             data:
             {
             email: '$scope.forgot_email',
             isEmail: 'isEmail'
             },
             contentType: 'application/json'
             }

             $http(req).then(function (success) {
             console.log(success); //success callback
             }, function (failure) {
             console.log(failure);  //failure callback
             });*/
        }
    }


    $scope.changesliderone = function () {  //changing the slider  one


        $scope.lefttorightsliderone = 1;
        $scope.righttoleftsliderone = 0;
        $scope.lefttorightslidertwo = 0;
        $scope.righttoleftslidertwo = 0;
        $scope.lefttorightsliderthree = 0;
        $scope.righttoleftsliderthree = 0;
        $scope.lefttorightsliderfour = 0;
        $scope.righttoleftsliderfour = 0;

        $timeout(function () {

            $scope.showslideronedisplay = 0;
            $scope.hideslideronedisplay = 1;

            $scope.showslidertwodisplay = 1;
            $scope.hideslidertwodisplay = 0;

            $scope.showsliderthreedisplay = 0;
            $scope.hidesliderthreedisplay = 1;

            $scope.showsliderfourdisplay = 0;
            $scope.hidesliderfourdisplay = 1;


        }, 700);


    }

    $scope.changeslidertwo = function () { //changing the slider two

        $scope.lefttorightsliderone = 0;
        $scope.righttoleftsliderone = 0;
        $scope.lefttorightslidertwo = 1;
        $scope.righttoleftslidertwo = 0;
        $scope.lefttorightsliderthree = 0;
        $scope.righttoleftsliderthree = 0;
        $scope.lefttorightsliderfour = 0;
        $scope.righttoleftsliderfour = 0;

        $timeout(function () {

            $scope.showslideronedisplay = 0;
            $scope.hideslideronedisplay = 1;

            $scope.showslidertwodisplay = 0;
            $scope.hideslidertwodisplay = 1;

            $scope.showsliderthreedisplay = 1;
            $scope.hidesliderthreedisplay = 0;

            $scope.showsliderfourdisplay = 0;
            $scope.hidesliderfourdisplay = 1;

        }, 700);

    }

    $scope.changesliderthree = function () {  //work for changing slider two

        $scope.lefttorightsliderthree = 1;

        $timeout(function () {

            $scope.showslideronedisplay = 1;
            $scope.hideslideronedisplay = 0;

            $scope.showslidertwodisplay = 0;
            $scope.hideslidertwodisplay = 1;

            $scope.showsliderthreedisplay = 0;
            $scope.hidesliderthreedisplay = 1;

            $scope.showsliderfourdisplay = 0;
            $scope.hidesliderfourdisplay = 1;

            $scope.lefttorightsliderthree = 0;


        }, 700);

    }


    $scope.changesliderfour = function () {   //working for changing slider two

        $scope.lefttorightsliderone = 0;
        $scope.righttoleftsliderone = 0;
        $scope.lefttorightslidertwo = 1;
        $scope.righttoleftslidertwo = 0;
        $scope.lefttorightsliderthree = 0;
        $scope.righttoleftsliderthree = 0;
        $scope.lefttorightsliderfour = 0;
        $scope.righttoleftsliderfour = 0;

        $timeout(function () {

            $scope.showslideronedisplay = 0;
            $scope.hideslideronedisplay = 1;

            $scope.showslidertwodisplay = 0;
            $scope.hideslidertwodisplay = 1;

            $scope.showsliderthreedisplay = 0;
            $scope.hidesliderthreedisplay = 1;

            $scope.showsliderfourdisplay = 1;
            $scope.hidesliderfourdisplay = 0;

        }, 700);

    }

    $scope.backslidertoone = function () {

        $scope.lefttorightsliderone = 0;
        $scope.righttoleftsliderone = 0;
        $scope.lefttorightslidertwo = 0;
        $scope.righttoleftslidertwo = 1;
        $scope.lefttorightsliderthree = 0;
        $scope.righttoleftsliderthree = 0;
        $scope.lefttorightsliderfour = 0;
        $scope.righttoleftsliderfour = 0;

        $timeout(function () {

            $scope.showslideronedisplay = 1;
            $scope.hideslideronedisplay = 0;

            $scope.showslidertwodisplay = 0;
            $scope.hideslidertwodisplay = 1;

            $scope.showsliderthreedisplay = 0;
            $scope.hidesliderthreedisplay = 1;

            $scope.showsliderfourdisplay = 0;
            $scope.hidesliderfourdisplay = 1;

        }, 1000);
    }

    $scope.backslidertotwo = function () {

        $scope.lefttorightsliderone = 0;
        $scope.righttoleftsliderone = 0;
        $scope.lefttorightslidertwo = 0;
        $scope.righttoleftslidertwo = 0;
        $scope.lefttorightsliderthree = 0;
        $scope.righttoleftsliderthree = 1;
        $scope.lefttorightsliderfour = 0;
        $scope.righttoleftsliderfour = 0;

        $timeout(function () {

            $scope.showslideronedisplay = 0;
            $scope.hideslideronedisplay = 1;

            $scope.showslidertwodisplay = 1;
            $scope.hideslidertwodisplay = 0;

            $scope.showsliderthreedisplay = 0;
            $scope.hidesliderthreedisplay = 1;

            $scope.showsliderfourdisplay = 0;
            $scope.hidesliderfourdisplay = 1;

        }, 1000);
    }

    $scope.backslidertothree = function () {

        $scope.righttoleftsliderfour = 1;
        $scope.lefttorightsliderone = 0;
        $scope.righttoleftsliderone = 0;
        $scope.lefttorightslidertwo = 0;
        $scope.righttoleftslidertwo = 0;
        $scope.lefttorightsliderthree = 0;
        $scope.righttoleftsliderthree = 0;
        $scope.lefttorightsliderfour = 0;

        $timeout(function () {

            $scope.showslideronedisplay = 0;
            $scope.hideslideronedisplay = 1;

            $scope.showslidertwodisplay = 1;
            $scope.hideslidertwodisplay = 0;

            $scope.showsliderthreedisplay = 0;
            $scope.hidesliderthreedisplay = 1;

            $scope.showsliderfourdisplay = 0;
            $scope.hidesliderfourdisplay = 1;

        }, 1000);
    }


    $scope.emailsubscribe = "";
    $scope.datatoggling = "modal";
    $scope.datatoggletarget = "#po";

    $scope.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    $scope.submitemail = function () {

        $scope.isemailvalid = $scope.validateEmail($scope.emailsubscribe);


        if (($scope.isemailvalid === false)) {
            console.log("invalid email");
            $scope.modalemailtext = "Whoops! Please Enter the valid Email address !";
        }

        else {

            console.log($scope.emailsubscribe);
            console.log("valid email");

            $scope.modalemailtext = "Awesome! Your email has been subscribed";

            $http.post('https://mypoolin.com/confirmation.php', {'email': $scope.emailsubscribe})
                .success(function (data, status, headers, config) {
                    console.log(data);
                })
                .error(function (data, status) { // called asynchronously if an error occurs
                    console.log(data);
                });

            /* var req = {
             method: 'POST',
             url: 'https://mypoolin.com/confirmation.php',
             data: {email: '$scope.emailsubscribe'},
             contentType: 'application/json'
             }

             $http(req).then(function (success) {
             console.log(success); //success callback
             }, function (failure) {
             console.log(failure);  //failure callback
             });*/
        }

        ngDialog.open({
            template: '<div class="text-center"> <h4 style="color:white;margin-top:5%;font-size:1.1em">{{modalemailtext}}' +
            '</h4> <button class="modalokbutton btn" ng-click="closeSelf()"> Ok</button> </div>',
            plain: true,
            scope: $scope
        });

    }


    $scope.howitworksanimate = 0;

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };


});





'use strict';

angular.module('Application.controllers', [])

.controller("ContactController", ["$scope", "$timeout", function($scope, $timeout) {
    $scope.contact = {
      category: "Advisory",
      email: "",
      inquiry: "",
      submitted: false,
      submit: function() {
          let that = this;
          if (this.email && this.inquiry) {
              this.submitted = true;
              $.post("/form/submit", {
                  email: that.email,
                  inquiry: that.inquiry,
                  category: that.category
              })
          }
      }
    };
}])

.controller("LandingController", ["$scope", "$timeout", function($scope, $timeout) {
      $scope.whatwedo = {
          section: 1, // 1,2,3
          subsection: 1,
          setSection: function(section) {
              this.section = section
              this.subsection = 1
          },
          setSubsection: function(subsection) {
              this.subsection = subsection
          },
          nextSubsection: function() {
              this.subsection++
          },
          previousSubsection: function() {
              this.subsection--
          }
      }
}])

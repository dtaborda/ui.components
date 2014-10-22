angular.module("src/tabs/tab.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/tabs/tab.html",
    "<li ng-class=\"{active: active, disabled: disabled}\">\n" +
    "  <a ng-click=\"select()\" tab-heading-transclude>{{heading}}</a>\n" +
    "</li>\n" +
    "");
}]);

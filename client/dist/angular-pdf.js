/*! angular-pdf - v0.0.1-SNAPSHOT - 2013-07-27
 * https://github.com/datalytics/angular-pdf
 * Copyright (c) 2013 Eric Odom;
 * Licensed MIT
 */
angular.module('app', [
  'document',
  'viewer',
  'service.doc',
  'templates.app',
  'templates.common'])

  .controller('AppCtrl', ['$scope', '$location', function ($scope, $location) {

    $location.path('/document'); // path not hash

    // handle the window height change, so the page container area is 100% the height
    $scope.getHeight = function() {
      return (window.innerHeight - 79) + 'px';       // take into account the fixed footer
    };

    $scope.getFullHeight = function() {
      return (window.innerHeight + 1);
    };

    $scope.$watch($scope.getHeight, function(newValue) {
      $scope.window_height = newValue;
    });

    $scope.$watch($scope.getFullHeight, function(newValue) {
      $scope.window_full_height = newValue;
    });

    window.onresize = function(){
      $scope.$apply();
    }

  }]);








angular.module('document', [])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/document', {
      templateUrl:'docs/docs.tpl.html',
      controller:'DocumentCtrl'
    });
  }])

  .controller('DocumentCtrl', ['$scope', '$location', 'DocService',
    function ($scope, $location, DocService) {

    // store the document url in the service, so we don't have to pass it in a variable
    $scope.loadForm = function(url){

      DocService.setUrl(url);

      $location.path('/viewer'); // path not hash
    }

  }]);




angular.module('viewer', [])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/viewer', {
      templateUrl:'viewer/viewer.tpl.html',
      controller:'ViewerCtrl'
    });
  }])

  .controller('ViewerCtrl', ['$scope', '$location', 'DocService', function ($scope, $location, DocService) {

    // Initialize the viewer and load Form from the DocService URL
    InitPDFViewer(DocService.getUrl());


  }]);

angular.module('service.doc', [])
  .factory('DocService', function() {
    var DocService = {};
    var doc = {
      url: ''
    };

    DocService.setUrl = function(url) { doc.url = url; }
    DocService.getUrl = function() { return doc.url; }

    return DocService;
  });

angular.module('templates.app', ['docs/docs.tpl.html', 'viewer/viewer.tpl.html']);

angular.module("docs/docs.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("docs/docs.tpl.html",
    "<h2>Sample PDF Documents</h2>\n" +
    "<div class=\"container-fluid\">\n" +
    "    <div class=\"row-fluid\">\n" +
    "        <div class=\"span4\">\n" +
    "            <ul>\n" +
    "                <li>\n" +
    "                    <a style=\"cursor:pointer;\" ng-click=\"loadForm('http://cdn.mozilla.net/pdfjs/helloworld.pdf')\">Hello World Form</a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <a style=\"cursor:pointer;\" ng-click=\"loadForm('https://s3.amazonaws.com/formcatalog/123_HHP_Trans_OA_v1_web.pdf')\">123_HHP_Trans_OA_v1_web</a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <a style=\"cursor:pointer;\" ng-click=\"loadForm('https://s3.amazonaws.com/formcatalog/120_HHP_SNSOCROC_OASIS_091214_v3_web.pdf')\">120_HHP_SNSOCROC_OASIS_091214_v3_web.pdf</a>\n" +
    "                </li>\n" +
    "\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("viewer/viewer.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("viewer/viewer.tpl.html",
    "<body tabindex=\"1\">\n" +
    "<div id=\"outerContainer\" class=\"loadingInProgress\">\n" +
    "\n" +
    "    <div id=\"sidebarContainer\">\n" +
    "        <div id=\"toolbarSidebar\">\n" +
    "            <div class=\"splitToolbarButton toggled\">\n" +
    "                <button id=\"viewThumbnail\" class=\"toolbarButton group toggled\" title=\"Show Thumbnails\" tabindex=\"2\" data-l10n-id=\"thumbs\">\n" +
    "                    <span data-l10n-id=\"thumbs_label\">Thumbnails</span>\n" +
    "                </button>\n" +
    "                <button id=\"viewOutline\" class=\"toolbarButton group\" title=\"Show Document Outline\" tabindex=\"3\" data-l10n-id=\"outline\">\n" +
    "                    <span data-l10n-id=\"outline_label\">Document Outline</span>\n" +
    "                </button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div id=\"sidebarContent\">\n" +
    "            <div id=\"thumbnailView\">\n" +
    "            </div>\n" +
    "            <div id=\"outlineView\" class=\"hidden\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>  <!-- sidebarContainer -->\n" +
    "\n" +
    "    <div id=\"mainContainer\">\n" +
    "        <div class=\"findbar hidden doorHanger hiddenSmallView\" id=\"findbar\">\n" +
    "            <label for=\"findInput\" class=\"toolbarLabel\" data-l10n-id=\"find_label\">Find:</label>\n" +
    "            <input id=\"findInput\" class=\"toolbarField\" tabindex=\"21\">\n" +
    "            <div class=\"splitToolbarButton\">\n" +
    "                <button class=\"toolbarButton findPrevious\" title=\"\" id=\"findPrevious\" tabindex=\"22\" data-l10n-id=\"find_previous\">\n" +
    "                    <span data-l10n-id=\"find_previous_label\">Previous</span>\n" +
    "                </button>\n" +
    "                <div class=\"splitToolbarButtonSeparator\"></div>\n" +
    "                <button class=\"toolbarButton findNext\" title=\"\" id=\"findNext\" tabindex=\"23\" data-l10n-id=\"find_next\">\n" +
    "                    <span data-l10n-id=\"find_next_label\">Next</span>\n" +
    "                </button>\n" +
    "            </div>\n" +
    "            <input type=\"checkbox\" id=\"findHighlightAll\" class=\"toolbarField\">\n" +
    "            <label for=\"findHighlightAll\" class=\"toolbarLabel\" tabindex=\"24\" data-l10n-id=\"find_highlight\">Highlight all</label>\n" +
    "            <input type=\"checkbox\" id=\"findMatchCase\" class=\"toolbarField\">\n" +
    "            <label for=\"findMatchCase\" class=\"toolbarLabel\" tabindex=\"25\" data-l10n-id=\"find_match_case_label\">Match case</label>\n" +
    "            <span id=\"findMsg\" class=\"toolbarLabel\"></span>\n" +
    "        </div>\n" +
    "        <div class=\"toolbar\">\n" +
    "            <div id=\"toolbarContainer\">\n" +
    "                <div id=\"toolbarViewer\">\n" +
    "                    <div id=\"toolbarViewerLeft\">\n" +
    "                        <button id=\"sidebarToggle\" class=\"toolbarButton\" title=\"Toggle Sidebar\" tabindex=\"4\" data-l10n-id=\"toggle_sidebar\">\n" +
    "                            <span data-l10n-id=\"toggle_sidebar_label\">Toggle Sidebar</span>\n" +
    "                        </button>\n" +
    "                        <div class=\"toolbarButtonSpacer\"></div>\n" +
    "                        <button id=\"viewFind\" class=\"toolbarButton group hiddenSmallView\" title=\"Find in Document\" tabindex=\"5\" data-l10n-id=\"findbar\">\n" +
    "                            <span data-l10n-id=\"findbar_label\">Find</span>\n" +
    "                        </button>\n" +
    "                        <div class=\"splitToolbarButton\">\n" +
    "                            <button class=\"toolbarButton pageUp\" title=\"Previous Page\" id=\"previous\" tabindex=\"6\" data-l10n-id=\"previous\">\n" +
    "                                <span data-l10n-id=\"previous_label\">Previous</span>\n" +
    "                            </button>\n" +
    "                            <div class=\"splitToolbarButtonSeparator\"></div>\n" +
    "                            <button class=\"toolbarButton pageDown\" title=\"Next Page\" id=\"next\" tabindex=\"7\" data-l10n-id=\"next\">\n" +
    "                                <span data-l10n-id=\"next_label\">Next</span>\n" +
    "                            </button>\n" +
    "                        </div>\n" +
    "                        <label id=\"pageNumberLabel\" class=\"toolbarLabel\" for=\"pageNumber\" data-l10n-id=\"page_label\">Page: </label>\n" +
    "                        <input type=\"number\" id=\"pageNumber\" class=\"toolbarField pageNumber\" value=\"1\" size=\"4\" min=\"1\" tabindex=\"8\">\n" +
    "                        </input>\n" +
    "                        <span id=\"numPages\" class=\"toolbarLabel\"></span>\n" +
    "                    </div>\n" +
    "                    <div id=\"toolbarViewerRight\">\n" +
    "                        <input id=\"fileInput\" class=\"fileInput\" type=\"file\" oncontextmenu=\"return false;\" style=\"visibility: hidden; position: fixed; right: 0; top: 0\" />\n" +
    "\n" +
    "                        <button id=\"presentationMode\" class=\"toolbarButton presentationMode hiddenSmallView\" title=\"Switch to Presentation Mode\" tabindex=\"12\" data-l10n-id=\"presentation_mode\">\n" +
    "                            <span data-l10n-id=\"presentation_mode_label\">Presentation Mode</span>\n" +
    "                        </button>\n" +
    "\n" +
    "                        <button id=\"openFile\" class=\"toolbarButton openFile hiddenSmallView\" title=\"Open File\" tabindex=\"13\" data-l10n-id=\"open_file\">\n" +
    "                            <span data-l10n-id=\"open_file_label\">Open</span>\n" +
    "                        </button>\n" +
    "\n" +
    "                        <button id=\"print\" class=\"toolbarButton print\" title=\"Print\" tabindex=\"14\" data-l10n-id=\"print\">\n" +
    "                            <span data-l10n-id=\"print_label\">Print</span>\n" +
    "                        </button>\n" +
    "\n" +
    "                        <button id=\"download\" class=\"toolbarButton download\" title=\"Download\" tabindex=\"15\" data-l10n-id=\"download\">\n" +
    "                            <span data-l10n-id=\"download_label\">Download</span>\n" +
    "                        </button>\n" +
    "                        <!-- <div class=\"toolbarButtonSpacer\"></div> -->\n" +
    "                        <a href=\"#\" id=\"viewBookmark\" class=\"toolbarButton bookmark hiddenSmallView\" title=\"Current view (copy or open in new window)\" tabindex=\"16\" data-l10n-id=\"bookmark\"><span data-l10n-id=\"bookmark_label\">Current View</span></a>\n" +
    "                    </div>\n" +
    "                    <div class=\"outerCenter\">\n" +
    "                        <div class=\"innerCenter\" id=\"toolbarViewerMiddle\">\n" +
    "                            <div class=\"splitToolbarButton\">\n" +
    "                                <button id=\"zoomOut\" class=\"toolbarButton zoomOut\" title=\"Zoom Out\" tabindex=\"9\" data-l10n-id=\"zoom_out\">\n" +
    "                                    <span data-l10n-id=\"zoom_out_label\">Zoom Out</span>\n" +
    "                                </button>\n" +
    "                                <div class=\"splitToolbarButtonSeparator\"></div>\n" +
    "                                <button id=\"zoomIn\" class=\"toolbarButton zoomIn\" title=\"Zoom In\" tabindex=\"10\" data-l10n-id=\"zoom_in\">\n" +
    "                                    <span data-l10n-id=\"zoom_in_label\">Zoom In</span>\n" +
    "                                </button>\n" +
    "                            </div>\n" +
    "              <span id=\"scaleSelectContainer\" class=\"dropdownToolbarButton\">\n" +
    "                 <select style=\"height:20px;\" id=\"scaleSelect\" title=\"Zoom\" oncontextmenu=\"return false;\" tabindex=\"11\" data-l10n-id=\"zoom\">\n" +
    "                     <option id=\"pageAutoOption\" value=\"auto\" selected=\"selected\" data-l10n-id=\"page_scale_auto\">Automatic Zoom</option>\n" +
    "                     <option id=\"pageActualOption\" value=\"page-actual\" data-l10n-id=\"page_scale_actual\">Actual Size</option>\n" +
    "                     <option id=\"pageFitOption\" value=\"page-fit\" data-l10n-id=\"page_scale_fit\">Fit Page</option>\n" +
    "                     <option id=\"pageWidthOption\" value=\"page-width\" data-l10n-id=\"page_scale_width\">Full Width</option>\n" +
    "                     <option id=\"customScaleOption\" value=\"custom\"></option>\n" +
    "                     <option value=\"0.5\">50%</option>\n" +
    "                     <option value=\"0.75\">75%</option>\n" +
    "                     <option value=\"1\">100%</option>\n" +
    "                     <option value=\"1.25\">125%</option>\n" +
    "                     <option value=\"1.5\">150%</option>\n" +
    "                     <option value=\"2\">200%</option>\n" +
    "                 </select>\n" +
    "              </span>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <!--<div id=\"loadingBar\">-->\n" +
    "                <!--<div class=\"progress\">-->\n" +
    "                <!--<div class=\"glimmer\">-->\n" +
    "                <!--</div>-->\n" +
    "                <!--</div>-->\n" +
    "                <!--</div>-->\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <menu type=\"context\" id=\"viewerContextMenu\">\n" +
    "            <menuitem id=\"firstPage\" label=\"First Page\"\n" +
    "                      data-l10n-id=\"first_page\" ></menuitem>\n" +
    "            <menuitem id=\"lastPage\" label=\"Last Page\"\n" +
    "                      data-l10n-id=\"last_page\" ></menuitem>\n" +
    "            <menuitem id=\"pageRotateCcw\" label=\"Rotate Counter-Clockwise\"\n" +
    "                      data-l10n-id=\"page_rotate_ccw\" ></menuitem>\n" +
    "            <menuitem id=\"pageRotateCw\" label=\"Rotate Clockwise\"\n" +
    "                      data-l10n-id=\"page_rotate_cw\" ></menuitem>\n" +
    "        </menu>\n" +
    "\n" +
    "        <div id=\"viewerContainer\" tabindex=\"0\">\n" +
    "            <div id=\"viewer\" contextmenu=\"viewerContextMenu\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div id=\"errorWrapper\" hidden='true'>\n" +
    "            <div id=\"errorMessageLeft\">\n" +
    "                <span id=\"errorMessage\"></span>\n" +
    "                <button id=\"errorShowMore\" data-l10n-id=\"error_more_info\">\n" +
    "                    More Information\n" +
    "                </button>\n" +
    "                <button id=\"errorShowLess\" data-l10n-id=\"error_less_info\" hidden='true'>\n" +
    "                    Less Information\n" +
    "                </button>\n" +
    "            </div>\n" +
    "            <div id=\"errorMessageRight\">\n" +
    "                <button id=\"errorClose\" data-l10n-id=\"error_close\">\n" +
    "                    Close\n" +
    "                </button>\n" +
    "            </div>\n" +
    "            <div class=\"clearBoth\"></div>\n" +
    "            <textarea id=\"errorMoreInfo\" hidden='true' readonly=\"readonly\"></textarea>\n" +
    "        </div>\n" +
    "    </div> <!-- mainContainer -->\n" +
    "\n" +
    "</div> <!-- outerContainer -->\n" +
    "\n" +
    "<div id=\"printContainer\"></div>\n" +
    "</body>\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module('templates.common', []);


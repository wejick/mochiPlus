(function () {
    'use strict';

    angular.module('ng-file-model', [])

    .directive("ngFileModel", [function () {
        return {
            scope: {
                ngFileModel: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var objects = [];
                    for(var i = 0; i < changeEvent.target.files.length ; i++) {
                        var reader = new FileReader();

                        reader.onload = function (loadEvent) {
                            console.log(loadEvent);
                            var obj = {
                                lastModified: changeEvent.target.files[0].lastModified,
                                lastModifiedDate: changeEvent.target.files[0].lastModifiedDate,
                                name: changeEvent.target.files[0].name,
                                size: changeEvent.target.files[0].size,
                                type: changeEvent.target.files[0].type,
                                data: loadEvent.target.result
                            };
                            objects.push(obj);
                        }
                        reader.readAsDataURL(changeEvent.target.files[i]);
                    }

                    scope.$apply(function () {
                        scope.ngFileModel = objects;
                    });
                });
            }
        }
    }]);
    if( typeof exports !== 'undefined' ) {
      exports['default'] = angular.module('ng-file-model');
      module.exports = exports['default'];
    }
})();

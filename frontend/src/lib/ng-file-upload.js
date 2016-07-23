function addForm() {
    var image_form = document.getElementById('file-forms');
    image_form.innerHTML = image_form.innerHTML + '<input type="file" name="pic" accept="image/*" ng-file-model="uploadData.Images" class="form-control" onchange="addForm()"/>';
}

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
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            var obj = {
                                file_name: changeEvent.target.files[0].name,
                                file: loadEvent.target.result
                            };

                            if(scope.ngFileModel) {
                                scope.ngFileModel.push(obj);
                            } else {
                                scope.ngFileModel = new Array();
                                scope.ngFileModel.push(obj);
                            }
                            if(scope.ngFileModel.length <= 2) {
                                var img = document.getElementById("img-"+scope.ngFileModel.length);
                                img.removeAttribute("style");
                            }
                        });
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }]);
    if( typeof exports !== 'undefined' ) {
      exports['default'] = angular.module('ng-file-model');
      module.exports = exports['default'];
    }
})();

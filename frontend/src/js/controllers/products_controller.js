angular.module('Up+.controllers.Products', [])

.controller('ProductsController', function($scope){
  $scope.data = [
    {
      title :"Kacang goreng",
      price : 3000,
      shop  : "Surabaya cell",
      location : "Yogyakarta",
      image : "images/ijo.png"
    },
    {
      title : "Kacang panjang",
      price : 5000,
      shop  : "Mentari pagi",
      location : "Kediri",
      image : "images/ijo.png"
    },
    {
      title : "Kacang Ijo",
      price : 5000,
      shop  : "Sahabat pagi",
      location : "Kediri",
      image : "images/ijo.png"
    },
    {
      title : "Kacang kelici",
      price : 4000,
      shop  : "Mentari pagi",
      location : "Kediri",
      image : "images/ijo.png"
    },
    {
      title : "Kacang atom",
      price : 15000,
      shop  : "Cahaya Sahabat",
      location : "Blitar",
      image : "images/ijo.png"
    },
    {
      title : "Kacang Merah",
      price : 51000,
      shop  : "Mentari Bersemi",
      location : "Kediri",
      image : "images/ijo.png"
    }
  ]
});

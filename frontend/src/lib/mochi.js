function startIntro(){

  var intro = introJs();
  intro.setOptions({
    steps: [
      {
        element: document.querySelector('#product-list'),
        intro: "This is a tooltip."
      }
    ]
  });
  intro.start();
}

window.onload = function() {
    startIntro();
}

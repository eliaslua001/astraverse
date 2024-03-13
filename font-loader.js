const font = new FontFaceObserver("Livvic", {
    weight: 400
});

font.load().then(function () {
    document.body.classList.add("font-loaded");
});
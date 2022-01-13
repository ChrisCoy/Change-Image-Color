function putImage() {
  const cor = document.getElementById("color").value;
  const intensity = document.getElementById("intensity").value;
  const invert = document.getElementById("invert").checked;

  for (var i = 0; i < this.files.length; i++) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(this.files[i]);

    reader.addEventListener("load", () => {
      if (invert) {
        Jimp.read(reader.result)
          .then(function (lenna) {
            lenna
              .invert()
              .grayscale()
              .color([{ apply: "mix", params: [cor, intensity] }])
              .getBase64(Jimp.MIME_PNG, function (err, src) {
                const img = document.createElement("img");
                img.setAttribute("src", src);

                const div = document.getElementById("result");
                div.appendChild(img);
              });
          })
          .catch(function (err) {
            console.error(err);
          });
      } else {
        Jimp.read(reader.result)
          .then(function (lenna) {
            lenna
              .grayscale()
              .color([{ apply: "mix", params: [cor, intensity] }])
              .getBase64(Jimp.MIME_PNG, function (err, src) {
                const img = document.createElement("img");
                img.setAttribute("src", src);

                const div = document.getElementById("result");
                div.appendChild(img);
              });
          })
          .catch(function (err) {
            console.error(err);
          });
      }
    });
  }
}

window.onload = function () {
  document.getElementById("fileInput").addEventListener("change", putImage, false);
};

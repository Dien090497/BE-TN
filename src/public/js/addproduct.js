//Size
var i = 0;
function add() {
  i++;
  var txtNewInputKey = document.createElement('div');
  var txtNewInputValue = document.createElement('div');

  // Then add the content (a new input box) of the element.
  txtNewInputKey.innerHTML = "<input class='form-control' type='text' id='size" + i + "' name='size' style='margin-top: 10px; margin-bottom: 10px;width: 100%;'>";
  txtNewInputValue.innerHTML = "<input class='form-control' type='number' id='qnt" + i + "' name='qnt' style='margin-top: 10px; margin-bottom: 10px; width: 100%;'>";

  // Finally put it where it is supposed to appear.
  document.getElementById("newElementKey").appendChild(txtNewInputKey);
  document.getElementById("newElementValue").appendChild(txtNewInputValue);
}

function remove() {
  var keyInfoProduct = document.getElementById("size" + i);
  var ValueInfoProduct = document.getElementById("qnt" + i);

  keyInfoProduct.remove();
  ValueInfoProduct.remove();
  i--;
  if (i < 0) {
    i = 0;
  }
}

//Image
var imginput = document.getElementById("pictureProduct");

function removePreviewImage() {
  var pip = document.getElementsByClassName("pip");
  var pipLength = pip.length;
  for (var i = 0; i < pipLength; i++) {
    pip[0].remove();
  }
}

$(document).ready(function () {
  if (window.File && window.FileList && window.FileReader) {
    $("#pictureProduct").on("change", function (e) {
      var files = e.target.files,
        filesLength = files.length;
      for (var i = 0; i < filesLength; i++) {
        var f = files[i]
        if (!/\.(jpe?g|png|gif)$/i.test(f.name)) {
          alert("Hãy chọn ảnh");
          imginput.value = null;
          return false;
        }
        var fileReader = new FileReader();
        fileReader.onload = (function (e) {
          var file = e.target;
          if (imginput.value == "") {
            $("");
          } else {
            $("<span class=\"pip\">" +
              "<img class=\"imageThumb\" src=\"" + e.target.result + "\" title=\"" + file.name + "\"/>" +
              "</span>").insertAfter("#pictureProduct");
          }
        });
        fileReader.readAsDataURL(f);
      }
    });
  } else {
    alert("Your browser doesn't support to File API")
  }
});

//Set list Brand
const setBrand = async () => {
  // const response = await fetch('https://ae-shop.herokuapp.com/product/brand');
  const response = await fetch('http://localhost:3001/product/brand');
  const myJson = await response.json(); //extract JSON from the http response
  myJson.map((item, i) => {
    var optionElement = document.createElement("option");
    optionElement.value = item.id_brand;
    optionElement.text = item.brand_name;
    optionElement.selected = false;
    document.getElementById("id_brand").appendChild(optionElement);
  })
}
setBrand();
//Set list Category
const setCategory = async () => {
  // const response = await fetch('https://ae-shop.herokuapp.com/product/category');
  const response = await fetch('http://localhost:3001/product/category');
  const myJson = await response.json(); //extract JSON from the http response
  myJson.map((item, i) => {
    var optionElement = document.createElement("option");
    optionElement.value = item.id_category;
    optionElement.text = item.name_category;
    optionElement.selected = false;
    document.getElementById("id_category").appendChild(optionElement);
  })
}
setCategory();
//Set list Style
const setStyle = async () => {
  // const response = await fetch('https://ae-shop.herokuapp.com/product/style');
  const response = await fetch('http://localhost:3001/product/style');
  const myJson = await response.json(); //extract JSON from the http response
  myJson.map((item, i) => {
    var optionElement = document.createElement("option");
    optionElement.value = item.id_style;
    optionElement.text = item.style_name;
    optionElement.selected = false;
    document.getElementById("id_style").appendChild(optionElement);
  })
}
setStyle();

//Thông báo
var modal = document.getElementById("myModal");
var span = document.getElementById("close");
span.onclick = function () {
  modal.style.display = "none";
}
var message = $('#message').text();
if (message) {
  modal.style.display = "block";
  if (message === 'Thêm thành công!') {
    $('#icon').attr('src', '../../image/ic_success.png');
  } else {
    $('#icon').attr('src', '../../image/notifycation.png');
  }
}

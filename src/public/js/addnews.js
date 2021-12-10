var i = 0;
function add() {
  i++;
  console.log(i);
  var newElementNews = document.createElement('div');
  newElementNews.innerHTML =
    "<div class='shadow p-3 bg-white d-flex mt-3' style=' width:100%; border-radius: 15px; margin-right: 10px;' id='elementNews" + i + "'>" +
    "<div style=' text-align: center;  border-right: 2px solid rgba(0, 0, 0, 0.2);'>"+
    "<img src='../../image/bg_img.png' width='130' height='110'class=' form-group p-2' alt='' style='border-radius: 15px;'" +"id='imgPreview"+i+"'>"+
    "<input type='file' accept='image/*' class='form-control-file input-file' id='imgInp"+i+"' name='imageNews'>"+
    "<label for='imgInp"+i+"' class='btn-add-img'>Thêm ảnh</label>"+
    "</div>"+
    "<div class='form-group pl-3' style='width: 100%;'>" +
    "<textarea class='form-control input bg-white' id='contentNews" + i + "' rows='3' name='content'" +
    "style='max-width: 100%;' placeholder='Nhập nội dung...'></textarea>" +
    "</div>" +
    "</div>";
  document.getElementById("newElementNews").appendChild(newElementNews);

  var script = document.createElement("script");
  script.innerHTML =
    "imgInp"+i+".onchange = evt => { \n"+
    "const [file"+i+"] = imgInp"+i+".files;\n"+
    "if (file"+i+") {\n"+
    "if (file"+i+".type !== 'image/jpeg' && file"+i+".type !== 'image/png' && !file"+i+".type !== 'image/jpg') {\n"+
    "alert('Vui lòng chọn ảnh');\n"+
    "document.getElementById('imgInp"+i+"').value = null;\n"+
    "return false;\n"+
    "} else {\n"+
    "imgPreview"+i+".src = URL.createObjectURL(file"+i+");\n"+
    "}\n"+
    "}\n"+
    "}\n"+
    "document.getElementById('imgInp"+i+"').onclick = function() {\n"+
    "document.getElementById('imgPreview"+i+"').src = '../../image/bg_img.png';\n"+
    "}";

  document.getElementById("elementNews" + i ).appendChild(script);
}

function remove() {
  var elementNews = document.getElementById("elementNews" + i);
  if (i <= 0) {
    i = 1;
    console.log(i);
  } else {
    elementNews.remove();
    console.log(i);
  }
  i--;
}


imgInp.onchange = evt => {
  const [file] = imgInp.files
  if (file) {
    if (file.type !== "image/jpeg" && file.type !== 'image/png' && !file.type !== 'image/jpg') {
      alert('Vui lòng chọn ảnh')
      document.getElementById("imgInp").value = null;
      return false;

    } else {
      imgPreview.src = URL.createObjectURL(file);
    }

  }
}

document.getElementById("imgInp").onclick = function() {
  document.getElementById("imgPreview").src = "../../image/bg_img.png";
}

function send() {
  var a = document.getElementsByClassName("input-file");
  var pipLength = a.length;
  const file = [];
  for (var j = 0; j < pipLength; j++) {
    const [f] = a[j].files
    file.push(f);
  }

  for (var u = 0; u < file.length; u++) {
    if (!file[u]) {
      alert("Ảnh nội dung "+u + "đã bị trống, vui lòng chọn ảnh!")
      return false
    }
  }
  document.getElementById("news-form").submit();
}

//Thông báo
var modal = document.getElementById("myModal");
var span = document.getElementById("close");
span.onclick = function () {
  modal.style.display = "none";
}
var message = $('#message').text();
if (message) {
  modal.style.display = "block";
  if (message === 'Thêm thành công') {
    $('#icon').attr('src', '../../image/ic_success.png');
  } else {
    $('#icon').attr('src', '../../image/notifycation.png');
  }
}

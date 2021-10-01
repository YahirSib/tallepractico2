function iniciar(){
  var menuForm = document.getElementById('combosForm');
  var en = document.getElementById('en');
  if (en.addEventListener) {
    en.addEventListener("click", generarTabla, false);
  }
  if(en.attachEvent){
    en.attachEvent("onclick", generarTabla);
  }
  var botones = menuForm.elements['menu'];
  for(var i=0; i<botones.length; i++){
    if(botones[i].type == "submit"){
      if(botones[i].addEventListener){
        if (i == 0) {
          botones[i].addEventListener("click", selectMenu1, false);
        }if(i==1 ){
          botones[i].addEventListener("click", selectMenu2, false);
        }if(i==2){
          botones[i].addEventListener("click", selectMenu3, false);
        }
      }
      else if(botones[i].attachEvent){
        if (i ==0) {
          botones[i].attachEvent("onclick", selectMenu1);
        } if(i == 1){
          botones[i].attachEvent("onclick", selectMenu2);
        }if(i == 2){
          botones[i].attachEvent("onclick", selectMenu3);
        }
      }
    }
  }
}

function formatDecimal(val, n) {
    n = n || 2;
    var str = "" + Math.round (parseFloat(val) * Math.pow(10, n));
    while (str.length <= n) {
      str = "0" + str;
    }
    var pt = str.length - n;
    return str.slice(0,pt) + "." + str.slice(pt);
}

function getRadioVal(form, name) {
  var radios = form.elements[name];
  var val;
  for (var i=0, len=radios.length; i<len; i++) {
    if (radios[i].checked == true) {
      val = radios[i].value;
      break;
    }
  }
  return val;
}

function getToppingsTotal(e) {
  var form = this.form;
  var val = parseFloat(form.elements['ex_tot'].value);
  if ( this.checked == true ) {
    val += parseFloat(this.value);
  } else {
    val -= parseFloat(this.value);
  }
  form.elements['ex_tot'].value = formatDecimal(val);
  updateMenuTotal(form);
}

function getTamaPollo(e) {
  if ( document.getElementById('cantPollo').value <= 0) {
      var x = this.value *  1;
  }else{
      var x = this.value *  document.getElementById('cantPollo').value;
  }
  this.form.elements['sz_tot'].value = parseFloat(x);
  updateMenuTotal(this.form);
}

function getTamaBebida(e) {
  if ( document.getElementById('cantBebida').value <= 0) {
      var x = this.value *  1;
  }else{
      var x = this.value *  document.getElementById('cantBebida').value;
  }
  this.form.elements['bebida_tot'].value = parseFloat(x);
  updateMenuTotal(this.form);
}

function updateMenuTotal(form) {
  var sz_tot = parseFloat(form.elements['sz_tot'].value);
  var bebida_tot = parseFloat(form.elements['bebida_tot'].value);
  var tops_tot = parseFloat(form.elements['ex_tot'].value);
  form.elements['total'].value = formatDecimal(sz_tot + tops_tot + bebida_tot);
}

(function() {
  var form = document.getElementById('productosForm');
  var el = document.getElementById('extras');
// Determinar los ingredientes seleccionados en las casillas de verificación
  var tops = el.getElementsByTagName('input');
  for (var i=0, len=tops.length; i<len; i++) {
    if (tops[i].type === 'checkbox') {
      tops[i].onclick = getToppingsTotal;
    }
  }
  var sz = form.elements['size'];
  for (var i=0, len=sz.length; i<len; i++) {
    sz[i].onclick = getTamaPollo;
  }
  form.elements['sz_tot'].value = formatDecimal(parseFloat(getRadioVal(form, 'size')));
  var be = form.elements['bebida'];
  for (var i=0, len=be.length; i<len; i++) {
    be[i].onclick = getTamaBebida;
  }
  form.elements['bebida_tot'].value = formatDecimal(parseFloat(getRadioVal(form, 'bebida')));
// set sz_tot to value of selected
  updateMenuTotal(form);
})();

function selectMenu1(){
  var form = document.getElementById('productosForm');
  document.getElementById('cantPollo').value=3;
  var cajas = form.elements['size'];
  cajas[0].checked = "checked";
  var bebida = form.elements['bebida'];
  bebida[2].checked = "checked";
  var ensalada = document.getElementById('ensalada');
  ensalada.checked = "checked";
  var papa = document.getElementById('papa');
  papa.checked = "checked";
  var total = document.getElementById('total');
  total.value = 7.25;
}

function selectMenu2(){
  var form = document.getElementById('productosForm');
  document.getElementById('cantPollo').value=2;
  var cajas = form.elements['size'];
  cajas[0].checked = "checked";
  var bebida = form.elements['bebida'];
  bebida[1].checked = "checked";
  var papa = document.getElementById('papa');
  papa.checked = "checked";
  var total = document.getElementById('total');
  total.value = 5.75;
}

function selectMenu3(){
  var form = document.getElementById('productosForm');
  document.getElementById('cantPollo').value=1;
  var cajas = form.elements['size'];
  cajas[0].checked = "checked";
  var bebida = form.elements['bebida'];
  bebida[0].checked = "checked";
  var papa = document.getElementById('papa');
  papa.checked = "checked";
  var total = document.getElementById('total');
  total.value = 3.50;
}

function generarTabla(){
  var caja = document.getElementById('box').innerHTML += "<td> "+document.getElementById('pequeñaP').textContent+" </td>";
}


window.onload = init;
function init() {
    var view = document.getElementById('view');
    var area = document.getElementById('area');
    view.onclick = edit;
    document.onkeydown = function(e) {
    e = e || event;
    // Escape
    if(e.keyCode == 27) {
        cancel();
    return false;
    }
    if ((e.ctrlKey && e.keyCode == 'E'.charCodeAt(0)) && !area.offsetHeight) {
        edit();
    return false;
    }
    if((e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)) && area.offsetHeight) {
        save();
    return false;
    }
}
function edit() {
    //Ocultar el elemento div
    view.style.display = 'none';
    //Dibujar el campo textarea y ponerle estilos
    area.value = view.innerHTML;
    area.style.display = 'block';
    area.style.height = '80px';
    area.style.padding = '6px';
    area.style.width = '444px';
    area.focus();
}
function save() {
    area.style.display = 'none';
    view.innerHTML = area.value;
    view.style.display = 'block';
    view.style.letterSpacing = '1.2px';
}
function cancel() {
    area.style.display = 'none';
    view.style.display = 'block';
}
}


if(window.addEventListener){
window.addEventListener("load", iniciar, false);
}
else if(window.attachEvent){
window.attachEvent("onload", iniciar);
}

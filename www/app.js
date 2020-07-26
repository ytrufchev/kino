var city_names = ['Sofia', 'Plovdiv', 'Varna', 'Targovishte'];
var Targovishte = ['cinemagic']
var Sofia = ['Arena Deluxe Bulgaria Mall', 'Arena The Mall', 'Cinema City Paradise', 'Cinema City Sofia'];
var Plovdiv = ['Arena Mall Markovo Tepe', 'Cinema City Plovdiv'];
var Varna = ['Arena Grand Mall Varna', 'Arena Mall Varna', 'Cinema City Varna'];
function selectCity(id){
  if(id == 'city'){
  var e = document.getElementById("city");
  var strUser = e.options[e.selectedIndex].value;
  //localStorage.setItem("cityName", strUser);
  localStorage.setItem("city", strUser);
  document.getElementById('city').innerHTML = '';
  document.getElementById('city').id = "cinema";
  document.getElementById('cinema').innerHTML = "<option value='salob'>Кино салон</option></br>";
  for(i in window[strUser]){
    
    document.getElementById('cinema').innerHTML += "<option value="+window[strUser][i]+">"+window[strUser][i]+"</option></br>";

  }
  }
  else if(id == "cinema"){
    var city = localStorage.getItem("city");
    var e = document.getElementById("cinema");
  var strUser = e.options[e.selectedIndex].text;
  var t = window[city].indexOf(strUser);
  var cinemaId = window[city][t];
  localStorage.setItem("cinema", cinemaId);
  var ciName = window[city][t];
  localStorage.setItem("cinemaName", ciName);
  location.href="cinema.html";
  document.getElementById("lds-ripple").style.display = "block";
  }
 }
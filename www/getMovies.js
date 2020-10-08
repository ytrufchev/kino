      var movienameslist = [];
       var movieIds = [];
       var backdrops = [];
       var overviews = [];
       var posters1 = [];
       var runtimes = [];
       var votes = [];
       var timestamps = [];
       var longnames = []; 
       var selectedprojections = [];
       var trailers = [];
       var longids = [];
       var moviecat = [];
       var castName = [];
       var castPhoto = [];
       var index = [];
       var city = localStorage.getItem('city');
      var cinema = localStorage.getItem('cinema');
      var cinemaName = localStorage.getItem('cinemaName');
      var cityName = localStorage.getItem('city');
      function test(){
        //Get the movie names and projection times from the source by cinema ID
      var cinemaId = localStorage.getItem("cinema");
      var baseUrl = "https://cinema-32109.firebaseio.com/"+encodeURI(cityName)+"/"+encodeURI(cinemaName)+"/MovieNames/.json";
    $.ajax({
     url: baseUrl,
     async: true,
    "dataType": "json",
  "contentType": "application/json; charset=utf-8",
     type: 'GET' // this is default, but worth pointing out
      }).done(function(data){
        if(data == null){
          document.getElementById("noMovies").style.display = "block";
        }
      for(i in data){
        var mId = data[i].id;
        var name1 = JSON.stringify(data[i].name);
        var name2 = name1.replace(/\[\"/gmi, "");
        var name3 = name2.replace(/\"\]/, "");
        var nameCorrent = name3.replace(/\s3d/gmi, "");
        movienameslist.push(nameCorrent);
        movieIds.push(mId);
           for(j in data[i].time){
          var time = data[i].time[j];
          var time1 = moment(time).format('x');
          var time2 = time1.replace(/\+(.*)/gmi, '');
          timestamps.push(time2);
          longnames.push(nameCorrent);
        }
      }
//Get other information from the movie database such as backgrop, poster and overwview
for (i in movieIds){
  var settings = {
  "async": false,
  "crossDomain": true,
  "url": "https://api.themoviedb.org/3/movie/"+movieIds[i]+"?language=bg&append_to_response=videos&api_key=e8a6a870421f5cc13e775873bfe1cad8",
  "method": "GET",
  "headers": {},
  "data": "{}"
}

$.ajax(settings).done(function (response) {
  runtimes.push(response.runtime);  
  //trailers.push(response.videos.results[0].key);
  backdrops.push(response.backdrop_path);
  overviews.push(response.overview);
  posters1.push(response.poster_path);
});
}
//Doing all the math and styling for the "now playing" movie
for(i in movienameslist){

      
      for(j in timestamps){
         longids.push(movieIds[i]);
         
                    }
}
    for (i in posters1){
      document.getElementById("Posters").innerHTML += "<div style='overflow: hidden;'><div id='js-flip-1' class='flip'><div class='card'><div class='face front'><img style='margin: auto;' class='posterImg' src='http://image.tmdb.org/t/p/w342/"+posters1[i]+"'></br><div class='showtimes1'></div></br><div class='details1'>fsdfsdfsdffsdf</div></div><div class='face back'>Back</div></div></div></br><div id='text2' style='top:-10vh;'>"+(runtimes[i])+"мин.</div><br><button style='margin-left: 5vw; position: relative; top: 0vh;' class='buyticket' onclick='projections("+i+");'>Прожекции</button></br><button style='margin-left: 5vw; position: relative; ' class='info' id='movieinfo' onclick='info("+i+");'>Информация</button></div>";
   document.getElementsByClassName("details1")[i].innerHTML = "<div style='overflow:auto !important; top: 0vh;'><img style='position: relative; width: 98%; top:0; left:0; margin:0; border-radius: 10px;' alt='Няма налично изображение' src='http://image.tmdb.org/t/p/w185/"+backdrops[i]+"'</div></br><div style='white-space: normal; height: auto !important ; width:97%; margin-bottom: 50vh; margin-left: 1vw; margin-right: 1vw;'>"+overviews[i]+"</div>";
}
});
document.getElementById("lds-ripple").style.display = "none";
      }
//Doing all the math and styling for the "now playing" movie

 function refreshData()
                                           {
                                         x = 60;  // 60 Seconds     
                     for(i in timestamps){
                       var b = Math.round(new Date().getTime()/1000)+"000";
                     var c= Math.max.apply( Math,$.grep(timestamps,function(n){return n<=b}));
                     var d= Math.min.apply( Math,$.grep(timestamps,function(n){return n>b}));
                     var timeElapsed = ((Math.round(new Date().getTime()/1000)+"000") - c);
                                     if(timestamps[i] == c){
                                       var index = movienameslist.indexOf(longnames[i]);
                                       var endtime = (timestamps[i]+((runtimes[index]*60)*1000));
                                       var timeinpercents = ((timeElapsed/60)/10 / (runtimes[index]));
                                       var timeleft = Math.round((runtimes[index]) -  (timeElapsed/1000)/60);
                                       if(c <= (Math.round(new Date().getTime()/1000)+"000") <= endtime){
                                         document.getElementById("nowPlaying"). innerHTML = "<img class='nowplayingposter' src='https://image.tmdb.org/t/p/w342/"+posters1[index]+"'><text class='nowplayingtitle'>Сега</text><div class='nowpl'><text style='position: relative; top: -2vh;'>"+movienameslist[index]+"</text></div><div class='progress style='width:60vw;'><div class='progress-bar' id='pb' role='progressbar' aria-valuenow='70' aria-valuemin='0' aria-valuemax='100' style='border-radius: 10px;'></div></div><text class='timel'>Остават "+timeleft+" минути</text>";
                                       document.getElementsByClassName("progress-bar")[0].style.width = timeinpercents+"%";
                                             document.getElementsByClassName("timel")[0].innerHTML = "Остават "+timeleft+" минути";

                                       }
                                      
                                     }
                                     if((Math.round(new Date().getTime()/1000)+"000") > endtime){
                                         var index = timestamps.indexOf(JSON.stringify(d));
                                         var name = longnames[index];
                                         var nameind = movienameslist.indexOf(name);
                                         moment.locale('bg');
                                         var proj = (moment(d).format('Do MMM HH:mm'));
                                         var proje = proj.toString();
                                         document.getElementById("nowPlaying"). innerHTML = "<img class='nowplayingposter' src='https://image.tmdb.org/t/p/w342/"+posters1[nameind]+"'><text class='nowplayingtitle'>Следваща прожекция</text><div class='nowpl1'><text >"+movienameslist[nameind]+"</text></div><br><text class='timel1'>"+proje+"</text>";
                                       }
                                     }
                           setTimeout(refreshData, x*1000);
                         }
                       refreshData();


                             function projections(i){
                                 for(j in longnames){
     if(longnames[j] == movienameslist[i]){
       var date1 = JSON.stringify(timestamps[j]);
       var date = moment(date1, 'x').format('Do MMM </br> HH:mm');
       document.getElementsByClassName("showtimes1")[i].innerHTML += "<div id='"+timestamps[j]+"' onclick='notifyme("+timestamps[j]+")', 'showads();');' style='height: 22vw; width: 22vw; font-size: 10px !important; padding-top: 2vh; border-radius: 10px; margin-left: 0; overflow: hidden; border-left: 3px solid white; border-bottom: 3px solid white; border-right: 3px solid white;'>&#10025;</br>" +date +"</div>";
     }
   }
         //document.getElementsByClassName('posterImg')[i].style.display = "none";
         //document.getElementsByClassName('details1')[i].style.display = "none";
         //document.getElementsByClassName('showtimes1')[i].style.display = "grid";
         for(j in document.getElementsByClassName('posterImg')){
         if (j != i) { 
           document.getElementsByClassName("posterImg")[j].style.display = "block";
           document.getElementsByClassName('details1')[j].style.display = "none";
         document.getElementsByClassName('showtimes1')[j].style.display = "none";
         document.getElementsByClassName('buyticket')[j].innerHTML = "Прожекции";
         document.getElementsByClassName('info')[j].innerHTML = "Информация";
 }
   else if(document.getElementsByClassName('buyticket')[j].innerHTML != "Прожекции"){
     document.getElementsByClassName("posterImg")[j].style.display = "block";
           document.getElementsByClassName('details1')[j].style.display = "none";
         document.getElementsByClassName('showtimes1')[j].style.display = "none";
         document.getElementsByClassName('buyticket')[j].innerHTML = "Прожекции";
         document.getElementsByClassName('info')[j].innerHTML = "Информация";
   }
       else{
        if(( /(android|windows phone)/i.test(navigator.userAgent) )) {
            if(AdMob) AdMob.showInterstitial();
            document.addEventListener('onDismissInterstitialAd', function(){
        	window.plugins.AdMob.createInterstitialView();			//REMOVE THESE 2 LINES IF USING AUTOSHOW
            window.plugins.AdMob.requestInterstitialAd();			//get the next one ready only after the current one is closed
        });
}
         document.getElementsByClassName('posterImg')[i].style.display = "none";
         document.getElementsByClassName('details1')[i].style.display = "none";
         document.getElementsByClassName('showtimes1')[i].style.display = "grid";
         document.getElementsByClassName('buyticket')[i].innerHTML = "\u2190";
         document.getElementsByClassName('info')[j].innerHTML = "Информация";
       }
       }
      
       }
       function info(i){
           if(AdMob) AdMob.showInterstitial();
         for(j in document.getElementsByClassName('posterImg')){
         if (j != i) { 
           document.getElementsByClassName("posterImg")[j].style.display = "block";
           document.getElementsByClassName('details1')[j].style.display = "none";
         document.getElementsByClassName('showtimes1')[j].style.display = "none";
         document.getElementsByClassName('info')[j].innerHTML = "Информация";
         document.getElementsByClassName('buyticket')[j].innerHTML = "Прожекции";
 }
 else if(document.getElementsByClassName('info')[j].innerHTML != "Информация"){
     document.getElementsByClassName("posterImg")[j].style.display = "block";
           document.getElementsByClassName('details1')[j].style.display = "none";
         document.getElementsByClassName('showtimes1')[j].style.display = "none";
         document.getElementsByClassName('buyticket')[j].innerHTML = "Прожекции";
         document.getElementsByClassName('info')[j].innerHTML = "Информация";
   }
       else{
         document.getElementsByClassName('posterImg')[i].style.display = "none";
         document.getElementsByClassName('details1')[i].style.display = "inline-block";
         document.getElementsByClassName('showtimes1')[i].style.display = "none";
         document.getElementsByClassName('info')[i].innerHTML = "\u2190";
         document.getElementsByClassName('buyticket')[j].innerHTML = "Прожекции";
       }
       }
       }
      
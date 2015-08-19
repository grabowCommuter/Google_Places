{
    "moduleId" : "grabowCommuter/Google_Places",
    "title" : "Google Places",
    "subtitle" : "POIs based on google places API",
    
    "backButton" : true,
    "enableGPS" : false,
    "zoomControl" : true,
    "screenLockRot" : false,
    "reload" : true,
       
    "shouldOverrideUrlLoading1" : "http://maps.google.de",
    "shouldOverrideUrlLoading2" : "https://maps.google.de",

    "loadDataWithBaseUrl1" : "http://www.google.de",
    "loadDataWithBaseUrl3" : "text/html",
    "loadDataWithBaseUrl4" : "utf-8",
					    			
    "browserLaunchLink" : "maps.google.com",
    
    "loadDataWithBaseUrl2" : 
"
<!DOCTYPE html>
<html>
<head>
    <title>POI finder</title>
    <meta name='viewport' content='initial-scale=1, maximum-scale=1'/>
    <link rel='stylesheet' href='http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css' /> 
    <style>
        #content {
            padding: 0 !important;
        }
        
        .ui-popup .ui-content {
            height: 300px !important;
            width: 200px !important;
        }
        
        .ui-content {
          padding: 0 !important;
        }

        .ui-listview {
            margin: 0 !important;
        }

        div.iscroll-scroller {
            width: 100% !important;
        }
        
    </style>  
    <script src='http://code.jquery.com/jquery-1.10.1.min.js'></script>
    <script src='http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js'></script>    
    <script src='https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places,visualization'></script>
    
    <script src='https://cdn.rawgit.com/baig/jquerymobile-editablelistview/master/js/editable-listview.js'></script>
    <link rel='stylesheet' href='https://cdn.rawgit.com/baig/jquerymobile-editablelistview/master/css/editable-listview.css'>
    
    <script src='https://cdn.rawgit.com/watusi/jquery-mobile-iscrollview/master/demo/build/javascripts/iscroll.js'></script>
    <script src='https://cdn.rawgit.com/watusi/jquery-mobile-iscrollview/master/lib/jquery.mobile.iscrollview.js'></script>

    <link rel='stylesheet' href='https://cdn.rawgit.com/watusi/jquery-mobile-iscrollview/master/lib/jquery.mobile.iscrollview.css'/>
    <link rel='stylesheet' href='https://cdn.rawgit.com/watusi/jquery-mobile-iscrollview/master/lib/jquery.mobile.iscrollview-pull.css'/>

    
    <script>
   
        $(document).on('pageshow', '#index',function(e,data){   
            $('#content').height(getRealContentHeight());
 
           // This is the minimum zoom level that we'll allow
           var zoom = #zoom#;
              map = new google.maps.Map(document.getElementById('map_canvas'), {
              zoom: zoom,
              center: new google.maps.LatLng(#lat#, #lng#),
              mapTypeId: google.maps.MapTypeId.ROADMAP
 
           });
                  
           infoWindow = new google.maps.InfoWindow();
           service = new google.maps.places.PlacesService(map);

           google.maps.event.addListener(map, 'idle', performSearch);
            
        });
 
        function getRealContentHeight() {
            var header = $.mobile.activePage.find('div[data-role=' + aPost + 'header' + aPost + ']:visible');
            var footer = $.mobile.activePage.find('div[data-role=' + aPost + 'footer' + aPost + ']:visible');
            var content = $.mobile.activePage.find('div[data-role=' + aPost + 'content' + aPost + ']:visible:visible');
            var viewport_height = $(window).height();
 
            var content_height = viewport_height - header.outerHeight() - footer.outerHeight();
            if((content.outerHeight() - header.outerHeight() - footer.outerHeight()) <= viewport_height) {
                content_height -= (content.outerHeight() - content.height());
            } 
            return content_height;
        }
    </script> 
  
  
  
  
  
    
<script>
qMark = String.fromCharCode(34);
aPost = String.fromCharCode(39);
searchName = 'McDonald' + aPost + 's';
searchKeyword = null;
var markersArray = [];

function clearOverlays() {
  if (markersArray) {
    for (i in markersArray) {
      markersArray[i].setMap(null);
    }
  }
}

function performSearch() {
  var request = {
    bounds: map.getBounds(),
    name: searchName,
    keyword: searchKeyword
  };
  service.radarSearch(request, callback);
}

function callback(results, status) {
  if (status != google.maps.places.PlacesServiceStatus.OK) {
    //alert(status);
    toast(status);
    return;
  }
  for (var i = 0, result; result = results[i]; i++) {
    createMarker(result);
  }
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
  });

  markersArray.push(marker);
  
  google.maps.event.addListener(marker, 'click', function() {
    service.getDetails(place, function(result, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        toast(status);
        return;
      }
      
      var image = result.icon;
      var title;
      var googleLnk = '<a href=' + aPost + '' + result.url + '' + aPost + '> ... more ... </a>';
      var navUrl = 'http://maps.google.com/maps?daddr=' + result.geometry.location.lat() + ',' + result.geometry.location.lng();
      var navLnk = '<a href=' + aPost + '' + navUrl + '' + aPost + '> ... navigate ... </a>';
      if (result.website === undefined) 
        {title = '<b>' + result.name + '</b>' } 
      else 
        { title =  '<b><a href=' + aPost + '' + result.website + '' + aPost + '>' + result.name + '</a></b>' } ;
      
      var contentString = '<div id=' + aPost + 'content' + aPost + '>' + title 
                        + '<br>' + result.vicinity 
                        + '<br>' + googleLnk 
                        + ' &nbsp &nbsp &nbsp &nbsp ' + navLnk + '</div>';
      infoWindow.setContent(contentString);
      infoWindow.open(map, marker);
    });
  });
}

function setSearchTerm( str ) {
    if (str.charAt(0) == qMark ) {
        searchKeyword = null;
        searchName = str;
    } else {
        searchKeyword = str;
        searchName = null;
    }
}

function saveList() {
  var myArr = $('#list').find('li');
  var myStrArr = [];
  j = 0;
  for (i = 0; i < myArr.length; i++) {
    text = myArr[i].textContent;     
    if (text != 'Add') myStrArr[j++] = text;
  }

  localStorage['list'] = JSON.stringify(myStrArr);    
}

function readList() {
    var list = localStorage['list'];
    var myArr = [];
    if (list) {
        myArr =  JSON.parse(list);
        searchName = myArr[0];
        }
    else {
        myArr = [qMark + 'McDonald' + aPost + 's' + qMark,
                 qMark + 'Burger King' + qMark, 
                 qMark + 'Pizza Hut' + qMark, 
                 qMark + 'Aldi' + qMark, 
                 qMark + 'Lidl' + qMark, 
                 'Restaurant'];
          }       
    return myArr;
}

function appendList(myArr) {
  for (i = 0; i < myArr.length; i++) { 
    $('ul').append('<li><a href=' + aPost + '#' + aPost + '>' + myArr[i] + '</a></li>'); 
  }
}

function activateList() {

                  var myArr = readList();
                  appendList(myArr);

                  $( '#list' ).listview({
                   editable: true,
                  });
                  
                  $('#list').on('click', 'li', function() {
                    if ($(this).text() != 'Add') {
                        var searchStr = $(this).text();
                        setSearchTerm(searchStr);                                           
                        clearOverlays();
                        performSearch();                   
                    }  
                  });
                  
                  $('#footer').click(function(){
                    saveList();
                  });
}

var toast=function(msg){
	$('<div class=' + aPost + 'ui-loader ui-overlay-shadow ui-body-e ui-corner-all' + aPost + '><h3>'+msg+'</h3></div>')
	.css({ display: 'block', 
		opacity: 0.90, 
		position: 'fixed',
		padding: '7px',
		'text-align': 'center',
		width: '270px',
		left: ($(window).width() - 284)/2,
		top: $(window).height()/2 })
	.appendTo( $.mobile.pageContainer ).delay( 500 )
	.fadeOut( 200, function(){
		$(this).remove();
	});
}

</script>
   
       
</head>
<body>
    <div data-role='page' id='index'>
        <div data-theme='a' data-role='button'>
            <h3>
               <a href='#popupBasic' data-rel='popup' data-role='button' data-transition='pop'>Search terms</a>
            </h3>
        </div>
 
        <div data-role='content' id='content'>
            <div id='map_canvas' style='height:100%'></div>
        </div>
       
        <div data-role='popup' id='popupBasic'>
            <div class='header' data-role='header'>
                <h1>Keywords</h1>
            </div>
            <div class='content' data-role='content' data-iscroll>
                <ul id='list' data-role='listview'>                     
                </ul>                
            </div>
            
             <div class='footer' data-role='footer' id='footer'>
                <a class='close' href='#' data-rel='back' data-role='button'>Close</a>
            </div>
            
            <script>
                activateList();
            </script>

    </div>
</body>
</html>   

"
}

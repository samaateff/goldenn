/*********************************************************************
******************************** map page ****************************
*********************************************************************/

let map;
let service;
let circle;
let infowindow;

if (document.getElementById("map")) {
    function initMap() {
        const sydney = new google.maps.LatLng(-33.867, 151.195);

        infowindow = new google.maps.InfoWindow();
        map = new google.maps.Map(document.getElementById("map"), {
            center: sydney,
            zoom: 15,
            styles: [
                {
                    "featureType": "poi",
                    "stylers": [
                        { "visibility": "off" }
                    ]
                }
            ]
        });

        const request = {
            query: "Assiut",
            fields: ["name", "geometry"],
        };

        service = new google.maps.places.PlacesService(map);
        service.findPlaceFromQuery(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            for (let i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }

            map.setCenter(results[0].geometry.location);
            }
        });
    }

    function createMarker(place) {
        if (!place.geometry || !place.geometry.location) return;

        const marker = new google.maps.Marker({
            map,
            position: place.geometry.location,
            label: "1000 ر.س",
            icon: "/assets/images/icon/marker.webp"
        });

        google.maps.event.addListener(marker, "click", () => {

            // craate real state section
            const estateContainer = document.createElement("section");
            estateContainer.classList.add("map-real-estate")

            // create image 
            const imageContainer = document.createElement("article");
            imageContainer.classList.add("image");
            
            // image content
            const imageElement = document.createElement("img");
            imageElement.setAttribute("src", "/assets/images/category-1.webp");

            // append 
            imageContainer.appendChild(imageElement);
            estateContainer.appendChild(imageContainer);


            // create content 
            const contentContainer = document.createElement("article");
            contentContainer.classList.add("content");
            
            // p cost 
            const cost = document.createElement("p");
            cost.classList.add("cost");
            const costNumber = document.createElement("span");
            costNumber.classList.add("cost-number");
            costNumber.textContent = "1000";
            const costPeriod = document.createElement("span");
            costPeriod.classList.add("cost-period");
            costPeriod.textContent = "ر س/اليوم";

            cost.appendChild(costNumber);
            cost.appendChild(costPeriod);
            contentContainer.appendChild(cost);

            // h3 heading
            const heading = document.createElement("h3");
            heading.classList.add("real-estate-title");
            heading.textContent ="شقة فندقية حديثة"
            contentContainer.appendChild(heading);

            // div location
            const location = document.createElement("div");
            location.classList.add("location");
            const icon = document.createElement("i");
            icon.classList.add("fa-solid", "fa-location-dot");
            const text = document.createElement("span");
            text.textContent = "الرياض - حى الفلاح";
            
            location.appendChild(icon);
            location.appendChild(text);
            contentContainer.appendChild(location);

            // append content Container
            estateContainer.appendChild(contentContainer);

            // append estateContainer
            infowindow.setContent(estateContainer);
            infowindow.open(map, marker);
        });
    }

    window.initMap = initMap;

}

/*********************************************************************
*************************** real estate page *************************
*********************************************************************/

// old map
// if (document.getElementById("estete-map")) {

//     function initMap() {
    
//         const sydney = new google.maps.LatLng(-33.867, 151.195);
    
//         infowindow = new google.maps.InfoWindow();
//         map = new google.maps.Map(document.getElementById("estete-map"), {
//             center: sydney,
//             zoom: 15,
//             styles: [
//                 {
//                     "featureType": "poi",
//                     "stylers": [
//                         { "visibility": "off" }
//                     ]
//                 }
//             ]
//         });
    
//         const request = {
//             query: "Assiut",
//             fields: ["name", "geometry"],
//         };
    
//         service = new google.maps.places.PlacesService(map);
//         service.findPlaceFromQuery(request, (results, status) => {
//             if (status === google.maps.places.PlacesServiceStatus.OK && results) {
//             for (let i = 0; i < results.length; i++) {
//                 createMarker(results[i]);
//             }
    
//             map.setCenter(results[0].geometry.location);
//             }
//         });
//     }
    
//     function createMarker(place) {
//         if (!place.geometry || !place.geometry.location) return;
    
//         const marker = new google.maps.Marker({
//             map,
//             position: place.geometry.location,
//             icon: "/assets/images/icon/estate-marker.svg"
//         });
//     }
    
//     window.initMap = initMap;
// }

// main map
// if (document.getElementById("estete-map")) {

//     function initMap() {
//         const sydney = new google.maps.LatLng(-33.867, 151.195);

//         infowindow = new google.maps.InfoWindow();
//         mainMap = new google.maps.Map(document.getElementById("main-estete-map"), {
//             center: sydney,
//             zoom: 15,
//             styles: [
//                 {
//                     "featureType": "poi",
//                     "stylers": [
//                         { "visibility": "off" }
//                     ]
//                 }
//             ]
//         });

//         const request = {
//             query: "Assiut",
//             fields: ["name", "geometry"],
//         };

//         service = new google.maps.places.PlacesService(mainMap);
//         service.findPlaceFromQuery(request, (results, status) => {
//             if (status === google.maps.places.PlacesServiceStatus.OK && results) {
//                 for (let i = 0; i < results.length; i++) {
//                     createMarker(results[i], mainMap);
//                 }

//                 mainMap.setCenter(results[0].geometry.location);
//             }
//         });
//     }

//     function createMarker(place, map) {
//         if (!place.geometry || !place.geometry.location) return;

//         const marker = new google.maps.Marker({
//             map,
//             position: place.geometry.location,
//             icon: "/assets/images/icon/estate-marker.svg"
//         });
//     }

//     window.initMap = initMap;
// }

//second map

// function initMap() {
//     const sydney = new google.maps.LatLng(30.8111719, 30.988780);
  
//     infowindow = new google.maps.InfoWindow();
//     secondMap = new google.maps.Map(document.getElementById("estete-map"), {
//       center: sydney,
//       zoom: 13,
//       styles: [
//         {
//           "featureType": "poi",
//           "stylers": [
//             { "visibility": "off" }
//           ]
//         }
//       ]
//     });
  
//     const request = {
//       query: "Creative Minds | Web Design Company In Egypt | Mobile App Development Company",
//       fields: ["name", "geometry"],
//     };
  
//     service = new google.maps.places.PlacesService(secondMap);

//     service.findPlaceFromQuery(request, (results, status) => {

//       if (status === google.maps.places.PlacesServiceStatus.OK && results) {

//         for (let i = 0; i < results.length; i++) {

//           createMarker(results[i], secondMap);
//         }
  
//         secondMap.setCenter(results[0].geometry.location);
  
//         var circle = new google.maps.Circle({
//             center: results[0].geometry.location,
//             radius: 1000,
//             strokeColor: "#2c1d65", 
//             strokeOpacity: 0.8,
//             strokeWeight: 2,
//             fillColor: "#2c1d65", 
//             fillOpacity: 0.35,
//             map: secondMap
//         });
  
//         circle.addListener("radius_changed", function() {
//           var newRadius = circle.getRadius();

//         });
//       }
//     });
// }
  
// function createMarker(place, map) {
//     if (!place.geometry || !place.geometry.location) return;
// }
  
// window.initMap = initMap;

let mainMap;
let secondMap;
function initMap() {
    const location = new google.maps.LatLng(-33.867, 151.195);
    const locationRequest = {
      query: "Assiut",
      fields: ["name", "geometry"],
    };
  
    infowindow = new google.maps.InfoWindow();
    if (document.getElementById("main-estete-map")){
        mainMap = new google.maps.Map(document.getElementById("main-estete-map"), {
          center: location,
          zoom: 15,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          styles: [
            {
              "featureType": "poi",
              "stylers": [
                { "visibility": "off" }
              ]
            }
          ]
        });

        service = new google.maps.places.PlacesService(mainMap);
        service.findPlaceFromQuery(locationRequest, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            for (let i = 0; i < results.length; i++) {
              createMarker(results[i], mainMap);
            }
      
            mainMap.setCenter(results[0].geometry.location);
          }
        });
    }
  
    if(document.getElementById("estete-map")){

        secondMap = new google.maps.Map(document.getElementById("estete-map"), {
          center: location,
          zoom: 13,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          styles: [
            {
              "featureType": "poi",
              "stylers": [
                { "visibility": "off" }
              ]
            }
          ]
        });

        service = new google.maps.places.PlacesService(secondMap);
        service.findPlaceFromQuery(locationRequest, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                for (let i = 0; i < results.length; i++) {
                createMarker(results[i], secondMap);
                }
        
                secondMap.setCenter(results[0].geometry.location);
        
                var circle = new google.maps.Circle({
                center: results[0].geometry.location,
                radius: 1000,
                strokeColor: "#2c1d65",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#2c1d65",
                fillOpacity: 0.35,
                map: secondMap
                });
        
                circle.addListener("radius_changed", function() {
                    var newRadius = circle.getRadius();
                });
            }
        });
    }
  
  
}
  
function createMarker(place, map) {
    if (!place.geometry || !place.geometry.location) return;
  
    const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
        icon: "/assets/images/icon/estate-marker.svg"
    });

    if (secondMap && map === secondMap) {
        marker.setMap(null);
    }
}
  
window.initMap = initMap;


/*********************************************************************
*************************** add estate page **************************
*********************************************************************/

if (document.getElementById("location_estate_map")) {

    const saveButton = document.querySelector("#save_location");
    const inputLat   = document.querySelector("#map_location_lat");
    const inputLng   = document.querySelector("#map_location_lng");


    saveButton.onclick = () => {
        // hide invalid alert
        document.querySelector("#location_estate_map + .invalid-feedback").style.display = "block";
    }
    
    // Initialize and add the map
    function initMap() {
        // The location of your place
        var yourPlace = {lat: 24.7262657, lng: 46.6591142};
        
        // The map, centered at your place
        var map = new google.maps.Map(
            document.getElementById('location_estate_map'), {
                zoom: 12, 
                center: yourPlace, 
                gestureHandling: "greedy",
                styles: [
                    {
                        "featureType": "poi",
                        "stylers": [
                            { "visibility": "off" }
                        ]
                    }
                ]
            });

        // The marker, positioned at your place
        var marker = new google.maps.Marker({
            // position: yourPlace,
            map: map, 
            draggable: true,
            icon: "/assets/images/icon/estate-marker.svg"
        });

        // Update marker on user click
        google.maps.event.addListener(map, 'click', function(event) {

            marker.setPosition(event.latLng);

            // hide invalid alert
            document.querySelector("#location_estate_map + .invalid-feedback").style.display = "none";
            
            saveButton.onclick = () => {

                // change inputs value
                inputLat.setAttribute("value", event.latLng.lat());
                inputLng.setAttribute("value", event.latLng.lng());

                // hide popup
                $('#choose_map_location').modal('hide');

                // change select button content
                document.querySelector("#choose_map_button span").textContent = event.latLng.lat().toFixed(4) + " - " + event.latLng.lng().toFixed(4)

            }
        });
    }
}
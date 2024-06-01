/*********************************************************************
******************************** map page ****************************
*********************************************************************/

//const { result } = require("lodash");

let map;
let service;
let infowindow;

 console.log(document.getElementById("map"))

if (document.getElementById("map")) {
    function initMap() {
        setTimeout(function(){window.initMap = initMap
        console.log(true)



        const latLng = new google.maps.LatLng(flatLat, flatLng);

        //infowindow = new google.maps.InfoWindow();
        map = new google.maps.Map(document.getElementById("map"), {
            center: latLng,
            zoom: 10,
            styles: [
                {
                    "featureType": "poi",
                    "stylers": [
                        { "visibility": "off" }
                    ]
                }
            ]
        });


            for (let i = 0; i < results.length; i++) {
                var infowindow = new google.maps.InfoWindow();
                createMarker(results[i], i, infowindow);


            }

    },1000);


    }

    function createMarker(markerData, i, infowindow) {

        //if (!place.geometry || !place.geometry.location) return;
        const latLng = new google.maps.LatLng(markerData.lat, markerData.lng);
          var marker = new google.maps.Marker({
            map,
            position: latLng,
            label: markerData.daily_price+" " + currency,
            icon: image_path+"/icon/marker.webp"
        });

        google.maps.event.addListener(marker, "click", () => {

            // craate real state section
            const sectionContainer = document.createElement("section");
            sectionContainer.classList.add("map-real-estate");
            const estateContainer = document.createElement("a");

            //const href = document.createElement("a");
            estateContainer.setAttribute("href", main_url+'/flat/'+markerData.title.replaceAll(' ','-')+'/'+markerData.id);
            estateContainer.classList.add("map-real-estate")
            sectionContainer.appendChild(estateContainer);

            // create image
            const imageContainer = document.createElement("article");
            imageContainer.classList.add("image");

            // image content
            const imageElement = document.createElement("img");
            imageElement.setAttribute("src", markerData.main_image);

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
            costNumber.textContent = markerData.daily_price;
            const costPeriod = document.createElement("span");
            costPeriod.classList.add("cost-period");
            costPeriod.textContent = markerData.daily_price_text_day;

            cost.appendChild(costNumber);
            cost.appendChild(costPeriod);
            contentContainer.appendChild(cost);

            // h3 heading
            const heading = document.createElement("h3");
            heading.classList.add("real-estate-title");
            heading.textContent =markerData.title
            contentContainer.appendChild(heading);

            // div location
            const location = document.createElement("div");
            location.classList.add("location");
            const icon = document.createElement("i");
            icon.classList.add("fa-solid", "fa-location-dot");
            const text = document.createElement("span");
            text.textContent = markerData.city;

            location.appendChild(icon);
            location.appendChild(text);
            contentContainer.appendChild(location);

            // append content Container
            estateContainer.appendChild(contentContainer);

            // append sectionContainer
            infowindow.setContent(sectionContainer);
            infowindow.open(map, marker);


        });//(marker, i));
    }



}

/*********************************************************************
*************************** real estate page *************************
*********************************************************************/

if (document.getElementById("estete-map")) {

    function initMap() {

        const latLng = new google.maps.LatLng(flatLat, flatLng);

        infowindow = new google.maps.InfoWindow();
        map = new google.maps.Map(document.getElementById("estete-map"), {
            center: latLng,
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

        const marker = new google.maps.Marker({
            map,
            position: latLng,
            icon: image_path+"/icon/estate-marker.svg"
        });
    }

    // function createMarker(place) {
    //     //if (!place.geometry || !place.geometry.location) return;

    //     const marker = new google.maps.Marker({
    //         map,
    //         position: place.geometry.location,
    //         icon: image_path+"/icon/estate-marker.svg"
    //     });
    // }

    window.initMap = initMap;
}

// real_estate_title

 

/*********************************************************************
*************************** add estate page **************************
*********************************************************************/
let location_estate_map = document.getElementById("location_estate_map");
if (location_estate_map) {

    const saveButton = document.querySelector("#save_location");
    const inputLat   = document.querySelector("#map_location_lat");
    const inputLng   = document.querySelector("#map_location_lng");

// Initialize and add the map
 function initMap() {
        // The location of your place
        var yourPlace = {lat: 24.7262657, lng: 46.6591142};


        let real_estate_city = document.getElementById('real_estate_city');
        let real_estate_district = document.getElementById('real_estate_district');
        if (real_estate_city) {

            real_estate_city.addEventListener("change", function(event) {

                // get selected option
                var lat = event.target.options[event.target.selectedIndex].dataset.lat;
                var lng = event.target.options[event.target.selectedIndex].dataset.lng;
                console.log(lat,lng);
                let newPlace = {lat: parseFloat(lat), lng: parseFloat(lng)};
                map.panTo(newPlace);
                map.setZoom(12);
                setValueInInput(true);

                // location_estate_map.dataset.lat
            });

            console.log(real_estate_city);
        }
        if (real_estate_district) {

            real_estate_district.addEventListener("change", function(event) {

                // get selected option
                var lat = event.target.options[event.target.selectedIndex].dataset.lat;
                var lng = event.target.options[event.target.selectedIndex].dataset.lng;
                console.log(lat,lng);
                let newPlace = {lat: parseFloat(lat), lng: parseFloat(lng)};
                map.panTo(newPlace);
                map.setZoom(12);
                setValueInInput(true);

                // location_estate_map.dataset.lat
            });

            console.log(real_estate_district);
        }
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
            map.addListener("center_changed", () => {
                // 3 seconds after the center of the map has changed, pan back to the
                // marker.
                window.setTimeout(() => {
                    marker.setPosition(map.getCenter());
                    setValueInInput(false);

                }, 0);
              });
              

              setInterval(() => {
                    map.panTo(marker.getPosition());
              }, 1000);
          

        // The marker, positioned at your place
        var marker = new google.maps.Marker({
            position: yourPlace,
            map: map,
            draggable: true,
            icon: image_path+"/icon/estate-marker.svg"
        });

        if(location_estate_map.dataset.lat && location_estate_map.dataset.lng){
            let oldPlace = {lat: parseFloat(location_estate_map.dataset.lat), lng: parseFloat(location_estate_map.dataset.lng)};
            console.log('oldPlace',oldPlace);
            marker.setPosition(oldPlace);
            setValueInInput(true);
        }else{
            const firstOption = real_estate_district.querySelector('option:first-of-type');
            console.log(firstOption);
            let newPlace = {};
            if(firstOption){
                newPlace = {lat: parseFloat(firstOption.dataset.lat), lng: parseFloat(firstOption.dataset.lng)};
            }
            const firstCityOption = real_estate_city.querySelector('option:first-of-type');
            console.log(firstCityOption);
            if(!firstOption && firstCityOption){
                newPlace = {lat: parseFloat(firstCityOption.dataset.lat), lng: parseFloat(firstCityOption.dataset.lng)};
            }
            marker.setPosition(newPlace);

        }


        saveButton.onclick = () => {
            setValueInInput();
        }


        function setValueInInput(close = true) {
            document.body.style.overflow = "auto";
            console.log('setValueInInput' ,close);
             // hide invalid alert
             document.querySelector("#location_estate_map + .invalid-feedback").style.display = "block";
             // change inputs value
             if(close){
                 inputLat.setAttribute("value", marker.getPosition().lat());
                 inputLng.setAttribute("value", marker.getPosition().lng());


                    // hide popup
                    document.getElementById("choose_map_location").classList.remove("show");
                    document.getElementById("choose_map_location").style.display = "none"
                    // change select button content
                    document.querySelector("#choose_map_button span").textContent = marker.getPosition().lat().toFixed(4) + " - " + marker.getPosition().lng().toFixed(4)
                }
                document.querySelector("#location_estate_map + .invalid-feedback").style.display = "none";
             
        }
        // Update marker on user click
        google.maps.event.addListener(map, 'click', function(event) {

            marker.setPosition(event.latLng);
            window.setTimeout(() => {
                map.setCenter(marker.getPosition());
            }, 800);

            // hide invalid alert
            document.querySelector("#location_estate_map + .invalid-feedback").style.display = "none";

            saveButton.onclick = () => {
                setValueInInput();
                // change inputs value
                // inputLat.setAttribute("value", event.latLng.lat());
                // inputLng.setAttribute("value", event.latLng.lng());
                // document.body.style.overflow = "auto";


                // // hide popup
                // document.getElementById("choose_map_location").classList.remove("show");
                // document.getElementById("choose_map_location").style.display = "none"

                // // change select button content
                // document.querySelector("#choose_map_button span").textContent = event.latLng.lat().toFixed(4) + " - " + event.latLng.lng().toFixed(4)
            }
        });
    }
 
    /*saveButton.onclick = () => {
        // hide invalid alert
        document.querySelector("#location_estate_map + .invalid-feedback").style.display = "block";
    }
    
    // Initialize and add the map
    function initMap() {
        // The location of your place
        var yourPlace = {lat: 24.7262657, lng: 46.6591142};
         //const latLng = new google.maps.LatLng(flatLat, flatLng);

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
            icon: image_path+"/icon/estate-marker.svg"
        });

        if(location_estate_map.dataset.lat && location_estate_map.dataset.lng){
            let oldPlace = {lat: parseFloat(location_estate_map.dataset.lat), lng: parseFloat(location_estate_map.dataset.lng)};
            console.log('oldPlace',oldPlace);
            marker.setPosition(oldPlace);
        }

        // Update marker on user click
        google.maps.event.addListener(map, 'click', function(event) {

            marker.setPosition(event.latLng);

            // hide invalid alert
            document.querySelector("#location_estate_map + .invalid-feedback").style.display = "none";

            saveButton.onclick = () => {

                // change inputs value
                inputLat.setAttribute("value", event.latLng.lat());
                inputLng.setAttribute("value", event.latLng.lng());
                document.body.style.overflow = "auto";


                // hide popup
                document.getElementById("choose_map_location").classList.remove("show");
                document.getElementById("choose_map_location").style.display = "none"

                // change select button content
                document.querySelector("#choose_map_button span").textContent = event.latLng.lat().toFixed(4) + " - " + event.latLng.lng().toFixed(4)
            }
        });
    }
    */
    
}


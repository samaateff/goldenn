/*********************************************************************
******************************** map page ****************************
*********************************************************************/

let map;
let service;
let infowindow;


let location_estate_map = document.getElementById("location_estate_map");
    if (location_estate_map) {
        console.log('location_estate_map');
        const saveButton = document.querySelector("#save_location");
        const inputLat   = document.querySelector("#map_location_lat");
        const inputLng   = document.querySelector("#map_location_lng");


    // saveButton.onclick = () => {
    //     // hide invalid alert
    //     document.querySelector("#location_estate_map + .invalid-feedback").style.display = "block";
    // }

    // Initialize and add the map
    function initMap() {
        // The location of your place
        var yourPlace = {lat: 24.7262657, lng: 46.6591142};
        var zoom = 13;
        if(location_estate_map.dataset.lat && location_estate_map.dataset.lng){
             yourPlace = {lat: parseFloat(location_estate_map.dataset.lat), lng: parseFloat(location_estate_map.dataset.lng)};
            zoom = 13;
        }

        // The map, centered at your place
        var map = new google.maps.Map(
            document.getElementById('location_estate_map'), {
                zoom: zoom,
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
            icon: "/public/front-assets/images/icon/estate-marker.svg"
        });

        if(location_estate_map.dataset.lat && location_estate_map.dataset.lng){
            let oldPlace = {lat: parseFloat(location_estate_map.dataset.lat), lng: parseFloat(location_estate_map.dataset.lng)};
            console.log('oldPlace',oldPlace);
            marker.setPosition(oldPlace);
        }

        // console.log('log',location_estate_map.dataset.show , location_estate_map.dataset.show != 1, location_estate_map.dataset.show !== 1);
        if (location_estate_map.dataset.show != 1) {

            // Update marker on user click
            google.maps.event.addListener(map, 'click', function(event) {

                marker.setPosition(event.latLng);



                    // change inputs value
                    inputLat.setAttribute("value", event.latLng.lat());
                    inputLng.setAttribute("value", event.latLng.lng());


            });
        }
    }
}

let token = document.head.querySelector('meta[name="csrf-token"]').content;


const inputsCheckedFront = document.querySelectorAll("[data-collapsed-show]");

if (inputsCheckedFront) {
    inputsCheckedFront.forEach(input => {
        $(() => {

            const section = $(input.getAttribute("data-collapsed-show"));

            if(input.checked) {

                section.show()

            } else {

                section.hide()
            }

            document.body.addEventListener("click", () => {

                if(input.checked) {

                    section.show(300)

                } else {

                    section.hide(300)
                }
            });
        })
    })
}


function openAuthPopup() {
    var sign_in_popupModal = new bootstrap.Modal(document.getElementById('sign_in_popup'), {})
    sign_in_popupModal.show();

}
function openOtpPopup() {
    var verification_codeModal = new bootstrap.Modal(document.getElementById('verification_code'), {})
    verification_codeModal.show();

    countdownResendButton();

}


function countdownResendButton() {
    let countdownElement = document.getElementById('countdown');
    let countdownSpanElement = document.getElementById('countdown_span');
    console.log(countdownElement);
    let resendButton = document.getElementById('resendButton');
    let countdownTime = 59; // 1 minute
    
    let countdownInterval = setInterval(function() {
        countdownTime--;
        countdownSpanElement.innerText = "00:"+ countdownTime;
    
        if (countdownTime <= 0) {
            clearInterval(countdownInterval);
            countdownElement.style.display = 'none';
            resendButton.style.display = 'block';
        }
    }, 1000);
}

function ResendOtpCode() {

    const url =main_url+ `/api/v2/auth/resend-otp`;
    const verification_code_form_resend = document.getElementById("verification_code_form");
    let formData = new FormData(verification_code_form_resend);


    fetch(url, {
        method: 'post',
        headers: {
            // 'Content-Type': 'application/json',
            "X-CSRF-TOKEN": token,
            "X-SECRET-KEY":k_url
        },
        body: formData
    })
    .then(response => response.json())
    .then(data  => {
        if(data.success == true){

            
            let countdownElement = document.getElementById('countdown');
            let countdownSpanElement = document.getElementById('countdown_span');
            let resendButton = document.getElementById('resendButton');
            countdownElement.style.display = 'block';
            resendButton.style.display = 'none';
            countdownSpanElement.innerHTML = '00:59'

            countdownResendButton();
        }
    
    })
    .catch(error => {
        // Handle any errors here
        console.error(error);
    });
}

function closeUpdateOtpPopup() {
    var myModalEl = document.querySelector('#update_verification_code')
    var verification_codeModal = bootstrap.Modal.getOrCreateInstance(myModalEl);
    verification_codeModal.hide();

}
function closeOtpPopup() {
    var myModalEl = document.querySelector('#verification_code')
    var verification_codeModal = bootstrap.Modal.getOrCreateInstance(myModalEl);
    verification_codeModal.hide();

}
function openReqisterPopup() {
    var personal_infoModal = new bootstrap.Modal(document.getElementById('personal_info'), {})
    personal_infoModal.show();

}

function closeReqisterPopup() {
    var myModalEl = document.querySelector('#personal_info')
    var personal_infoModal = bootstrap.Modal.getOrCreateInstance(myModalEl);
    personal_infoModal.hide();

}
function closeAuthPopup() {
    
    var myModalEl = document.querySelector('#sign_in_popup')
    var sign_in_popupModal = bootstrap.Modal.getOrCreateInstance(myModalEl);
    sign_in_popupModal.hide();
    
}



/*********************************************************************
**********************  Real Estate functionalty *********************
*********************************************************************/
const searchInput = document.querySelector('#city-search');

if(searchInput){

    const cityList = document.querySelector('.cities');
    const cities = cityList.querySelectorAll('li');

    searchInput.addEventListener('search', function(event) {
      const searchText = event.target.value.toLowerCase();

      cities.forEach(function(city) {
        const cityName = city.querySelector('.city-item').getAttribute('data-text').toLowerCase();

        if (cityName.indexOf(searchText) !== -1) {
          city.style.display = 'block';
        } else {
          city.style.display = 'none';
        }
      });
    });
    searchInput.addEventListener('keyup', function(event) {
      const searchText = event.target.value.toLowerCase();

      cities.forEach(function(city) {
        const cityName = city.querySelector('.city-item').getAttribute('data-text').toLowerCase();

        if (cityName.indexOf(searchText) !== -1) {
          city.style.display = 'block';
        } else {
          city.style.display = 'none';
        }
      });
    });

}



const update_verification_form = document.getElementById("update_verification_form");
if (update_verification_form) {
    update_verification_form.addEventListener('submit', event => {
        event.preventDefault();

        const url = update_verification_form.action;
        const method = update_verification_form.method;
        const formData = new FormData(update_verification_form);
        const phone_error = document.getElementById("update_verification_code_error");
        const phone_input = document.getElementById("update-verification-inputs");

        fetch(url, {
            method: method,
            body: formData
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if(data.success == false){
                update_verification_form.classList.add('was-validated');
                phone_input.classList.add('is-invalid');
                phone_error.textContent = data.message;
                // login_form.classList.add('invalid-feedback');
                console.log(data);
            }else{
               if (data.data.auth == true && data.data.redirect_to == '') {
                location.reload()
               }else if(data.data.redirect_to == 'Regiter_SCREEN'){

                const personal_info_form = document.getElementById("personal_info_form");

                // create a phone input element
                const phoneInput = document.createElement('input');

                // set the input type and name attributes
                phoneInput.type = 'hidden';
                phoneInput.name = 'phone'

                // set the input value
                phoneInput.value = data.data.phone;

                // append the phone input to the form
                personal_info_form.appendChild(phoneInput);


                setTimeout(() => {
                    openReqisterPopup();
                }, 600);

                closeOtpPopup();
               }
            }
        })
        .catch(error => {
            console.log(error);
        });

    }, false)
};

const login_form = document.getElementById("login_form");
if (login_form) {
    login_form.addEventListener('submit', event => {
        event.preventDefault();

        const xhr = new XMLHttpRequest();
        const url = login_form.action;
        const method = login_form.method;
        const formData = new FormData(login_form);
        const phone_error = document.getElementById("login_invalid_phone");
        const phone_input = document.getElementById("login_phone");

        fetch(url, {
            method: method,
            body: formData
        })
        .then(response => {
            // if (!response.ok) {
            //     // console.log(response.json());
            //     throw new Error(response.text());
            // }
            return response.json();
        })
        .then(data => {
            if(data.success == false){
                login_form.classList.add('was-validated');
                phone_input.classList.add('is-invalid');
                phone_error.textContent = data.message;
                // login_form.classList.add('invalid-feedback');
                console.log(data);
            }else{
                if(data.data.redirect_to == "CODE_SCREEN"){
                    const verification_code_form = document.getElementById("verification_code_form");

                    // create a phone input element
                    const phoneInput = document.createElement('input');

                    // set the input type and name attributes
                    phoneInput.type = 'hidden';
                    phoneInput.name = 'phone'

                    // set the input value
                    phoneInput.value = data.data.phone;

                    // append the phone input to the form
                    verification_code_form.appendChild(phoneInput);
                // create a country_code input element
                    const country_codeInput = document.createElement('input');

                    // set the input type and name attributes
                    country_codeInput.type = 'hidden';
                    country_codeInput.name = 'country_code'

                    // set the input value
                    country_codeInput.value = data.data.country_code;

                    // append the country_code input to the form
                    verification_code_form.appendChild(country_codeInput);
                    console.log(data);
                    setTimeout(() => {
                        openOtpPopup();
                    }, 600);
                }

                closeAuthPopup();

            }
        })
        .catch(error => {
            console.log(error);
        });

    }, false)
};
const verification_code_form = document.getElementById("verification_code_form");
if (verification_code_form) {
    verification_code_form.addEventListener('submit', event => {
        event.preventDefault();

        const xhr = new XMLHttpRequest();
        const url = verification_code_form.action;
        const method = verification_code_form.method;
        const formData = new FormData(verification_code_form);
        const phone_error = document.getElementById("verification_code_error");
        const phone_input = document.getElementById("verification-inputs");

        fetch(url, {
            method: method,
            body: formData
        })
        .then(response => {
            // if (!response.ok) {
            //     // console.log(response.json());
            //     throw new Error(response.text());
            // }
            return response.json();
        })
        .then(data => {
            if(data.success == false){
                verification_code_form.classList.add('was-validated');
                phone_input.classList.add('is-invalid');
                phone_error.textContent = data.message;
                // login_form.classList.add('invalid-feedback');
                console.log(data);
            }else{
               if (data.data.auth == true && data.data.redirect_to == '') {
                location.reload()
               }else if(data.data.redirect_to == 'Regiter_SCREEN'){

                const personal_info_form = document.getElementById("personal_info_form");

                // create a phone input element
                const phoneInput = document.createElement('input');

                // set the input type and name attributes
                phoneInput.type = 'hidden';
                phoneInput.name = 'phone'

                // set the input value
                phoneInput.value = data.data.phone;

                // append the phone input to the form
                personal_info_form.appendChild(phoneInput);


                setTimeout(() => {
                    openReqisterPopup();
                }, 600);

                closeOtpPopup();
               }
            }
        })
        .catch(error => {
            console.log(error);
        });

    }, false)
};
const personal_info_form = document.getElementById("personal_info_form");
if (personal_info_form) {
    personal_info_form.addEventListener('submit', event => {
        event.preventDefault();

        const url = personal_info_form.action;
        const method = personal_info_form.method;
        const formData = new FormData(personal_info_form);
        const phone_error = document.getElementById("personal_info_error");
        const phone_input = document.getElementById("personal_info_inputs");        
        
        const email_error = document.getElementById("email_error");
        const email_input = document.getElementById("user_email");

        fetch(url, {
            method: method,
            body: formData
        })
        .then(response => {
            // if (!response.ok) {
            //     // console.log(response.json());
            //     throw new Error(response.text());
            // }
            return response.json();
        })
        .then(data => {
            
            if(data.success == false){
                if(phone_input && phone_error)
                {
                personal_info_form.classList.add('was-validated');
                phone_input.classList.add('is-invalid');
                phone_error.textContent = data.message;
                }
                if(email_input)
                {
                personal_info_form.classList.add('was-validated');
                email_input.classList.add('is-invalid');
                if(data.message == 'Email is already in use' || data.message == 'البريد الالكترونى مستخدم من قبل' ) email_error.textContent = data.message;
                }
                // login_form.classList.add('invalid-feedback');
                console.log(data);
            }else{
                console.log(data);
                closeReqisterPopup();
                if(data.data.redirect_to == 'CODE_SCREEN'){
                    setTimeout(() => {
                        openAuthPopup();
                    }, 300);
                }else if (data.data.auth == true && data.data.redirect_to == '') {
                    setTimeout(() => {

                        location.reload()
                    }, 300);

                }

            }
        })
        .catch(error => {
            console.log(error);
            
            
        });

    }, false)
};

const searchForm = document.getElementById("search_form");
if (searchForm) {
    searchForm.addEventListener('submit', event => {
        event.preventDefault();


        let search_destinationSpan = document.getElementById("search_destination");

        const search_destinationSelectedText  =  search_destinationSpan.querySelector(".input-button span");



        let search_estate_typeSpan = document.getElementById("search_estate_type");

        const search_estate_typeSelectedText  =  search_estate_typeSpan.querySelector(".input-button span");



        let search_destinationInout = document.getElementsByName("search_destination")[0].value ;
        let search_estate_typeInout = document.getElementsByName("search_estate_type")[0].value;
        let destinationText = search_destinationSelectedText.textContent;
        if(search_destinationInout == null || search_destinationInout == ''){
            // console.log/('if search_destinationInout' , search_destinationInout);
            destinationText = '0';
        }
        // console.log(search_destinationInout , destinationText);
        // return null;
     // Remove the event listener to prevent multiple submissions
    // searchForm.removeEventListener('submit', arguments.callee);

    // Change the form action to the server endpoint
    searchForm.action = main_url + '/search/' + destinationText  ;
        console.log(searchForm.action);

    searchForm.action = search_estate_typeInout ? searchForm.action + '/' + search_estate_typeSelectedText.textContent : searchForm.action ;

    // Submit the form normally
    searchForm.submit();


    }, false)

    // reset inputs bu reset button
    document.getElementById("reset_search_from").onclick = () => {


        const searchRangeInput = document.getElementById("real_estate_price");
        const priceFrom = document.getElementById("search_estate_price_from");
        const priceTo = document.getElementById("search_estate_price_to");


        searchRangeInput.setAttribute("value", 100);
        searchRangeInput.value = 100;
        priceFrom.setAttribute("value", 100);
        priceFrom.value = 100;
        priceTo.setAttribute("value", "");
        priceTo.value = "";

        /************* change value options dropdown  ************/
        const customSelectBoxs = searchForm.querySelectorAll(".select-feild");
        searchForm.reset();
        if (customSelectBoxs) {
            customSelectBoxs.forEach(select => {
                const input          = select.querySelector('input[type="hidden"]')
                const dropdownTitle  = select.querySelector(".input-button span");
                // change inupt and title values
                if(input){
                    input.value = '';
                }
                dropdownTitle.textContent = dropdownTitle.dataset.text;

            })
        }
    }

}



/************* open-category-search-model-with-id  ************/
const categoryBoxs = document.querySelectorAll(".category-search");

if (categoryBoxs) {
    categoryBoxs.forEach(box => {

        box.addEventListener("click", (event) => {
            // event.preventDefault();
            console.log(box);
            // category-popup
            const categoryPopup = document.getElementById('category-popup');
            const cities = categoryPopup.querySelectorAll(".city-item");
            if(cities) {
                cities.forEach(city => {
                    city.href = '/search/' + city.dataset.text + '/' + box.dataset.text +'?search_destination='+ city.dataset.id + '&search_estate_type=' + box.dataset.id
                })
            }

        })

        console.log(box , box.dataset.id);
    })

}


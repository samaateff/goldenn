/*********************************************************************
******************** Content section functionalty ********************
*********************************************************************/
/************* verification code ************/
const otpInput = document.querySelectorAll('#verification_code .verification-feiled input');
const updateOtpInput = document.querySelectorAll('#update_verification_form .verification-feiled input');

if(otpInput) {
    valdateOtp(otpInput)
}

if(otpInput) {
    valdateOtp(updateOtpInput)
}

function valdateOtp(Inputs) {
    
    Inputs.forEach((input, index) => {
        input.oninput = (e) => {
            
            if(input.value.length > 1) {
                input.value = input.value.substr(0, 1);
            }
            
        }
        
        input.addEventListener("keyup", (e) => {
            
            const key = e.key; 
            
            if (key === "Backspace" || key === "Delete") {
                
               if (Inputs[index - 1]) {
                    // Move to the next inputt
                    Inputs[index - 1].focus();
                }
                    
            } else {
                    
                if (input.value.match(/\d/)) {
                    if (Inputs[index + 1]) {
                        // Move to the next inputt
                        Inputs[index + 1].focus();
                    }
                }
            }
        })
    })
}

/************* Download App Popup ************/
var IS_IPAD = navigator.userAgent.match(/iPad/i) != null,
    IS_IPHONE = !IS_IPAD && ((navigator.userAgent.match(/iPhone/i) != null) || (navigator.userAgent.match(/iPod/i) != null)),
    IS_IOS = IS_IPAD || IS_IPHONE,
    IS_ANDROID = !IS_IOS && navigator.userAgent.match(/android/i) != null,
    IS_MOBILE = IS_IOS || IS_ANDROID;

// if (IS_MOBILE && document.getElementById('download_map')) {

//     const downloadApp = new bootstrap.Modal(document.getElementById('download_map'));
    
//     // window on load show download App popup
//     window.addEventListener("load", () => downloadApp.show())      
// }


if (IS_MOBILE && document.querySelector('.top-header-mobile')) {

    if(document.querySelector(`#content.home`) && !localStorage.getItem("topHeaderData")) {
        // show topbar header 
        document.querySelector('.top-header-mobile').classList.remove("d-none")
        document.querySelector('#header').classList.add("top-bar");
    }
   
    document.querySelector(".top-header-mobile .clos-button").onclick = () => {
        // hide topbar whene button close clecked
        $(".top-header-mobile").slideUp(400);
        document.querySelector('#header').classList.remove("top-bar");
        
        // hide topbar by localStorage
        localStorage.setItem("topHeaderData", false);
    }
}

/************* Calculation of section height ************/

if (document.querySelector("#footer") && document.querySelector("#header")) {
    const mainContentSection = document.querySelector("#content");
    const headerHeight       = document.querySelector("#header").clientHeight;
    const footerHeight       = document.querySelector("#footer").clientHeight;

    // Content Section main Height = 100vh - (headerHeight + footerHeight)
    mainContentSection.style.minHeight = `calc(100vh - ${headerHeight + footerHeight}px)`

    // Calculation height whine window resize
    window.onresize = () => {
        const headerHeight = document.querySelector("#header").clientHeight;
        const footerHeight = document.querySelector("#footer").clientHeight;

        // Content Section main Height = 100vh - (headerHeight + footerHeight)
        mainContentSection.style.minHeight = `calc(100vh - ${headerHeight + footerHeight}px)`
    }
}

/************* allCarousels swipe by js ************/
const allCarousels = document.querySelectorAll(".carousel");

if (allCarousels) {
    allCarousels.forEach((slider) => {
        const carousel = new bootstrap.Carousel(slider);
        let startPoint;
        let endPoint;
        let pressed;
        
        // not change slide
        carousel._element.onclick = () => {
            startPoint = endPoint;
            pressed = false;
        }
        
        carousel._element.addEventListener("mousedown", (e) => {
            pressed = true;
            // set start point for desktop
            startPoint = e.pageX
            // Change the mouse pointer
            carousel._element.style.cursor = "grabbing";
            
        }, false)

        carousel._element.addEventListener("mousemove", (e) => {
        
            if (!pressed) return;
                                    
            // set end point for desktop
            endPoint = e.pageX;
        
            // Move Slider
            if (startPoint > endPoint) {
            
                carousel.prev()
            
            } 
            
            if (startPoint < endPoint) {
                carousel.next()
            }
        
            pressed = false;
        
        }, false);
    })
}


/************* Input Placeholder Animation ************/
const inputPlaceholder = document.querySelector("#inquiry_search");

if (inputPlaceholder) {

    const placeholderText = inputPlaceholder.placeholder;
    const typingDelay = 120;
    const eraseDelay = 1000;

    // reomve placeholder
    inputPlaceholder.placeholder = ""

    function animatePlaceholder() {
        let currentCharIndex = 0;
        let isTyping = true;
        
        setInterval(() => {
            if (isTyping) {
                inputPlaceholder.placeholder += placeholderText[currentCharIndex];
                currentCharIndex++;
            
                if (currentCharIndex === placeholderText.length) {
                    isTyping = false;
                    setTimeout(() => {
                        isTyping = true;
                        inputPlaceholder.placeholder = "";
                        currentCharIndex = 0;
                    }, eraseDelay);
                }
            } else {
                inputPlaceholder.placeholder = inputPlaceholder.placeholder.slice(0, -1);
        
                if (inputPlaceholder.placeholder === "") {
                    isTyping = true;
                    currentCharIndex = 0;
                }
            }
        }, typingDelay);
    }
    
    animatePlaceholder();
}

/*********************************************************************
**********************  Real Estate functionalty *********************
*********************************************************************/

/************* favorite real estate section  ************/
const realEstateFavoriteIcon = document.querySelectorAll(".favorite-icon");

if (realEstateFavoriteIcon) {

    realEstateFavoriteIcon.forEach(icon => {
        icon.addEventListener("click", (e) => {

            e.preventDefault();
            if(icon.dataset.auth == 0){
                openAuthPopup();
                return null;
            }
            icon.classList.toggle("active");
            // Send a request to the server to add or remove the real estate from favorites based on the current state
            const url =main_url+ `/flat/favorites/${icon.dataset.id}/toggle`;
            fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    "X-CSRF-TOKEN": token
                },
            })
            .then(response => response.json())

            .then(data  => {
                if(data.data.favorite == false){
                    icon.children[0].setAttribute("data-prefix", "far")
                    icon.classList.remove("active");
                    if(icon.dataset.removeid){
                        document.getElementById(icon.dataset.removeid).remove();
                    }

                }else{
                    
                    
                    icon.children[0].setAttribute("data-prefix", "fas")
                    icon.classList.add("active");
                    
                    ttq.track('AddToWishlist', {
                      "contents": [{
                        "content_id": `${icon.dataset.id}`, // string. ID of the product. Example: "1077218".
                        "content_type": "product", // string. Either product or product_group.
                        "content_name": `${icon.dataset.title}`, // string. The name of the page or product. Example: "shirt".
                      }],
                      "value": `${icon.dataset.price}`, // number. Value of the order or items sold. Example: 100.
                      "currency": "SAR", // string. The 4217 currency code. Example: "USD".
                    });

                }
                // Handle the server's response here
            })
            .catch(error => {
                // Handle any errors here
                console.error(error);
            });
            if(icon.children[0].getAttribute("data-prefix") === "far") {

                icon.children[0].setAttribute("data-prefix", "fas")

            } else {

                icon.children[0].setAttribute("data-prefix", "far")
            }
        })
    })
}


/*********************************************************************
********************* Validation form functionalty *******************
*********************************************************************/

//Bootstrap Validation
(() => {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})();


/*********************************************************************
************************* Calender functionalty **********************
*********************************************************************/

/* Calender => date range picker */
$(() => {

    if(document.querySelector('.date-picker-button')) {
        
        $('.date-picker-button').daterangepicker({
            locale: {
                "firstDay": 6
            },
            isRTL: true,
            language: "ar",
            opens: 'left',
            drops: ($('.date-picker-button').offset().top - $(window).scrollTop() - 480 > 0) ? "up" : "down",
            autoApply: true,
            linkedCalendars: false,
    
            // min max date
            minDate: moment().startOf('day'),
            
            minSpan: {
                days: 2
            },
    
    
        }, function(start, end, label) {
            
            
            if (start.format('YYYY-MM-DD') == end.format('YYYY-MM-DD')) {
                 // make error because calender not hide
                error
            }
    
            const inputDateFrom = $('.date-picker-button').prevAll('#search_booking_time_from');
            const inputDateTo = $('.date-picker-button').prevAll('#search_booking_time_to');
    
            if($('.date-picker-button').hasClass("option-select")) {
                
                $(".date-picker-button span").text(start.format('YYYY-MM-DD') + " / " + end.format('YYYY-MM-DD'))
                
            } else {
                
                $(".date-picker-button span").text(start.format('DD / MM') + " - " + end.format('DD / MM'))
            }
            inputDateFrom.val(start.format('YYYY-MM-DD'));
            inputDateTo.val(end.format('YYYY-MM-DD'));
    
        });
        
        
        window.addEventListener("scroll", () => {
    
            if ($('.date-picker-button').offset().top - $(window).scrollTop() - 480 > 0) {
    
                $('.date-picker-button').data('daterangepicker').drops = "up";
    
            } else {
    
                $('.date-picker-button').data('daterangepicker').drops = "down";
            }
    
        })
    }
    

    $('.day-picker-button').daterangepicker({

        locale: {
            "firstDay": 6
        },
        singleDatePicker: true,
        showDropdowns: true,
        isRTL: true,
        language: "ar",
        opens: 'left',
        drops: "up",
        autoApply: true,
        linkedCalendars: false,

        // min max date
        maxDate: moment().startOf('day'),

    }, function(start, end, label) {

        //  input and button text
        const inputTime   = $(this.element).prevAll('input[type="hidden"]');
        const buttonText  = $(this.element).children("span")

        // change input value and button text
        inputTime.attr("value", start.format('YYYY-MM-DD'));
        buttonText.text(start.format('YYYY-MM-DD'));
    });
    
    
    // $(".hijri-picker-button").hijriDatePicker({
    //     hijri: true,
    //     weekStart: 6,
    //     viewMode: "years",
    //     maxDate: moment().startOf('day'),
    // });
    
    // $(".hijri-picker-button").on('dp.change', function (arg) {

    //     if (!arg.date) {
    //         $(".hijri-picker-button").val('');
    //         return;
    //     };

    //     let date = arg.date;

    //     $(".hijri-picker-output").text(date.format("iD iMMM iYYYY") + " - " + date.format("D MMM YYYY"));
    //     $("#hijri_birth_day").val(date.format("iD iMMM iYYYY") + " - " + date.format("D MMM YYYY"));
    // });

    // $(".hijri-picker-button").on('dp.hide', function (arg) {

    //     if (!arg.date) {
    //         $(".hijri-picker-button").val('');
    //         return;
    //     };

    //     let date = arg.date;

    //     $(".hijri-picker-output").text(date.format("iD iMMM iYYYY") + " - " + date.format("D MMM YYYY"));
    //     $("#hijri_birth_day").val(date.format("iD iMMM iYYYY") + " - " + date.format("D MMM YYYY"));
    // });

    if(document.querySelector("html").lang == "ar") {

        if(document.querySelector('.date-picker-button')) {

            $('.date-picker-button').data('daterangepicker').locale = {
                "direction": 'rtl',
                "format": "MM/DD/YYYY",
                "separator": " - ",
                "applyLabel": "تأكيد",
                "cancelLabel": "إلغاء",
                "fromLabel": "من",
                "toLabel": "إلى",
                "customRangeLabel": "Custom",
                "daysOfWeek": [
                    "السبت",
                    "الأحد",
                    "الأثنين",
                    "الثلاثاء",
                    "الإربعاء",
                    "الخميس",
                    "الجمعة",
                ],
                "monthNames": [
                    "يناير",
                    "فبراير",
                    "مارس",
                    "ابريل",
                    "مايو",
                    "يونيو",
                    "يوليو",
                    "اغسطس",
                    "سبتمبر",
                    "اكتوبر",
                    "نوفمبر",
                    "ديسمبر"
                ],
                "firstDay": 6
            }
        }

        if(document.querySelector('.day-picker-button')) {

            $('.day-picker-button').data('daterangepicker').locale = {
                "direction": 'rtl',
                "format": "MM/DD/YYYY",
                "separator": " - ",
                "applyLabel": "تأكيد",
                "cancelLabel": "إلغاء",
                "fromLabel": "من",
                "toLabel": "إلى",
                "customRangeLabel": "Custom",
                "daysOfWeek": [
                    "السبت",
                    "الأحد",
                    "الأثنين",
                    "الثلاثاء",
                    "الإربعاء",
                    "الخميس",
                    "الجمعة",
                ],
                "monthNames": [
                    "يناير",
                    "فبراير",
                    "مارس",
                    "ابريل",
                    "مايو",
                    "يونيو",
                    "يوليو",
                    "اغسطس",
                    "سبتمبر",
                    "اكتوبر",
                    "نوفمبر",
                    "ديسمبر"
                ],
                "firstDay": 6
            } 
        }
    }
});

/*********************************************************************
************************ home page functionalty **********************
*********************************************************************/

/************* Search reset values ************/
const formSearch = document.querySelector(".home-header form") 

if(formSearch) {
    const customSelectBoxs = document.querySelectorAll(".select-feild");
    const inputValues = document.querySelectorAll('.select-feild input[type="hidden"]');
    const dropdownTitleValues = document.querySelectorAll('.select-feild .input-button span');
    let inputValue = [];
    let dropdownTitleValue = [];
    // const sliderRange = document.querySelector("#real_estate_price_picker");

    customSelectBoxs.forEach((select, index) => {
        inputValue.push(inputValues[index].value)
        dropdownTitleValue.push(dropdownTitleValues[index].textContent)
    })
        
        
    formSearch.onreset = () => {
        customSelectBoxs.forEach((select, index) => {
            const input                = select.querySelector('input[type="hidden"]');
            const dropdownTitle        = select.querySelector(".input-button span");

            // change inupt and title values
            input.value = inputValue[index];
            dropdownTitle.textContent = dropdownTitleValue[index];

            // sliderRange.noUiSlider.set([50, 200000])
        })
    }
}

/************* home sliders => Swiper js ************/
const offersSwiper = new Swiper('.swiper.offers-slider', {
    // Optional parameters
    slidesPerView: "auto",
    loop: true,
    centeredSlides: true,
    // createElements: true,

    autoplay: {
        delay: 5000,
    },

    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    }
});

const citySwiper = new Swiper('.swiper.city-slider', {
    // Optional parameters
    slidesPerView: "auto",
    loop: true,
    centeredSlides: true,
    centerInsufficientSlides: true,

    // Navigation arrows
    navigation: {
      nextEl: '.city-slider .swiper-button-next',
      prevEl: '.city-slider .swiper-button-prev',
    },
});

const categoriesSwiper = new Swiper('.swiper.categories-slider', {
    // Optional parameters
    slidesPerView: "auto",
    centerInsufficientSlides: true,
    freeMode: true,
    grabCursor: true,
    touchStartForcePreventDefault: true,
    // touchRatio: 2,
    // speed: 100,
  
    // Navigation arrows
    navigation: {
      nextEl: '.categories-slider .swiper-button-next',
      prevEl: '.categories-slider .swiper-button-prev',
    },
});

/************* show sticky Header  ************/
const headerSection = document.querySelector("#header");
const homeHeaderSection = document.querySelector(".categories")

if (homeHeaderSection && headerSection) {

    // main demaintion
    const SectionHeaderHeight = homeHeaderSection.offsetTop;
    const windowHeight = window.innerHeight;

    let scrollOffset = window.scrollY;

    window.addEventListener("scroll", () => {

        scrollOffset = window.scrollY;

        if (scrollOffset >= SectionHeaderHeight + (windowHeight - SectionHeaderHeight)) {

            headerSection.classList.add("sticky-header");

        } else {
            headerSection.classList.remove("sticky-header");
        }
    })
}

/************* change value options dropdown  ************/
const customSelectBoxs = document.querySelectorAll(".select-feild");

if (customSelectBoxs) {
    customSelectBoxs.forEach(select => {
        const input          = select.querySelector('input[type="hidden"]')
        const dropdownBox    = select.querySelector(".options-dropdown");
        const dropdownButton = select.querySelector(".input-button");
        const dropdownTitle  = select.querySelector(".input-button span");
        const options        = select.querySelectorAll(".options-dropdown .dropdown-item");
        const priceFrom      = select.querySelector("#search_estate_price_from")
        const priceTo        = select.querySelector("#search_estate_price_to")
        if (window.jQuery) {
            // jQuery is loaded



            $(select).on("click", ".options-dropdown .dropdown-item", function(e){
                
                    e.preventDefault();
                    
                   // option value
                   const value = this.textContent.trim();

                   // change inupt and title values
                   input.value = this.dataset.value;
                   dropdownTitle.textContent = value;

                   // close dropdown menu
                   closeDropdown(dropdownBox, dropdownButton);
          });
        } else {
            // jQuery is not loaded

                if(options) {

                    options.forEach(opt => {

                        opt.addEventListener("click", (e) => {
                            
                            e.preventDefault();

                            // option value
                            const value = opt.textContent.trim();

                            // change inupt and title values
                            input.value = opt.dataset.value;
                            dropdownTitle.textContent = value;

                            // close dropdown menu
                            closeDropdown(dropdownBox, dropdownButton);
                        })
                    })
                }
        }

        if (priceFrom && priceTo) {

            const sliderRange = document.querySelector("#real_estate_price_picker");
            const resetPrice = document.querySelector("#reset_price");
            const direction = (document.querySelector("html").lang == "ar") ? "rtl" : "ltr";

            noUiSlider.create(sliderRange, {
                start: [50, 200000],
                connect: true,
                direction: direction,
                range: {
                    "min": 0,
                    "max": 1000000
                },
            });

            sliderRange.noUiSlider.on("update", function (values, handle) {

                if (handle) {
                    // change inupt value
                    priceTo.setAttribute("value", Math.round(values[handle]))
                    priceTo.value = Math.round(values[handle])

                } else {
                    // change inupt value
                    priceFrom.setAttribute("value", Math.round(values[handle]))
                    priceFrom.value = Math.round(values[handle])
                }
                
                // change title value
                dropdownTitle.textContent = `${Math.round(values[0])} - ${Math.round(values[1])}`;

                // change inupt value
                document.getElementById("search_estate_price").setAttribute("value", `${Math.round(values[0])} - ${Math.round(values[1])}`);
                document.getElementById("search_estate_price").value = `${Math.round(values[0])} - ${Math.round(values[1])}`
            });

            
            priceFrom.oninput = changePrice;
            priceTo.oninput = changePrice;
            
            resetPrice.onclick = () => sliderRange.noUiSlider.set([50, 200000])
            
            function changePrice() {
                // change title value
                dropdownTitle.textContent = `${priceFrom.value} - ${priceTo.value}`;

                // change inupt value
                document.getElementById("search_estate_price").setAttribute("value", `${priceFrom.value} - ${priceTo.value}`);
                document.getElementById("search_estate_price").value =  `${priceFrom.value} - ${priceTo.value}`;

                // change sliderRange values
                sliderRange.noUiSlider.set([priceFrom.value, priceTo.value]);
            }
        }
    })
}

/************* change value options dropdown  ************/
const selectNumberCode = document.querySelector(".select-number-code");

if (selectNumberCode) {
    const input          = selectNumberCode.querySelector('input[type="hidden"]')
    const inputSearch    = selectNumberCode.querySelector('input[type="search"]')
    const dropdownBox    = selectNumberCode.querySelector(".options-dropdown");
    const dropdownButton = selectNumberCode.querySelector(".input-button");
    const dropdownTitle  = selectNumberCode.querySelector(".input-button span");
    const dropdownImage  = selectNumberCode.querySelector(".input-button .flag img");
    const options        = selectNumberCode.querySelectorAll(".options-dropdown .dropdown-item");

    console.log(dropdownImage);

    if(options) {
        options.forEach(opt => {

            opt.addEventListener("click", (e) => {

                e.preventDefault();

                // option value
                const value = opt.getAttribute("data-value");
                const pattern = opt.getAttribute("data-pattern");
                const key = opt.getAttribute("data-key");
                const flag = opt.querySelector(".flag img").src;

                //console.log(flag);

                // change inupt and title values
                input.value = value;
                input.setAttribute("data-key", key);
                input.setAttribute("data-pattern", pattern);
                dropdownTitle.textContent = value;
                dropdownImage.src = flag
                
                let keys = CountriesPhoneDate; 
                let placeholder = keys[key] == undefined ? 'xxxxxxxxxx' :keys[key].placeholder;
                $("#login_phone").attr("placeholder", placeholder);

                // close dropdown menu
                closeDropdown(dropdownBox, dropdownButton);
            })
        })
    }
    
    inputSearch.oninput = (e) => {
        
        options.forEach(opt => {

            if(!opt.textContent.trim().includes(e.target.value)) {

                opt.style.display = "none";

            } else {

                opt.style.display = "flex";
            }
        })
    }
}
/************* close options dropdown  ************/
const optionsDropdowns = document.querySelectorAll(".options-dropdown");

if (optionsDropdowns) {

    optionsDropdowns.forEach(option => {

        const closeButton = option.querySelector(".btn-close");
        const openbutton  = option.previousElementSibling

        if (closeButton) {

            closeButton.onclick = () => closeDropdown(option, openbutton);
        }
    })
}

function closeDropdown(option, button) {
    // hide dropdown
    option.classList.remove("show");
    // close jobs dropdown
    button.classList.remove("show");
    button.setAttribute("aria-expanded", "false")
}

/************* search price ************/
const searchRangeInput = document.getElementById("real_estate_price");

if (searchRangeInput) {
    const priceFrom = document.getElementById("search_estate_price_from");
    const priceTo = document.getElementById("search_estate_price_to");
    const searchEstatePrice = document.getElementById("search_estate_price");

    // range change input value
    searchRangeInput.oninput = () => {

        priceTo.setAttribute("value", searchRangeInput.value);
        priceTo.value = searchRangeInput.value;
    }

    // reset inputs bu reset button
    if (document.getElementById("reset_price")) {
        document.getElementById("reset_price").onclick = () => {
            const dropdownTitle  = searchEstatePrice.querySelector(".input-button span");

            searchRangeInput.setAttribute("value", 100);
            searchRangeInput.value = 100;
            priceFrom.setAttribute("value", 100);
            priceFrom.value = 100;
            priceTo.setAttribute("value", "");
            priceTo.value = "";
            dropdownTitle.textContent = dropdownTitle.dataset.text;

        }
    }

}

/************* custom calender ************/
// var mobiscroll;

// if (mobiscroll) {

//     mobiscroll.setOptions({
//         locale: mobiscroll.localeAr,
//         theme: 'ios',
//         themeVariant: 'light'
//     })

//     mobiscroll.datepicker('#demo-range-selection', {
//         controls: ['calendar'],
//         display: 'inline',
//         rangeSelectMode: 'wizard',
//         select: 'range',
//         showRangeLabels: true
//     })
// }

/*********************************************************************
******************* search results page functionalty *****************
*********************************************************************/

/************* remove search parameters  ************/

const OptionsButtons = document.querySelectorAll(".search-options .option");

if (OptionsButtons) {

    OptionsButtons.forEach(option => {

        const optionRemoveButtons = option.querySelector(".icon-remove");

        if (optionRemoveButtons) {

            optionRemoveButtons.onclick = () => {

                // remove option from search parameters
                option.remove();
            }
        }
    })
}

/*********************************************************************
********************  my booking page functionalty *******************
*********************************************************************/

/************* My Booking Taps  ************/
const myBookingTaps = document.querySelector("#contact_content");

if (myBookingTaps) {

    const taps = document.querySelectorAll("#contact_content .options h2");

    taps.forEach(tap => {

        tap.addEventListener("click", (e) => {

            // If the tab is locked while it is open and not changed
            if(tap.getAttribute("aria-expanded") === "false") {
                // remove Animations transform items
                document.querySelector(tap.getAttribute("data-bs-target")).classList.remove("collapsing")
                // change state to collapse
                tap.setAttribute("aria-expanded", "true")
                // remove collapsed
                tap.classList.remove("collapsed")
                // show tap
                document.querySelector(tap.getAttribute("data-bs-target")).classList.add("show")
            }
        })
    })
}


/************* rate functionalty  ************/
const rateFieldSections = document.querySelectorAll(".rate-field");

if (rateFieldSections) {

    rateFieldSections.forEach(field => {

        // All icons on the field
        const icons = field.querySelectorAll(".icon");
        const input = field.querySelector('input[type="hidden"]')

        icons.forEach(icon => {

            icon.onclick = () => {

                const iconNumber = Array.from(icons).indexOf(icon) + 1;

                const iconsActive = Array.from(icons).filter((i, index) => index < iconNumber);

                // remove class active from all icons
                icons.forEach(icon => icon.classList.remove("active"));

                // add class active On the previous icons of selected icon
                iconsActive.forEach(icon => icon.classList.add("active"));

                // change to input value by rate icon
                input.setAttribute("value", iconNumber);
                input.value = iconNumber
            }
        })
    })
}

/*********************************************************************
*************** complete reservation page functionalty ***************
*********************************************************************/

/************* payment methods changed  ************/

const paymentMethods = document.querySelectorAll(".complete-reservation .payment-method");

if (paymentMethods) {

    paymentMethods.forEach(method => {

        method.addEventListener("click", () => {

            // delete class active from all methods
            paymentMethods.forEach(section => section.classList.remove("active"));

            // add class active to this method
            method.classList.add("active")
        })
    })
}


/*********************************************************************
********************* reviews slider functionalty ********************
*********************************************************************/

// slider container 
const sliderContainer = document.querySelectorAll(".reviews-container");

if (sliderContainer) {
    
    // looping to all sliders
    sliderContainer.forEach((container) => {

        // sliders box
        const innerSlider = container.children[0];
        const slideWidth = (innerSlider.children[0].offsetWidth) + 24;
        
        // slider arrows 
        const nextButton = document.querySelector(".reviews-control .next");
        const prevButton = document.querySelector(".reviews-control .prev");

        
        // buttons next & prev slide
        if(nextButton && prevButton) {
            nextButton.onclick = slideRTL;
            prevButton.onclick = slideLTR;
        }

        // set variblis 
        let pressed = false;
        let startPoint;
        let endPoint;
        let scroll;
        let runCondition = true;

        container.addEventListener("mouseenter", () => {
            // Change the mouse pointer
            container.style.cursor = "grab";
        });
    
        container.addEventListener("mousedown", (e) => {
            pressed = true;
            // set start point for desktop
            startPoint = e.pageX - innerSlider.offsetLeft;
            // Change the mouse pointer
            container.style.cursor = "grabbing";
        })
    
        container.addEventListener("mouseup", () => {
            // Change the mouse pointer
            container.style.cursor = "grab";
            pressed = false;
        });
    
        container.addEventListener("mousemove", (e) => {

            if (!pressed) return;
                                    
            // set end point for desktop
            endPoint = e.pageX;
    
            // Move Slider
            moveSlider(e)
        });
    
        /******* mobile sliding *******/
        // touchstart = mousedown
        container.addEventListener("touchstart", (e) => {
            pressed = true;
            // set start point for mobile
            startPoint = e.changedTouches[0].clientX - innerSlider.offsetLeft;
            startClientX = e.changedTouches[0].clientX;
            startClientY = e.changedTouches[0].clientY
        });
    
        // touchend = mouseup
        container.addEventListener("touchend", () => {
            pressed = false;
            scroll = false;
            
            // run Condition
            runCondition = true;
        });
    
        // touchmove = mousemove
        container.addEventListener("touchmove", (e) => {
            
    
            // set end point for mobile
            endPoint = e.changedTouches[0].clientX;
            endClientY = e.changedTouches[0].clientY;
             
            if (scroll) {
                e.preventDefault()
                
                // Move Slider
                moveSlider(e)
                
            }

            if (Math.abs(endPoint - startClientX) > Math.abs(endClientY - startClientY) && runCondition) {

                scroll = true
            }
            
            // stop Condition
            runCondition = false;
        })

        // function move to sliders 
        function moveSlider(e) {

            // stoped transition
            innerSlider.style.transition = "none";

            if (document.querySelector("html").lang == "ar") { 
                // Move the slider by difference between [endPoint - startPoint]
                innerSlider.style.right = `${-((endPoint - startPoint) + (innerSlider.clientWidth - container.clientWidth))}px`;

                // check Boundary
                let outer = container.getBoundingClientRect();
                let inner = innerSlider.getBoundingClientRect();


                if (parseInt(innerSlider.style.right) > 0) {
                    innerSlider.style.right = "0px";
                }
            
                if ((endPoint - startPoint) >= 0) {

                    
                    if (container.clientWidth >= innerSlider.clientWidth) {
                        
                        innerSlider.style.right = `0px`;
                        
                    } else {
                        
                        innerSlider.style.right = `-${(innerSlider.clientWidth - container.clientWidth)}px`;
                    }
                }

            } else {
                // Move the slider by difference between [endPoint - startPoint]
                innerSlider.style.left = `${endPoint - startPoint}px`;

                // check Boundary
                let outer = container.getBoundingClientRect();
                let inner = innerSlider.getBoundingClientRect();


                if (parseInt(innerSlider.style.left) > 0) {
                    innerSlider.style.left = "0px";
                }

                if (inner.right < outer.right) {
                    
                    if (container.clientWidth >= innerSlider.clientWidth) {
                        
                        innerSlider.style.left = `0px`;
                        
                    } else {
                        innerSlider.style.left = `-${inner.width - outer.width}px`;
                    }
                }
            }
        }

        function slideLTR() {

            if (document.querySelector("html").lang == "ar") {
                // slider Postion 
                sliderPostion = parseInt(innerSlider.style.right);
                
                // check Boundary
                outer = container.getBoundingClientRect();
                inner = innerSlider.getBoundingClientRect();

                if (inner.right - slideWidth < outer.right) {

                    // run transition
                    innerSlider.style.transition = ".4s";
            
                    innerSlider.style.right = `0px`;

                    // stoped transition
                    innerSlider.style.transition = "0";
                    
                } else {

                    // run transition
                    innerSlider.style.transition = ".4s";

                    innerSlider.style.right = `${sliderPostion + slideWidth}px`;

                    // stoped transition
                    innerSlider.style.transition = "0";
                }

            } else {

                // slider Postion 
                sliderPostion = parseInt(innerSlider.style.left);
                
                // check Boundary
                outer = container.getBoundingClientRect();
                inner = innerSlider.getBoundingClientRect();
    
                if (inner.left > outer.left - slideWidth) {

                    // run transition
                    innerSlider.style.transition = ".4s";
                
                    innerSlider.style.left = `0px`;

                    // stoped transition
                    innerSlider.style.transition = "0";
                    
                } else {
    
                    // run transition
                    innerSlider.style.transition = ".4s";
    
                    innerSlider.style.left = `${sliderPostion + slideWidth}px`;
    
                    // stoped transition
                    innerSlider.style.transition = "0";
                }
            }
        }

        function slideRTL() {

            if (document.querySelector("html").lang == "ar") {

                // slider Postion 
                sliderPostion = parseInt(innerSlider.style.right);
                
                // check Boundary
                outer = container.getBoundingClientRect();
                inner = innerSlider.getBoundingClientRect();
    
                if (inner.left + slideWidth > outer.left) {
                    
                    console.log(true)
                    
                    // run transition
                    innerSlider.style.transition = ".4s";

                    if (innerSlider.clientWidth > container.clientWidth) {
                        
                        innerSlider.style.right = `${container.clientWidth - innerSlider.clientWidth}px`;
                        
                    } else {
                        
                        innerSlider.style.right = `0px`;
                    }

                    // stoped transition
                    innerSlider.style.transition = "0";
    
                } else {
                    
                    // run transition
                    innerSlider.style.transition = ".4s";
    
                    innerSlider.style.right  = `${sliderPostion - slideWidth}px`;
    
    
                    // stoped transition
                    innerSlider.style.transition = "0";
                }
                
            } else {

                // slider Postion 
                sliderPostion = parseInt(innerSlider.style.left);
                
                // check Boundary
                outer = container.getBoundingClientRect();
                inner = innerSlider.getBoundingClientRect();
    
                if (inner.right < outer.right + slideWidth) {

                    // run transition
                    innerSlider.style.transition = ".4s";
                    
                    
                    if (innerSlider.clientWidth > container.clientWidth) {
                        
                        innerSlider.style.left = `${container.clientWidth - innerSlider.clientWidth}px`;

                    } else {
                        
                        innerSlider.style.left = `0px`;
                    }

                    // stoped transition
                    innerSlider.style.transition = "0";
    
                } else {
                    
                    // run transition
                    innerSlider.style.transition = ".4s";
    
                    innerSlider.style.left  = `${sliderPostion - slideWidth}px`;

                    // stoped transition
                    innerSlider.style.transition = "0";
                }

            }
        }
    })
}


/*********************************************************************
************************* Map page functionalty **********************
*********************************************************************/

/************* menu hide & show  ************/

const menuShowButton = document.querySelector(".menu-show-button");

if (menuShowButton) {

    const menuSection = document.querySelector(".search-map .menu")

    menuShowButton.onclick = () => {

        menuSection.classList.toggle("show")
    }
}


/*********************************************************************
*********************** message page functionalty ********************
*********************************************************************/

/************* hide & show persons-conversation ************/

const userChatPage = document.querySelector(".user-chat");

if (userChatPage) {

    const hideChatButton = userChatPage.querySelector(".hide-chat");

    hideChatButton.onclick = () => {

        userChatPage.classList.toggle("persons-open");
    }
}

/************* chat box initialization scroll ************/
const chatBox = document.querySelector(".open-conversation");

if (chatBox) {
    chatBox.scrollTo(null, chatBox.scrollHeight)
}


/*********************************************************************
********************* add estate page functionalty *******************
*********************************************************************/

/************* add & remove image from gallery and input ************/
const inputFile = document.querySelector("#real_estate_images");

if (inputFile) {
    const previewImage = document.getElementById("preview-image");

    // set main varibles
    const uploaderFilesBox = document.querySelector(".file-field");
    const estateGallery = document.querySelector(".uploader-images .estate-gallery");
    let allImages = new DataTransfer();
    var allImagesSrc = [] ;


    inputFile.oninput = (e) => {

        const files = [...e.target.files];

        // add images to estates gallery
        files.forEach( (file) => addImageFile(file));
    }

    // when dragenter & dragover to uploaderFilesBox section
    ['dragenter', 'dragover'].forEach(eventName => {
        uploaderFilesBox.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            uploaderFilesBox.classList.add("active")
        }, false)
    });

    // when dragleave & drop to uploaderFilesBox section
    ['dragleave', 'drop'].forEach(eventName => {
        uploaderFilesBox.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            uploaderFilesBox.classList.remove("active")
        }, false)
    });

    uploaderFilesBox.ondrop = (e) => {

        // this all images files
        let files = [...e.dataTransfer.files];

        // add images to estates gallery
        files.forEach( (file) => {

            // if flile type image or pdf
            if ((file.type.includes("image") || file.type.includes("pdf"))) {
                addImageFile(file)
            }
        })
    }

    // function => add image to estate gallery
    const addImageFile = (img) => {

        // add image to all images file list
        allImages.items.add(img);

        // create js constractor => FileReader
        let reader = new FileReader();
        reader.readAsDataURL(img);

        // image complate load
        reader.onloadend = () => {

            // image source
            let imgSrc = reader.result;
            // image index number
            //const imgIndex = oldImagesCount > 0 ? Array.from(allImages.files).indexOf(img) + oldImagesCount + 1 : Array.from(allImages.files).indexOf(img);
            const imgIndex = oldImagesCount > 0 ? Array.from(allImages.files).indexOf(img) + oldImagesCount : Array.from(allImages.files).indexOf(img);

            // let imgSrc_ = reader.result;
            // eval("imgSrc_"+ imgIndex +" = "+reader.result);
            allImagesSrc[imgIndex] = reader.result;

            // create image and appent this image to estateGallery
            let estateImage = document.createElement("label");
            estateImage.classList.add("image");
            estateImage.setAttribute("for", `real_estate_image_${(imgIndex + 1)}`)
            estateImage.setAttribute("data-index", imgIndex)
            estateImage.innerHTML = `
                <img src=${imgSrc} alt="real estate image">
                <button class="close-button" type="button"><i class="fa-solid fa-xmark"></i></button>
                <section class="checkbox-field">
                    <input class="form-check-input" id="real_estate_image_${(imgIndex + 1)}" type="radio" name="image" value="${(imgIndex)}">
                </section>
            `;

            estateGallery.appendChild(estateImage);

            // reset input field safe images => all images upload
            inputFile.files = allImages.files;


            /* remove image from gallery */
            //const imageSection = document.querySelectorAll(".estate-gallery .image");
            const imageSection = document.querySelectorAll(".estate-gallery .image:not(.old-image)");

            imageSection.forEach((image, index) => {

                const removeImageButton = image.querySelector(".close-button");

                removeImageButton.onclick = () => {

                    // remove image from allImages
                    allImages.items.remove(allImages.items[index])

                    // remove image from input
                    inputFile.files = allImages.files;
                    // allImagesSrc.remove(allImagesSrc.items[index])

                    // remove image section
                    const imgIndex = oldImagesCount > 0 ? index + oldImagesCount + 1 : index;
                    allImagesSrc.splice(imgIndex, 1);
                    // remove image section
                    image.remove();
                    ResetImageDataIndex();

                }

                const real_estate_featured_images = image.querySelector("input[name='image']");

                real_estate_featured_images.onchange = () => {
                    if(previewImage){
                        previewImage.src = allImagesSrc[image.dataset.index];
                    }
                }
            })
        }
    }
}

/************* increment input field ************/
const incrementField = document.querySelectorAll(".increment-field");

if (incrementField) {

    incrementField.forEach(field => {
        const input       = field.querySelector('input[type="number"]')
        const plusButton  = field.querySelector(".plus");
        const minusButton = field.querySelector(".minus");

        plusButton.onclick = () => {

            if (parseFloat(input.value) < 99) {

                input.setAttribute("value", parseFloat(input.value) + 1);
            }
        }

        minusButton.onclick = () => {

            if (parseFloat(input.value) > 0) {

                input.setAttribute("value", parseFloat(input.value) - 1);
            }
        }
    })
}


/*********************************************************************
********************* User profile  functionalty  ********************
*********************************************************************/

/* profile Image change  */
const profileImageInput = document.getElementById("profile_image_input");

if (profileImageInput) {
  const profileImage = document.getElementById("profile_image");

  profileImageInput.oninput = (e) => {
    const image = profileImageInput.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onloadend = () => {
      profileImage.src = reader.result;

      // Send image to server
      const formData = new FormData();
      formData.append("image", image);

      fetch(main_url+`/profile/update-avatar`, {
        method: "POST",
        headers: {
            "X-CSRF-TOKEN": token
        },
        body: formData,
      })
        .then((response) => {
          // Handle response from server
          console.log("Image uploaded successfully!");
        })
        .catch((error) => {
          // Handle error
          console.error("Error uploading image:", error);
        });
    };
  };
}
/*********************************************************************
**************** Reaching the last scrolling section  ****************
*********************************************************************/

const sectionScrollable = document.querySelectorAll(".section-scrollable");

if (sectionScrollable) {

    sectionScrollable.forEach(section => {

        section.onscroll = () => {

            if (sectionSrollToTop >= (sectionAllHeight - sectionShowHeight - 1)) {
                // alert("call server")
                console.log("call server");

            }
        }
    })
}

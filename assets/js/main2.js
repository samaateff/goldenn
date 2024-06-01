/*********************************************************************
******************** Content section functionalty ********************
*********************************************************************/

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


/*********************************************************************
**********************  Real Estate functionalty *********************
*********************************************************************/

/************* favorite real estate section  ************/
const realEstateFavoriteIcon = document.querySelectorAll(".favorite-icon");

if (realEstateFavoriteIcon) {
    
    realEstateFavoriteIcon.forEach(icon => {
        icon.addEventListener("click", (e) => {

            e.preventDefault();

            icon.classList.toggle("active");

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

    $('.date-picker-button').daterangepicker({

        locale: {
            direction: 'rtl',
            "format": "MM/DD/YYYY",
            "separator": " - ",
            "applyLabel": "تأكيد",
            "cancelLabel": "إلغاء",
            "fromLabel": "من",
            "toLabel": "إلى",
            "customRangeLabel": "Custom",
            "daysOfWeek": [
                "الأحد",
                "الأثنين",
                "الثلاثاء",
                "الإربعاء",
                "الخميس",
                "الجمعة",
                "السبت"
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
        },
        isRTL: true,
        language: "ar",
        opens: 'left',
        drops: "auto",
        autoApply: true,
        linkedCalendars: false,

        // min max date
        minDate: moment().startOf('day'),

        // select date
        // startDate: moment().startOf('day'),
        // endDate: moment().startOf('hour').add(3, 'day'),

        // isInvalidDate: () => {

        // },
        // isCustomDate: () => {

        // },

    }, function(start, end, label) {

        const inputDateFrom = $('.date-picker-button').prevAll('#search_booking_time_from');
        const inputDateTo = $('.date-picker-button').prevAll('#search_booking_time_to');
      
        $(".date-picker-button span").text(start.format('YYYY-MM-DD') + " / " + end.format('YYYY-MM-DD'))
        inputDateFrom.val(start.format('YYYY-MM-DD'));
        inputDateTo.val(end.format('YYYY-MM-DD'));
        
    });

    $('.day-picker-button').daterangepicker({

        locale: {
            direction: 'rtl',
            "format": "MM/DD/YYYY",
            "separator": " - ",
            "applyLabel": "تأكيد",
            "cancelLabel": "إلغاء",
            "fromLabel": "من",
            "toLabel": "إلى",
            "customRangeLabel": "Custom",
            "daysOfWeek": [
                "الأحد",
                "الأثنين",
                "الثلاثاء",
                "الإربعاء",
                "الخميس",
                "الجمعة",
                "السبت"
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

});

/*********************************************************************
************************ home page functionalty **********************
*********************************************************************/

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

        if(options) {
            options.forEach(opt => {

                opt.addEventListener("click", () => {

                    // option value
                    const value = opt.textContent.trim();

                    // change inupt and title values
                    input.value = value;
                    dropdownTitle.textContent = value;

                    // close dropdown menu
                    closeDropdown(dropdownBox, dropdownButton);
                })
            })
        }

        if (priceFrom && priceTo) {

            priceFrom.oninput = changePrice;
            priceTo.oninput = changePrice;
            document.getElementById("real_estate_price").onchange = changePrice;

            function changePrice() {
                // change inupt and title values
                dropdownTitle.textContent = `${priceFrom.value} - ${priceTo.value}`;
            }
        }
    })
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

    // range change input value
    searchRangeInput.oninput = () => {

        priceTo.setAttribute("value", searchRangeInput.value);
        priceTo.value = searchRangeInput.value;
    }

    // reset inputs bu reset button
    if (document.getElementById("reset_price")) {
        document.getElementById("reset_price").onclick = () => {
    
            searchRangeInput.setAttribute("value", 100);
            searchRangeInput.value = 100;
            priceFrom.setAttribute("value", 100);
            priceFrom.value = 100;
            priceTo.setAttribute("value", "");
            priceTo.value = "";
    
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
        
        // slider arrows 
        const nextButton = document.querySelector(".reviews-control .next");
        const prevButton = document.querySelector(".reviews-control .prev");

        
        // buttons next & prev slide
        nextButton.onclick = slideRTL;
        prevButton.onclick = slideLTR;

        // set variblis 
        let pressed = false;
        let startPoint;
        let endPoint;
    
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
        });
    
        // touchend = mouseup
        container.addEventListener("touchend", () => {
            pressed = false;
        });
    
        // touchmove = mousemove
        container.addEventListener("touchmove", (e) => {
    
            // set end point for mobile
            endPoint = e.changedTouches[0].clientX;

            // Move Slider
            moveSlider(e)
        })

        // function move to sliders 
        function moveSlider(e) {

            // change direction to container
            container.style.direction = "ltr";
            // stoped transition
            innerSlider.style.transition = "none";
        
            // Move the slider by difference between [endPoint - startPoint]
            innerSlider.style.left = `${endPoint - startPoint}px`;
    
            // check Boundary
            let outer = container.getBoundingClientRect();
            let inner = innerSlider.getBoundingClientRect();
        
            if (parseInt(innerSlider.style.left) > 0) {
                innerSlider.style.left = "0px";
            }
        
            if (inner.right < outer.right) {
                innerSlider.style.left = `-${inner.width - outer.width}px`;
            }
        }

        function slideLTR() {

            // slider Postion 
            sliderPostion = parseInt(innerSlider.style.left);
            
            // check Boundary
            outer = container.getBoundingClientRect();
            inner = innerSlider.getBoundingClientRect();

            if (inner.right < outer.right) {
        
                innerSlider.style.left = `-${sliderPostion}px`;
                
            } else {
                // run transition
                innerSlider.style.transition = ".4s";

                innerSlider.style.left  = `${sliderPostion - 360}px`;

                // stoped transition
                innerSlider.style.transition = "0";
            }

        }

        function slideRTL() {

            // slider Postion 
            sliderPostion = parseInt(innerSlider.style.left);
            
            // check Boundary
            outer = container.getBoundingClientRect();
            inner = innerSlider.getBoundingClientRect();

            if (inner.left > outer.left) {
                
                innerSlider.style.left = `${sliderPostion}px`;

            } else {
                
                // run transition
                innerSlider.style.transition = ".4s";

                innerSlider.style.left  = `${sliderPostion + 360}px`;

                // stoped transition
                innerSlider.style.transition = "0";
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
    // set main varibles
    const uploaderFilesBox = document.querySelector(".file-field");
    const estateGallery = document.querySelector(".uploader-images .estate-gallery");
    let allImages = new DataTransfer();

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
            const imgIndex = Array.from(allImages.files).indexOf(img);

            // create image and appent this image to estateGallery
            let estateImage = document.createElement("label");
            estateImage.classList.add("image");
            estateImage.setAttribute("for", `real_estate_image_${(imgIndex + 1)}`)
            estateImage.innerHTML = `
                <img src=${imgSrc} alt="real estate image">
                <button class="close-button" type="button"><i class="fa-solid fa-xmark"></i></button>
                <section class="checkbox-field">
                    <input class="form-check-input" id="real_estate_image_${(imgIndex + 1)}" type="radio" name="real_estate_featured_image" value="real_estate_image${(imgIndex + 1)}">
                </section>
            `;

            estateGallery.appendChild(estateImage);

            // reset input field safe images => all images upload
            inputFile.files = allImages.files;
            

            /* remove image from gallery */
            const imageSection = document.querySelectorAll(".estate-gallery .image");
    
            imageSection.forEach((image, index) => {

                const removeImageButton = image.querySelector(".close-button");

                removeImageButton.onclick = () => {

                    // remove image from allImages
                    allImages.items.remove(allImages.items[index])

                    // remove image from input 
                    inputFile.files = allImages.files;

                    // remove image section
                    image.remove();
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

        const image =  profileImageInput.files[0]
        
        // create js constractor => FileReader
        let reader = new FileReader();
        reader.readAsDataURL(image);

        reader.onloadend = () => {

            // change image src by input file
            profileImage.src = reader.result
        }
    }
}

/*********************************************************************
**************** Reaching the last scrolling section  ****************
*********************************************************************/

const sectionScrollable = document.querySelectorAll(".section-scrollable");

if (sectionScrollable) {

    sectionScrollable.forEach(section => {

        section.onscroll = () => {
            
            const sectionAllHeight  = section.scrollHeight;
            const sectionShowHeight = section.clientHeight;
            const sectionSrollToTop = section.scrollTop;
            
            if (sectionSrollToTop >= (sectionAllHeight - sectionShowHeight - 1)) {
                // alert("call server")
                console.log("call server");

            }
        }
    })
}

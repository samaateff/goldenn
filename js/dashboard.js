/*********************************************************************
************************ All pages functionalty **********************
*********************************************************************/



/* secondMenue activeLink scrolling */
const secondMenue =  document.querySelector("header.second-menu .menu")

if (secondMenue) {

    // link active
    const activeLink = secondMenue.querySelector(".menu-link.active")

    // scrolling to link active
    secondMenue.scrollTo(activeLink.offsetLeft - activeLink.clientWidth, null)
}

/* main menue show & hide togle */
const toggleMainMenuButton = document.querySelector(".main-menu-toggle");

if (toggleMainMenuButton) {

    const dashboroardLayoutBox = document.getElementById("layout-box");

    toggleMainMenuButton.onclick = () => {
        dashboroardLayoutBox.classList.toggle("show-menu");
    }
}

/************* change value options dropdown  ************/
const customSelectBoxs = document.querySelectorAll(".select-feild");

if (customSelectBoxs) {
    customSelectBoxs.forEach(select => {
        const input          = select.querySelector('input[type="hidden"]')
        const dropdownBox    = select.querySelector(".options-dropdown");
        const accordionBox   = select.querySelector(".accordion-collapse");
        const dropdownButton = select.querySelector(".input-button");
        const dropdownTitle  = select.querySelector(".input-button span");
        const options        = select.querySelectorAll(".dropdown-item");
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
                    (dropdownBox) ? closeDropdown(dropdownBox, dropdownButton) : null;


                    // whene optins accordion
                    if(accordionBox) {
                        // change state to collapse
                        dropdownButton.setAttribute("aria-expanded", "false")
                        // remove collapsed
                        dropdownButton.classList.add("collapsed")
                        // show tap
                        accordionBox.classList.remove("show")
                    }
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

/************* change value options dropdown  ************/
const multipleSelectBoxs = document.querySelectorAll(".multiple-select-feild");

if (multipleSelectBoxs) {
    multipleSelectBoxs.forEach(select => {
        const input          = select.querySelector('input[type="hidden"]')
        const dropdownBox    = select.querySelector(".options-dropdown");
        const accordionBox   = select.querySelector(".accordion-collapse");
        const dropdownButton = select.querySelector(".input-button");
        const dropdownTitle  = select.querySelector(".input-button span");
        const options        = select.querySelectorAll(".dropdown-item");
        let allvalues      = []
        let allcontents    = []

        if(options) {
            options.forEach(opt => {

                const cloneDropdownTitle = dropdownTitle.textContent;

                opt.addEventListener("click", () => {

                    // option value
                    const content = opt.textContent.trim();
                    const value = opt.getAttribute("data-select-value");
                    
                    // reset values & contents
                    if (!allvalues.includes(value)) {
                        // set value
                        allvalues.push(value);
                        // set content
                        allcontents.push(content);
                        // change style
                        opt.classList.add("active")

                    } else {

                        console.log([0, 1, 2].splice(1, 1));
                        // reset value
                        allvalues   = allvalues.filter(val => val !== value);
                        // reset content
                        allcontents = allcontents.filter(con => con !== content);
                        // change style
                        opt.classList.remove("active")
                    } 
                    
                    // change inupt and title values
                    input.setAttribute("value", allvalues.join(" - "))
                    dropdownTitle.textContent = allcontents.join(" - ");
                
                    if (allcontents.length === 0) {
                        dropdownTitle.textContent = cloneDropdownTitle
                    }
                })
            })
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

/* Calender => date range picker */
let calendersBoxs = [];

$(() => {

    $('.date-picker-button').daterangepicker({

        locale: {
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

    $('.month-picker-button').daterangepicker({

        locale: {
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
        // ranges: {
        //     'Today': [moment(), moment()],
        //     'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        //     'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        //     'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        //     'This Month': [moment().startOf('month'), moment().endOf('month')],
        //     'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        // },
        singleDatePicker: true,

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

    const inputsTimePicker = document.querySelectorAll(".time-picker-section");

    if(inputsTimePicker) {

        inputsTimePicker.forEach(timePicker => {

            const picker = new tempusDominus.TempusDominus(timePicker, {
                localization: {
                    locale: (document.querySelector("html").lang == "ar") ? "ar" : "en",
                    startOfTheWeek: 6,
                    format: 'hh:mm T',
                },
                display: {
                    viewMode: "clock",
                    components: {
                        decades: false,
                        year: false,
                        month: false,
                        date: false,
                        hours: true,
                        minutes: true,
                        seconds: false
                    },
                    icons: {
                        type: 'icons',
                        time: 'fa-solid fa-clock',
                        up: 'fa-solid fa-chevron-up',
                        down: 'fa-solid fa-chevron-down',
                        close: 'fa-solid fa-xmark'
                    },
                    buttons: {
                        close: true,
                    },
                },
            });
        
            timePicker.querySelector('input[type="hidden"]').onchange = (e) => {
                timePicker.querySelector(".time-picker-button span").textContent = e.target.value;
            }
        })

        document.body.onclick = (e) => {
            const calendarsTime = document.querySelectorAll(".tempus-dominus-widget.show");

            calendarsTime.forEach(calender => {
                
                console.log(calender); 
                console.log(e.target); 
                if(e.target === calender) {
                    calender.classList.remove("show")
                }
            })
        }
    }

    // style slected days
    const slectedDaysStyle = () => {

        $(".flatpickr-day.order_dates").each((indx, day) => {

            if (!$(day).prev().hasClass("order_dates") || ($(day).prev().hasClass("endRange") && !$(day).prev().hasClass("order_dates")) || $(day).prev().hasClass("prevMonthDay")) {
                $(day).css({"border-radius": "0 50% 50% 0"})
            }

            if (!$(day).next().hasClass("order_dates") || $(day).next().hasClass("nextMonthDay") || $(day).next().hasClass("startRange")) {
                $(day).css({"border-radius": "50% 0 0 50%"})
            }
        })
    }
    
    $(".estate-calender-box").each((index, calender) => {

        const calenderMonth = $(calender).attr("data-calender-month");

        const localeCalender = (document.querySelector("html").lang == "ar") ? ({
            firstDayOfWeek: 6,
            weekdays: {
                shorthand: ["الأحد","الأثنين","الثلاثاء","الإربعاء","الخميس","الجمعة","السبت"],
                longhand: ["الأحد","الأثنين","الثلاثاء","الإربعاء","الخميس","الجمعة","السبت"],         
            }, 
            months: {
                shorthand: ["يناير","فبراير","مارس","ابريل","مايو","يونيو","يوليو","اغسطس","سبتمبر","اكتوبر","نوفمبر","ديسمبر"],
                longhand: ["يناير","فبراير","مارس","ابريل","مايو","يونيو","يوليو","اغسطس","سبتمبر","اكتوبر","نوفمبر","ديسمبر"]
            }
            
        }) : {firstDayOfWeek: 6}
    
        // run function
        slectedDaysStyle();

        console.log(moment(calenderMonth).startOf('month').format('YYYY-MM-DD'));
        console.log(moment(calenderMonth).endOf('month').format('YYYY-MM-DD'));

        let calenderBox = flatpickr($(calender) ,{
            locale: localeCalender,
            enableTime: false,
            mode: "range",
            dateFormat: "Y-m-d",
            inline: true,
            monthSelectorType: "static",
            // defaultDate: [calenderMonth, calenderMonth],
            minDate: moment(calenderMonth).startOf('month').format('YYYY-MM-DD'),
            maxDate: moment(calenderMonth).endOf('month').format('YYYY-MM-DD'),
            altInputClass: "test",
    
            onChange: function(selectedDates, dateStr, instance) {

                //  ather calenders
                let notThisCalender = calendersBoxs.filter( calender => calender != instance);

                // remove slected date from ather calenders
                notThisCalender.forEach(calender => calender.setDate(""))
                
                // deselect range date 
                document.querySelector('#deselect').onclick = (e) => {
                    e.preventDefault();
                    instance.setDate("");

                    // style slected days
                    slectedDaysStyle();
                }

                // style slected days
                slectedDaysStyle();
            },
        });

        // add this calender to all calenders
        calendersBoxs.push(calenderBox)
    });

    let calender = {
        "unavailable_dates": [
            "2023-08-18",
            "2023-08-19",
            "2023-07-15",
            "2023-07-16",
            "2023-08-20",
            "2023-05-13",
            "2023-05-14",
            "2023-05-15",
            "2023-05-16",
            "2023-05-27",
            "2023-05-28",
            "2023-05-20",
            "2023-05-21",
            "2023-06-12",
            "2023-06-13",
            "2023-06-14",
            "2023-06-15",
            "2023-06-16",
            "2023-05-17",
            "2023-05-18",
            "2023-05-19"
        ],
        "custom_prices": [
            {
                "date": "2023-08-11",
                "price": 16,
                "currency": "ر.س"
            },
            {
                "date": "2023-07-13",
                "price": 16,
                "currency": "ر.س"
            },
            {
                "date": "2023-07-11",
                "price": 16,
                "currency": "ر.س"
            },
            {
                "date": "2023-07-12",
                "price": 16,
                "currency": "ر.س"
            },
            {
                "date": "2023-07-18",
                "price": 16,
                "currency": "ر.س"
            },
            {
                "date": "2023-07-19",
                "price": 16,
                "currency": "ر.س"
            },
            {
                "date": "2023-05-08",
                "price": 78,
                "currency": "ر.س"
            },
            {
                "date": "2023-05-09",
                "price": 78,
                "currency": "ر.س"
            },
            {
                "date": "2023-05-10",
                "price": 78,
                "currency": "ر.س"
            },
            {
                "date": "2023-05-02",
                "price": 77,
                "currency": "ر.س"
            },
            {
                "date": "2023-05-03",
                "price": 77,
                "currency": "ر.س"
            },
            {
                "date": "2023-05-04",
                "price": 77,
                "currency": "ر.س"
            },
            {
                "date": "2023-05-05",
                "price": 77,
                "currency": "ر.س"
            },
            {
                "date": "2023-04-29",
                "price": 77,
                "currency": "ر.س"
            },
            {
                "date": "2023-04-30",
                "price": 77,
                "currency": "ر.س"
            },
            {
                "date": "2023-05-01",
                "price": 77,
                "currency": "ر.س"
            },
            {
                "date": "2023-05-06",
                "price": 76,
                "currency": "ر.س"
            },
            {
                "date": "2023-05-07",
                "price": 76,
                "currency": "ر.س"
            },
            {
                "date": "2023-05-11",
                "price": 79,
                "currency": "ر.س"
            },
            {
                "date": "2023-05-12",
                "price": 79,
                "currency": "ر.س"
            }
        ],
        "order_dates": [
            {
                "date": "2023-07-27",
                "order_id": 1,
                "user_name": "أحمد",
                "user_id": 17,
                "flat_id": 20
            },
            {
                "date": "2023-07-28",
                "order_id": 1,
                "user_name": "أحمد",
                "user_id": 17,
                "flat_id": 20
            },
            {
                "date": "2023-07-29",
                "order_id": 1,
                "user_name": "أحمد",
                "user_id": 17,
                "flat_id": 20
            },
            {
                "date": "2023-07-30",
                "order_id": 1,
                "user_name": "أحمد",
                "user_id": 17,
                "flat_id": 20
            },
            {
                "date": "2023-07-31",
                "order_id": 1,
                "user_name": "أحمد",
                "user_id": 17,
                "flat_id": 20
            },
            {
                "date": "2023-08-01",
                "order_id": 1,
                "user_name": "أحمد",
                "user_id": 17,
                "flat_id": 20
            },
            {
                "date": "2023-08-02",
                "order_id": 1,
                "user_name": "أحمد",
                "user_id": 17,
                "flat_id": 20
            },
            {
                "date": "2023-07-22",
                "order_id": 5,
                "user_name": "أحمد",
                "user_id": 17,
                "flat_id": 20
            },
            {
                "date": "2023-07-23",
                "order_id": 5,
                "user_name": "أحمد",
                "user_id": 17,
                "flat_id": 20
            },
            {
                "date": "2023-07-24",
                "order_id": 5,
                "user_name": "أحمد",
                "user_id": 17,
                "flat_id": 20
            },
            {
                "date": "2023-07-25",
                "order_id": 5,
                "user_name": "أحمد",
                "user_id": 17,
                "flat_id": 20
            },
            {
                "date": "2023-05-22",
                "order_id": 6,
                "user_name": "أحمد",
                "user_id": 17,
                "flat_id": 20
            },
            {
                "date": "2023-05-23",
                "order_id": 6,
                "user_name": "أحمد",
                "user_id": 17,
                "flat_id": 20
            },
            {
                "date": "2023-05-24",
                "order_id": 6,
                "user_name": "أحمد",
                "user_id": 17,
                "flat_id": 20
            },
            {
                "date": "2023-05-25",
                "order_id": 6,
                "user_name": "أحمد",
                "user_id": 17,
                "flat_id": 20
            },
            {
                "date": "2023-05-29",
                "order_id": 7,
                "user_name": "أحمد",
                "user_id": 17,
                "flat_id": 20
            },
            {
                "date": "2023-05-30",
                "order_id": 7,
                "user_name": "أحمد",
                "user_id": 17,
                "flat_id": 20
            },
            {
                "date": "2023-05-31",
                "order_id": 7,
                "user_name": "أحمد",
                "user_id": 17,
                "flat_id": 20
            },
            {
                "date": "2023-06-01",
                "order_id": 7,
                "user_name": "أحمد",
                "user_id": 17,
                "flat_id": 20
            },
            {
                "date": "2023-06-02",
                "order_id": 7,
                "user_name": "أحمد",
                "user_id": 17,
                "flat_id": 20
            },
            {
                "date": "2023-06-03",
                "order_id": 7,
                "user_name": "أحمد",
                "user_id": 17,
                "flat_id": 20
            },
            {
                "date": "2023-06-04",
                "order_id": 7,
                "user_name": "أحمد",
                "user_id": 17,
                "flat_id": 20
            },
            {
                "date": "2023-06-05",
                "order_id": 7,
                "user_name": "أحمد",
                "user_id": 17,
                "flat_id": 20
            }
        ],
        "order_time": [
            {
                "from": "2023-07-27",
                "to": "2023-08-02"
            },
            {
                "from": "2023-07-22",
                "to": "2023-07-25"
            },
            {
                "from": "2023-05-22",
                "to": "2023-05-25"
            },
            {
                "from": "2023-05-29",
                "to": "2023-06-05"
            }
        ]
    }

    let order_dates = calender.order_dates.map((obj) => obj.date)
    let custom_prices = calender.custom_prices.map((obj) => obj.date)
    let unavailable_dates = calender.unavailable_dates;

    calendersBoxs.forEach( instance => {

        
        instance.config.onDayCreate = [function (dObj, dStr, fp, dayElem) {
            // month all days
            let date =  moment(dayElem.dateObj).format('YYYY-MM-DD')

            // console.log(date);
            
            // if custom_prices includes month day
            if (custom_prices.includes(date)) {
                
                // custom_prices data
                let price = calender.custom_prices[custom_prices.indexOf(date)].price
                let currency = calender.custom_prices[custom_prices.indexOf(date)].currency


                // Add your custom class here
                dayElem.classList.add("custom_prices"); 
                
                // Add your custom price
                dayElem.setAttribute("data-calender-price", price + " " + currency)
            }

            // if order_dates includes month day
            if (order_dates.includes(date)) {

                // Add your custom class
                dayElem.classList.add("order_dates"); 

                $(dayElem).each((indx, day) => {

                    // order_dates data
                    const name = calender.order_dates[order_dates.indexOf(date)].user_name

                    // async functin
                    setTimeout(() => {

                        if (!$(day).hasClass("prevMonthDay")) {

                            if (!$(day).prev().hasClass("order_dates") || ($(day).prev().hasClass("endRange") && !$(day).prev().hasClass("order_dates")) || $(day).prev().hasClass("prevMonthDay")) {
                                // fuunctionlaty
                                day.setAttribute("data-calender-name", name)
                                day.style.backgroundColor = "#2C1D65";
                            }

                            if (!$(day).next().hasClass("order_dates") || $(day).next().hasClass("nextMonthDay") || $(day).next().hasClass("startRange")) {
                                // fuunctionlaty
                                day.setAttribute("data-calender-name", name)
                                day.style.backgroundColor = "#2C1D65";
                            }
                        }
                    }, 0)
                })
            }
            
            // if unavailable_dates includes month day
            if (unavailable_dates.includes(date)) {
                // Add your custom class
                dayElem.classList.add("unavailable_dates"); 
            }
        }]

        // Redraws the calendar
        instance.redraw();

        // style slected days
        slectedDaysStyle();
    })
    
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

        if(document.querySelector('.month-picker-button')) {

            $('.month-picker-button').data('daterangepicker').locale = {
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

/************* toggle class active  ************/
function toggleClassActive(item) {
    item.addEventListener("click", () => {

        item.classList.toggle("active");
    })
}

/************* show & hide content by inut checked  ************/
const inputsChecked = document.querySelectorAll("[data-collapsed-show]");

if (inputsChecked) {

    inputsChecked.forEach(input => {

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

/************* Copy to clipboard  ************/
const copyClipboardButtons = document.querySelectorAll(".copy-clipboard") 

if (copyClipboardButtons) {
    
    copyClipboardButtons.forEach(button => {
        const dataClipboard      = button.getAttribute("data-clipboard");
        const buttonText         = button.querySelector("span");
        const buttonTextContent  = button.querySelector("span").textContent;
        const copySection        = document.getElementById(dataClipboard);

        button.onclick = () => {

            // copy to clipboard
            navigator.clipboard.writeText(copySection.value);
            // change button text
            buttonText.textContent = button.getAttribute("data-clipboard-copyed");
            // change button text
            setTimeout(() => {
                buttonText.textContent = buttonTextContent;
            }, 1000)
        }
    })
}

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

/*********************************************************************
********************* Validation form functionalty *******************
*********************************************************************/

// Bootstrap Validation
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
****************** Account summary page functionalty *****************
*********************************************************************/

/* chart canvas => show accound data */

// if (document.getElementById("chartContainer")) {

//     window.onload = function () {

//         var chart = new CanvasJS.Chart("chartContainer", {
  
//         data: [              
//           {
//             type: "column",
//             color: "#2C1D65",
//             dataPoints: [
//             { label: "يناير",   y: 800 },
//             { label: "فبراير",  y: 1000},
//             { label: "مارس",    y: 1500},
//             { label: "ابريل",   y: 1300},
//             { label: "مايو",    y: 1600},
//             { label: "يونيو",   y: 1800},
//             { label: "يوليو",   y: 2000},
//             { label: "اغسطس",   y: 2500},
//             { label: "سبتمبر",  y: 2200},
//             { label: "اكتوبر",  y: 2300},
//             { label: "نوفمبر",  y: 2600},
//             { label: "ديسمبر",  y: 3000}
//           ]
//         }
//         ]
//       });
  
//       chart.render()
//     }
// }


const ctx = document.getElementById('chartContainer');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
        datasets: [{
            label: 'المبيعات',
            data: [200, 300, 400, 250, 500, 550, 450, 700, 650, 500, 700, 500],
            borderWidth: 0,
            backgroundColor: "#2C1D65",
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                display: false,
                rtl: true,
                textDirection: "rtl",
                xAlign: "right",
            },
            onResize: false
        }
    },
});

window.addEventListener('beforeprint', () => {
    myChart.resize(600, 600);
});
window.addEventListener('afterprint', () => {
    myChart.resize();
});
   


/*********************************************************************
******************** transactions page functionalty ******************
*********************************************************************/

/* method receiving => methods taps inputs */
const stcPayMethod = document.querySelector("#method_receiving_stc");
const visaPayMethod = document.querySelector("#method_receiving_visa");

if(stcPayMethod && visaPayMethod) {

    const stcPayMthodField = document.getElementById("stc_method");
    const visaMthodField = document.getElementById("visa_method");


    // run functions => window load & method chang
    window.addEventListener("load", handleAllField) 

    stcPayMethod.oninput = () => handleCheckAttribute(stcPayMethod, visaPayMethod)

    visaPayMethod.oninput = () => handleCheckAttribute(visaPayMethod , stcPayMethod)
    

    // show & hide fields 
    function handleField(method, field) {
        
        if (method.hasAttribute("checked")) {
            
            field.classList.remove("d-none");
            
        } else {
            
            field.classList.add("d-none");
        }
    }
    
    // check method active
    function handleAllField() {
        handleField(document.querySelector("#method_receiving_stc"), stcPayMthodField);
        handleField(document.querySelector("#method_receiving_visa"), visaMthodField);
    }

    // add & remove checked attribute
    function handleCheckAttribute(add, remove) {
        add.setAttribute("checked", "checked")
        remove.removeAttribute("checked")

        handleAllField()
    }
}


/*********************************************************************
********************** Prices pages functionalty *********************
*********************************************************************/

/* prices-add-holiday => active holiday option */

const holidayOptions = document.querySelectorAll(".holiday-fields .checkbox-field");

if (holidayOptions) {

    holidayOptions.forEach(option => {
        option.onclick = () => {

            // remove class active from all options 
            holidayOptions.forEach(opt => opt.classList.remove("active"));

            // add class active to this optin
            option.classList.add("active");
        }
    })
}



/*********************************************************************
******************** my estates pages functionalty *******************
*********************************************************************/

// slider container 
// const sliderContainer = document.querySelectorAll(".slider-container-box .box-container");

// if (sliderContainer) {
    
//     // looping to all sliders
//     sliderContainer.forEach((container) => {

//         // sliders box
//         const innerSlider = container.children[0];
        
//         // slider arrows 
//         const nextButton = container.parentElement.querySelector(".next");
//         const prevButton = container.parentElement.querySelector(".prev");

//         window.addEventListener("load", () => {

//             let sliderPostion;
            
//             // check Boundary
//             let outer;
//             let inner;
//             let slideDirection = "ltr";

//             // Arabic script
//             if (document.documentElement.lang === "ar") {
//                 slideDirection = "rtl"
//             }

//             // buttons next & prev slide
//             nextButton.onclick = slideRTL;
//             prevButton.onclick = slideLTR;    
            
//             function slideLTR() {

//                 // slider Postion 
//                 sliderPostion = parseInt(innerSlider.style.left);
                
//                 // check Boundary
//                 outer = container.getBoundingClientRect();
//                 inner = innerSlider.getBoundingClientRect();

//                 if (inner.right < outer.right) {
            
//                     innerSlider.style.left = `-${sliderPostion}px`;

//                     slideDirection = "rtl"
                    
//                 } else {
                    
//                     innerSlider.style.left  = `${sliderPostion - 266}px`;
//                 }

//                 // Arabic script
//                 if (document.documentElement.lang === "ar") {

//                     if ((inner.right - 266) < outer.right) {
                
//                         innerSlider.style.left = `-${0}px`;
    
//                         slideDirection = "rtl"
                        
//                     } else {
                        
//                         innerSlider.style.left  = `${sliderPostion - 266}px`;
//                     }
//                 }
//             }

//             function slideRTL() {

//                 // slider Postion 
//                 sliderPostion = parseInt(innerSlider.style.left);
                
//                 // check Boundary
//                 outer = container.getBoundingClientRect();
//                 inner = innerSlider.getBoundingClientRect();

//                 if ((inner.left + 266) > outer.left) {
                    
//                     slideDirection = "ltr";

//                     innerSlider.style.left = `${0}px`;
                    
                    
//                 } else {
                    
//                     innerSlider.style.left  = `${sliderPostion + 266}px`;
//                 }

//                 // Arabic script
//                 if (document.documentElement.lang === "ar") {

//                     if (inner.left > outer.left) {
                    
//                         slideDirection = "ltr";

//                         innerSlider.style.left = `${sliderPostion}px`;
                        
                        
//                     } else {
                        
//                         innerSlider.style.left  = `${sliderPostion + 266}px`;
//                     }
//                 }
//             }
//         })
//     })
// }


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


/*********************************************************************
********************  settings page functionalty ********************
*********************************************************************/

/************* booking discounts Taps  ************/
const BookingDiscountsTaps = document.querySelector("#booking_discounts_form");

if (BookingDiscountsTaps) {

    const buttons = BookingDiscountsTaps.querySelectorAll('.checkbox-field[data-bs-toggle="collapse"]')

    buttons.forEach(tap => {

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


/*********************************************************************
********************* reviews slider functionalty ********************
*********************************************************************/

// slider container 
const sliderContainerboxs = document.querySelectorAll(".reviews-control");

if (sliderContainerboxs) {
    
    // looping to all sliders
    sliderContainerboxs.forEach((container) => {

        // sliders box
        const innerSlider = container.children[0];
        const slideWidth = innerSlider.children[0].offsetWidth + 24;
        
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
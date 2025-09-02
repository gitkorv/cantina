// General
const root = document.documentElement;
const rootStyles = getComputedStyle(root)
const rootDocPadding = parseFloat(rootStyles.getPropertyValue('--bodyPadding'));
console.log(rootDocPadding);
const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;

// CSS Variables
const cssVarfoodMenuPaddingInner = parseFloat(getComputedStyle(root).getPropertyValue('--foodMenuPaddingInner').trim()) * rootFontSize;

// Sections

// Club
const clubBtn = document.querySelector(".club-btn")
const clubBtnInnerHTML = clubBtn.innerHTML;
const clubFormContent = document.querySelector(".club-form__content")
const clubFormWrapper = document.querySelector(".club-form-wrapper")
let isFormOpen = false;
const clubFormDripContainer = document.querySelector(".club-form__bottom-drip-container")
console.log(clubBtn.getBoundingClientRect().height);

// logo Cantina
const logoWrapper = document.querySelector(".logo")
const logoWordCantinaWrapper = document.querySelector(".logo__word--cantina-wrapper")
const logoWordCantina = document.querySelector(".logo__word--cantina")
const logoCantinaTextArr = [...logoWordCantina.textContent]
logoWordCantina.textContent = "";

// Logo subhead
const logoSubheadWrap = document.querySelector(".logo__line--bottom")
const streetFoodClubWrap = document.querySelector(".logo__line--sfc-wrapper")
const clubTextWrap = document.querySelector(".logo__word--club-wrapper")
const clubTextWrapWidth = clubTextWrap.getBoundingClientRect().width;
clubTextWrap.style.transition = "none"
// clubTextWrap.classList.add("rolled-up")
// streetFoodClubWrap.style.marginRight = clubTextWrapWidth + "px";
const streetFoodSpans = Array.from(streetFoodClubWrap.querySelectorAll(".logo__words--streetfood"))

// Ticker
const ticker = document.querySelector(".ticker-wrapper");

// Opening hours
const openingHoursWrapper = document.querySelector(".opening-hours-wrapper")
// const openingHoursDayItems = [...document.querySelectorAll(".opening-hours__days")]
// const openingHoursHourItems = [...document.querySelectorAll(".opening-hours__hours")]
// console.log(openingHoursHoursAll);
const bottomOFClubBtn = clubBtn.getBoundingClientRect().height




// if (windowWidth < 767) {
//     openingHoursWrapper.style.top = rootDocPadding + "px";
// } else {

// }
// openingHoursWrapper.style.top = bottomOFClubBtn + rootDocPadding + "px";


const openingHoursDaysAll = document.querySelectorAll(".opening-hours__days");
const openingHoursHoursAll = document.querySelectorAll(".opening-hours__hours");


// Below logo
const belowLogoWrapper = document.querySelector(".below-logo-wrapper")

// Menu
const menuBgGap = 24;
let menuBgWidth = undefined;
const menuWrapper = document.querySelector(".menu-wrapper")
const menuContentBorder = document.querySelector(".menu-content-border")
const menuContent = document.querySelector(".menu-content")
const menuContentScroller = document.querySelector(".menu-content-scroller")
const menuContentBg = document.querySelector(".menu-content-bg")
let menuUnOpened = true;
const menuCategoryHeadWrappers = [...document.querySelectorAll(".menu__cat__head-wrapper")];
const menuCategoryHeads = [...document.querySelectorAll(".menu__cat__head")];
const menuCategorySections = document.querySelectorAll(".menu__cat-wrapper");
const menuDishContentAll = document.querySelectorAll(".menu____dish-content");
const menuExtraInfoAll = document.querySelectorAll(".menu-content__extra-info-container")

// Menu buttons
const menuBtnWrapper = document.querySelector(".menu__btns-wrapper")
const menuSecBtnsWrapper = document.querySelector(".menu__btns__secBtns-wrapper")
const menuSecBtnsAll = [...document.querySelectorAll(".menu__btns__secBtn")]
const menuOpBtn = document.querySelector(".menu__btn__opBtn")
// Get width of menuBtnWrapper
let menuBtnWrapperWidth = menuBtnWrapper.getBoundingClientRect().left;


// Hide on start
const fullDisplayArr = [belowLogoWrapper, clubBtn]

// Close Menu at start
// closeMenu()

// Opening Splash Page
const sprayDots = document.querySelectorAll(".splash-food__spray-img")
const spraySplashContainers = document.querySelectorAll(".splash-food__splash-container")
const splashWords = document.querySelectorAll(".splash-food__word")


// Social logos
const socialLogos = document.querySelectorAll(".social-logo-wrapper")

// Turn off transition on elements over start
clubBtn.style.transition = "none";
belowLogoWrapper.style.transition = "none";

const cantinaLettersSettings = [
    {
        letter: "c",
        ltrSpc: "-1px",
        slnt: 0,
        wdth: 57,
        wght: 412
    },
    {
        letter: "a",
        ltrSpc: "-3px",
        slnt: 0,
        wdth: 100,
        wght: 788
    },
    {
        letter: "n",
        ltrSpc: "-2px",
        slnt: 0,
        wdth: 59,
        wght: 188
    },
    {
        letter: "t",
        ltrSpc: "-2px",
        slnt: 0,
        wdth: 115,
        wght: 548
    },
    {
        letter: "i",
        ltrSpc: "-2px",
        slnt: 0,
        wdth: 100,
        wght: 900
    },
    {
        letter: "n",
        ltrSpc: "-5px",
        slnt: -8,
        wdth: 115,
        wght: 244
    },
    {
        letter: "a",
        ltrSpc: "-5px",
        slnt: 0,
        wdth: 115,
        wght: 900
    },
]

const tickerItems = [
    {
        head: "NYHET! Lunch 145:-",
        text: "Ramen eller Dagens Tacos + kaffe. Öppet från klockan 11 på vardagar"
    },
    {
        head: "DJ's!",
        text: "Kika in på våra socials (nere till vänster) vem som styr spakarna, och när"
    },
    {
        head: "Äkta street food",
        text: "Saftiga tacos, mumsiga bao buns, het ramen och mycket mer. Klicka på menyn i botten höger på sidan"
    },
    {
        head: "Join the Club!",
        text: "Vill du ha våra nyheter först? Klicka uppe till höger och bli en del av klubben!"
    },
    {
        head: "Cocktails!",
        text: "På dansgolvet skakas rumpor och i baren skakar vi fantastiska drinkar"
    }
];

let currentTickerItemIndex = 0;
const typeTickerHeadContainer = document.querySelector(".ticker__item__head");
const typeTickerTextContainer = document.querySelector(".ticker__item__text");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runNewsTicker() {
    ticker.style.display = "";

    while (true) {
        const tickerItem = tickerItems[currentTickerItemIndex];
        const { head, text } = tickerItem;

        // Fade out
        typeTickerHeadContainer.classList.add("fade-out");
        await sleep(500);

        // Update head
        typeTickerHeadContainer.textContent = head;
        typeTickerHeadContainer.classList.remove("fade-out");
        typeTickerHeadContainer.classList.add("fade-in");
        await sleep(500);
        typeTickerHeadContainer.classList.remove("fade-in");

        // Type text
        typeTickerTextContainer.textContent = "";
        for (let i = 0; i < text.length; i++) {
            typeTickerTextContainer.textContent += text[i];
            await sleep(30 * Math.floor(Math.random() * 4 + 1));
        }

        // Wait before moving on
        await sleep(2000);

        // Move to next
        currentTickerItemIndex = (currentTickerItemIndex + 1) % tickerItems.length;
    }
}

runNewsTicker();




function showHomeElements() {

    // Cantina
    let logoTransTime = parseFloat(getComputedStyle(logoWordCantina).transitionDuration) * 1000
    console.log(logoTransTime);
    console.log(logoWordCantina);
    setInterval(() => {
        logoWordCantinaWrapper.classList.remove("zero-opacity")
    }, logoTransTime / 4);

    for (let i = 0; i < logoCantinaTextArr.length; i++) {
        const span = document.createElement("span");
        span.style.letterSpacing = cantinaLettersSettings[i].ltrSpc;
        span.classList.add("cantina-letter")
        span.textContent = logoCantinaTextArr[i];
        logoWordCantina.append(span)
        let revealTime = Math.floor(Math.random() * (logoCantinaTextArr.length - 2) + 2);
        let logoHeadTransTime = parseFloat(getComputedStyle(span).transitionDuration);

        span.style.transitionDelay = logoHeadTransTime * revealTime + "s";
        span.style.fontVariationSettings =
            `"slnt" ${cantinaLettersSettings[i].slnt}, 
        "wdth" ${cantinaLettersSettings[i].wdth}, 
        "wght" ${cantinaLettersSettings[i].wght}`
        span.style.opacity = 1;
    }

    // Subhead
    let streetFoodCounter = 0;
    let typeWriterTime = 150;

    streetFoodSpans.forEach((span, i) => {
        let spanArr = [...span.textContent];
        span.textContent = ""

        spanArr.forEach(letter => {
            streetFoodCounter++

            const letterSpan = document.createElement("span")
            letterSpan.classList.add("zero-opacity")
            const allowedWeights = [250, 400, 550, 700, 850];
            const randomNumber = allowedWeights[Math.floor(Math.random() * allowedWeights.length)];
            letterSpan.style.fontVariationSettings = `"wght" ${randomNumber}`;
            letterSpan.textContent = letter;

            let shiftUpOrDownDice = Math.random() * 10;
            if (shiftUpOrDownDice > 9) { letterSpan.style.top = "1px"; }
            if (shiftUpOrDownDice < 1) { letterSpan.style.top = "-1px"; }

            span.appendChild(letterSpan)

            setTimeout(() => {
                letterSpan.classList.remove("zero-opacity");

            }, typeWriterTime * streetFoodCounter + 2500);
        })
    });

    let clubEnterTime = streetFoodCounter * typeWriterTime + 2500

    setTimeout(() => {
        clubTextWrap.style.transition = ""
        clubTextWrap.classList.remove("rolled-up");
    }, clubEnterTime);

    setTimeout(() => {
        fullDisplayArr.forEach(element => {
            if (Array.isArray(element)) {
                element.forEach(el => {
                    fadeInFromOpacityZero(el)
                })
            } else {
                fadeInFromOpacityZero(element)
            }
        })
    }, clubEnterTime + 500);

    setTimeout(() => {
        // Start the ticker
        ticker.style.display = ""
        clubBtn.style.display = ""

        let sprayDotTime = 0.5;

        for (let i = 0; i < sprayDots.length; i++) {
            sprayDots[i].style.transitionDelay = sprayDotTime * i + "s";
            sprayDots[i].classList.remove("start")

            // Add drip
            let numberOfDripsForEachDot = Math.floor(Math.random() * 4 + 1)
            // console.log(numberOfDripsForEachDot);

            let longerDrip = windowWidth > 767 ? 3 : 1;


            for (let d = 0; d < numberOfDripsForEachDot; d++) {
                let makeDripAtAll = Math.floor(Math.random() * 10 + 1);
                if (makeDripAtAll > 5) {
                    let longDrip = Math.floor(Math.random() * 10 + 1);
                    let dripHeight
                    if (longDrip > 7) {
                        dripHeight = Math.floor(Math.random() * 80 + 10) * longerDrip;
                    } else {
                        dripHeight = Math.floor(Math.random() * 50 + 10) * longerDrip;
                    }
                    let dripStartLeft = Math.floor(Math.random() * 40 + 30);
                    let dripDuration = Math.floor(Math.random() * 30 + 2);
                    let dripWidth = Math.floor(Math.random() * 5 + 1);

                    let sprayDripDiv = document.createElement("div")
                    sprayDripDiv.className = "splash-food__spray--drip";
                    sprayDripDiv.style.left = dripStartLeft + "%";
                    sprayDripDiv.style.transitionDuration = dripDuration + "s"
                    sprayDripDiv.style.width = dripWidth > 1 ? "2px" : "1px";

                    spraySplashContainers[i].appendChild(sprayDripDiv)
                    setTimeout(() => {
                        sprayDripDiv.style.height = dripHeight + "px";
                    }, i * (sprayDotTime * 1000) + 100);
                }
            }
        }

        // runNewsTicker();
    }, clubEnterTime + 1500);

    setTimeout(() => {
        socialLogos.forEach(logo => {
            logo.style.transitionDuration = "5s";
            logo.classList.remove("zero-opacity")
        })
    }, clubEnterTime + 3500);
}

showHomeElements()

function fadeInFromOpacityZero(element) {
    element.style.transition = "opacity 1.5s ease-in";
    element.classList.remove("zero-opacity")
    element.style.opacity = "1";

    setTimeout(() => {
        element.style.transition = ""
        element.style.opacity = ""
    }, 1500);

}

// Opening Hours Settings

function setWidthForHours() {
  requestAnimationFrame(() => {
    // Apply font variation settings
    openingHoursHoursAll.forEach(hour => {
        hour.style.transition = "none";
      hour.style.fontVariationSettings = `"slnt" 0, "wdth" 150, "wght" 900`;
    });

    // Let styles apply
    requestAnimationFrame(() => {
      const getMaxWidth = (elements) =>
        [...elements].reduce((max, el) => Math.max(max, el.getBoundingClientRect().width), 0);

      const maxWidth = getMaxWidth(openingHoursDaysAll);
      console.log(maxWidth);

      openingHoursDaysAll.forEach(dayLine => {
        dayLine.style.width = maxWidth + "px";

      });

      // Wait one more frame *after* measurement to clear styles
      requestAnimationFrame(() => {
        openingHoursHoursAll.forEach(hour => {
                    hour.style.transition = "";

          hour.style.fontVariationSettings = "";
        });
      });
    });
  });
}

setWidthForHours()

// Flick opening times

let currentHourIndex = 0;

function cycleHighlight() {
    // Remove highlight class from all
    openingHoursDaysAll.forEach(item => item.classList.remove("highlight"));
    openingHoursHoursAll.forEach(item => item.classList.remove("opening-hours__hours--blob", "highlight"));

    // Add highlight to the current
    openingHoursDaysAll[currentHourIndex].classList.add("highlight");
    openingHoursHoursAll[currentHourIndex].classList.add("opening-hours__hours--blob", "highlight");

    // Increment index and wrap around
    currentHourIndex = (currentHourIndex + 1) % openingHoursDaysAll.length;

    // Repeat after X ms
    setTimeout(cycleHighlight, 1000); // 1 second per item
}

// Start the loop
cycleHighlight();

open


// Btn and menus

function setheightAndWidthForFoodMenuContents(menuContent) {
    let foodMenuContentHeight = menuContent.scrollHeight;
    menuContent.style.setProperty('--food-menu-full-height', foodMenuContentHeight + "px");

    let afterStyles = getComputedStyle(menuContent, '::after');
    let width = parseFloat(afterStyles.getPropertyValue('width'));

    const styles = getComputedStyle(menuContent);

    // Read individual paddings
    const paddingTop = styles.getPropertyValue('padding-top');
    const paddingRight = styles.getPropertyValue('padding-right');
    const paddingBottom = styles.getPropertyValue('padding-bottom');
    const paddingLeft = parseFloat(styles.getPropertyValue('padding-left'));

    // Collect elm that need menwidth

    const menuWidthElements = [
        ...menuDishContentAll,
        ...menuCategoryHeadWrappers,
        ...menuCategoryHeads,
        ...menuExtraInfoAll
    ]

    menuWidthElements.forEach(dishContent => {
        dishContent.style.width = width - paddingLeft * 2 + "px";
    })
}

setheightAndWidthForFoodMenuContents(menuContent)

let btnPressTransTime = parseFloat(getComputedStyle(menuOpBtn).transitionDuration) * 100;


const menuCatMap = {};

// Build the mapping
document.querySelectorAll(".menu__cat-wrapper").forEach(head => {
    const dataMenuCat = head.dataset.menuCat;
    const wrapper = head.closest(".menu__cat-wrapper");

    if (wrapper && dataMenuCat) {
        menuCatMap[dataMenuCat] = wrapper;
    }
});

console.log(menuCatMap);

// Get transition time
const menuTransTime = parseFloat(getComputedStyle(menuWrapper).transitionDuration) * 1000;

menuSecBtnsAll.forEach(btn => {
    btn.addEventListener("click", e => {
        const clickedBtn = e.currentTarget;

        // Remove pressed/active from all
        menuSecBtnsAll.forEach(b => b.classList.remove("pressed", "active", "hover"));
        clickedBtn.classList.add("pressed");

        // Get the data-menu-cat of this button
        const targetCat = clickedBtn.dataset.menuCat;

        setTimeout(() => {
            const targetSection = menuCatMap[targetCat];

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest"
                });
            } else {
                console.warn("No matching section for data-menu-cat:", targetCat);
            }
        }, menuTransTime * 0.75);

        setTimeout(() => {
            clickedBtn.classList.remove("pressed");
            clickedBtn.classList.add("active");
        }, 200);

        setTimeout(() => {
            menuCategoryHeads.forEach(catHead => {
                makeFunkyMenuCategoryHeads(catHead);
            });
        }, menuTransTime - 100);
    });
});

// Menu Btns

let menuOpen = false;
let currentOpBtn = null;
let orgOpMenuText = menuOpBtn.textContent;

menuOpBtn.addEventListener("click", e => {
    e.stopPropagation;
    const clickedBtn = e.target;
    console.log("op clicked");

    // Toggle menu state first
    menuOpen = !menuOpen;

    if (menuOpen) {
        openMenu();
    } else {
        closeMenu();
    }

    // You were trying to remove "active, pressed" here with a typo
    // If you want to reset pressed/active, do it consistently:
    menuOpBtn.classList.add("pressed");
    // setTimeout(() => {
    //     clickedBtn.classList.remove("pressed");
    //     clickedBtn.classList.add("active");
    // }, 200);
});

menuWrapper.addEventListener('click', e => {
    console.log("meny wrapper is clicked", e.target);
    if (!e.target.matches(".menu-wrapper")) {
        return; // Ignore this click
    }
    closeMenu()
})


const MENU_TRANSITION_DELAY = 150;

function closeMenu() {
    console.log("close menu");
    menuContentScroller.classList.add("menu-content-scroller--closed");
    menuSecBtnsWrapper.classList.add("menu__btns__secBtns-wrapper--closed");
    menuOpBtn.classList.remove("active");

    setTimeout(() => {
        menuOpBtn.classList.remove("pressed");
        menuOpBtn.textContent = orgOpMenuText;
    }, MENU_TRANSITION_DELAY);
    menuWrapper.style.pointerEvents = "none";

    menuOpen = false;
}

function openMenu() {
    console.log("open menu");

    menuUnOpened = false;
    menuContentScroller.classList.remove("menu-content-scroller--closed");
    menuSecBtnsWrapper.classList.remove("menu__btns__secBtns-wrapper--closed");

    setTimeout(() => {
        menuOpBtn.classList.add("active");
        menuOpBtn.textContent = "X";
    }, MENU_TRANSITION_DELAY);
    menuWrapper.style.pointerEvents = "";


    menuOpen = true;
}


// Scroll close menu

const scrollableElement = document.getElementById("scrollableElement");

let lastScrollTop = 0; // To track the previous scroll position
let velocity = 0; // To track the scrolling speed
let lastTimestamp = null; // To calculate time difference

menuContent.addEventListener("scroll", (e) => {
    const scrollTop = menuContent.scrollTop;
    const timestamp = performance.now();

    // Calculate velocity (change in scroll position over time)
    if (lastTimestamp !== null) {
        const timeDelta = timestamp - lastTimestamp;
        velocity = (lastScrollTop - scrollTop) / timeDelta; // Negative = upward
    }
    // If at the top of the scrollable area and a hard upward scroll happens
    if (scrollTop === 0 && velocity > 6) {
        closeMenu()
        console.log("Closing element due to hard upward scroll");
    }

    lastScrollTop = scrollTop;
    lastTimestamp = timestamp;
});

const menuContentHeight = menuContent.offsetHeight;

let scrollAtTopTouch; // Global variable to track touch start position

menuContent.addEventListener("touchstart", (e) => {
    // Check if the menuContent is scrolled to the top
    if (menuContent.scrollTop === 0) {
        scrollAtTopTouch = e.targetTouches[0].clientY; // Store the initial touch Y position
        console.log("scrollStart was", scrollAtTopTouch);
    }
}, { passive: true });

menuContent.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    const touchY = touch.clientY;

    if (menuContent.scrollTop === 0) {
        let pullDownAmount = touchY - scrollAtTopTouch;
        if (pullDownAmount * 2.5 > menuContentHeight) {
            console.log("we should close menu"); // Calculate the difference
            closeMenu()
        }
    }
}, { passive: true });

window.addEventListener("load", e => {
    // menuWrapper.style.transition = "none";
    clubBtn.style.transition = "none";
    belowLogoWrapper.style.transition = "none";
})

clubBtn.addEventListener("click", (e) => {
    e.stopPropagation();  // Prevent event from bubbling to document
    const btn = e.target; // Reference to the clicked button

    clubFormDripContainer.innerHTML = "";


    isFormOpen = !isFormOpen;

    clubBtn.classList.toggle("pressed");
    // Move form wrapper up in index
    clubFormWrapper.classList.toggle("form-above");

    // Toggle button text between "X" and original
    clubBtn.innerHTML = clubBtn.classList.contains("pressed") ? "X" : clubBtnInnerHTML;

    // Toggle the open classes for content and form
    clubFormContent.classList.toggle("club-form__content--open");
    // clubFormDripContainer.classList.toggle("open");

    setTimeout(() => {
        formDrips()

    }, 500);
});

document.addEventListener("click", (e) => {
    const clickedEl = e.target;

    if (
        isFormOpen &&
        !clubFormWrapper.contains(clickedEl) &&
        !clubBtn.contains(clickedEl)
    ) {
        isFormOpen = false;

        clubBtn.classList.remove("pressed");
        clubFormWrapper.classList.remove("form-above");
        clubBtn.innerHTML = clubBtnInnerHTML;
        clubFormContent.classList.remove("open");
        clubFormDripContainer.classList.remove("open");
        clubFormDripContainer.innerHTML = "";
    }
});

function formDrips() {
    const width = clubFormDripContainer.getBoundingClientRect().width;
    const dripNumber = Math.floor(Math.random() * (9 - 5 + 1)) + 5;

    for (let i = 0; i < dripNumber; i++) {
        const dot = document.createElement("div");

        const dotWidth = Math.floor(Math.random() * (5 - 1 + 1) + 1) * 4;
        dot.style.width = dotWidth + "px";

        const maxLeft = width - dotWidth;
        const leftPos = Math.random() * maxLeft;
        dot.style.left = `${leftPos}px`;

        dot.style.transitionDuration = Math.floor(Math.random() * (10 - 2 + 1) + 2) + "s";
        dot.style.transitionDelay = Math.floor(Math.random() * 2) + "s";
        dot.classList.add("form-drip");

        clubFormDripContainer.appendChild(dot);

        setTimeout(() => {
            dot.style.height = Math.floor(Math.random() * (200 - 10 + 1) + 10) + "px";
        }, 10);
    }

    console.log(width, dripNumber);
}



window.addEventListener('resize', e => {
    closeMenu()
    windowWidth = window.innerWidth;
    setheightAndWidthForFoodMenuContents(menuContent)
    setWidthForHours()

})


// openMenu()

function resizeElements() {
    windowWidth = window.innerWidth;
    menuBtnWrapperWidth = menuBtnWrapper.getBoundingClientRect().left;
    // Set width for menu
    // console.log(menuWrapper.style.left);
    menuBgWidth = menuBtnWrapperWidth - menuContent.getBoundingClientRect().left;

    // setWidthToMatchMenuBg(menuBgWidth)
    // if (windowWidth > 767) {
    //     openingHoursWrapper.style.top = rootDocPadding + "px";
    // } else {
    //     openingHoursWrapper.style.top = bottomOFClubBtn + rootDocPadding + "px";
    // }

}

// function setWidthToMatchMenuBg(menuBgWidth) {
//     menuContent.style.width = menuBgWidth + "px";
//     menuContentBg.style.width = menuBgWidth - menuBgGap + "px";
//     menuContentBorder.style.width = menuBgWidth - menuBgGap + "px";

//     menuWidthElements.forEach(content => {
//         content.style.width = menuBgWidth - menuBgGap - cssVarfoodMenuPaddingInner * 2 + "px";
//     })

// }


// Create observer for menu categories

const menuCatObserverOptions = {
    root: menuContentScroller,
    rootMargin: "-25% 0px -75% 0px",
    threshold: 0
};

const menuCatObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const target = entry.target;

        if (entry.isIntersecting) {
            // The section is in view
            // console.log("Section visible:", target);

            const id = target.dataset.menuCat;
            if (id) {
                // Remove previous actives
                menuSecBtnsAll.forEach(btn => btn.classList.remove("active"));

                // Find the button matching this section
                const matchingBtn = Array.from(menuSecBtnsAll).find(btn =>
                    btn.dataset.menuCat === id
                );
                if (matchingBtn) {
                    matchingBtn.classList.add("active");
                }
            }

        } else {
            // Section leaving view if you want to handle that
            // console.log("Section leaving:", target);
        }
    });
}, menuCatObserverOptions);

menuCategorySections.forEach(section => {
    menuCatObserver.observe(section);
});


// Create observer for menu heads

const menuCatHeadObserverOptions = {
    root: menuContentScroller,
    rootMargin: "-25% 0px -25% 0px",
    threshold: 0
};

const menuCatHeadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const target = entry.target;

        if (entry.isIntersecting) {
            // The section is in view
            // console.log("Section visible:", target);
            makeFunkyMenuCategoryHeads(target)

        } else {
            // Section leaving view if you want to handle that
            // console.log("Section leaving:", target);
        }
    });
}, menuCatHeadObserverOptions);

menuCategoryHeads.forEach(section => {
    menuCatHeadObserver.observe(section);
});




// Make funky cathegoy heads

// Start one directly
menuCategoryHeads.forEach(head => {
    makeFunkyMenuCategoryHeads(head)
})

// Then change on demand
function makeFunkyMenuCategoryHeads(headlineEl) {
    // If we haven’t replaced textContent before, build spans
    if (!headlineEl.dataset.hasSpans) {
        const letters = [...headlineEl.textContent];
        headlineEl.textContent = "";
        letters.forEach(letter => {
            const span = document.createElement("span");
            span.textContent = letter;
            span.style.transition = `font-variation-settings 1s ease-in-out`;
            headlineEl.appendChild(span);
        });
        // Mark that we initialized spans
        headlineEl.dataset.hasSpans = "true";
    }

    // Now animate: for each span, assign random settings
    const spans = headlineEl.querySelectorAll("span");
    spans.forEach(span => {
        const weight = Math.floor(Math.random() * (901 - 100) + 100);
        const width = Math.floor(Math.random() * (116 - 50) + 50);
        const slant = Math.random() > 0.5 ? Math.floor(Math.random() * 13) - 12 : 0;

        // Animate (with optional timeout)
        setTimeout(() => {
            span.style.fontVariationSettings = `"slnt" ${slant}, "wdth" ${width}, "wght" ${weight}`;
        }, 0);
    });
}

const popUpWrapper = document.querySelector(".popup-wrapper")
const popUpBtn = document.querySelector(".popup__btn")
const popUpSvgContainer = document.querySelector(".popup__svg-container")
const popUpDrip = document.getElementById("popup-drip")
console.log(popUpSvgContainer);

window.onload = function() {
  console.log("window loaded");
  console.log(popUpWrapper);
  setTimeout(() => {
    popUpWrapper.classList.add("popup-wrapper--open")
    setTimeout(() => {
        popUpWrapper.style.transitionDuration = ".5s"
        // yranSvgContainer.style.display = "none"
    }, 500);
    
  }, 500);
};

popUpBtn.addEventListener("click", e => {
    popUpWrapper.classList.remove("popup-wrapper--open")
})


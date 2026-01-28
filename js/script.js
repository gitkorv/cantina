// General
const root = document.documentElement;
const rootStyles = getComputedStyle(root)
const rootDocPadding = parseFloat(rootStyles.getPropertyValue('--bodyPadding'));
const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;

// CSS Variables
const cssVarfoodMenuPaddingInner = parseFloat(getComputedStyle(root).getPropertyValue('--foodMenuPaddingInner').trim()) * rootFontSize;

// Sections

// Club
const clubBtn = document.querySelector(".club-btn");
clubBtn.classList.add("zero-opacity")
const clubBtnInnerHTML = clubBtn.innerHTML;
const clubFormContent = document.querySelector(".club-form__content")
const clubFormWrapper = document.querySelector(".club-form-wrapper")
let isFormOpen = false;
const clubFormDripContainer = document.querySelector(".club-form__bottom-drip-container")

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
clubTextWrap.style.transition = "none";
const streetFoodSpans = Array.from(streetFoodClubWrap.querySelectorAll(".logo__words--streetfood"))

// Ticker
const ticker = document.querySelector(".ticker-wrapper");

// Opening hours
const openingHoursWrapper = document.querySelector(".opening-hours-wrapper");
const bottomOFClubBtn = clubBtn.getBoundingClientRect().height;
const openingHoursDaysAll = document.querySelectorAll(".opening-hours__days");
const openingHoursHoursAll = document.querySelectorAll(".opening-hours__hours");

// Below logo
const belowLogoWrapper = document.querySelector(".below-logo-wrapper")

// Menu
const menuBgGap = 24;
let menuBgWidth = undefined;
const menuWrapper = document.querySelector(".menu-wrapper")
const menuContentBorder = document.querySelector(".menu-content-border")
let menuContent = "";
const menuContentScroller = document.querySelector(".menu-content-scroller")
const menuContentBg = document.querySelector(".menu-content-bg")
// let menuUnOpened = true;
const menuCategoryHeadWrappers = [...document.querySelectorAll(".menu__cat__head-wrapper")];
let menuSectionTitles = [];
let menuSections = [];

const menuWidthElements = [
    ...menuCategoryHeadWrappers,
    ...menuSectionTitles
];


// Menu buttons
const menuBtnWrapper = document.querySelector(".menu__btns-wrapper")
const menuSecBtnsWrapper = document.querySelector(".menu__btns__secBtns-wrapper")
const menuSecBtnsAll = [...document.querySelectorAll(".menu__btns__secBtn")]
const menuOpBtn = document.querySelector(".menu__btn__opBtn")
// Get width of menuBtnWrapper
let menuBtnWrapperWidth = menuBtnWrapper.getBoundingClientRect().left;


// Hide on start
const fullDisplayArr = [belowLogoWrapper, clubBtn]

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
        head: "Lunch Specials 149:-",
        text: "Valfri Ramen, dagens Taco eller valfri Pokénoodles. 11-15 Tisdag till Fredag"
    },
    {
        head: "Full meny från kl 11",
        text: "Välj och vraka, kaffe ingår under lunchen."
    },
    {
        head: "DJ's!",
        text: "Kika in på våra socials (nere till vänster) vem som styr spakarna, och när"
    },
    {
        head: "Join the Club!",
        text: "Vill du ha våra nyheter först? Klicka uppe till höger och bli en del av klubben!"
    }
];

let currentTickerItemIndex = 0;
const typeTickerHeadContainer = document.querySelector(".ticker__item__head");
const typeTickerTextContainer = document.querySelector(".ticker__item__text");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runNewsTicker() {
    // ticker.style.display = "";

    while (true) {
        const tickerItem = tickerItems[currentTickerItemIndex];
        const { head, text } = tickerItem;

        // Fade out
        typeTickerHeadContainer.classList.add("fade-out");
        await sleep(500);

        // Update head
        typeTickerHeadContainer.textContent = head;
        typeTickerHeadContainer.classList.remove("fade-out");
        await sleep(500);

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

    logoWordCantina.classList.add("show")

    // Cantina
    let logoTransTime = parseFloat(getComputedStyle(logoWordCantina).transitionDuration) * 1000
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
        span.style.fontVariationSettings = `
            "slnt" ${cantinaLettersSettings[i].slnt}, 
            "wdth" ${cantinaLettersSettings[i].wdth}, 
            "wght" ${cantinaLettersSettings[i].wght}
            `
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
        clubBtn.style.display = "";

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

                    // add class to some drips
                    if (i === 1 || i === 2) {
                        sprayDripDiv.classList.add("spray-drip-second-color");
                    }


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


function hideOpeningDaysBeforeCutoff() {
    const now = new Date();
    const cutoffDate = new Date(2026, 0, 6, 21, 0, 0); // Jan 6, 21:00 local time

    const hoursHeadSub = document.querySelector(".hours-head__sub");

    // BEFORE cutoff → hide opening days
    if (now < cutoffDate) {
        if (!openingHoursDaysAll || openingHoursDaysAll.length === 0) return;

        for (let i = 0; i < 2 && i < openingHoursDaysAll.length; i++) {
            openingHoursDaysAll[i].classList.add("strike");

        }
    }

    // AFTER cutoff → hide sub heading
    if (now >= cutoffDate && hoursHeadSub) {
        hoursHeadSub.style.display = "none";
    }
}



document.addEventListener('DOMContentLoaded', hideOpeningDaysBeforeCutoff);


// Btn and menus






let btnPressTransTime = parseFloat(getComputedStyle(menuOpBtn).transitionDuration) * 100;




// Menu Btns

let menuOpen = false;
let currentOpBtn = null;
let orgOpMenuText = menuOpBtn.textContent;

menuOpBtn.addEventListener("click", e => {
    e.stopPropagation();
    const clickedBtn = e.target;
    console.log("op clicked");

    // Toggle menu state first
    menuOpen = !menuOpen;

    if (menuOpen) {
        openMenu();
    } else {
        closeMenu();
        console.log("here");
    }
    // You were trying to remove "active, pressed" here with a typo
    // If you want to reset pressed/active, do it consistently:
    menuOpBtn.classList.add("pressed");
});



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

    // menuUnOpened = false;
    menuContentScroller.classList.remove("menu-content-scroller--closed");
    menuSecBtnsWrapper.classList.remove("menu__btns__secBtns-wrapper--closed");

    setTimeout(() => {
        menuOpBtn.classList.add("active");
        menuOpBtn.textContent = "X";
    }, MENU_TRANSITION_DELAY);
    menuWrapper.style.pointerEvents = "";


    menuOpen = true;
}

window.addEventListener("load", e => {
    // menuWrapper.style.transition = "none";
    clubBtn.style.transition = "none";
    belowLogoWrapper.style.transition = "none";
})

const DRIP_DELAY = 600;

clubBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    // Reset drip container
    clubFormDripContainer.innerHTML = "";

    // Toggle state
    isFormOpen = !isFormOpen;
    const isActive = isFormOpen;

    // Button state
    clubBtn.classList.add("pressed");
    clubBtn.classList.toggle("active", isActive);

    // Layout / content state
    clubFormWrapper.classList.toggle("form-above", isActive);
    clubFormContent.classList.toggle("club-form__content--open", isActive);

    if (isActive) {
        clubBtn.innerHTML = "X";
        setTimeout(() => {
            formDrips();
            clubBtn.classList.remove("pressed");
        }, DRIP_DELAY);
    } else {
        clubBtn.innerHTML = clubBtnInnerHTML;
        setTimeout(() => {
            clubBtn.classList.remove("pressed");
        }, DRIP_DELAY);

    }
});


document.addEventListener("click", (e) => {
    const clickedEl = e.target;

    if (
        isFormOpen &&
        !clubFormContent.contains(clickedEl) &&
        !clubBtn.contains(clickedEl)
    ) {
        isFormOpen = false;
        console.log("this fired");

        clubBtn.classList.remove("pressed", "active");
        clubFormWrapper.classList.remove("form-above");
        clubBtn.innerHTML = clubBtnInnerHTML;
        clubFormContent.classList.remove("club-form__content--open");
        clubFormDripContainer.innerHTML = "";
    }
    if (
        menuOpen &&
        !clickedEl.classList.contains("menu__btn")
    ) {
        // closeMenu()
    }
});

function formDrips() {
    const width = clubFormDripContainer.getBoundingClientRect().width - 48;
    console.log(width);
    const dripNumber = Math.floor(Math.random() * (9 - 5 + 1)) + 5;

    for (let i = 0; i < dripNumber; i++) {
        const dot = document.createElement("div");

        const dotWidth = Math.floor(Math.random() * (5 - 1 + 1) + 1) * 4;
        dot.style.width = dotWidth + "px";

        const maxLeft = width - dotWidth;
        const leftPos = Math.random() * maxLeft + 24;
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
    setWidthForHours()

})
// openMenu()

const popUpWrapper = document.querySelector(".popup-wrapper");
const popUpTransTime = 3000;
const timeToStartPopUpFadeIn = 500;


const allFallingTexts = document.querySelectorAll(".falling-text");

console.log(popUpTransTime);
const popActiveName = "popup-xmas";
// popUpWrapper.classList.add(popActiveName);

const popUpBtn = document.querySelector(".popup__btn")
const popUpSvgContainer = document.querySelector(".popup__svg-container")
const popUpDrip = document.getElementById("popup-drip")
const popUpSwipeText = document.querySelector(".popup__subhead--swipe")
const popUpSwipeTextSpans = [...popUpSwipeText.children];

window.onload = function () {
    popUpWrapper.style.transitionDuration = popUpTransTime + "ms";
    setTimeout(() => {
        popUpWrapper.classList.add("popup-wrapper--open")
        setTimeout(() => {
            popUpWrapper.style.transitionDuration = ".5s"
            // yranSvgContainer.style.display = "none"


        }, popUpTransTime);

        setTimeout(() => {
            const baseDelay = 0.75;
            const step = 0.2;
            const lastIndex = allFallingTexts.length - 1;

            for (let i = 0; i < allFallingTexts.length; i++) {
                const element = allFallingTexts[i];

                const delay = i === lastIndex
                    ? 0
                    : baseDelay + i * step;

                element.style.transitionDelay = `${delay}s`;
                element.classList.remove("falling-text");
            }
        }, popUpTransTime / 2);

    }, timeToStartPopUpFadeIn);
};

// popUpBtn.addEventListener("click", e => {
//     popUpWrapper.classList.remove("popup-wrapper--open")
// })

// let index = 0;

// function cycleColors() {
//     // reset all
//     popUpSwipeTextSpans.forEach(span => span.classList.remove('active'));

//     // highlight current one
//     popUpSwipeTextSpans[index].classList.add('active');

//     // move to next
//     index++;

//     // if we’ve gone past the last span, reset after a pause
//     if (index >= popUpSwipeTextSpans.length) {
//         index = 0;
//         setTimeout(cycleColors, 1500); // pause before restarting
//     } else {
//         setTimeout(cycleColors, 500); // quick switch between spans
//     }
// }

// // start the loop
// cycleColors();


// SNOW EFFECT



const SNOWFLAKE_COUNT = 80;
const MIN_DURATION = 5;
const MAX_DURATION = 70;
const MIN_SIZE = 2;
const MAX_SIZE = 20;

const snowContainer = document.getElementById("snow");

const SNOW_COLORS = [
    "var(--cantinaGreen)",
    "var(--cantinaRosa)",
    "var(--cantinaGrey)",
    "var(--cantinaCream)",
    "var(--cantinaCream)"
];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function randomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";
    snowflake.textContent = "❄";

    const size = random(MIN_SIZE, MAX_SIZE);
    const duration = random(MIN_DURATION, MAX_DURATION);
    const drift = random(-50, 50);

    snowflake.style.left = random(0, 100) + "vw";
    snowflake.style.fontSize = size + "px";
    snowflake.style.opacity = random(0.2, 1);
    snowflake.style.color = randomFromArray(SNOW_COLORS);
    snowflake.style.animationDuration = duration + "s";
    snowflake.style.setProperty("--drift", drift + "px");

    snowContainer.appendChild(snowflake);

    setTimeout(() => {
        snowflake.remove();
        createSnowflake(); // keep snowfall continuous
    }, duration * 1000);
}

// Initial population
for (let i = 0; i < SNOWFLAKE_COUNT; i++) {
    setTimeout(createSnowflake, random(0, 5000)); // stagger start
}



// =========================
// MD MAIN Menu Test
// =========================

const menuFiles = [
    '/content/menu/snacks.md',
    '/content/menu/tacos.md',
    '/content/menu/ramen.md',
    '/content/menu/poke.md',
    '/content/menu/sides.md',
    '/content/menu/bao.md',
    '/content/menu/sandwiches.md',
    '/content/menu/kids.md',
    '/content/menu/sweets.md',
    '/content/menu/dips.md',
];

let allPrices = [];

async function loadMenu(mdFile, target) {
    const container = document.querySelector(target);
    if (!container) return console.warn('Missing wrapper:', target);

    const res = await fetch(mdFile);
    const raw = await res.text();
    const { data, content } = parseFrontMatter(raw);
    let html = marked.parse(content);


    // console.log(html);

    // Wrap <h3> titles as dishes
    html = html.replace(
        /<h3>(.*?)<\/h3>/g,
        (match, rawTitle) => {
            const { title, classes } = parseTitleAndClasses(rawTitle, 'dish--');
            return `<article class="dish ${classes}"><h3>${title}</h3>`;
        }
    ).replace(/<hr\s*\/?>/g, '</article>');


    // Split strong-labelled fields into divs, collect prices separately
    html = html.replace(
        /<p>([\s\S]*?)<\/p>/g,
        (match, inner) => {
            if (!inner.includes('<strong>')) return match;

            const parts = [...inner.matchAll(
                /<strong>(.*?)<\/strong>\s*([\s\S]*?)(?=<strong>|$)/g
            )];

            

            const priceDivs = [];
            const fieldDivs = parts.map(([_, label, value]) => {
                const cls = label.toLowerCase().trim().replace(/\s+/g, '-');
                const v = value?.trim();
                // console.log(v);

                // ⛔ Skip fields that have no value at all
                if (!v) return '';

                if (cls === 'choice') {
                    const cleanValue = value.trim();

                    // Split into comma-separated items
                    const items = cleanValue
                        .split(',')
                        .map(v => v.trim())
                        .filter(Boolean)
                        .map(item => {
                            // Match item text + any number of [classes] at the end
                            const match = item.match(/^(.*?)\s*((\[[^\]]+\]\s*)+)$/);
                            if (match) {
                                const text = match[1].trim(); // The actual item text
                                const classes = match[2]
                                    .match(/\[([^\]]+)\]/g) // extract all [tags]
                                    .map(c => `dish__choice--${c.replace(/\[|\]/g, '').trim().toLowerCase()}`)
                                    .join(' ');
                                return `<li class="${classes}">${text}</li>`;
                            }
                            return `<li>${item}</li>`;
                        });

                    if (!items.length) return '';

                    return `<h3 class="dish__choice"><ul>${items.join('')}</ul></h3>`;
                }


                if (cls === 'price') {
                    // Split the value into words and wrap each in a span
                    const words = v.split(' ').map(w => {
                        // Check if the word is a number
                        if (!isNaN(w)) {
                            return `<span class="price-number">${w}</span>`;
                        }
                        return `<span>${w}</span>`;
                    }).join(' ');

                    priceDivs.push(`<li class="dish__price">${words}<span class="kronor">kr</span></li>`);
                    return '';
                }

                if (cls === 'pricesub') {
                    priceDivs.push(`<li class="dish__price dish__price--sub">${v}</li>`);
                    return '';
                }


                return `<div class="dish__${cls}">${value.trim()}</div>`;
            }).join('');

            // Wrap fields and prices in dish__wrapper
            const pricesWrapper = priceDivs.length
                ? `<ul class="price dish__prices">${priceDivs.join('')}</ul>`
                : '';

            return `<div class="dish__wrapper"><div class="dish__fields">${fieldDivs}</div>${pricesWrapper}</div>`;
        }
    );

    // --- before building sectionHeader ---
    const basePrices = Array.isArray(data.basePrice)
        ? data.basePrice.filter(p => String(p).trim() !== '')
        : data.basePrice
            ? [data.basePrice]
            : [];

            

    // --- now build the section header ---
    const sectionClasses = Array.isArray(data.sectionClass)
        ? data.sectionClass
        : data.sectionClass
            ? [data.sectionClass]
            : [];

    const sectionClassString = sectionClasses
        .map(c => c.trim())
        .filter(Boolean)
        .join(' ');

    // Use directly
    const sectionHeader = `
    <section class="menu-section ${sectionClassString}">

        <div class="menu-section__header">
            <h2 class="section__title">${data.title ?? ''}</h2>
            ${data.intro?.length
                ? `
                <div class="section__sub">
                    <ul class="section__intro">
                        ${data.intro.map(i => `<li>${i}</li>`).join('')}
                    </ul>
                </div>
            `
                : ''
            }
            ${basePrices.length
                ? `
            <div class="sectionprice-wrapper">
                <ul class="price section__sectionprices">
                    ${basePrices.map(p => {
                        // Split the value into words
                        const words = String(p)
                            .split(' ')
                            .map(w => {
                                // If the word is a number, add class price-number
                                if (!isNaN(w)) return `<span class="price-number">${w}</span>`;
                                return `<span>${w}</span>`;
                            })
                            .join(' ');

                        // Add kr only if the item contains a number
                        const hasNumber = /\d/.test(p);
                        return `<li class="section__sectionprice">${words}${hasNumber ? '<span class="kronor">kr</span>' : ''}</li>`;
                    }).join('')}
                </ul>
            </div>
            `
                : ''
            }
        </div>

        ${html}

        
    </section>
    `;


    container.innerHTML = sectionHeader;

    // Collect prices
    document.querySelectorAll(`${target} .dish__price, ${target} .dish__sectionprice`)
        .forEach(el => allPrices.push(el));
}


// --- Load all menus ---
async function loadAllMenus() {
    for (const mdFile of menuFiles) {
        const wrapper =
            '#' + mdFile.split('/').pop().replace('.md', '') + '-wrapper';
        await loadMenu(mdFile, wrapper);
    }
}
let mdMenuArticle = [];
let mdMenuSectionWrappers = [];

async function init() {
    await loadAllMenus();
    doAfterMenuContentLoaded()
}
init();



// --- Helpers ---
function parseTitleAndClasses(rawTitle, prefix = '') {
    const tags = rawTitle.match(/\[(.*?)\]/g) || [];
    const classes = tags.map(tag => prefix + tag.replace(/\[|\]/g, '').trim());
    const cleanTitle = rawTitle.replace(/\s*\[.*?\]/g, '').trim();
    return { title: cleanTitle, classes: classes.join(' ') };
}

function parseFrontMatter(md) {
    const match = md.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);
    if (!match) return { data: {}, content: md };

    const [, yaml, content] = match;
    const data = {};

    yaml.split('\n').forEach(line => {
        if (!line.trim()) return;

        if (line.trim().startsWith('-')) {
            const lastKey = Object.keys(data).slice(-1)[0];
            if (!Array.isArray(data[lastKey])) {
                data[lastKey] = data[lastKey] ? [data[lastKey]] : [];
            }
            data[lastKey].push(line.replace('-', '').trim());
            return;
        }

        const [key, value] = line.split(':').map(s => s.trim());
        data[key] = value === '' ? [] : value;
    });

    return { data, content };
}

function doAfterMenuContentLoaded() {

    mdMenuSectionWrappers = document.querySelectorAll(".menu-section-wrapper");
    mdMenuArticle = document.querySelectorAll(".menu-section article");
    menuWidthElements.push(...mdMenuSectionWrappers)
    console.log(mdMenuArticle);
    menuContent = document.querySelector(".menu-content");
    menuSections = document.querySelectorAll(".menu-section");
    menuSectionTitles = [...document.querySelectorAll(".menu-section .section__title")];
    console.log(menuSectionTitles);

    // Start one directly Funky Head
    menuSectionTitles.forEach(head => {
        makeFunkyMenuCategoryHeads(head)
    })

    menuSectionTitles.forEach(section => {
        menuTitlesObserver.observe(section);
    });
    mdMenuSectionWrappers.forEach(section => {
        menuSectionObserver.observe(section);
    });

    // Scroll close menu

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


    const menuCatMap = {};

    mdMenuSectionWrappers.forEach(el => {
        const dataMenuCat = el.dataset.menuCat;

        if (dataMenuCat) {
            menuCatMap[dataMenuCat] = el;
        }
    });

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
                        block: "center",
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
                menuSectionTitles.forEach(catHead => {
                    makeFunkyMenuCategoryHeads(catHead);
                });
            }, menuTransTime - 100);
        });
    });



}


// Make funky cathegoy heads

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


// Create observer for menu categories

const menuSectionObserverOptions = {
    root: menuContentScroller,
    rootMargin: "-25% 0px -75% 0px",
    threshold: 0
};

const menuSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const target = entry.target;

        if (entry.isIntersecting) {
            const id = target.dataset.menuCat;
            console.log(target);
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
        }
    });
}, menuSectionObserverOptions);




// Create observer for menu heads

const menuTitlesObserverOptions = {
    root: menuContentScroller,
    rootMargin: "-25% 0px -25% 0px",
    threshold: 0
};

const menuTitlesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const target = entry.target;

        if (entry.isIntersecting) { makeFunkyMenuCategoryHeads(target) }
    });
}, menuTitlesObserverOptions);


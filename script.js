// General
const root = document.documentElement;
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

// logo Cantina
const logoWrapper = document.querySelector(".logo-wrapper")
const logoHeadWrap = document.querySelector(".logo__head")
const logoHeadWrapTextArr = [...logoHeadWrap.textContent]
logoHeadWrap.textContent = "";

// Logo subhead
const logoSubheadWrap = document.querySelector(".logo__sub")
const streetFoodClubWrap = document.querySelector(".logo__sub__streetfood-wrap")
const clubTextWrap = document.querySelector(".club")
const clubTextWrapWidth = clubTextWrap.getBoundingClientRect().width;
clubTextWrap.style.transition = "none"
clubTextWrap.classList.add("rolled-up")
streetFoodClubWrap.style.marginRight = clubTextWrapWidth + "px";
const streetFoodWrap = document.querySelector(".logo__sub__streetfood-wrap")
const streetFoodSpans = Array.from(streetFoodWrap.querySelectorAll(".street-food"))

// Ticker
const ticker = document.querySelector(".ticker-wrapper");

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
const menuCategoryHeads = [...document.querySelectorAll(".menu__cat__head")];
const menuCategorySections = document.querySelectorAll(".menu__cat-wrapper");

// Collect elm that need menwidth

const menuWidthElements = [
    ...document.querySelectorAll(".menu____dish-content"),
    ...document.querySelectorAll(".menu-content__extra-info-container")
]

// Menu buttons
const menuBtnWrapper = document.querySelector(".menu__btns-wrapper")
const menuSecBtnsWrapper = document.querySelector(".menu__btns__secBtns-wrapper")
const menuSecBtnsAll = [...document.querySelectorAll(".menu__btns__secBtn")]
const menuOpBtn = document.querySelector(".menu__btn__opBtn")

// Get width of menuBtnWrapper
let menuBtnWrapperWidth = menuBtnWrapper.getBoundingClientRect().left;

// Set width for menu
resizeElements(windowWidth, menuBtnWrapperWidth)

// Hide on start
const fullDisplayArr = [belowLogoWrapper, clubBtn]

// Close Menu at start
// closeMenu()

// Opening Splash Page
const sprayDots = document.querySelectorAll(".spray-splash")
const spraySplashContainers = document.querySelectorAll(".spray-splash-container")
const splashWords = document.querySelectorAll(".splash-word")


// Social logos
const socialLogos = document.querySelectorAll(".social-logo-wrapper")

// Turn off transition on elements over start
clubBtn.style.transition = "none";
belowLogoWrapper.style.transition = "none";

const cLT = [
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
        head: "Tjom Pang!",
        text: "Nu kör vi så kom in och säg hej!"
    },
    {
        head: "Öppet till sent",
        text: "Fredag och Lördag är dörrarna öppen tills 03. Alla öppettider hittar du nedan."
    },
    {
        head: "Äkta street food",
        text: "Saftiga tacos, mumsiga bao buns, het ramen och mycket mer. Kolla menyn i botten på sidan."
    },
    {
        head: "Join the Club!",
        text: "Vill du ha våra nyheter först? Klicka uppe till höger och bli en del av klubben!"
    },

    {
        head: "DJ:s!",
        text: "Håll utkik på våra socials vem som styr spakarna, och när."
    },
    {
        head: "Cocktails!",
        text: "På dansgolvet skakas rumpor och i baren skakar vi roliga drinkar."
    }
];

let currentTickerItemIndex = 0; // Index of the current ticker item
let typeTickerIndex = 0; // Index for typing individual characters
const typeTickerHeadContainer = document.querySelector(".ticker-head");
ticker.style.display = "none"
const typeTickerTextContainer = document.querySelector(".ticker-text");

function runNewsTicker() {

    const tickerItem = tickerItems[currentTickerItemIndex];
    const head = tickerItem.head;
    const text = tickerItem.text;

    // Step 1: Transition effect for head
    function updateHead() {
        ticker.style.display = ""
        // Add a "fade-out" class
        typeTickerHeadContainer.classList.add("fade-out");

        // Wait for the fade-out animation, then change the text
        setTimeout(() => {
            typeTickerHeadContainer.textContent = head; // Update the head
            typeTickerHeadContainer.classList.remove("fade-out"); // Remove fade-out
            typeTickerHeadContainer.classList.add("fade-in"); // Add fade-in

            // Remove the fade-in class after animation completes
            setTimeout(() => {
                typeTickerHeadContainer.classList.remove("fade-in");
            }, 500); // Match the CSS transition duration
        }, 500); // Match the CSS transition duration
    }

    updateHead(); // Update the head with a transition

    // Step 2: Type out the text
    function typeText() {
        if (typeTickerIndex < text.length) {
            typeTickerTextContainer.textContent += text[typeTickerIndex];
            typeTickerIndex++;
            setTimeout(typeText, 100); // Type next character
        } else {
            // Step 3: After typing, move to the next item after a delay
            setTimeout(() => {
                typeTickerTextContainer.textContent = ""; // Clear text
                typeTickerIndex = 0; // Reset typing index
                currentTickerItemIndex = (currentTickerItemIndex + 1) % tickerItems.length; // Loop to next ticker item
                runNewsTicker(); // Restart the process for the next item
            }, 2000); // 2-second pause before switching
        }
    }
    typeText(); // Start typing the text
}

runNewsTicker();


function showHomeElements() {

    // Cantina
    let logoTransTime = parseFloat(getComputedStyle(logoHeadWrap).transitionDuration) * 1000
    setInterval(() => {
        logoHeadWrap.classList.remove("zero-opacity")
    }, logoTransTime / 4);

    for (let i = 0; i < logoHeadWrapTextArr.length; i++) {
        const span = document.createElement("span");
        span.style.letterSpacing = cLT[i].ltrSpc;
        span.classList.add("cantina-letter")
        span.textContent = logoHeadWrapTextArr[i];
        logoHeadWrap.append(span)
        let revealTime = Math.floor(Math.random() * (logoHeadWrapTextArr.length - 2) + 2);
        let logoHeadTransTime = parseFloat(getComputedStyle(span).transitionDuration);

        span.style.transitionDelay = logoHeadTransTime * revealTime + "s";
        span.style.fontVariationSettings = `"slnt" ${cLT[i].slnt}, "wdth" ${cLT[i].wdth}, "wght" ${cLT[i].wght}`
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
            const randomNumber = Math.floor(Math.random() * (900 - 250 + 1)) + 250;
            letterSpan.style.fontVariationSettings = `"wght" ${randomNumber}`;
            letterSpan.textContent = letter;
            span.appendChild(letterSpan)

            setTimeout(() => {
                letterSpan.classList.remove("zero-opacity");

            }, typeWriterTime * streetFoodCounter + 2000);
        })
    });

    let clubStampEnterTime = streetFoodCounter * typeWriterTime + 2500

    setTimeout(() => {
        clubTextWrap.style.transition = ""
        clubTextWrap.classList.remove("rolled-up");
    }, clubStampEnterTime);

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
    }, clubStampEnterTime + 500);

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

            for (let d = 0; d < numberOfDripsForEachDot; d++) {
                let makeDripAtAll = Math.floor(Math.random() * 10 + 1);
                if (makeDripAtAll > 6) {
                    let longDrip = Math.floor(Math.random() * 10 + 1);
                    let dripHeight
                    if (longDrip > 7) {
                        dripHeight = Math.floor(Math.random() * 80 + 10);
                    } else {
                        dripHeight = Math.floor(Math.random() * 50 + 10);
                    }
                    let dripStartLeft = Math.floor(Math.random() * 40 + 30);
                    let dripDuration = Math.floor(Math.random() * 30 + 2);
                    let dripWidth = Math.floor(Math.random() * 5 + 1);

                    let sprayDripDiv = document.createElement("div")
                    sprayDripDiv.className = "spray-splash-drip";
                    sprayDripDiv.style.left = dripStartLeft + "%";
                    sprayDripDiv.style.transitionDuration = dripDuration + "s"
                    sprayDripDiv.style.width = dripWidth > 1 ? "1px" : "2px";
                    spraySplashContainers[i].appendChild(sprayDripDiv)
                    setTimeout(() => {
                        sprayDripDiv.style.height = dripHeight + "px";
                    }, i * (sprayDotTime * 1000) + 100);
                }
            }
        }

        // runNewsTicker();
    }, clubStampEnterTime + 1500);

    setTimeout(() => {
        socialLogos.forEach(logo => {
            logo.style.transitionDuration = "5s";
            logo.classList.remove("zero-opacity")
        })
    }, clubStampEnterTime + 3500);
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

// Btn and menus

let btnPressTransTime = parseFloat(getComputedStyle(menuOpBtn).transitionDuration) * 100;


const menuCatMap = {};

// Find all the headings
document.querySelectorAll(".menu__cat__head").forEach(head => {
    // Get the text of the heading
    const text = head.textContent.trim().toLowerCase();

    // Find the closest wrapper to scroll to
    const wrapper = head.closest(".menu__cat-wrapper");

    // Only add if found
    if (wrapper) {
        menuCatMap[text] = wrapper;
    }
});

console.log(menuCatMap);



makeFunkyMenuCategoryHeads(menuCategoryHeads[0]);

function makeFunkyMenuCategoryHeads(headlineArr) {
    let catHeadLetters = [...headlineArr.textContent]
    headlineArr.textContent = "";
    catHeadLetters.forEach((letter, i) => {
        const catHeadSpan = document.createElement("span");
        // catHeadSpan.classList.add("blob")
        catHeadSpan.textContent = letter;
        catHeadSpan.style.transition = `font-variation-settings 1s ease-in-out`;
        // catHeadSpan.style.transitionDelay = 100 * i + "s";

        let weight = Math.floor(Math.random() * (901 - 100) + 100)
        let width = Math.floor(Math.random() * (116 - 50) + 50)
        let slant = Math.random() > 0.5 ? Math.floor(Math.random() * (13) - 12) : 0;

        setTimeout(() => {
            catHeadSpan.style.fontVariationSettings = `"slnt" ${slant}, "wdth" ${width}, "wght" ${weight}`
        }, 200);

        headlineArr.appendChild(catHeadSpan)
    })
}

const menuTransTime = parseFloat(getComputedStyle(menuWrapper).transitionDuration) * 1000;

menuSecBtnsAll.forEach(btn => {
    btn.addEventListener("click", e => {
        const clickedBtn = e.currentTarget;

        // Remove pressed/active from all
        menuSecBtnsAll.forEach(b => b.classList.remove("pressed", "active"));
        // Add pressed to the one just clicked
        clickedBtn.classList.add("pressed");

        // Toggle menu transition timing


        // Scroll and offset
        setTimeout(() => {
            const btnText = clickedBtn.textContent.trim().toLowerCase();
            const targetSection = menuCatMap[btnText];

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest"
                });
            } else {
                console.warn("No matching section for button:", btnText);
            }
        }, menuTransTime * 0.75);

        // Mark as active after pressed animation
        setTimeout(() => {
            clickedBtn.classList.remove("pressed");
            clickedBtn.classList.add("active");
        }, btnPressTransTime);

        // Re-style headers after transition
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
});


const MENU_TRANSITION_DELAY = 150;

function closeMenu() {
    console.log("close menu");
    menuWrapper.classList.add("menu-wrapper--closed");
    menuSecBtnsWrapper.classList.add("menu__btns__secBtns-wrapper--closed");
    menuOpBtn.classList.remove("active");

    setTimeout(() => {
        menuOpBtn.classList.remove("pressed");
        menuOpBtn.textContent = orgOpMenuText;
    }, MENU_TRANSITION_DELAY);

    menuOpen = false;
}

function openMenu() {
    console.log("open menu");

    if (menuUnOpened) {
        makeFunkyMenuCategoryHeads(menuCategoryHeads[0]);
        // setTimeout(() => {
        //     menuSecBtnsAll[0].classList.add("active");
        // }, menuTransTime);

    }

    menuUnOpened = false;
    menuWrapper.classList.remove("menu-wrapper--closed");
    menuSecBtnsWrapper.classList.remove("menu__btns__secBtns-wrapper--closed");

    setTimeout(() => {
        menuOpBtn.classList.add("active");
        menuOpBtn.textContent = "X";
    }, MENU_TRANSITION_DELAY);

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
    clubFormContent.classList.toggle("open");
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
    resizeElements(windowWidth)

})

function resizeElements() {
    windowWidth = window.innerWidth;
    menuBtnWrapperWidth = menuBtnWrapper.getBoundingClientRect().left;
    // Set width for menu
    // console.log(menuWrapper.style.left);
    menuBgWidth = menuBtnWrapperWidth - menuContent.getBoundingClientRect().left;

    setWidthToMatchMenuBg(menuBgWidth)

}

menuWrapper.addEventListener('click', e => {
    console.log("meny wrapper is clicked");
    closeMenu()
})

// openMenu()

function setWidthToMatchMenuBg(menuBgWidth) {
    menuContent.style.width = menuBgWidth + "px";
    menuContentBg.style.width = menuBgWidth - menuBgGap + "px";
    menuContentBorder.style.width = menuBgWidth - menuBgGap + "px";

    menuWidthElements.forEach(content => {
        content.style.width = menuBgWidth - menuBgGap - cssVarfoodMenuPaddingInner * 2 + "px";
    })

}


// Create observer for menu categories

const menuCatObserverOptions = {
    root: menuContentScroller,            // null = viewport
    rootMargin: "-50% 0px -50% 0px",
    threshold: 0
};

const menuCatObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const target = entry.target;

        if (entry.isIntersecting) {
            // The section is in view
            console.log("Section visible:", target);

            // Example: mark corresponding button as active
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

// 3. Observe each section
menuCategorySections.forEach(section => {
    menuCatObserver.observe(section);
});
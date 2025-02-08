// General
const windowHeight = window.innerHeight;
// Sections
const menuSection = document.querySelector("section.menu")
const menuWrapper = document.querySelector(".menu-wrapper")
menuWrapper.style.transition = "none";
// menuWrapper.classList.
let menuHeight = menuSection.getBoundingClientRect().height;
// menuSection.style.height = menuHeight + "px";

// logo Cantina
const logoWrapper = document.querySelector(".logo-wrapper")
const logoHeadWrap = document.querySelector(".logo__head")
// logoHeadWrap.style.transition = "none";
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
const belowTheFold = document.querySelector(".below-the-fold")

// Menu
const menuContent = document.querySelector(".menu__content")

const menuCategoryHeads = [...document.querySelectorAll(".menu__cat-head")];

// Menu buttons
const btnWrapper = document.querySelector(".menu__btn-wrapper")
const menuSectionBtns = document.querySelectorAll(".btn-menu-section")

const allMenuBtns = [...document.querySelectorAll(".menu__btn")]

const menuOpBtn = document.querySelector(".btn-op")

// Hide on start
const fullDisplayArr = [ticker, belowTheFold, allMenuBtns]

// Close Menu at start
closeMenu()


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
        head: "NEWS!",
        text: "Från och med Juni månad öppnar vår sprillans nya uteservering, varmt välkomna då..."
    },
    {
        head: "Join the club!",
        text: `Klicka här till höger och gå med i vår "club" för att ta del av både rabbater och nyheter`
    },
    {
        head: "Live Music",
        text: "3e torsdagen i månaden kommer köra live music från lokala talanger, håll utkik här för mer info."
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

function showHomeElements() {

    // Cantina
    let logoTransTime = parseFloat(getComputedStyle(logoHeadWrap).transitionDuration) * 1000
    setInterval(() => {
        logoHeadWrap.classList.remove("zero-opacity")
    }, logoTransTime);

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


    let clubStampEnterTime = streetFoodCounter * typeWriterTime + 1500

    setTimeout(() => {
        clubTextWrap.style.transition = ""

        clubTextWrap.classList.remove("rolled-up");
        // clubTextWrap.style.width = "fit-content";
        clubTextWrap.classList.add("stamp")

    }, clubStampEnterTime + 1000);

    setTimeout(() => {
        fullDisplayArr.forEach(element => {
            if (Array.isArray(element)) {
                element.forEach(el => {
                    el.style.transition = `opacity 1.5s ease-in`;
                    el.classList.remove("zero-opacity")
                    el.style.opacity = "1";
                })
            } else {
                element.style.transition = `opacity 1.5s ease-in`;
                element.classList.remove("zero-opacity")
                element.style.opacity = "1";
            }
        })
    }, clubStampEnterTime + 1500);

    setTimeout(() => {
        // Start the ticker
        ticker.style.display = ""

        runNewsTicker();
    }, clubStampEnterTime + 3000);
}

showHomeElements()

// Btn and menus

let btnPressTransTime = parseFloat(getComputedStyle(menuOpBtn).transitionDuration) * 1000;

let bitesSectionHeader = document.querySelector(".bites")
let barSectionHeader = document.querySelector(".bar")
let restSectionHeader = document.querySelector(".rest")
let menuTransTime;
// Menu Sec Btns
menuSectionBtns.forEach(btn => {
    btn.addEventListener("click", e => {
        let btn = e.target;
        // menuSection.style.height = "100%";
        openMenu()
        menuTransTime = parseFloat(getComputedStyle(menuWrapper).transitionDuration) * 1000;
        console.log(btn);

        setTimeout(() => {
            if (btn.textContent === "Bar") {
                console.log("bar");
                barSectionHeader.scrollIntoView({ behavior: "smooth" });
            } else if (btn.textContent === "The Rest") {
                console.log("rest");
                restSectionHeader.scrollIntoView({ behavior: "smooth" });
            } else {
                bitesSectionHeader.scrollIntoView({ behavior: "smooth" });
            }
        }, menuTransTime * 0.75);

        setTimeout(() => {
            menuCategoryHeads.forEach(catHead => {
                makeFunkyMenuCategoryHeads(catHead)
            })
        }, menuTransTime);
    })
})
// Menu Btns
menuOpBtn.addEventListener("click", e => {
    let btn = e.target;
    closeMenu()
    setTimeout(() => {
        btn.classList.remove("pressed")
        btn.classList.remove("active")
    }, btnPressTransTime);

})
// All btns
allMenuBtns.forEach(btn => {
    btn.addEventListener("click", e => {
        allMenuBtns.forEach(btn => {
            btn.classList.remove("active", "pressed");
        })
        btn.classList.add("pressed")
        setTimeout(() => {
            btn.classList.remove("pressed")
            btn.classList.add("active")
        }, btnPressTransTime);
        if (btn.classList.contains("btn-op")) {
            setTimeout(() => {
                btn.classList.remove("active")
            }, btnPressTransTime * 4);
        }
    })
})

function closeMenu() {
    menuWrapper.classList.add("close");
    allMenuBtns.forEach(btn => {
        btn.classList.remove("active", "pressed");
    })
}
function openMenu() {
    menuWrapper.classList.remove("close");
}

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
        let slant = Math.floor(Math.random() * (13) - 12)

        setTimeout(() => {
            catHeadSpan.style.fontVariationSettings = `"slnt" ${slant}, "wdth" ${width}, "wght" ${weight}`
        }, 200);

        headlineArr.appendChild(catHeadSpan)
    })
}

makeFunkyMenuCategoryHeads(menuCategoryHeads[0])

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
});

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
});

window.addEventListener("load", e => {
    menuWrapper.style.transition = "";

})
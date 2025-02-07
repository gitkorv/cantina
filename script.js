// Sections
const menuSection = document.querySelector("section.menu")
const menuWrapper = document.querySelector(".menu-wrapper")
menuWrapper.style.transition = "none";
let menuHeight = menuSection.getBoundingClientRect().height;
// menuSection.style.height = menuHeight + "px";

const menuContent = document.querySelector(".menu__content")

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
console.log(clubTextWrapWidth);
clubTextWrap.style.transition = "none"
clubTextWrap.classList.add("rolled-up")
streetFoodClubWrap.style.marginRight = clubTextWrapWidth + "px";

const streetFoodWrap = document.querySelector(".logo__sub__streetfood-wrap")
console.log(streetFoodWrap);
const streetFoodSpans = Array.from(streetFoodWrap.querySelectorAll(".street-food"))
console.log(streetFoodSpans);

// Ticker
const ticker = document.querySelector(".logo__ticker-wrapper");
const belowTheFold = document.querySelector(".below-the-fold")

const fullDisplayArr = [ticker, belowTheFold]

// Menu buttons
const menuBtns = document.querySelectorAll(".btn-menu-section")
console.log(menuBtns);

const menuOpBtn = document.querySelector(".btn-op")
console.log(menuOpBtn);



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

function showElements() {
    // Cantina
    let logoTransTime = parseFloat(getComputedStyle(logoHeadWrap).transitionDuration) * 1000
    console.log(logoTransTime);
    setInterval(() => {
        logoHeadWrap.classList.remove("zero-opacity")
        
    }, logoTransTime );
    for (let i = 0; i < logoHeadWrapTextArr.length; i++) {
        const span = document.createElement("span");
        span.style.letterSpacing = cLT[i].ltrSpc;
        span.classList.add("cantina-letter")
        span.textContent = logoHeadWrapTextArr[i];
        logoHeadWrap.append(span)
        let revealTime = Math.floor(Math.random() * (logoHeadWrapTextArr.length - 2) + 2);
        let logoHeadTransTime = parseFloat(getComputedStyle(span).transitionDuration);
        console.log(logoHeadTransTime);
        // span.style.opacity = 1;
        
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
            console.log(streetFoodCounter);
        })
    });


    let clubStampEnterTime = streetFoodCounter * typeWriterTime + 1500
    console.log(clubStampEnterTime);

    setTimeout(() => {
        clubTextWrap.style.transition = ""

        clubTextWrap.classList.remove("rolled-up");
        // clubTextWrap.style.width = "fit-content";
        clubTextWrap.classList.add("stamp")
        
    }, clubStampEnterTime + 1000);

    setTimeout(() => {
        fullDisplayArr.forEach(element => {
            element.style.transition = `opacity 1.5s ease-in`;
            element.classList.remove("zero-opacity")
            element.style.opacity = "1";

        })
    }, clubStampEnterTime + 1500);

    


}

showElements()


menuBtns.forEach(btn => {
    btn.addEventListener("click", e => {

        console.log(e.target);
        // menuSection.style.height = "100%";
        menuWrapper.classList.add("show")
        menuContent.classList.add("show")
    })
})


menuOpBtn.addEventListener("click", e => {

    console.log(e.target);
    // menuSection.style.height = menuHeight + "px";
    menuWrapper.classList.remove("show")

    menuContent.classList.remove("show")

})




window.addEventListener("load", e => {
    menuWrapper.style.transition = "";
    // logoWrapper.classList.remove("hidden");


})

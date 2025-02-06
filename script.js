// logo
const logoWrapper = document.querySelector(".logo-wrapper")
const cantinaTextElm = document.querySelector(".logo__cantina-head")
const cantinaTextArr = [...cantinaTextElm.textContent]
const cantinaSubheadElm = document.querySelector(".logo__cantina-sub")

cantinaTextElm.innerHTML = "";

const cantinaSpans = []

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


for (let i = 0; i < cantinaTextArr.length; i++) {
    const span = document.createElement("span");
    span.style.letterSpacing = cLT[i].ltrSpc;

    span.classList.add("cantina-letter")
    span.textContent = cantinaTextArr[i];
    cantinaSpans.push(span)
    cantinaTextElm.append(span)
}

const cLetterTransTime = parseFloat(getComputedStyle(cantinaSpans[0]).transitionDuration) * 1000;
console.log(cLetterTransTime);

logoWrapper.classList.remove("hidden");
logoWrapper.addEventListener("transitionend", () => {
    console.log("trans ended");
    
    for (let i = 0; i < cantinaSpans.length; i++) {
        let span = cantinaSpans[i]
        setTimeout(() => {
            span.style.fontVariationSettings = `"slnt" ${cLT[i].slnt}, "wdth" ${cLT[i].wdth}, "wght" ${cLT[i].wght}`
    
        }, cLetterTransTime * Math.random() * 5 + 1);
        
    }
    
    setTimeout(() => {
        cantinaSubheadElm.style.left = 0;
    }, 1500);

}, { once: true })






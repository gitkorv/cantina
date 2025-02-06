// logo
const logoWrapper = document.querySelector(".logo-wrapper")
const cantinaTextElm = document.querySelector(".logo__cantina-head")
const cantinaTextArr = [...cantinaTextElm.textContent]
const cantinaSubheadElm = document.querySelector(".logo__cantina-sub")
// Get width of subhead and set it
const cantinaSubheadElmWidth = getComputedStyle(cantinaSubheadElm).width
const cantinaSubheadElmHeight = getComputedStyle(cantinaSubheadElm).height
cantinaSubheadElm.style.width = cantinaSubheadElmWidth;
cantinaSubheadElm.style.height = cantinaSubheadElmHeight;
console.log(cantinaSubheadElmWidth);
const cantinaSubSpans = Array.from(cantinaSubheadElm.getElementsByTagName("span"))

cantinaSubSpans.at(-1).style.backgroundColor = "black";
cantinaSubSpans.at(-1).style.position = "absolute";

cantinaSubSpans.at(-1).classList.add("wonky");


const subheadSpansWithEachLetter = []

cantinaSubSpans.forEach(span => {
    let spanTextArr = [...span.textContent];
    subheadSpansWithEachLetter.push(spanTextArr)
})


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

window.addEventListener("load", e => {
    logoWrapper.classList.remove("hidden");

})

logoWrapper.addEventListener("transitionend", () => {
    console.log("trans ended");
    

}, { once: true })




for (let i = 0; i < cantinaSpans.length; i++) {
    let span = cantinaSpans[i]
    setTimeout(() => {
        span.style.fontVariationSettings = `"slnt" ${cLT[i].slnt}, "wdth" ${cLT[i].wdth}, "wght" ${cLT[i].wght}`
    }, 1000 * Math.random() * 3 + 1);
}

console.log(subheadSpansWithEachLetter);

let subHeadLetterLength = 0;

let counter = 1
let sfcTimeDelay = 200;

setTimeout(() => {
    cantinaSubSpans.forEach((spanWord, i) => {
        console.log(spanWord);
        spanWord.textContent = "";
        spanWord.classList.remove("hidden")
        subheadSpansWithEachLetter[i].forEach((letter, i) => {
            const span = document.createElement("span")
            const randomNumber = Math.floor(Math.random() * (900 - 250 + 1)) + 250;
            span.style.fontVariationSettings = `"wght" ${randomNumber}`;
    
            span.textContent = letter
            setTimeout(() => {
                spanWord.appendChild(span)
            }, sfcTimeDelay * counter);
            counter++
        })
    })
}, 1000);


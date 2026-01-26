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
    '/content/info/hours.md',
    '/content/info/lunch-hours.md',
];

let allPrices = [];

async function loadMenu(mdFile, target) {
    const container = document.querySelector(target);
    if (!container) return console.warn('Missing wrapper:', target);

    const res = await fetch(mdFile);
    const raw = await res.text();
    const { data, content } = parseFrontMatter(raw);
    let html = marked.parse(content);

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
    <section class="section ${sectionClassString}">

    <div class="section__header">
        <h2 class="section__title">${data.title ?? ''}</h2>
        <div class="section__sub">
        ${data.intro?.length
            ? `<ul class="section__intro">${data.intro.map(i => `<li>${i}</li>`).join('')}</ul>`
            : ''
        }
        </div>
    </div>

        ${html}

        ${basePrices.length
            ? `
        <div>
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
        </section>
        `;


    container.innerHTML = sectionHeader;

    // Collect prices
    document.querySelectorAll(`${target} .dish__price, ${target} .dish__sectionprice`)
        .forEach(el => allPrices.push(el));
}

let topBarHeight = 0;

// --- Load all menus ---
async function loadAllMenus() {
    for (const mdFile of menuFiles) {
        const wrapper =
            '#' + mdFile.split('/').pop().replace('.md', '') + '-wrapper';
        await loadMenu(mdFile, wrapper);
    }
}

async function init() {
    await loadAllMenus();

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            topBarMargin();
        });
    });
}

init();

function topBarMargin() {
    const el = document.querySelector('.hours-bar');
    if (!el) return;
    topBarHeight = el.offsetHeight;

    const mdMenuWrapper = document.querySelector(".md-menu-wrapper");
    if (!mdMenuWrapper) return;

    mdMenuWrapper.style.paddingTop = `${topBarHeight}px`;
}


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


window.addEventListener('resize', () => {
    topBarMargin()
})
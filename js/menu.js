let allPrices = [];

async function loadMenu(mdFile, target) {
    const res = await fetch(mdFile);
    const md = await res.text();
    let html = marked.parse(md);

    // Wrap sections, dishes, fields (same as before)
    html = html.replace(
        /(<h2>(.*?)<\/h2>)([\s\S]*?)(?=<h3>|$)/g,
        (match, h2, rawTitle, content) => {
            const { title, classes } = parseTitleAndClasses(rawTitle.replace(/<.*?>/g, ''), 'section--');

            let wrappedContent = content.replace(
                /\*\*Intro\*\*\s*(.*)/g,
                (_, value) => `<p class="menu-section__intro">${value.trim()}</p>`
            );

            wrappedContent = wrappedContent.replace(
                /\*\*SectionPrice\*\*\s*(.*)/g,
                (_, value) => `<p class="dish__sectionprice ${classes}">${value.trim()}</p>`
            );

            return `
      </section>
      <section class="menu-section ${classes}">
        <div class="menu-section__header">
          <h2 class="menu-section__title menu-section__title--${classes}">${title}</h2>
          ${wrappedContent.trim()}
        </div>
    `;
        }
    );

    html = html.replace(/^<\/section>/, '');

    html = html.replace(
        /<h3>(.*?)<\/h3>/g,
        (match, rawTitle) => {
            const { title, classes } = parseTitleAndClasses(rawTitle, 'dish--');
            return `
      <article class="dish ${classes}">
        <h3>${title}</h3>
    `;
        }
    ).replace(/<hr\s*\/?>/g, '</article>');

    html = html.replace(
        /<p>(.*?)<\/p>/gs,
        (match, content) => {
            if (!content.includes('<strong>')) return match;
            const fields = [...content.matchAll(/<strong>(.*?)<\/strong>\s*(.*?)(?=(<strong>|$))/gs)];
            return fields.map(([_, label, value]) => {
                const fieldClass = label.toLowerCase().replace(/\s+/g, '-');
                return `<p class="dish__${fieldClass}">${value.trim()}</p>`;
            }).join('');
        }
    );

    html = html.replace(
  /(<p class="dish__intro">.*?<\/p>\s*<p class="dish__sectionprice">.*?<\/p>)/gs,
  (match) => {
    return `<div class="menu-section__intro-fields">${match}</div>`;
  }
);
    html = html.replace(
        /(<p class="dish__description">.*?<\/p>(?:<p class="dish__.*?">.*?<\/p>)*)/gs,
        (match) => {
            return `<div class="dish__fields">${match}</div>`;
        }
    );

    html = html.replace(
        /<div class="dish__fields">([\s\S]*?)<\/div>/g,
        (match, inner) => {

            // Wrap all prices together
            inner = inner.replace(
                /((?:<p class="dish__price">[\s\S]*?<\/p>\s*)+)/,
                `<div class="dish__prices">$1</div>`
            );

            // Wrap description + extras together
            inner = inner.replace(
                /((?:<p class="dish__(?:description|extras)">[\s\S]*?<\/p>\s*)+)/,
                `<div class="dish__meta">$1</div>`
            );

            return `<div class="dish__fields">${inner}</div>`;
        }
    );


    document.querySelector(target).innerHTML = html;

    // Collect prices from this section
    document.querySelectorAll(`${target} .dish__price, ${target} .dish__sectionprice`).forEach(el => {
        allPrices.push(el);
    });
}

// --- Wait for all menus to load ---
async function loadAllMenus() {
    await loadMenu('/content/menu/starters.md', '#snacksMD-wrapper');
    await loadMenu('/content/menu/tacos.md', '#tacosMD-wrapper');
    await loadMenu('/content/menu/ramen.md', '#ramenMD-wrapper');
    await loadMenu('/content/menu/poke.md', '#pokeMD-wrapper');

    console.log(allPrices); // now allPrices will have elements
    // allPrices.forEach(priceEl => {
    //     const width = priceEl.getBoundingClientRect().width;
    //     const sibling = priceEl.nextElementSibling;
    //     if (sibling) {
    //         sibling.style.paddingRight = `${width + 8}px`;
    //     }
    // });
}

loadAllMenus();


// --- Helper: parse [tags] in titles to CSS classes ---
function parseTitleAndClasses(rawTitle, prefix = '') {
    const tags = rawTitle.match(/\[(.*?)\]/g) || [];

    const classes = tags.map(tag =>
        prefix + tag.replace(/\[|\]/g, '').trim()
    );

    const cleanTitle = rawTitle.replace(/\s*\[.*?\]/g, '').trim();

    return {
        title: cleanTitle,
        classes: classes.join(' ')
    };
}



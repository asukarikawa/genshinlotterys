const ICONS = [
    'sad_amber', 'sad_paimon', 'primogem', 'bag_of_mora', 'mavuika', 'berry', 'milk', 'welkin_moon', 'crystal', 'frog', 'genesis_crystal', 'mora',
];

/**
 * @type {number} The minimum spin time in seconds
 */
const BASE_SPINNING_DURATION = 2.7;

/**
 * @type {number} The additional duration to the base duration for each row (in seconds).
 * It makes the typical effect that the first reel ends, then the second, and so on...
 */
const COLUMN_SPINNING_DURATION = 1.3;


var cols;


window.addEventListener('DOMContentLoaded', function (event) {
    cols = document.querySelectorAll('.col');

    setInitialItems();
    // Add spin counter display if not present
    if (!document.getElementById('spin-counter')) {
        const btn = document.querySelector('.start-button');
        const counter = document.createElement('div');
        counter.id = 'spin-counter';
        counter.style.textAlign = 'center';
        counter.style.marginTop = '1em';
        counter.style.fontWeight = 'bold';
        counter.style.color = '#5a3e36';
        btn.insertAdjacentElement('afterend', counter);
    }
    updateSpinCounterDisplay(getCurrentUID());
});

// Helper to get or prompt for UID
function getCurrentUID() {
    let uid = localStorage.getItem('currentUID');
    if (!uid) {
        uid = '000000000';
        localStorage.setItem('currentUID', uid);
    }
    return uid;
}

function setInitialItems() {
    let baseItemAmount = 40;

    for (let i = 0; i < cols.length; ++i) {
        let col = cols[i];
        let amountOfItems = baseItemAmount + (i * 3); // Increment the amount for each column
        let elms = '';
        let firstThreeElms = '';

        for (let x = 0; x < amountOfItems; x++) {
            let icon = getRandomIcon();
            let item = '<div class="icon" data-item="' + icon + '"><img src="items/' + icon + '.png"></div>';
            elms += item;

            if (x < 3) firstThreeElms += item; // Backup the first three items because the last three must be the same
        }
        col.innerHTML = elms + firstThreeElms;
    }
}

/**
 * Called when the start-button is pressed.
 *
 * @param elem The button itself
 */
function spinRandom(elem) {
    let uid = getCurrentUID();
    let count = getSpinCount(uid);
    if (count <= 0) {
        showNoAttemptsAlert();
        return;
    }
    setSpinCount(uid, count - 1);
    updateSpinCounterDisplay(uid);

    let duration = BASE_SPINNING_DURATION + randomDuration();

    for (let col of cols) { // set the animation duration for each column
        duration += COLUMN_SPINNING_DURATION + randomDuration();
        col.style.animationDuration = duration + "s";
    }

    // disable the start-button
    elem.setAttribute('disabled', true);

    // set the spinning class so the css animation starts to play
    document.getElementById('container').classList.add('spinning');

    // set the result delayed
    // this would be the right place to request the combination from the server
    window.setTimeout(setResult, BASE_SPINNING_DURATION * 1000 / 2);

    window.setTimeout(function () {
        // after the spinning is done, remove the class and enable the button again
        document.getElementById('container').classList.remove('spinning');

        // Show alert with the items on the row after animation ends
        let resultItems = [];
        for (let col of cols) {
            let icons = col.querySelectorAll('.icon img');
            // The visible row is the first icon in each column
            let src = icons[0].getAttribute('src');
            // Extract the item name from the src (e.g., items/sad_amber.png -> sad_amber)
            let match = src.match(/items\/(.+)\.png/);
            resultItems.push(match ? match[1] : src);
            elem.removeAttribute('disabled');
        }


        console.log('Result: ' + resultItems.join(' | '));
    }.bind(elem), duration * 1000);

}

function spinWelkin(elem) {
    let uid = getCurrentUID();
    let count = getSpinCount(uid);
    if (count <= 0) {
        showNoAttemptsAlert();
        return;
    }
    setSpinCount(uid, count - 1);
    updateSpinCounterDisplay(uid);

    let duration = BASE_SPINNING_DURATION + randomDuration();

    for (let col of cols) { // set the animation duration for each column
        duration += COLUMN_SPINNING_DURATION + randomDuration();
        col.style.animationDuration = duration + "s";
    }

    // disable the start-button
    elem.setAttribute('disabled', true);

    // set the spinning class so the css animation starts to play
    document.getElementById('container').classList.add('spinning');

    // set the result delayed
    // this would be the right place to request the combination from the server
    window.setTimeout(setWelkinMoon, BASE_SPINNING_DURATION * 1000 / 2);

    window.setTimeout(function () {
        // after the spinning is done, remove the class and enable the button again
        document.getElementById('container').classList.remove('spinning');

        // Show alert with the items on the row after animation ends
        let resultItems = [];
        for (let col of cols) {
            let icons = col.querySelectorAll('.icon img');
            // The visible row is the first icon in each column
            let src = icons[0].getAttribute('src');
            // Extract the item name from the src (e.g., items/sad_amber.png -> sad_amber)
            let match = src.match(/items\/(.+)\.png/);
            resultItems.push(match ? match[1] : src);
        }
        setTimeout(() => {
            showWelkinMoonAlert();
            elem.removeAttribute('disabled');
        }, 2000);


        console.log('Result: ' + resultItems.join(' | '));
    }.bind(elem), duration * 1000);

}

function spinGenesis(elem) {
    let uid = getCurrentUID();
    let count = getSpinCount(uid);
    if (count <= 0) {
        showNoAttemptsAlert();
        return;
    }
    setSpinCount(uid, count - 1);
    updateSpinCounterDisplay(uid);

    let duration = BASE_SPINNING_DURATION + randomDuration();

    for (let col of cols) { // set the animation duration for each column
        duration += COLUMN_SPINNING_DURATION + randomDuration();
        col.style.animationDuration = duration + "s";
    }

    // disable the start-button
    elem.setAttribute('disabled', true);

    // set the spinning class so the css animation starts to play
    document.getElementById('container').classList.add('spinning');

    // set the result delayed
    // this would be the right place to request the combination from the server
    window.setTimeout(setGenesisCrystal, BASE_SPINNING_DURATION * 1000 / 2);

    window.setTimeout(function () {
        // after the spinning is done, remove the class and enable the button again
        document.getElementById('container').classList.remove('spinning');

        // Show alert with the items on the row after animation ends
        let resultItems = [];
        for (let col of cols) {
            let icons = col.querySelectorAll('.icon img');
            // The visible row is the first icon in each column
            let src = icons[0].getAttribute('src');
            // Extract the item name from the src (e.g., items/sad_amber.png -> sad_amber)
            let match = src.match(/items\/(.+)\.png/);
            resultItems.push(match ? match[1] : src);
        }
        setTimeout(() => {
            showGenesisCrystalAlert();
            elem.removeAttribute('disabled');
        }, 2000);


        console.log('Result: ' + resultItems.join(' | '));
    }.bind(elem), duration * 1000);

}

/**
 * Sets the result items at the beginning and the end of the columns
 */
function setResult() {
    for (let col of cols) {

        // generate 3 random items
        let results = [
            getRandomNormalIcon(),
            getRandomNormalIcon(),
            getRandomNormalIcon()
        ];
        
        console.log('Generated items: ' + results.join(' | '));

        let icons = col.querySelectorAll('.icon img');
        // replace the first and last three items of each column with the generated items
        for (let x = 0; x < 3; x++) {
            icons[x].setAttribute('src', 'items/' + results[x] + '.png');
            icons[(icons.length - 3) + x].setAttribute('src', 'items/' + results[x] + '.png');
        }
    }
}

function setGenesisCrystal() {
    for (let col of cols) {
        // generate 3 genesis crystal items
        let results = [
            'genesis_crystal',
            getRandomIcon(),
            getRandomIcon()
        ];

        console.log('Generated items: ' + results.join(' | '));

        let icons = col.querySelectorAll('.icon img');
        // replace the first and last three items of each column with the generated items
        for (let x = 0; x < 3; x++) {
            icons[x].setAttribute('src', 'items/' + results[x] + '.png');
            icons[(icons.length - 3) + x].setAttribute('src', 'items/' + results[x] + '.png');
        }
    }
}


function setWelkinMoon() {
    for (let col of cols) {
        // generate 3 welkin moon items
        let results = [
            'welkin_moon',
            getRandomIcon(),
            getRandomIcon()
        ];

        console.log('Generated items: ' + results.join(' | '));

        let icons = col.querySelectorAll('.icon img');
        // replace the first and last three items of each column with the generated items
        for (let x = 0; x < 3; x++) {
            icons[x].setAttribute('src', 'items/' + results[x] + '.png');
            icons[(icons.length - 3) + x].setAttribute('src', 'items/' + results[x] + '.png');
        }
    }
}

// Custom Alert
function showWelkinMoonAlert() {
    // If already exists, don't add again
    if (document.getElementById('welkin-alert')) return;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'welkin-alert-overlay';
    overlay.className = 'custom-alert-overlay';
    document.body.appendChild(overlay);

    const alertDiv = document.createElement('div');
    alertDiv.id = 'welkin-alert';
    alertDiv.className = 'custom-alert';
    alertDiv.innerHTML = `
        <button class="alert-close" aria-label="Close">×</button>
        <div class="alert-content">
            <img src="items/welkin_moon.png" alt="Welkin Moon" class="alert-icon">
            <div class="alert-text">WOW! You won a Welkin-Moon!<br>The prize will be sent to<br>your account in 24 hours.</div>
        </div>
        <button class="alert-ok">OK</button>
    `;
    document.body.appendChild(alertDiv);

    // Close handlers
    alertDiv.querySelector('.alert-close').onclick = closeAlert;
    alertDiv.querySelector('.alert-ok').onclick = closeAlert;
    overlay.onclick = closeAlert;

    function closeAlert() {
        alertDiv.classList.add('hide');
        overlay.classList.add('hide');
        setTimeout(() => {
            alertDiv.remove();
            overlay.remove();
        }, 200);
    }
}

function showGenesisCrystalAlert() {
    // If already exists, don't add again
    if (document.getElementById('genesis-alert')) return;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'genesis-alert-overlay';
    overlay.className = 'custom-alert-overlay';
    document.body.appendChild(overlay);

    const alertDiv = document.createElement('div');
    alertDiv.id = 'genesis-alert';
    alertDiv.className = 'custom-alert';
    alertDiv.innerHTML = `
        <button class="alert-close" aria-label="Close">×</button>
        <div class="alert-content">
            <img src="items/genesis_crystal.png" alt="Genesis Crystal" class="alert-icon">
            <div class="alert-text">WOW! You won a 2240 Genesis Crystal!<br>The prize will be sent to<br>your account in 24 hours.</div>
        </div>
        <button class="alert-ok">OK</button>
    `;
    document.body.appendChild(alertDiv);

    // Close handlers
    alertDiv.querySelector('.alert-close').onclick = closeAlert;
    alertDiv.querySelector('.alert-ok').onclick = closeAlert;
    overlay.onclick = closeAlert;

    function closeAlert() {
        alertDiv.classList.add('hide');
        overlay.classList.add('hide');
        setTimeout(() => {
            alertDiv.remove();
            overlay.remove();
        }, 200);
    }
}

// Custom Alert for no attempts left
function showNoAttemptsAlert() {
    if (document.getElementById('welkin-alert')) return;
    const overlay = document.createElement('div');
    overlay.id = 'welkin-alert-overlay';
    overlay.className = 'custom-alert-overlay';
    document.body.appendChild(overlay);

    const alertDiv = document.createElement('div');
    alertDiv.id = 'welkin-alert';
    alertDiv.className = 'custom-alert';
    alertDiv.innerHTML = `
        <button class="alert-close" aria-label="Close">×</button>
        <div class="alert-content">
            <div class="alert-text">No attempts left!</div>
        </div>
        <button class="alert-ok">OK</button>
    `;
    document.body.appendChild(alertDiv);

    alertDiv.querySelector('.alert-close').onclick = closeAlert;
    alertDiv.querySelector('.alert-ok').onclick = closeAlert;
    overlay.onclick = closeAlert;

    function closeAlert() {
        alertDiv.classList.add('hide');
        overlay.classList.add('hide');
        setTimeout(() => {
            alertDiv.remove();
            overlay.remove();
        }, 200);
    }
}

function spinNeeded(elem) {
    let uid = getCurrentUID();
    let count = getSpinCount(uid);
    switch (count) {
        default:
            spinRandom(elem);
            break;
        case 0:
            showNoAttemptsAlert();
            break;
        case 6:
            spinWelkin(elem);
            break;
        case 4:
            spinWelkin(elem);
            break;
        case 1:
            spinGenesis(elem);
            break;

    }
}

// --- Spin Counter ---
function getSpinCount(uid) {
    if (!uid) throw new Error('UID is required for spin count');
    let spinCounts = JSON.parse(localStorage.getItem('spinCounts') || '{}');
    if (!(uid in spinCounts)) {
        spinCounts[uid] = 10;
        localStorage.setItem('spinCounts', JSON.stringify(spinCounts));
    }
    return parseInt(spinCounts[uid], 10);
}

function setSpinCount(uid, count) {
    if (!uid) throw new Error('UID is required for spin count');
    let spinCounts = JSON.parse(localStorage.getItem('spinCounts') || '{}');
    spinCounts[uid] = count;
    localStorage.setItem('spinCounts', JSON.stringify(spinCounts));
}

function updateSpinCounterDisplay(uid) {
    let counter = document.getElementById('spin-counter');
    if (!counter) return;
    counter.textContent = `Attempts left: ${getSpinCount(uid)}`;
}

// Initialize spinCounts with the first data if not present
(function initializeSpinCounts() {
    let spinCounts = JSON.parse(localStorage.getItem('spinCounts') || '{}');
    if (!('832575794' in spinCounts)) {
        spinCounts['832575794'] = 10;
        localStorage.setItem('spinCounts', JSON.stringify(spinCounts));
    }
})();

function getRandomIcon() {
    return ICONS[Math.floor(Math.random() * ICONS.length)];
}

function getRandomNormalIcon() {
    // Exclude special items
    const excluded = ['genesis_crystal', 'primogem', 'welkin_moon', 'mora'];
    const normalIcons = ICONS.filter(icon => !excluded.includes(icon));
    return normalIcons[Math.floor(Math.random() * normalIcons.length)];
}

/**
 * @returns {number} 0.00 to 0.09 inclusive
 */
function randomDuration() {
    return Math.floor(Math.random() * 10) / 100;
}
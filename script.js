const loadIcon = document.querySelector('.loadIcon');
let accounts;
let accountId;

const presentation = document.querySelector('.presentation');
presentation.addEventListener('click', () => {
    start(presentation);
});

const cardSection = document.querySelector('.cardSection');
const cardNumber = document.querySelector('#cardNumber');
const confirmCardNumber = document.querySelector('#confirmCardNumber'); 
const btnNewCard = document.querySelector('#btnNewCard');
btnNewCard.addEventListener('click', () => {
    newCardPanel();
});
confirmCardNumber.addEventListener('click', () => {
    loadScreen(cardSection);
    setTimeout(() => {
        let finded = false;
        accounts.forEach(account => {
            if (account.cardNumber === cardNumber.value) {
                finded = true;
                accountId = account.id;
                cardNumber.textContent = "";
                keyPanel();
            }
        });
        if (!finded) {
            Swal.fire({
                icon: "error",
                title: "La número de tarjeta que has ingresado no existe, por favor, intente nuevamente.",
                text: "Something went wrong!"
            });
        }
        unloadScreen(cardSection);
    }, 1000);

});

const keySection = document.querySelector('.keySection');
const keyButton = document.querySelectorAll('.keyButton');
const backspace = document.querySelector('.backspace');
const inputKey = document.querySelector('#inputKey');
const confirmKey = document.querySelector('#confirmKey');
let countKeyButtons = 0;
keyButton.forEach(btn => {
    btn.addEventListener('click', () => {
        if (countKeyButtons < 3) {
            countKeyButtons++;

            if (countKeyButtons === 3) {
                inputKey.value += btn.textContent;
                confirmKey.disabled = false;
            } else {
                inputKey.value += btn.textContent + '---';
            }

        }
    });
});

backspace.addEventListener('click', () => {
    if (countKeyButtons > 0) {
        countKeyButtons--;

        if (countKeyButtons < 2) {
            inputKey.value = inputKey.value.slice(0,-6);
        } else if (countKeyButtons === 2) {
            inputKey.value = inputKey.value.slice(0,-3);
            confirmKey.disabled = true;
        }
    } 
});

confirmKey.addEventListener('click', () => {
    loadScreen(keySection);
    setTimeout(() => {
        if (inputKey.value === accounts[accountId].key) {
            localStorage.setItem('id', accounts[accountId].id);
            localStorage.setItem('name', accounts[accountId].name);
            localStorage.setItem('cash', accounts[accountId].cash);
            localStorage.setItem('cardNumber', accounts[accountId].cardNumber);
            localStorage.setItem('key', accounts[accountId].key);
            localStorage.setItem('bank', accounts[accountId].bank);
            localStorage.setItem('CBU', accounts[accountId].CBU);
            localStorage.setItem('alias', accounts[accountId].alias);
            inputKey.textContent = "";
            menuSection(keySection);
        } else {
            Swal.fire({
                icon: "error",
                title: "La clave suministrada es incorrectada, por favor, intente nuevamente.",
                text: "Something went wrong!"
            });
        }
        unloadScreen(keySection);
    }, 1000);
});

const newCardSection = document.querySelector('.newCardSection');
const newCard = document.querySelector('#newCard');
const newKey = document.querySelector('#newKey');
const newCBU = document.querySelector('#newCBU');
const newAlias = document.querySelector('#newAlias');
const newName = document.querySelector('#newName');
const confirmNewCard = document.querySelector('#confirmNewCard');
let tempCard;
let tempKey;
let tempCBU;
let tempAlias;
confirmNewCard.addEventListener('click', () => {
    loadScreen(newCardSection);
    setTimeout(() => {
        accounts.push({
            "id" : accounts.length,
            "name" : newName.value,
            "cash" : 0,
            "cardNumber" : tempCard.toString(),
            "key" : tempKey,
            "bank" : 'Concordia 1556',
            "CBU" : tempCBU.toString(),
            "alias" : tempAlias
        });
        newName.textContent = "";
        
        start(newCardSection);
    });
});

const menu = document.querySelector('.menu');
const menuName = document.querySelector('.menuName');
const cash = document.querySelector('.cash');
const btnExtract = document.querySelector('#btnExtract');
const btnDeposit = document.querySelector('#btnDeposit');
const btnTransfer = document.querySelector('#btnTransfer');
const btnProfile = document.querySelector('#btnProfile');
const btnLogout = document.querySelector('#btnLogout');
const arrowBack = document.querySelectorAll('.arrowBack');
arrowBack.forEach(arrow => {
    arrow.addEventListener('click', backToMenu);
});
btnExtract.addEventListener('click', () => {
    extractSection();
});
btnDeposit.addEventListener('click', () => {
    depositSection();
});
btnTransfer.addEventListener('click', () => {
    transferSection();
});
btnProfile.addEventListener('click', () => {
    profileSection();
});
btnLogout.addEventListener('click', () => {
    loadScreen(menu);
    setTimeout(() => {
        localStorage.clear();
        firstPanel();
    }, 1000);
});

const extract = document.querySelector('.extract');
const extractAmount = document.querySelector('#extractAmount');
const confirmExtract = document.querySelector('#confirmExtract');
confirmExtract.addEventListener('click', () => {
    if (parseInt(extractAmount.value) <= localStorage.cash) {
        loadScreen(extract);
        setTimeout(() => {
            localStorage.cash = parseInt(localStorage.cash) - parseInt(extractAmount.value);
            accounts[accountId].cash = localStorage.cash;
            extractAmount.textContent = "";
            menuSection(extract);
        }, 2000);
    }
});

const deposit = document.querySelector('.deposit');
const depositAmount = document.querySelector('#depositAmount');
const confirmDeposit = document.querySelector('#confirmDeposit');
confirmDeposit.addEventListener('click', () => {
    loadScreen(deposit);
    setTimeout(() => {
        localStorage.cash = parseInt(localStorage.cash) + parseInt(depositAmount.value);
        accounts[accountId].cash = localStorage.cash;
        depositAmount.textContent = "";
        menuSection(deposit);
    }, 2000)
})

const transfer = document.querySelector('.transfer');
const typeBank = document.querySelectorAll('.inputTypeBank');
const aliasCBU = document.querySelector('#aliasCBU');
const transferAmount = document.querySelector('#transferAmount');
const confirmTransfer = document.querySelector('#confirmTransfer');
confirmTransfer.addEventListener('click', () => {
    loadScreen(transfer);
    setTimeout(() => {
        if (typeBank[0].checked) {
            let existAlias = false;
            let aliasId;
            accounts.forEach(account => {
                if (account.alias === aliasCBU.value) {
                    existAlias = true;
                    aliasId = account.id;
                }
            });
            if (existAlias) {
                makeTransfer(aliasId);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "El alias ingresado no existe, intente nuevamente con otra clave",
                    text: "Something went wrong!"
                });
            }
        } else {
            let existCBU = false;
            let CBUId;
            accounts.forEach(account => {
                if (account.CBU === aliasCBU.value) {
                    existCBU = true;
                    CBUId = account.id;
                }
            });
            if (existCBU) {
                makeTransfer(CBUId);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "El CBU ingresado no existe, intente nuevamente con otra clave",
                    text: "Something went wrong!"
                });
            }
        }
        unloadScreen(transfer);
    }, 2000);
});

const profile = document.querySelector('.profile');
const bankLocation = document.querySelector('#bankLocation');
const typeAccount = document.querySelector('#typeAccount');
const profileCBU = document.querySelector('#profileCBU');
const profileAlias = document.querySelector('#profileAlias');
const saveProfile = document.querySelector('#saveProfile');
saveProfile.addEventListener('click', () => {
    localStorage.CBU = profileCBU.value;
    accounts[accountId] = localStorage.CBU;
    localStorage.alias = profileAlias.value;
    accounts[accountId] = localStorage.alias;
});


async function readAccounts() {
    const file = await fetch('./accounts.json');
    const json = await file.json();
    accounts = await json;
}

async function getRandomWords() {
    const words = await fetch('https://random-word-api.herokuapp.com/word?lang=es&number=3&length=5');
    const json = await words.json();
    return json;
}

function loadScreen(panel) {
    panel.style.opacity = '0.3';
    loadIcon.style.zIndex = '999';
    loadIcon.style.opacity = '1';
}

function unloadScreen(panel) {
    panel.style.opacity = '1';
    loadIcon.style.display = 'none';
    loadIcon.style.opacity = '0';
    setTimeout(() => {
        loadIcon.style.zIndex = '-999';
        loadIcon.style.display = 'block';
    }, 1000);
}

function changePanel(panel1, panel2) {
    unloadScreen(panel1);
    panel1.style.display = 'none';
    panel2.style.display = 'flex';
}

function backToMenu() {
    changePanel(extract, menu);
    changePanel(deposit, menu);
    changePanel(transfer, menu);
    changePanel(profile, menu);
}

function firstPanel() {
    changePanel(menu, presentation);
}

function start(previousPanel) {
    loadScreen(previousPanel);
    setTimeout(() => {
        changePanel(previousPanel, cardSection);
    }, 5000);
}

function keyPanel() {
    changePanel(cardSection, keySection);
}

async function newCardPanel() {
    const accountsCardNumbers = [];
    const accountsCBUs = [];
    const accountsAliases = [];
    accounts.forEach(account => {
        accountsCardNumbers.push(account.cardNumber);
        accountsCBUs.push(account.CBU);
        accountsAliases.push(account.alias);
    });
    do {
        tempCard = Math.floor(Math.random() * (9999999999999999 - 1000000000000000) + 1000000000000000);
    } while (accountsCardNumbers.includes(tempCard));
    tempKey = `${keyButton[Math.floor(Math.random() * 8)].textContent}---${keyButton[Math.floor(Math.random() * 8)].textContent}---${keyButton[Math.floor(Math.random() * 8)].textContent}`;
    do {
        tempCBU = Math.floor(Math.random() * (999999999999999999999 - 100000000000000000000) + 100000000000000000000);
    } while (accountsCBUs.includes(tempCard));
    do {
        const randWords = await getRandomWords();
        tempAlias = `${randWords[0].toUpperCase()}.${randWords[1].toUpperCase()}.${randWords[2].toUpperCase()}`;
    } while (accountsAliases.includes(tempAlias));

    newCard.textContent = tempCard;
    newKey.textContent = tempKey;
    newCBU.textContent = tempCBU;
    newAlias.textContent = tempAlias;

    changePanel(cardSection, newCardSection);
}

function menuSection(previousPanel) {
    menuName.textContent = localStorage.name;
    cash.textContent = localStorage.cash;

    changePanel(previousPanel, menu);
}

function extractSection() {
    loadScreen(menu);

    setTimeout(() => {
        changePanel(menu, extract);
    }, 1000);
}

function depositSection() {
    loadScreen(menu);

    setTimeout(() => {
        changePanel(menu, deposit);
    }, 1000);
}

function transferSection() {
    loadScreen(menu);

    setTimeout(() => {
        changePanel(menu, transfer);
    }, 1000);
}

function makeTransfer(idReceptor) {
    const transf = parseInt(transferAmount.value);
    localStorage.cash = parseInt(localStorage.cash) - transf;
    accounts[accountId].cash = localStorage.cash;
    accounts[idReceptor].cash = parseInt(accounts[idReceptor].cash) + transf;
    aliasCBU.textContent = "";
    transferAmount.textContent = "";
    menuSection(transfer);
}

function profileSection() {
    loadScreen(menu);

    setTimeout(() => {
        bankLocation.textContent = localStorage.bank;
        profileCBU.value = localStorage.CBU;
        profileAlias.value = localStorage.alias;

        changePanel(menu, profile);
    }, 1000);
}

readAccounts();

if (localStorage.length > 0) {
    menuSection(presentation);
} else {
    firstPanel();
}
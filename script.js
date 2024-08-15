const presentation = document.querySelector(".presentation");
presentation.addEventListener("click", () => {
    start(presentation)
});

const cardSection = document.querySelector(".cardSection");
const cardNumber = document.querySelector("#cardNumber");
const confirmCardNumber = document.querySelector("#confirmCardNumber"); 
const btnNewCard = document.querySelector("#btnNewCard");
btnNewCard.addEventListener("click", () => {
    newCardPanel();
});
confirmCardNumber.addEventListener("click", () => {
    if (accountCardNumber.includes(cardNumber.value)) {
        accountId = accountCardNumber.indexOf(cardNumber.value);
        keyPanel();
    }
});

const keySection = document.querySelector(".keySection");
const keyButton = document.querySelectorAll(".keyButton");
const backspace = document.querySelector(".backspace");
const inputKey = document.querySelector("#inputKey");
const confirmKey = document.querySelector("#confirmKey");
let countKeyButtons = 0;
keyButton.forEach(btn => {
    btn.addEventListener("click", () => {
        if (countKeyButtons < 3) {
            countKeyButtons++;

            if (countKeyButtons === 3) {
                inputKey.value += btn.textContent;
                confirmKey.disabled = false;
            } else {
                inputKey.value += btn.textContent + "---";
            }

        }
    });
});

backspace.addEventListener("click", () => {
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

confirmKey.addEventListener("click", () => {
    if (inputKey.value === accountKey[accountId]) {
        menuSection(keySection);
    }
});

const newCardSection = document.querySelector(".newCardSection");
const newCard = document.querySelector("#newCard");
const newKey = document.querySelector("#newKey");
const newCBU = document.querySelector("#newCBU");
const newAlias = document.querySelector("#newAlias");
const newName = document.querySelector("#newName");
const confirmNewCard = document.querySelector("#confirmNewCard");
let tempCard;
let tempKey;
let tempCBU;
confirmNewCard.addEventListener("click", () => {
    if (accountAlias.includes(newAlias)) {

    } else {
        accountCardNumber.push(tempCard.toString());
        accountKey.push(tempKey);
        accountCBU.push(tempCBU.toString());
        accountAlias.push(newAlias.value);
        accountName.push(newName.value);
        accountBank.push('Concordia 1556');
        accountCash.push(0);
        
        start(newCardSection);
    }
});

const menu = document.querySelector(".menu");
const menuName = document.querySelector(".menuName");
const cash = document.querySelector(".cash");
const btnExtract = document.querySelector("#btnExtract");
const btnDeposit = document.querySelector("#btnDeposit");
const btnTransfer = document.querySelector("#btnTransfer");
const btnProfile = document.querySelector("#btnProfile");
const btnLogout = document.querySelector("#btnLogout");
const arrowBack = document.querySelectorAll(".arrowBack");
arrowBack.forEach(arrow => {
    arrow.addEventListener("click", backToMenu);
});
btnExtract.addEventListener("click", () => {
    extractSection();
});
btnDeposit.addEventListener("click", () => {
    depositSection();
});
btnTransfer.addEventListener("click", () => {
    transferSection();
});
btnProfile.addEventListener("click", () => {
    profileSection();
});
btnLogout.addEventListener("click", () => {
    firstPanel();
});

const extract = document.querySelector(".extract");
const extractAmount = document.querySelector("#extractAmount");
const confirmExtract = document.querySelector("#confirmExtract");
confirmExtract.addEventListener("click", () => {
    if (parseInt(extractAmount.value) <= accountCash[accountId]) {
        accountCash[accountId] -= parseInt(extractAmount.value);
        menuSection(extract);
    }
});

const deposit = document.querySelector(".deposit");
const depositAmount = document.querySelector("#depositAmount");
const confirmDeposit = document.querySelector("#confirmDeposit");
confirmDeposit.addEventListener("click", () => {
    accountCash[accountId] += parseInt(depositAmount.value);
    menuSection(deposit);
})

const transfer = document.querySelector(".transfer");
const typeBank = document.querySelectorAll(".inputTypeBank");
const aliasCBU = document.querySelector("#aliasCBU");
const transferAmount = document.querySelector("#transferAmount");
const confirmTransfer = document.querySelector("#confirmTransfer");
confirmTransfer.addEventListener("click", () => {
    if (typeBank[0].checked) {
        if (accountAlias.includes(aliasCBU.value)) {
            makeTransfer(accountAlias.indexOf(aliasCBU.value));
        } else {

        }
    } else {
        if (accountCBU.includes(accountCBU.value)) {
            makeTransfer(accountCBU.indexOf(aliasCBU.value));
        } else {

        }
    }
});

const profile = document.querySelector(".profile");
const bankLocation = document.querySelector("#bankLocation");
const typeAccount = document.querySelector("#typeAccount");
const profileCBU = document.querySelector("#profileCBU");
const profileAlias = document.querySelector("#profileAlias");
const saveProfile = document.querySelector("#saveProfile");
saveProfile.addEventListener("click", () => {
    accountCBU[accountId] = profileCBU.value;
    accountAlias[accountId] = profileAlias.value;
});

const accountCardNumber = ['0000000000000000', '1000000000000000'];
const accountKey = ['PGT---PGT---PGT', 'VUA---VUA---VUA'];
const accountName = ['John Doe', 'Jane Doe'];
const accountCash = [100000, 100000];
const accountBank = ['Avenida Maipú 587', 'Avenida Córdoba 4080'];
const accountCBU = ['137524000687943156888', '543800871325468021633'];
const accountAlias = ['BARCO.CASA.NARANJA', 'CANOA.TECHO.PISO'];
let accountId;

function changePanel(panel1, panel2) {
    panel1.style.display = "none";
    panel2.style.display = "flex";
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
    changePanel(previousPanel, cardSection);
}

function keyPanel() {
    changePanel(cardSection, keySection);
}

function newCardPanel() {
    do {
        tempCard = Math.floor(Math.random() * (9999999999999999 - 1000000000000000) + 1000000000000000);
    } while (accountCardNumber.includes(tempCard));
    tempKey = `${keyButton[Math.floor(Math.random() * 8)].textContent}---${keyButton[Math.floor(Math.random() * 8)].textContent}---${keyButton[Math.floor(Math.random() * 8)].textContent}`;
    do {
        tempCBU = Math.floor(Math.random() * (999999999999999999999 - 100000000000000000000) + 100000000000000000000);
    } while (accountCBU.includes(tempCard));

    newCard.textContent = tempCard;
    newKey.textContent = tempKey;
    newCBU.textContent = tempCBU;

    changePanel(cardSection, newCardSection);
}

function menuSection(previousPanel) {
    menuName.textContent = accountName[accountId];
    cash.textContent = accountCash[accountId];

    changePanel(previousPanel, menu);
}

function extractSection() {
    changePanel(menu, extract);
}

function depositSection() {
    changePanel(menu, deposit);
}

function transferSection() {
    changePanel(menu, transfer);
}

function makeTransfer(idReceptor) {
    const transf = parseInt(transferAmount.value);
    accountCash[accountId] -= transf;
    accountCash[idReceptor] += transf;
    menuSection(transfer);
}

function profileSection() {
    bankLocation.textContent = accountBank[accountId];
    profileCBU.value = accountCBU[accountId];
    profileAlias.value = accountAlias[accountId];

    changePanel(menu, profile);
}

firstPanel();
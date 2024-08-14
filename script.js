const firstStage = document.querySelector(".firstStage");
firstStage.style.display = "block";

firstStage.addEventListener("click", () => {

    firstStage.style.display = "none";
    const secondStage = document.querySelector(".secondStage");
    secondStage.style.display = "block";

    const keyButton = document.querySelectorAll(".keyButton");
    const backspace = document.querySelector(".backspace");
    const textBox = document.querySelector(".textBox");
    const confirmKey = document.querySelector("#confirmKey");
    let countKeyButtons = 0;

    keyButton.forEach(btn => {
        btn.addEventListener("click", () => {
            if (countKeyButtons < 3) {
                countKeyButtons++;

                if (countKeyButtons === 3) {
                    textBox.value += btn.textContent;
                    confirmKey.disabled = false;
                } else {
                    textBox.value += btn.textContent + "---";
                }

            }
        });
    });

    backspace.addEventListener("click", () => {
        if (countKeyButtons > 0) {
            countKeyButtons--;

            if (countKeyButtons < 2) {
                textBox.value = textBox.value.slice(0,-6);
            } else if (countKeyButtons === 2) {
                textBox.value = textBox.value.slice(0,-3);
                confirmKey.disabled = true;
            }
        } 
    });

    confirmKey.addEventListener("click", () => {
        if (textBox.value === "PGT---PGT---PGT") {
            
            const menu = document.querySelector(".menu");
            secondStage.style.display = "none";
            menu.style.display = "block";

        }
    });

});
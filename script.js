const firstStage = document.querySelector(".firstStage");

firstStage.addEventListener("click", () => {
    firstStage.style.display = "none";
    document.querySelector(".secondStage").style.display = "block";

    const keyButton = document.querySelectorAll(".keyButton");
    const backspace = document.querySelector(".backspace");
    const textBox = document.querySelector(".textBox");
    const confirm = document.querySelector(".confirm");
    let countKeyButtons = 0;

    keyButton.forEach(btn => {
        btn.addEventListener("click", () => {
            if (countKeyButtons < 3) {
                countKeyButtons++;

                if (countKeyButtons === 3) {
                    textBox.value += btn.textContent;
                    confirm.disabled = false;
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
                confirm.disabled = true;
            }
        } 
    });

    confirm.addEventListener("click", () => {
        if (textBox.value === "PGT---PGT---PGT") {
            window.location.href = "/menu";
        }
    });
});
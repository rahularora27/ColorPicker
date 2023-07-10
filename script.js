const pickerBtn = document.querySelector("#picker-btn");
const clearAll = document.querySelector(".clear-all");
const colorList = document.querySelector(".all-colors");
const selectedColors = JSON.parse(localStorage.getItem("selected-colors") || "[]");

const copyColor = (elem) => {
    elem.innerText = "Copied";
    navigator.clipboard.writeText(elem.dataset.color);
    setTimeout(() => elem.innerText = elem.dataset.color, 1000);
}

const showColor = () => {
    if(!selectedColors.length) return;
    colorList.innerHTML = selectedColors.map(color => `
        <li class="color">
            <span class="rectangle" style="background: ${color}; border: 1px solid ${color == "#ffffff" ? "#ccc": color}"></span>
            <span class="value hex" data-color="${color}">${color}</span>
        </li>
    `).join("");
    document.querySelector(".selected-colors").classList.remove("hide");

    document.querySelectorAll(".color").forEach(li => {
        li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));
    });
}
showColor();

const activateEyeDropper = () => {
    document.body.style.display = "none";
    setTimeout(async () => {
        try {
            const eyeDropper = new EyeDropper();
            const { sRGBHex } = await eyeDropper.open();
            navigator.clipboard.writeText(sRGBHex);

            if(!selectedColors.includes(sRGBHex)) {
                selectedColors.push(sRGBHex);
                localStorage.setItem("selected-colors", JSON.stringify(selectedColors));
                showColor();
            }
        } catch (error) {
            alert("Failed to copy the color code!");
        }
        document.body.style.display = "block";
    }, 10);
}

const clearAllColors = () => {
    selectedColors.length = 0;
    localStorage.setItem("selected-colors", JSON.stringify(selectedColors));
    document.querySelector(".selected-colors").classList.add("hide");
}

clearAll.addEventListener("click", clearAllColors);
pickerBtn.addEventListener("click", activateEyeDropper);
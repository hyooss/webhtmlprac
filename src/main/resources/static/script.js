const buttonContainer = document.getElementById("buttonContainer");
const selectedDisplay = document.getElementById("selectedDisplay");
const hist = document.getElementById("histories");
const backBtn = document.getElementById("backBtn");
const forwardBtn = document.getElementById("forwardBtn");

let historyList = [];
let currentIndex = -1;
let selectedButton = null;

function applySelection(num) {
    if (selectedButton) {
        selectedButton.classList.remove("selected");
    }

    const target = [...document.querySelectorAll("button")].find(
        btn => parseInt(btn.textContent) === num
    );
    if (!target) return;

    target.classList.add("selected");
    selectedButton = target;
    selectedDisplay.textContent = num;

    const newUrl = `${window.location.pathname}?btn=${num}`;
    history.replaceState(null, "", newUrl);

    updateHistory();
}

function updateHistory() {
    const shown = historyList
        .slice(0, currentIndex + 1)  // 현재 위치까지만 잘라서
        .map((num, idx) => idx === currentIndex ? `[${num}]` : `${num}`)
        .join(" → ");
    hist.textContent = shown;
}

function handleClick(num) {
    if (currentIndex < historyList.length - 1) {
        historyList = historyList.slice(0, currentIndex + 1);
    }
    historyList.push(num);
    currentIndex++;
    applySelection(num);
}

function goBack() {
    if (currentIndex > 0) {
        currentIndex--;
        applySelection(historyList[currentIndex]);
    }
}

function goForward() {
    if (currentIndex < historyList.length - 1) {
        currentIndex++;
        applySelection(historyList[currentIndex]);

    }
}

// 버튼 생성 및 이벤트 등록 (1~100)
for (let i = 1; i <= 100; i++) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = i.toString();
    btn.addEventListener("click", () => handleClick(i));
    buttonContainer.appendChild(btn);
}

backBtn.addEventListener("click", goBack);
forwardBtn.addEventListener("click", goForward);
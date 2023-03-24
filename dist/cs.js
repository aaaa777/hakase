let selectedText = "";
const extensionIdPrefix = "hkext-";
const buttonId = extensionIdPrefix + "selected-text-button";
const popupId = extensionIdPrefix + "selected-popup";
const popupCloseButtonId = extensionIdPrefix + "close-bottun";

const messageExecLineWithSSH = "sshで実行";

const createPopupElement = function() {
    let popup = document.createElement("div");
    popup.id = popupId;
    popup.innerHTML = `
        <button id=${buttonId}>${messageExecLineWithSSH}</button><button id="${popupCloseButtonId}">x</button>
    `;
    popup.padding = "0";
    return popup;
    
}

// テキストの選択範囲の座標を取得する関数
function getSelectionCoords() {
    var sel = window.getSelection();
    var range = sel.getRangeAt(0).cloneRange();
    range.collapse(true);
  
    var rect = range.getClientRects()[0];
    if (!rect) {
      rect = range.startContainer.getBoundingClientRect();
    }
  
    return { x: rect.left, y: rect.top + sel.toString().split('\n').length * 18 };
}

const checkButtonOnMouseUp = function(event) {
    let lastSelectedText = selectedText;
    selectedText = window.getSelection().toString().trim();
    let button = document.getElementById(buttonId);
    if (selectedText !== "") {
        let newButton;

        if (!button) {
            // newButton = document.createElement("button");
            newButton = createPopupElement();
        } else {
            newButton = button;
        }
        newButton.id = buttonId;
        //newButton.innerHTML = "SSHで実行";
        newButton.style.position = "absolute";
        newButton.style.zIndex = "999";
        newButton.style.display = "block";
        // newButton.style.padding = "10px";
        newButton.style.backgroundColor = "green";
        newButton.style.color = "white";
        
        if (lastSelectedText !== selectedText) {
            newButton.style.top = event.pageY + 10 + "px";
            newButton.style.left = event.pageX + 10 + "px";
        }
        document.body.appendChild(newButton);
        
    } else {
        if (button && selectedText === "") {
            button.parentNode.removeChild(button);
        }
    }
}

const checkButtonOnMouseDown = function(event) {
    let button = document.getElementById(buttonId);
    if (event.target.id === buttonId) {
        console.log(selectedText);
    }
    selectedText = selectedText = window.getSelection().toString().trim();
    if (button && selectedText === "") {   
        button.parentNode.removeChild(button);
    }
}

document.addEventListener("mouseup", checkButtonOnMouseUp);

document.addEventListener("mousedown", checkButtonOnMouseDown);
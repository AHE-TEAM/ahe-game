function mask(){
    var e = window.top.document;
    var link = e.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = localStorage.getItem("maskURL");
    e.getElementsByTagName('head')[0].appendChild(link);
    e.title = localStorage.getItem("maskTitle");
}

function addCss(){
    const e = document.createElement('style');
    e.innerHTML = `
    :root {
        --bg-color: #2f3136;
        --second-bg-color: #202225;
        --font-color: #dcddde;
        --block-color: #36393f;
        --hover-color: #565b65;
        --main-font: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        --second-font: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
      }
      
      [data-theme="light"] {
        --bg-color: #e4e5f1;
        --second-bg-color: #9394a5;
        --font-color: #202225;
        --block-color: #dcddde;
        --hover-color: #fafafa;
      }
      
    button.in-game-button {
        cursor: pointer;
        position: absolute;
        z-index: 9999;
        top: 61px;
        left: 0;
        width: 75px;
        height: 50px;
        background: var(--hover-color);
        border-radius: 0 290486px 290486px 0;
        color: #000;
        padding: 0 10px;
        line-height: 50px;
        min-height: 50px;
        border: none;
        border-bottom: 3px solid var(--font-color);
        will-change: transform;
        animation: bounceY 2s .5s;
        transition: transform .5s cubic-bezier(.55,0,.1,1);
        display: flex;
        align-items: center;
        justify-content: center
    }
    
    button.in-game-button svg {
        pointer-events: none;
        color: var(--font-color);
        margin-right: .625rem;
        display: inline-block
    }
    
    button.in-game-button img {
        pointer-events: none;
        width: 33px
    }
    
    button.in-game-button:active {
        background: #aaa
    }
    
    button.in-game-button[attr-active=true] {
        transform: translateX(0)
    }

    button.in-game-button:not(hover) {
        transform: translateX(-32px)
    }

    button.in-game-button:hover {
        transform: translateX(0px)
    }
    
    @media(max-height: 350px) and (orientation:landscape) {
        button.in-game-button[attr-active=true] {
            transform:translateX(-75px)
        }
    }
    
    button.in-game-button[attr-snapped=true] svg {
        display: none
    }
    
    button.in-game-button[attr-snapped=true] img {
        transform: translate(-5px)
    }

    #refresh{right:0;border-radius: 290486px 0 0 290486px;left:auto}

    #refresh:not(hover) {
        transform: translateX(32px);
    }

    #refresh:hover {
        transform: translateX(0px);
    }
    `;  
    document.getElementsByTagName('head')[0].appendChild(e);
}

function addBtnHome(){
    var e = document.createElement('button');
    e.className = 'in-game-button';
    e.id = 'inGame';
    e.innerHTML = `
    <svg class="svg-inline--fa fa-chevron-left fa-w-10" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg>
    <img src="/favicon.png" width="36" height="36" alt="Logo">
    `;
    document.getElementsByTagName('body')[0].appendChild(e);
}

function addBtnRefresh() {
    var e = document.createElement('button');
    e.className = 'in-game-button';
    e.id = "refresh";
    e.innerHTML = `
    <img src="/refresh.png" width="40" height="36" alt="Logo">
    <svg class="svg-inline--fa fa-chevron-left fa-w-10" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="#565b65" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg>
    `;
    document.getElementsByTagName('body')[0].appendChild(e);
}

if (window.location.pathname != "/games/") {
    window.addEventListener('load', function() {
        addCss();
        addBtnHome();
        addBtnRefresh();
        var btn = document.getElementById("inGame");
        btn.addEventListener("click", returnHome);
        dragElement(document.getElementById("inGame"));
        var rfrsh = document.getElementById("refresh");
        rfrsh.addEventListener("click", refreshPage);
        dragElement(document.getElementById("refresh"));
    });

    var hold = false;
    var click = 0;
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id)) {
        document.getElementById(elmnt.id).onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function returnHome(){
    location.href = "/games";
}

function refreshPage() {
    location.reload();
}

// CryptoJS ve save/load fonksiyonları korunuyor
var cjs = document.createElement("script");
cjs.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js";
document.head.appendChild(cjs);

// Buradan sonrası otomatik kaydetme, upload/download, auto xp vs. orijinal gibi kalıyor
// Cloak ve makeclone() tamamen kaldırıldı

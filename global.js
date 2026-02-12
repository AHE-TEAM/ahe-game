// MASK (favicon ve title)
function mask(){
    var e = window.top.document;
    var link = e.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = localStorage.getItem("maskURL") || "/favicon.png";
    e.getElementsByTagName('head')[0].appendChild(link);
    e.title = localStorage.getItem("maskTitle") || "MonkeyGG2";
}

// CSS ekleme
function addCss(){
    const e = document.createElement('style');
    e.innerHTML = `
    :root { --bg-color:#2f3136; --font-color:#dcddde; --hover-color:#565b65; }
    button.in-game-button { cursor:pointer; position:absolute; z-index:9999; top:61px; left:0; width:75px; height:50px; background:var(--hover-color); border:none; color:#000; display:flex; align-items:center; justify-content:center; }
    `;
    document.head.appendChild(e);
}

// In-game butonları
function addBtnHome(){
    var e = document.createElement('button');
    e.className = 'in-game-button';
    e.id = 'inGame';
    e.innerHTML = '<img src="/favicon.png" width="36" height="36" alt="Logo">';
    document.body.appendChild(e);
}

function addBtnRefresh() {
    var e = document.createElement('button');
    e.className = 'in-game-button';
    e.id = "refresh";
    e.innerHTML = '<img src="/refresh.png" width="40" height="36" alt="Logo">';
    document.body.appendChild(e);
}

// Drag fonksiyonu
function dragElement(elmnt) {
    var pos1=0,pos2=0,pos3=0,pos4=0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e){
        e.preventDefault();
        pos3 = e.clientX; pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e){
        e.preventDefault();
        pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY;
        pos3 = e.clientX; pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    }

    function closeDragElement(){
        document.onmouseup=null;
        document.onmousemove=null;
    }
}

// Buton işlemleri
function returnHome(){ location.href = "/games"; }
function refreshPage(){ location.reload(); }

// Başlat
window.addEventListener('load', function(){
    addCss(); addBtnHome(); addBtnRefresh();
    var btn=document.getElementById("inGame");
    btn.addEventListener("click", returnHome); dragElement(btn);
    var rfrsh=document.getElementById("refresh");
    rfrsh.addEventListener("click", refreshPage); dragElement(rfrsh);
});

// Mask ayarları
if(localStorage.getItem("mask")=='true'){ mask(); }

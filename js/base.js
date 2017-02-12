function $(id) {
    return document.querySelector('#' + id);
}

function shuffle(arr) {
    return arr.sort(shuffle.randomSort);
}
shuffle.randomSort = function(a, b) {
    return Math.random() > 0.5 ? 1 : -1;
};
var Fade = {
    In: function(obj) {
        Fade.init(obj, 0, 100, 1000);
        return obj;
    },
    Out: function(obj) {
        Fade.init(obj, 100, 0, 1000);
        return obj;
    },
    init: function(obj, start, finish, time) {
        var num = Math.ceil(time / 50);
        for (var i = 0; i < num; i++) {
            (function() {
                var t = i * 50;
                setTimeout(() => {
                    Fade.setOpacity(obj, Math.ceil(Tween.Cubic.easeIn(start, finish - start, t, time)));
                }, t);
            })();
        }
        setTimeout(() => {
            Fade.setOpacity(obj, finish);
        }, i * 50);
    },
    setOpacity: function(obj, opacity) {
        obj.style.opacity = opacity / 100;
        return this;
    }
};
window.onload = loading;

function loading() {
    var progress = $("progress");
    for (var i = 0; i < 200; i++) {
        (function() {
            var t = i * 50;
            setTimeout(() => {
                progress.style.width = Tween.Circ.easeInOut(8, 240, t, 10000) + "px";
            }, t);
        })();
    }
    setTimeout(() => {
        Fade.Out(progress.parentNode);
        setTimeout(() => {
            progress.parentNode.parentNode.removeChild(progress.parentNode);
            progress = null;
            welcome();
        }, 1500);
    }, i * 50);
    var tempArr = [];
    for (var i = 1; i < 13; i++) {
        tempArr.push(document.createElement("IMG")).src = "images/square/" + i + ".png";
    }
    tempArr.push(document.createElement("IMG")).src = "images/start2.jpg";
    tempArr.push(document.createElement("IMG")).src = "images/start2.jpg";
    tempArr.push(document.createElement("IMG")).src = "images/gameAreaBg.jpg";
    initTable();
}

function welcome() {
    var header = $("header");
    var startButton = $("startButton");
    var welcomeDiv = $("welcomeDiv");
    Fade.In(welcomeDiv);
    Fade.setOpacity(welcomeDiv, 0);
    welcomeDiv.style.display = "block";

    setTimeout(() => {
        header.style.display = "block";
        startButton.style.display = "block";
        startButton.onclick = function() {
            startButton.onclick = null;
            Fade.Out(welcomeDiv);
            setTimeout(() => {
                welcomeDiv.parentNode.removeChild(welcomeDiv);
                startGame();
            }, 1000);
            return false;
        };
        for (var i = 0; i < 200; i++) {
            (function() {
                var t = i * 50;
                setTimeout(() => {
                    header.style.top = Math.ceil(Tween.Elastic.easeOut(0, 130, t, 1000)) + "px";
                }, t);
                setTimeout(() => {
                    startButton.style.top = Math.ceil(Tween.Elastic.easeOut(0, 360, t, 1000)) + "px";
                }, t + 600);
            })();
        }
    }, 1000);
}

function startGame() {
    var gameContent = $("gameContent");
    window.gamePause = false;
    Fade.setOpacity(gameContent, 0).In(gameContent).style.display = "block";
    var score = $("score");
    var success = $("success");
    var mission = $("mission");
    var combo = $("combo");
    score.innerHTML = success.innerHTML = mission.innerHTML = combo.innerHTML = "0";
    var progress = $("leftProgress").firstChild;
    progress.style.width = "280px";
    initProgress();
    initMission();
}

function initTable() {
    var table = $("gameTable");
    while (table.rows.length) {
        table.deleteRow(0);
    }
    window.curPics = {};
    window.comboTimes = 0;
    table.onclick = showPic;
    for (var i = 0; i < 3; i++) {
        var row = table.insertRow(table.rows.length);
        for (var j = 0; j < 7; j++) {
            var img = document.createElement("img");
            var preloadImg = document.createElement("img");
            img.alt = img.title = "Hit";
            img.src = "images/square/normal.png";
            img.pic = Math.ceil(Math.random() * 4);
            preloadImg.src = "images/square/" + img.pic + ".png";
            row.insertCell(row.cells.length).appendChild(img);
        }
    }

}

function initProgress() {
    if (window.gamePause) return;
    var table = $("gameTable");
    var progress = $("leftProgress").firstChild;
    for (var i = 0; i < 300; i++) {
        (function() {
            var t = i * 50;
            setTimeout(() => {
                if (window.gamePause) {
                    progress = null;
                    return;
                }
                if (!progress) return;
                progress.style.width = Tween.Linear(280, -280, t, 15000) + "px";
            }, t);
        })();
    }
    setTimeout(() => {
        if (window.gamePause) return;
        if (!progress) return;
        if (table.rows.length >= 7) {
            window.gamePause = true;
            alert("你输了！！");
            if (confirm("继续游戏")) {
                setTimeout(startGame, 100);
            } else {
                showAllPic();
            }
            return false;
        }
        var row = table.insertRow(table.rows.length);
        for (var i = 0; i < 7; i++) {
            var img = document.createElement("IMG");
            img.src = "images/square/normal.png";
            img.alt = "Hit";
            img.pic = Math.ceil(Math.random() * 4);
            row.insertCell(row.cells.length).appendChild(img);
        }
        initProgress();
    }, (i - 2) * 50);
}

function showAllPic() {
    var table = $("gameTable");
    var imgs = table.getElementsByTagName("IMG");
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].src = "images/square/" + imgs[i].pic + ".png";
    }
}

function showPic(evt) {
    if (window.gamePause) return false;
    var obj = evt.target || evt.srcElement;
    if (!obj.pic) return false;
    var curPics = window.curPics;
    if (curPics.one && curPics.two) return false;
    obj.src = "images/square/" + obj.pic + ".png";
    if (!curPics.one && !curPics.two) {
        curPics.one = obj;
    } else if (curPics.one && !curPics.two && curPics.one != obj) {
        curPics.two = obj;
        var score = $("score");
        var success = $("success");
        var combo = $("combo");
        var mission = $("mission");
        if (curPics.one.pic != obj.pic) {
            setTimeout(() => {
                obj.src = curPics.one.src = "images/square/normal.png";
                window.comboTimes = 0;
                curPics.one = curPics.two = null;
                combo.innerHTML = window.comboTimes;
            }, 800);
        } else {
            Fade.Out(obj);
            Fade.Out(curPics.one);
            var obj2 = curPics.one;
            setTimeout(() => {
                obj.parentNode.innerHTML = obj2.parentNode.innerHTML = "&nbsp;";
                obj = obj2 = null;
                checkTable();
                if (success.innerHTML == mission.innerHTML) {
                    window.gamePause = true;
                    alert("胜利");
                    if (confirm("是否继续游戏")) {
                        setTimeout(startGame, 100);
                    } else {
                        showAllPic();
                    }
                }
            }, 1000);
            success.innerHTML = parseInt(success.innerHTML) + 1;
            score.innerHTML = parseInt(score.innerHTML) + 100 + window.comboTimes * 50;
            window.comboTimes++;
            curPics.one = curPics.two = null;
            combo.innerHTML = window.comboTimes;
        }

    }

}

function checkTable() {
    var table = $("gameTable");
    var tds = table.getElementsByTagName("TD");
    for (var i = tds.length - 1; i > -1; i--) {
        if (tds[i].getElementsByTagName("IMG").length) continue;
        var aboveIndex = tds[i].parentNode.rowIndex - 1;
        if (aboveIndex < 0) continue;
        var aboveRow = table.rows[aboveIndex];
        while (--aboveIndex > -1 && !aboveRow.cells[tds[i].cellIndex].getElementsByTagName("IMG").length) {
            aboveRow = table.rows[aboveIndex];
        }
        var aboveTd = aboveRow.cells[tds[i].cellIndex];
        var img = aboveTd.getElementsByTagName("IMG")[0];
        if (!img) continue;
        tds[i].innerHTML = "";
        tds[i].appendChild(img);
        aboveTd.innerHTML = "&nbsp;";
    }
    var rows = table.rows;
    outerFor: for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < rows[i].cells.length; j++) {
            var td = rows[i].cells[j];
            if (td && td.getElementsByTagName("IMG").length) continue outerFor;
        }
        table.deleteRow(i);
    }
}

function initMission() {
    var table = $("gameTable");
    var imgs = table.getElementsByTagName("IMG");
    var missionCounter = 0;
    var counter = [];
    for (var i = 1; i < 5; i++) {
        counter[i] = 0;
        for (var j = 0; j < imgs.length; j++) {
            if (imgs[j].pic == i) counter[i]++;
        }
        missionCounter += Math.floor(counter[i] / 2);
    }
    var mission = $("mission");
    mission.innerHTML = missionCounter;
}
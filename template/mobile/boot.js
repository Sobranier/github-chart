var fnShow = function (w) {

}

var init = function() {
    var set = {
        // 背景模板
        create: function() {
            var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            if (!document.getElementById('J-overlay') || !document.getElementById('J-overtent')) {
                return false;
            }
            var cover = document.getElementById('J-overlay'),
                over = document.getElementById('J-overtent'),
                table = document.getElementById('J-bacNav');
            cover.style.display = 'block';
            cover.style.width = w + 'px';
            cover.style.height = h + 'px';        
            over.style.top = h/2 - 400 + 'px';
            table.style.marginTop = h/2 - 240 + 'px';
            set.overlay('start-dialog-markup');
            set.start();
        },

        //  弹出框模板
        overlay: function(id) {
            if (!document.getElementById(id)) {
                return false;
            }
            var ct = document.getElementById(id),
                over = document.getElementById('J-overtent');
            over.innerHTML = ct.innerHTML;
        },

        // 难度选择
        start: function() {
            if (!document.getElementById('J-hard')) {
                return false;
            }
            var ndHard = document.getElementById('J-hard');
            ndHard.onclick = function(ev) {
                var node = ev.target;
                if (node.tagName.toUpperCase() == "LI")
                { 
                    document.getElementById('J-overlay').style.display = 'none';
                    ndHard.setAttribute('data-id', node.getAttribute('data-id'));
                    // 启动等
                    var number = set.engine(node.getAttribute('data-id')),
                        count = set.createBomp(number);
                    set.play(count, number);
                }
            }
        },

        // 游戏启动
        engine: function(hardV) {
            var table = document.getElementById('J-bacNav');
            var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var number = 0;
            if (w >= 980) {
                number = 20;
            } else if (w >= 768 && w < 979) {
                number = 19;
            } else {
                number = 13;
            }
            for (var i = 0; i < number; i ++) {
                var list = document.createElement('li'),
                    ul = document.createElement('ul');
                for (var j = 0; j < number; j ++) {
                    var li = document.createElement('li');
                    ul.appendChild(li);
                }
                ul.className = 'subNav';
                list.appendChild(ul);
                table.appendChild(list);
            }
            return number;
        },

        // 初始化炸弹
        createBomp: function(number) {
            if (document.getElementById('J-hard')) {
                var num = document.getElementById('J-hard').getAttribute('data-id');
                num *= number;
            } else {
            
                var num = parseInt(number*5);
            }
            var count = new Array();
            for (var i = 0; i < num; i ++) {
                fixed = false;
                var x = Math.round(Math.random() * number * number);

                if (i > 0) {
                    for (j = 0; j < i; j ++) {
                        if (count[j] == x) {
                            fixed = true;
                            break;
                        }
                    }
                }
                if (fixed == true) {
                    i --;
                } else {
                    count[i] = x;
                }
            }
            return count;
        },

        // 游戏进程
        play: function(count, number) {
            var table = document.getElementById('J-bacNav');
            for (var i = 0; i < count.length; i ++) {
                var line = (count[i] + number - 1) % number,
                    row = (count[i] % number == 0) ? parseInt((count[i] - 1) / number) : parseInt(count[i] / number);
                console.log(line);
                console.log(row);
                table.childNodes[line].childNodes[0].childNodes[row].className = 'fa fa-bomb';
            }
            for (var i = 0; i < count.length; i ++) {
                var line = (count[i] - 1) % number,
                    row = (count[i] % number == 0) ? parseInt((count[i] - 1) / number) : parseInt(count[i] / number);
                set.setNumber(line, row, number);
            }
            table.onclick = function(event) {
                var node = event.target;
                if (node.parentNode.className == 'subNav') {
                    if (node.className != 'fa fa-bomb') {
                        node.className = 'disabled';
                        // TODO 点击以后会自动展开附近的
                    } else {
                        set.setFail();
                        alert('BOMP!!');
                    }
                }
            }
            
        },

        // 设置数字
        setNumber: function(line, row, number) {
            for (var i = line-1; i <= line+1; i ++) {
                for (var j = row-1; j <= row+1; j ++) {
                    if (i == line && j == row) {
                        break;
                    }
                    set.changeNumber(i, j, number);
                }
            }
        },
        changeNumber: function(i, j, number) {
            if (i < 0 || i >= number || j < 0 || j > number) {
                return;
            }
            var table = document.getElementById('J-bacNav');
            if (table.childNodes[i].childNodes[0].childNodes[j]) {
                var node = table.childNodes[i].childNodes[0].childNodes[j];
                if (node.className != 'fa fa-bomb') {
                    var num = '';
                    try {
                        num = parseInt(node.innerHTML);
                    } catch(e){}
                    num = num>0 ? num+1 : 1;
                    node.innerHTML = num;
                }
            }
        },

        setFail: function() {
            var table = document.getElementById('J-bacNav');
            table.className = 'bacNav bacNav--fail';

        }

        
    };


    set.create();
}

init();

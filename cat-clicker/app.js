/**
 * Created by twohappy on 2016/12/20.
 */
//课程里面的代码看了以后,这版程序写的还是有点over.
//重写
var model = {
    currentCat:null,
    catList: [ {
            name: 'javascript',
            url: 'img/kitty.jpg',
            click: 0
        },
        {
            name: 'python',
            url: 'img/kitty2.jpg',
            click: 0
        },
        {
            name: 'jQuery',
            url: 'img/kitty3.jpg',
            click: 0
        },
        {
            name: 'HTML',
            url: 'img/kitty4.jpg',
            click: 0
        },
        {
            name: 'CSS',
            url: 'img/kitty5.jpg',
            click: 0
        }]
};

var octopus = {
    getCalList:function () {
        return model.catList;
    },
    init:function () {
        model.currentCat = this.getCalList()[0];
        listView.init();
        catView.init();
        modifyView.init();
    },
    setCurrentCat:function (cat) {
        model.currentCat = cat;
    },
    addClick:function () {
        model.currentCat.click += 1;
        catView.render();
    },
    getCurrentCat:function () {
        return model.currentCat;
    },
    modifyCurrent:function (name,url) {
        var current = model.currentCat;
        current.name = name;
        current.url = url;
        current.click = 0;
    }
};


var listView = {
    init: function () {
        this.listElem = document.querySelector('#catList');
        this.render();
    },
    render:function () {
        this.listElem.innerHTML = '';
        var cats = octopus.getCalList();
        for(var i=0,l=cats.length;i<l;i++){
            var cat = cats[i];
            var ele = document.createElement('li');
            ele.innerHTML = cat.name;
            ele.addEventListener('click',(function (catCopy) {
                return function () {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                }
            })(cat));
            this.listElem.appendChild(ele);
        }
    }
};

var catView = {
    init: function () {
        this.cat = document.querySelector('#cat');
        this.catName = document.querySelector('#cat-name');
        this.catCount = document.querySelector('#cat-count');
        this.catImg = document.querySelector('#cat-img');
        this.render(octopus.getCurrentCat());
        this.cat.addEventListener('click',function () {
            octopus.addClick();
        })
    },
    render: function () {
        var cat = octopus.getCurrentCat();
        this.catName.textContent = cat.name;
        this.catImg.src = cat.url;
        this.catCount.textContent = cat.click;
    }
}


var modifyView = {
    init:function () {
        this.newName = document.querySelector('#newName');
        this.newUrl = document.querySelector('#newUrl');
        this.ok = document.querySelector('#ok');
        this.cancel = document.querySelector('#cancel');
        this.mBtn = document.querySelector('#mBtn');
        this.area = document.querySelector('#modify');
        $(this.area).hide();
        this.mBtn.addEventListener('click',function () {
            $(modifyView.area).toggle();
        });
        this.ok.addEventListener('click',function () {
            var catName = modifyView.newName.value;
            var catUrl = modifyView.newUrl.value;
            octopus.modifyCurrent(catName,catUrl);
            catView.render();
            listView.render();
            modifyView.newName.value = '';
            modifyView.newUrl.value = '';
            $(modifyView.area).toggle();
        });
        this.cancel.addEventListener('click',function () {
            modifyView.newName.value = '';
            modifyView.newUrl.value = '';
            $(modifyView.area).toggle();
        })
    }
}

octopus.init();

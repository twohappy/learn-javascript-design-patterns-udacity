/**
 * Created by twohappy on 2016/12/20.
 */
//直接搞一个对象,有列表,有猫猫,
//所以catclicker
//@param
//接受对象形式的参数:

function CatClicker(param) {
    this.container = document.querySelector(param.el);
    this.cats = param.catParam;
    this.name = name;
    this.times=[];
    var res = this.generator(this.cats);
    res.show.firstElementChild.style.display ='flex';
    this.container.appendChild(res.list);
    this.container.appendChild(res.show);
}


CatClicker.prototype = {
    constructor: CatClicker,
    generator: function (catArr) {
        var self = this;
        var catList =document.createElement('ul');
        catList.className = 'catList';
        var catShow = document.createElement('div');
        catShow.className = 'catShow';
        catArr.forEach(function (cur,index,arr) {
            var tag = document.createElement('li');
            var show = document.createElement('div');
            show.className = 'cat';
            self.times[index] = 0;
            var url = cur.catImg;
            var name = cur.catName;
            var tempImg = document.createElement('img');
            var tempHeader = document.createElement('div');
            var tempTimes = document.createElement('span');
            tempImg.src = url;
            tempHeader.innerHTML = 'Cat Name: ' + name;
            tempTimes.innerHTML = 'Click times: ' + '0';
            tempImg.addEventListener('click', function () {
                self.times[index]++;
                tempTimes.innerHTML = 'Click times: ' + self.times[index];
            });
            show.appendChild(tempHeader);
            show.appendChild(tempImg);
            show.appendChild(tempTimes);
            show.style.display="none"
            var tempImg2 = document.createElement('img');
            tempImg2.src = url;
            var tempP = document.createElement('p');
            tempP.innerHTML = name;
            tag.appendChild(tempImg2);
            tag.appendChild(tempP);
            tag.addEventListener('click',function () {
                for(var i=0,l=show.parentElement.childNodes.length;i<l;i++){
                    if(show.parentElement.childNodes[i].nodeType ==1 ){
                        show.parentElement.childNodes[i].style.display ='none';
                    }
                }
                show.style.display = 'flex';
            })
            catList.appendChild(tag);
            catShow.appendChild(show);

        })
        return {list:catList,show:catShow}



    }
//        ,
//        toggle: function () {
//            var display = this.container.style.display;
//            if (display === '' || display === 'block') {
//                this.container.style.display = 'none';
//            } else if (display === 'none') {
//                this.container.style.display = 'block';
//            }
//        }
};
var param = {
    el: '#catClicker',
    catParam: [
        {
            catName: '1',
            catImg: 'img/kitty.jpg'

        },
        {
            catName: '2',
            catImg: 'img/kitty2.jpg'

        },
        {
            catName: '3',
            catImg: 'img/kitty3.jpg'

        },
        {
            catName: '4',
            catImg: 'img/kitty4.jpg'

        },
        {
            catName: '5',
            catImg: 'img/kitty5.jpg'

        }
    ]
}
var cat = new CatClicker(param);
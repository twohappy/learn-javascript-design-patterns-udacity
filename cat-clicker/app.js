/**
 * Created by twohappy on 2016/12/20.
 */
;(function(){
    var cats = [
        {
            name: 'javascript',
            url: 'img/kitty.jpg'
        },
        {
            name: 'python',
            url: 'img\/kitty2.jpg'
        },
        {
            name: 'jQuery',
            url: 'img\/kitty3.jpg'
        },
        {
            name: 'HTML',
            url: 'img\/kitty4.jpg'
        },
        {
            name: 'CSS',
            url: 'img\/kitty5.jpg'
        }];

    var model = {
        catList: [],
        addCat: function (name, url) {
            this.catList.push({
                name: name,
                url: url,
                clickTimes: 0
            })
        },
        init: function (cats) {
            cats.forEach(function (cur, index) {
                var cat = {
                    name: cur.name,
                    url: cur.url,
                    clickTimes: 0,
                    id: index
                };
                model.catList.push(cat)
            });
        }
    };

    var octopus = {
        getCatList:function () {
            return model.catList;
        },
        getCat:function (num) {
            return model.catList[num];
        },
        currentCat:null,
        getCatByName:function (name) {
            var hehe = null;
            model.catList.forEach(function (cur) {
                if(cur.name==name){
                    hehe = cur;
                }
            });
            return hehe?hehe:false;
        },
        addClick:function () {
            this.currentCat.clickTimes += 1;
        },
        changeCat:function (catName) {
            if(catName === this.currentCat.name){

            }else{
                this.currentCat = this.getCatByName(catName);
                catView.render(this.currentCat);
            }

        },
        init:function (listEl,catEl) {
            model.init(cats);
            this.currentCat = this.getCat(0);
            listView.init(listEl);
            catView.init(catEl);
        }
    }


    var listView = {
        init: function (el) {
            this.catList = $(el);
            var htmlStr = '';
            octopus.getCatList().forEach(function (cur) {
                htmlStr += viewTemplate.catList.replace('{{url}}','"'+cur.url+'"').replace('{{catName}}',cur.name);
            });
            this.catList.html(htmlStr);
            this.catList.click(function (e) {
                console.log('list clicked!');
                var catName ='';
                if($(e.target).parent().children('p')){
                    catName = $(e.target).parent().children('p').html()
                }
                octopus.changeCat(catName);
            });
        }

    };

    var catView = {
        init:function (el) {
            this.catShow = $(el);

            this.render(octopus.currentCat);
            this.catShow.click(function () {
                console.log('cat clicked!');
                octopus.addClick();
                catView.render(octopus.currentCat);
            })
        },
        render:function (cat) {
            var htmlStr = '';
            htmlStr = viewTemplate.cat
                .replace('{{catName}}',cat.name)
                .replace('{{url}}','"'+cat.url+'"')
                .replace('{{clickTime}}',cat.clickTimes.toString());
            this.catShow.html(htmlStr);
        }
    }

    var viewTemplate = {
        cat: '<div class="cat">' +
        '<div>Cat Name: {{catName}}</div>' +
        '<img src={{url}}>' +
        '<span>Click times: {{clickTime}}</span>' +
        '</div>',
        catList: '<li><img src={{url}}><p>{{catName}}</p></li>'
    }

    octopus.init('#catList','#catShow')
})();

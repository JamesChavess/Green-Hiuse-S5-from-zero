import { getData } from './Repository.js';
import { HTMLUtilities } from './HTMLUtilities.js';
import { SelectionBar } from './selectionBar.js';

export class Courses {
    constructor(menu) {
        this.menu = menu;
        this.SelectionBar = new SelectionBar(menu);
        this.HTMLUtilities = new HTMLUtilities();
    }

    mainPage(){
        console.log('courses main page');
        console.log(this.menu);
        s5("contentContainer").html("");
        this.createCourseOptions();
        /*let img = document.createElement('img');
        img.classList.add("mainPage");
        if(this.menu.mainPage){
            img.src =  `${this.menu.mainPage}`;
            main.appendChild(img);
        }*/
    }

    createCourseOptions() {
        this.SelectionBar.createOptions();
        const options = this.menu.options.map(option => {
            return s5("<a>",{"href" : "#", "class": "option-name", "data-index": `${option.option_id}`})
                    .html(option.optionName)
                    .addEvent("click", e =>{
                        let index = e.currentTarget.dataset.index;
                        //let current = s5(".option-name.selected");
                        s5(".option-name.selected").forEach((value, index) => {
                            value.classList.remove("selected");
                        });
                        e.target.classList.add("selected");
                        console.log({"option index: ": index});
                        this.renderCourse(index-1);
                    });
            /*tagA.setAttribute("href", "#");
            tagA.setAttribute("class", "option-name");
            tagA.setAttribute("data-index", `${option.option_id}`);
            tagA.addEventListener("click", function(e){
                let index = e.target.dataset.index;
                let current = document.querySelectorAll(".option-name.selected");
                current.forEach((value, index) => {
                    value.classList.remove("selected");
                });
                e.target.classList.add("selected");
                console.log({"option index: ": index});
                _this.renderCourse(index-1);
            });
            return tagA;*/
        });
        options[0].classList.add("selected");
        options[0].click();
        const nav = s5('optionsContainer');
        const containerOptions = this.HTMLUtilities.insertComponent(nav);
        options.forEach(containerOptions);
    }

    initAvailableCards() {
        getData('./JSON/cursos.json').then((response) => { this.createAvailableCards(response) });
    }

    createAvailableCards(cardsJSON) {
        const cards = cardsJSON.availableCourses.map(this.createCard);
        s5("otherCourses").insert(cards);
    }
    
    createCard(card) {
        return s5('<div>',{'class':"availableCourseSquare"})
                .insert([
                    s5('<img>', {'src':`img/${card.image}`}),
                    s5('<h3>').insert(document.createTextNode(card.name)),
                    s5('<div>', {'class':'courseData'})
                        .insert([
                            s5('<div>',{'class':'value'})
                                .insert([
                                    s5('<span>',{'class':'fas fa-heart'}),
                                    document.createTextNode(card.likes)
                                ]),
                            s5('<div>', {'class':'files'})
                                .insert([
                                    s5('<span>',{'class':'fas fa-folder'}),
                                    document.createTextNode(card.comments)
                                ])
                        ])
                ]);
    }

    renderCourse(id){
        const contentContainer = s5('contentContainer');
        contentContainer.html("");
        const container = s5("<aside>",{'class':"accordion"}).html(`<div class="accordionContainer">
        <div id="accordion"></div></div>`);
        const contentCourse = s5("<section>",{'class':"contentCourse", 'id':"contentCourses"});
        contentContainer.insert([container, contentCourse]);
        const accordion = s5('accordion');
        const lesson = s5("<div>",{'id':'lessonContainer'});
        accordion.insert([s5("<form>",{"class":"searchContent"})
                            .html(`<span class="fas fa-search"></span>
                                    <input type="text" name="keyword">`)
                        ]);

        getData("./JSON/cursos.json").then((response) => {
            const course = response.availableCourses[id];
            contentCourse.html(`<h2>curso de ${course.name}</h2><nav id="lessonNav">
            <a id="prevBtn" href="#"><i class="fas fa-chevron-left"></i> Leccion anterior</a>
            <a id="nextBtn" href="#">Leccion siguiente <i class="fas fa-chevron-right"></i></nav>`);

            //to fix
            /*const prevBtn = s5("prevBtn").addEvent("click", function () {
            let activeItem = s5("open");
            let arrowDown = s5("down");
            let prev = activeItem.previousSibling;

            if (document.body.contains(activeItem) && document.body.contains(arrowDown) && 
                document.body.contains(prev) && prev.classList.contains('panel')) {
                    lesson.innerHTML = "";
                    let lessonTitle = s5('<h1>',{'class':"lessonTitle"}).html(`${prev.innerText}`);
                    lesson.appendChild(lessonTitle);
                    activeItem.classList.remove("open");
                    arrowDown.classList.remove("down");
                    console.log({'selected lesson' : activeItem});
                    console.log({'prev lesson' : prev});
                    prev.classList.add("open");
                    prev.firstChild.firstChild.classList.add("down");
                    course.content.forEach((element) =>{
                        if(element.parent_id == parseInt(prev.firstChild.getAttribute('data-index'))){
                        let article = document.createElement("article");
                        let title = document.createElement("h2");
                        let paragraph = document.createElement("p");

                        if(element.contentName == "Objetivos"){
                            article.classList.add("goalsCourse");
                            article.id = `${element.contentName}`;
                        }
                        else{
                            article.classList.add("contentCourseArticle");
                            article.id = `${element.contentName}`;
                        }
                        title.innerHTML = `${element.contentName}` ;
                        paragraph.innerHTML = `${element.paragraph}`;
                        article.appendChild(title);
                        article.appendChild(paragraph);
                        lesson.appendChild(article);
                        contentCourse.appendChild(lesson);
                        }
                    });
                }
            });

            //to fix
            const nextBtn = document.getElementById("nextBtn");
            nextBtn.addEventListener("click", function () {
                let activeItem = document.querySelector(".open");
                let arrowDown = document.querySelector(".down");
                let next = activeItem.nextSibling;

                if (document.body.contains(activeItem) && document.body.contains(arrowDown) && document.body.contains(next)) {
                    lesson.innerHTML = "";
                    let lessonTitle = document.createElement('h1');
                    lessonTitle.classList.add('lessonTitle');
                    lessonTitle.innerHTML = `${next.innerText}`;
                    lesson.appendChild(lessonTitle);
                    activeItem.classList.remove("open");
                    arrowDown.classList.remove("down");
                    console.log({'selected lesson':activeItem});
                    console.log({'next lesson': next});
                    next.classList.add("open");
                    next.firstChild.firstChild.classList.add("down");
                    course.content.forEach((element) => {
                    if (element.parent_id == parseInt(next.firstChild.getAttribute('data-index'))) {
                        let article = document.createElement("article");
                        let title = document.createElement("h2");
                        let paragraph = document.createElement("p");
                
                        if (element.contentName == "Objetivos") {
                        article.classList.add("goalsCourse");
                        article.id = `${element.contentName}`;
                        } else {
                        article.classList.add("contentCourseArticle");
                        article.id = `${element.contentName}`;
                        }
                        title.innerHTML = `${element.contentName}`;
                        paragraph.innerHTML = `${element.paragraph}`;
                        article.appendChild(title);
                        article.appendChild(paragraph);
                        lesson.appendChild(article);
                        contentCourse.appendChild(lesson);
                    }
                    });
                }
            });*/

            const lessonNav = s5("lessonNav");
            course.content.forEach( (item, index, array) => {
                if (item.parent_id == null) {
                    let panelBody = s5("<div>", {"class":"tableBody"});
                    let panel = s5("<div>", {"class":"panel"});
                    let div = s5("<div>",{'data-index': item.item_id, "class":"tableHeader", })
                                .html(`<img src="img/next.png" class="arrow"></img><span> ${item.contentName}</span>`)
                                .addEvent("click", () => {
                                    lesson.html("");
                                    let lessonTitle = s5('<h1>', {"class":"lessonTitle"}).html(item.contentName);
                                    lesson.appendChild(lessonTitle);
                                    let activeItems = s5(".open");
                                    let arrDown = s5(".down");
                                    if (activeItems.length > 0 && arrDown.length > 0) {
                                        activeItems[0].classList.remove("open");
                                        arrDown[0].classList.remove("down");
                                    }
                                    div.firstChild.classList.add("down");
                                    panel.classList.add("open");
                                    //this.createArticle(array);
                                    
                                    array.forEach(element => {
                                        if (element.parent_id == item.item_id) {
                                            let article = s5("<article>")
                                                            .insert([
                                                                s5("<h2>", {"id":`${element.contentName}`})
                                                                    .html(`${element.contentName}`),
                                                                s5("<p>").html(`${element.paragraph}`)
                                                            ]);
                                            let cName = element.contentName.toLowerCase(); 
                                            if (cName.includes("objetivo")) {
                                                article.classList.add("goalsCourse");
                                            } else {
                                                article.classList.add("contentCourseArticle");
                                            }
                                            lesson.appendChild(article);
                                            contentCourse.appendChild(lesson);
                                        }
                                    });
                                });
                    item.HTMLelement = div;
                    panel.insert([div, panelBody]);
                    accordion.insert(panel);
                } else {
                    let pIndex = array.findIndex((obj) => obj.item_id === item.parent_id);
                    let parent = array[pIndex];
                    let subDiv = s5("<div>")
                                    .insert(s5("<p>", {"class":"accordionIndex"})
                                        .html(item.contentName)
                                        .addEvent("click", function () {
                                            document.getElementById(item.contentName).scrollIntoView({ behavior: "smooth" });
                                        })
                                    );
                    parent.HTMLelement.nextElementSibling.appendChild(subDiv);
                }
            });
        });
    }
    createArticle(articles){
        console.log(articles);
    }
}
import { getData } from './Repository.js';
import { HTMLUtilities } from './HTMLUtilities.js';
import { SelectionBar } from './selectionBar.js';

export class Courses {
    constructor(menu) {
        this.menu = menu;
        this.SelectionBar = new SelectionBar(menu);
        this.HTMLUtilities = new HTMLUtilities();
    }

    init(){
        s5("contentContainer").html("");
        this.createCourseOptions();
    }

    createCourseOptions() {
        this.SelectionBar.createOptions();
        const options = this.menu.options.map(option => {
            return s5("<a>",{"href" : "#", "class": "option-name", "data-index": `${option.option_id}`})
                    .html(option.optionName)
                    .addEvent("click", e =>{
                        let index = e.currentTarget.dataset.index;
                        s5(".option-name.selected").forEach((value, index) => {
                            value.classList.remove("selected");
                        });
                        e.currentTarget.classList.add("selected");
                        this.renderCourse(index-1);
                    });
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
   
     
    /*dont using
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
            }*/
                   

    renderCourse(id){
        const contentContainer = s5('contentContainer');
        contentContainer.html("");
        contentContainer.insert([
            s5("<aside>",{'class':"accordion"}).html(`<div class="accordionContainer">
            <div id="accordion"><form class="searchContent"><span class="fas fa-search"></span>
            <input id="searchLesson" type="text" name="keyword placeholder="buscar.."></form></div></div>`), 

            s5("<section>",{'class':"contentCourse", 'id':"contentCourses"})
        ]);

        s5("#searchLesson")[0].addEvent("keyup", (e)=>{
            let panels = document.getElementsByClassName('panel'); //undefined
            console.log(panels);
            const form = s5('.searchContent').addEvent('submit', e =>{e.preventDefault()});
            for (let i = 0; i < panels.length; i++) {
                panels[i].firstChild.firstChild.classList.add("down");
                panels[i].classList.add("open");
            }
            
            let input = s5("#searchLesson")[0].value
            console.log(input);
            input = input.toLowerCase();
            const content = document.getElementsByClassName('accordionIndex');
            for (let i = 0; i < content.length; i++) {
                
                if(input){
                    if (!content[i].innerHTML.toLowerCase().includes(input)) {
                        content[i].style.display = "none";
                    }
                    else{
                        console.log(content[i]);
                        content[i].classList.add("highLight");
                        setTimeout(function(){content[i].classList.remove("highLight");}, 2000);
                        content[i].style.display = "block";
                        content[i].parentNode.previousSibling.click();
                        content[i].click();
                        /*
                            content[i].classList.add("open");
                            content[i].classList.add("down");
                            let paragraphs = document.getElementsByTagName('p');
                            console.log(paragraphs);
                            content[i].classList.add("highLight")
                            setTimeout(function(){ content[i].classList.remove("highLight"); }, 5000);
                            let paragraphsSearch = paragraphs.filter(paragraph => paragraph.innerHTML.includes(input));
                            console.log(paragraphsSearch);
                            paragraphsSearch.classList.add("highLight")
                       */
                    }
                }
                else{
                    content[i].style.display = "block";
                }
            }
        });
        





        getData("./JSON/cursos.json").then((response) => {
            const course = response.availableCourses[id];
            const contentCourse = s5("contentCourses");
            contentCourse.html(`<h2>curso de ${course.name}</h2><nav id="lessonNav">
                                <a id="prevBtn" href="#"><i class="fas fa-chevron-left"></i> Leccion anterior</a>
                                <a id="nextBtn" href="#">Leccion siguiente <i class="fas fa-chevron-right"></i></nav>
                                `)
                        .insert(s5("<div>",{'id':'lessonContainer'}));

            this.createTableOfContents(course.content);
            s5("nextBtn").addEvent("click", () => {
                const activeItem = s5(".panel.open")[0];
                const arrowDown = s5(".down")[0];
                const next = activeItem.nextSibling;
                console.log(next);
                if (activeItem && arrowDown && next && next.classList.contains('panel')) {
                    activeItem.classList.remove("open");
                    arrowDown.classList.remove("down");
                    next.classList.add("open");
                    next.firstChild.firstChild.classList.add("down");
                    this.createArticle(parseInt(next.firstChild.getAttribute('data-index')), next.firstChild.innerText, course.content);
                }
            });

            s5("prevBtn").addEvent("click", () => {
                const activeItem = s5(".panel.open")[0];
                const arrowDown = s5(".down")[0];
                const prev = activeItem.previousSibling;
                console.log(prev);
                if (activeItem && arrowDown && prev && prev.classList.contains('panel')) {
                    activeItem.classList.remove("open");
                    arrowDown.classList.remove("down");
                    prev.classList.add("open");
                    prev.firstChild.firstChild.classList.add("down");
                    this.createArticle(parseInt(prev.firstChild.getAttribute('data-index')), prev.firstChild.innerText, course.content);
                }
            });
        });
    }

  

    createTableOfContents(contents){
        contents.forEach( (item, index, array) => {
            const accordion = s5('accordion');
            if (item.parent_id == null) {
                const panelBody = s5("<div>", {"class":"tableBody"});
                const panel = s5("<div>", {"class":"panel"});
                const div = s5("<div>",{'data-index': item.item_id, "class":"tableHeader", })
                            .html(`<img src="img/next.png" class="arrow"></img><span> ${item.contentName}</span>`)
                            .addEvent("click", () => {
                                s5("contentContainer").scrollTo({top: 0, behavior: 'smooth'});
                                let activeItems = s5(".open");
                                let arrDown = s5(".down");
                                if (activeItems.length > 0 && arrDown.length > 0) {
                                    activeItems[0].classList.remove("open");
                                    arrDown[0].classList.remove("down");
                                }
                                div.firstChild.classList.add("down");
                                panel.classList.add("open");
                                this.createArticle(item.item_id, item.contentName, array);
                            });
                item.HTMLelement = div;
                panel.insert([div, panelBody]);
                accordion.insert(panel);
            } else {
                const pIndex = array.findIndex((obj) => obj.item_id === item.parent_id);
                const parent = array[pIndex];
                const subDiv = s5("<div>", {"class":"accordionIndex"})
                                    .html(item.contentName)
                                    .addEvent("click", function () {
                                        document.getElementById(item.contentName).scrollIntoView({ behavior: "smooth" });
                                    });
                parent.HTMLelement.nextElementSibling.appendChild(subDiv);
            }
    
        });
        contents[0].HTMLelement.click();
    }
    
    createArticle(parent_id, parent_title, articles){
        s5('#lessonContainer').html("").insert([ 
            s5("<img>",{"class": "articleLogo", "src": articles[0].icon}),
            s5('<h1>', {"class":"lessonTitle"}).html(parent_title),
            articles
                .filter(element => element.parent_id == parent_id)
                .map(element =>{
                    let article = s5("<article>")
                                    .insert([
                                        s5("<h2>", {"id":`${element.contentName}`})
                                            .html(`${element.contentName}`),
                                            s5("<p>").html(`${element.paragraph}`),
                                            //s5("<img>", {"src": articles[0].icon},
                                        
                                            
                                    ]);
                                    
                    let cName = element.contentName.toLowerCase(); 
                    if (cName.includes("objetivo")) {
                        article.classList.add("goalsCourse");
                    } else {
                        article.classList.add("contentCourseArticle");
                    }
                    return article;
                    
                })
        ]); 
    }

     //------------------search bar functionality on porgress here ------------------
     /*searchContent() {
        s5("#searchLesson").addEvent("keyUp", () => {
            let input = document.getElementById('searchLesson').value
            console.log(input);
            input = input.toLowerCase();
            let content = document.getElementsByTagName('h2');
    
            for (i = 0; i < content.length; i++) {
                if (!content[i].innerHTML.toLowerCase().includes(input)) {
                    content[i].style.display = "none";
                }
                else {
                    content[i].style.display = "list-item";
                }
            }
        });
    } */
    
    //------------search bar functionality on porgress here ----------------------------//
}
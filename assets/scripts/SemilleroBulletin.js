import { getData } from './Repository.js';
import { HTMLUtilities } from './HTMLUtilities.js';
import { SelectionBar } from './selectionBar.js';

export class SemilleroBulletin {
    constructor(menu) {
        this.menu = menu;
        this.SelectionBar = new SelectionBar(menu);
        this.HTMLUtilities = new HTMLUtilities();
    }

    init(){
        s5("contentContainer").html("");
        this.createSemilleroBulletinOptions();
    }
    createSemilleroBulletinOptions() {
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
                            s5("contentContainer").html(`<img src="img/SemilleroBulletin_mainPage.png" alt="SemilleroBulletin main page">`);
                        });
            });
            options[0].classList.add("selected");
            options[0].click();
            const nav = s5('optionsContainer');
            const containerOptions = this.HTMLUtilities.insertComponent(nav);
            options.forEach(containerOptions);
    }
}
//export {SemilleroBulletin};
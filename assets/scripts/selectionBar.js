import { HTMLUtilities } from "./HTMLUtilities.js";
import { getData } from './Repository.js';


export class SelectionBar {
  constructor(menu) {
    this.menu = menu;
    this.utilities = new HTMLUtilities();
  }

  createOptions() {
    const header = s5('header', {'class':"header"}).html("");
    const parentContainer = this.utilities.insertComponent(header);

    const div = s5("<div>", {"class":"title"});
    const containerTitle = this.utilities.insertComponent(div);

    const imgHTML = this.utilities.createIcon(this.menu.icon);
    containerTitle(imgHTML);

    const titleTag = s5("<h1>").insert(document.createTextNode(this.menu.title));
    containerTitle(titleTag);
    
    const nav = s5("<div>", {"id":"optionsContainer"});
    
    parentContainer(div);
    parentContainer(nav);
    /*const options = this.menu.options.map(this.createOptionLinks);
    options[0].classList.add("selected");
    options[0].click();
    const containerOptions = this.utilities.insertComponent(nav);
    options.forEach(containerOptions);*/
  }

  createOptionLinks(option) {
    return s5("<a>", { 'href' : "#", 'class' : "option-name", "data-index":`${option.option_id}`})
                  .insert(document.createTextNode(option.optionName))
                  .addEvent("click", function(e){
                    let index = e.target.dataset.index;
                    let current = s5(".options .option-name");
                    current.forEach((value, index) => {
                        value.classList.remove("selected");
                    });
                    this.classList.add("selected");
                    console.log({"option index: ": index});
                  });
    
  }
}

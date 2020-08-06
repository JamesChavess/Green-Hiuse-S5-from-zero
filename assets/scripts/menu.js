import { getData } from "./Repository.js";
import { HTMLUtilities } from "./HTMLUtilities.js";
import { SelectionBar } from "./selectionBar.js";
import { Courses } from './courses.js';
import { Katas } from './Katas.js';


export class NavMenu {
  constructor() {
    this.utilities = new HTMLUtilities();
    
  }

  init() {
    this.container = s5("<ul>", { id: "links" }).insertTo(s5("navMenu"));

    getData("./JSON/menu.json").then((response) => {
      this.createOptions(response);
    });
  }

  createOptions(options) {
    this.container.html("");
    const funcionInsertarMenu = this.utilities.insertComponent(this.container);

    options.links.forEach((option) => {
      funcionInsertarMenu(this.createMenu(option));
    });
  }


  createMenu(menu) {
    return s5("<li>", { class: "menu-link", "data-option": menu.title })
      .insert([
        s5("<img>", { src: `img/${menu.icon}`, alt: "logo" }),
        s5("<span>").html(menu.title),
    ])
    .addEvent("click", (e) => {
      let currentOption = e.currentTarget.dataset.option;
      let current = s5("li.menu-link");

      current.forEach((value, index) => {
        value.classList.remove("active");
      });
      e.currentTarget.classList.add("active");
      s5('welcome').style.display = "none";

      switch (currentOption) {
        case "Cursos":
          this.Courses = new Courses(menu);
          this.Courses.init();
          break;
          
        case "Katas":
          this.Katas = new Katas(menu);
          this.Katas.init();
          break;

        default:
          s5("contentContainer").html("");
          s5('welcome').style.display = "block";
          break;
      }
    });
  }
}



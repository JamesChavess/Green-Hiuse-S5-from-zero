import { getData } from "./repository.js";
import { HTMLUtilities } from "./HTMLUtilities.js";
import { SelectionBar } from "./selectionBar.js";

export class Courses {
  constructor(menu) {
    this.menu = menu;
    this.SelectionBar = new SelectionBar(menu);
    this.HTMLUtilities = new HTMLUtilities();
  }

  mainpage() {
    console.log("couirse main page");
    console.log(this.menu);
    s5("contentCourses").html("");
    this.createCourseOption();
  }

  createCourseOption() {
    this.SelectionBar.createOptions();
    const options = this.menu.options.map(option =>
      s5("<a>", {
        class: "option-name",
        "data-index": `${option.option_id}`,
      }).addEvent("click", (e) => {
        let index = e.currentTarget.dataset.index;
        let current = s5(".optio-name.selected");
        current.forEach((value) => value.classList.remove("Selected"));
        e.currentTarget.classList.add("selected");
        console.log({"option index" : index });
        this.renderCourse(index - 1);
      }));
      console.log(options);
  }
}

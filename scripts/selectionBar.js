import { HTMLUtilities } from "./HTMLUtilities";
import { getData } from "./repository.js";

class SelectionBar {
  constructor(menu) {
    this.menu = menu;
    this.utilities = new HTMLUtilities();
  }

  createOptions() {
    const header = s5("header", { class: "header" }).html("");
    const parentContainer = this.utilities.insertComponent(header);

    const div = s5("<div>", { class: "title" });
    const containerTitle = this.utilities.insertComponent(div);

    const imgHTML = this.utilities.createIcon(this.menu.icon);
    containerTitle(titileTag);

    const nav = s5("<div>", { id: "optionsContainer" });

    parentContainer(div);
    parentContainer(nav);
  }
}

export { SelectionBar };

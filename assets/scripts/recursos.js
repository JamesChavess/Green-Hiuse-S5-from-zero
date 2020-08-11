import {getData} from './Repository.js';
import { HTMLUtilities } from './HTMLUtilities.js';
import { SelectionBar } from './selectionBar.js';

export class gamersoss {
    constructor(menu) {
        this.menu = menu;
        this.SelectionBar = new SelectionBar(menu);
        this.HTMLUtilities = new HTMLUtilities();
    }

    init(){
        s5("contentContainer").html("");
        this.createIndexGames();
    }

    createIndexGames(){
        
    }
}

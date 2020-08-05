class HTMLUtilities {

    constructor() {

    }

    insertComponent = container => el => {
        container.appendChild(el);
    }

    createIcon = (icon) => {
        const tagImage = s5('<img>',{'src':`img/${icon}`,'alt':"logo"});
        return tagImage;
    }
}

export { HTMLUtilities };



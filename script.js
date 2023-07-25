const background = document.querySelector(".hero-section");
const menuButton = document.querySelector(".js-menu-button");
const navigation = document.querySelector(".js-navigation");
const hamburgerMenu = document.querySelector(".js-hamburger-menu");
// const subMenu = document.querySelector(".sub-menu");

const links = document.querySelectorAll(".learn-more-link");
const redUnderline = document.querySelector(".red");
const yellowUnderline = document.querySelector(".yellow");
const arrowOne = document.querySelector("#arrow-1");
const arrowTwo = document.querySelector("#arrow-2");

const handleHamburgerClose = () => {
    navigation.style.display = "none";
    navigation.setAttribute("aria-hidden", true);
    menuButton.setAttribute("aria-expanded", false);
    menuButton.setAttribute("aria-label", "Menu");
    menuButton.lastElementChild.textContent = "Menu";

    if(background) {
        background.style.overflowY = "scroll";
    } else {
        document.body.style.overflowY = "initial";
    }
};

menuButton.addEventListener('click', () => {

    const expanded = menuButton.getAttribute("aria-expanded");

    if (expanded === "false") {
        navigation.style.display = "block";
        navigation.setAttribute("aria-hidden", false);
        menuButton.setAttribute("aria-expanded", true);
        menuButton.setAttribute("aria-label", "Close Menu");
        menuButton.lastElementChild.textContent = "Close";
        focusTrap(hamburgerMenu, menuButton, handleHamburgerClose);
    }

        if (background) {
            background.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "hidden";
        }
    
});

// Hide menu if user presses esc

document.addEventListener("keydown", (event) => {

    if (event.key == "Escape") {
        collapseSubMenu();
    }
});

links.forEach((link) => {

    link.addEventListener("focus", () => {
        if (link.id === "learn-more-link-1") {
            yellowUnderline.style.display = "none";
        } else {
            redUnderline.style.display = "none";
        }
    });

    link.addEventListener("blur", () => {
        if (link.id === "learn-more-link-1") {
            yellowUnderline.style.display = "block";
        } else {
            redUnderline.style.display = "block";
        }
    });


});

// Focus Trap

function focusTrap(element, removeButton, handleClose) {

    const focusable =
        'button, a:not(.skiplink), input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = element.querySelectorAll(focusable);
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    firstFocusableElement.focus();

    const shutdownFocusTrap = () => {
        handleClose();
        element.removeEventListener('keydown', handleKeydown);
        removeButton.removeEventListener('click', shutdownFocusTrap);
        removeButton.focus();
    };

    removeButton.addEventListener('click', shutdownFocusTrap);

    const handleKeydown = (event) => {
        const isEscPressed = (event.key === 'Escape');
        const isTabPressed = (event.key === 'Tab' || event.keyCode === 9);


        if (isEscPressed) {
            shutdownFocusTrap();
        }

        if (!isTabPressed) {
            return;
        }

        if (event.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                event.preventDefault();
                lastFocusableElement.focus();
            }
            return;
        }

        if (document.activeElement === lastFocusableElement) {
            event.preventDefault();
            firstFocusableElement.focus();
        }
    };

    element.addEventListener('keydown', handleKeydown);
}
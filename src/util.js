export function addKeyDownListener(eventKey, target, onKeyDown) {
    target.addEventListener('keydown', e => {
        if (e.key === eventKey) {
            onKeyDown();

            e.preventDefault();
        }
    });
};

export function scrollToPageEnd() {
    window.scrollTo(0, document.body.scrollHeight);
};

export function createOutputDiv(className, textContent) {
    const div = document.createElement('div');

    div.className = className;
    div.appendChild(document.createTextNode(textContent));

    return div;
};

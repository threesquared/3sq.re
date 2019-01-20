export function addKeyDownListener(eventKey, target, onKeyDown) {
    target.addEventListener('keydown', e => {
        if (e.key === eventKey) {
            onKeyDown();

            e.preventDefault();
        }
    });
};

export function scrollToEnd() {
    const container = document.getElementById('terminal-container');
    container.scrollTo(0, container.scrollHeight);
};

export function createOutputDiv(className, content) {
    const div = document.createElement('div');

    div.className = className;
    div.innerHTML = content.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1" target="blank">$1</a>');

    return div;
};

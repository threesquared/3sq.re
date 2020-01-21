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

export function formatAsJson(object) {
    return `<pre>${JSON.stringify(object, null, 2)}</pre>`;
}

export function calculateAge(birthday) {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function openFullscreen() {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

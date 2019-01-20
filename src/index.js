import Octokit from '@octokit/rest';
import 'babel-polyfill';
import Terminal from './modules/terminal';
import style from './css/app.css';

const octokit = new Octokit();

async function getPullRequests() {
    const results = await octokit.search.issues({
        q: 'author:threesquared type:pr is:public state:closed',
        sort: 'created',
        order: 'desc',
        per_page: 10,
    });

    console.log(results.data.items);
}

async function getRepositories() {
    const results = await octokit.search.repos({
        q: 'user:threesquared',
        sort: 'updated',
        order: 'desc',
        per_page: 10,
    });

    console.log(results.data.items);
}

document.getElementById('terminal-container').addEventListener('click', (e) => {
    document.getElementById('input').focus();
});

const terminal = new Terminal(document.getElementById('input'), document.getElementById('output-wrapper'));

terminal.setFilesystem({
    '/home/ben': { },
    '/home/ben/about.json': {
        content: `<pre>${JSON.stringify({
            name: 'Ben Speakman',
            url: 'https://3sq.re',
        }, null, 2)}</pre>`,
        canModify: false,
    },
    '/home/ben/cv.docx': {
        content: 'Content!',
    },
    '/var/github': {},
    '/var/projects': { },
});

terminal.setCommandMapping();

terminal.init();


terminal.addFile('lol', 'test');

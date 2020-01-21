import Octokit from '@octokit/rest';
import 'babel-polyfill';
import Terminal from './modules/terminal';
import style from './css/app.css';
import { formatAsJson, calculateAge, openFullscreen } from './modules/util';

const octokit = new Octokit();

document.getElementById('terminal-container').addEventListener('click', () => document.getElementById('input').focus());

const terminal = new Terminal(document.getElementById('input'), document.getElementById('output-wrapper'));

terminal.setFilesystem({
    '/home/ben': { },
    '/home/ben/about.json': {
        content: formatAsJson({
            name: 'Ben Speakman',
            age: calculateAge(new Date('1988-04-09')),
            location: 'London',
            github: 'http://github.com/threesquared',
            linkedIn: 'http://uk.linkedin.com/in/bspeakman',

        }),
        canModify: false,
    },
    '/home/ben/cv.docx': {
        content: 'Content!',
    },
    '/home/ben/github/repositories': { },
    '/home/ben/projects': { },
});

terminal.setCommandMapping();

terminal.init();

octokit.search.repos({
    q: 'user:threesquared',
    sort: 'updated',
    order: 'desc',
    per_page: 10,
}).then(({ data }) => {
    data.items.forEach((item) => {
        terminal.addFile(`/home/ben/github/repositories/${item.name}.json`, formatAsJson({
            name: item.full_name,
            description: item.description,
            url: item.html_url,
            website: item.homepage,
            language: item.language,
            stars: item.stargazers_count,
        }));
    });
});

octokit.search.issuesAndPullRequests({
    q: 'author:threesquared type:pr is:public state:closed',
    sort: 'created',
    order: 'desc',
    per_page: 10,
}).then(({ data }) => {
    const items = data.items.map(item => ({
        title: item.title,
        url: item.html_url,
        state: item.state,
        created_at: item.created_at,
    }));

    terminal.addFile('/home/ben/github/pull-requests.json', formatAsJson(items));
});

window.wakaTimeCallback = (data) => {
    terminal.addFile('/home/ben/languages.json', formatAsJson({
        url: 'https://wakatime.com/share/@threesquared/20680b49-da97-4799-89a3-9de79d77bc37.png',
        ...data,
    }));
};

const script = document.createElement('script');
script.src = 'https://wakatime.com/share/@threesquared/20680b49-da97-4799-89a3-9de79d77bc37.json?callback=wakaTimeCallback';
document.getElementsByTagName('head')[0].appendChild(script);


document.getElementById('maximise').addEventListener('click', () => openFullscreen());
document.getElementById('close').addEventListener('click', () => window.close());


// stack overflow

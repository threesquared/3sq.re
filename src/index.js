import { addKeyDownListener, scrollToPageEnd, createOutputDiv } from './util';
import * as Terminal from 'javascript-terminal';

const viewRefs = {
    input: document.getElementById('input'),
    output: document.getElementById('output-wrapper')
};

const outputToHTMLNode = {
    [Terminal.OutputType.TEXT_OUTPUT_TYPE]: content => createOutputDiv('text-output', content),
    [Terminal.OutputType.TEXT_ERROR_OUTPUT_TYPE]: content => createOutputDiv('error-output', content),
    [Terminal.OutputType.HEADER_OUTPUT_TYPE]: content => createOutputDiv('header-output', `root@3sq.re:~$ ${content.command}`)
};

const displayOutputs = (outputs) => {
    viewRefs.output.innerHTML = '';

    const outputNodes = outputs.map(output =>
        outputToHTMLNode[output.type](output.content)
    );

    for (const outputNode of outputNodes) {
        viewRefs.output.append(outputNode);
    }
};

const getInput = () => viewRefs.input.value;

const setInput = (input) => {
    viewRefs.input.value = input;
};

const clearInput = () => {
    setInput('');
};

const emulator = new Terminal.Emulator();

const customFileSystem = Terminal.FileSystem.create({
    '/home/ben': { },
    '/home/ben/about.json': {
        content: "{ name: 'Ben Speakman' }",
        canModify: false
    },
    '/home/ben/cv.docx': {
        content: 'Content!'
    },
    '/var/github': { },
    '/var/projects': { },
});

const customCommandMapping = Terminal.CommandMapping.create({
    ...Terminal.defaultCommandMapping,
    'help': {
        'function': (state, opts) => {
            const input = opts.join(' ');

            return {
                output: OutputFactory.makeTextOutput(input)
            };
        },
        'optDef': {}
    }
});o

let emulatorState = Terminal.EmulatorState.create({
    'fs': customFileSystem,
    'commandMapping': customCommandMapping
})

const historyKeyboardPlugin = new Terminal.HistoryKeyboardPlugin(emulatorState);
const plugins = [historyKeyboardPlugin];

addKeyDownListener('Enter', viewRefs.input, () => {
    const commandStr = getInput();

    emulatorState = emulator.execute(emulatorState, commandStr, plugins);
    displayOutputs(emulatorState.getOutputs());
    scrollToPageEnd();
    clearInput();
});

addKeyDownListener('ArrowUp', viewRefs.input, () => {
    setInput(historyKeyboardPlugin.completeUp());
});

addKeyDownListener('ArrowDown', viewRefs.input, () => {
    setInput(historyKeyboardPlugin.completeDown());
});

addKeyDownListener('Tab', viewRefs.input, () => {
    const autoCompletionStr = emulator.autocomplete(emulatorState, getInput());

    setInput(autoCompletionStr);
});

localStorage.setItem('lastLogin', + new Date());

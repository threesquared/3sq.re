import * as JsTerm from 'javascript-terminal';
import { fromJS } from 'immutable';
import { addKeyDownListener, createOutputDiv, scrollToEnd } from './util';

export default class Terminal {
    constructor(input, output) {
        this.input = input;
        this.output = output;
        this.emulator = new JsTerm.Emulator();

        addKeyDownListener('Enter', this.input, this.keyDownEnter.bind(this));
        addKeyDownListener('ArrowUp', this.input, this.keyDownArrowUp.bind(this));
        addKeyDownListener('ArrowDown', this.input, this.keyDownArrowDown.bind(this));
        addKeyDownListener('Tab', this.input, this.keyDownTab.bind(this));
    }

    keyDownArrowUp() {
        this.setInput(this.historyKeyboardPlugin.completeUp());
    }

    keyDownArrowDown() {
        this.setInput(this.historyKeyboardPlugin.completeDown());
    }

    keyDownEnter() {
        const commandStr = this.getInput();

        this.emulatorState = this.emulator.execute(this.emulatorState, commandStr, [
            this.historyKeyboardPlugin,
        ]);

        this.displayOutputs(this.emulatorState.getOutputs());

        scrollToEnd();

        this.clearInput();
        this.setCwd(JsTerm.EnvironmentVariables.getEnvironmentVariable(this.emulatorState.getEnvVariables(), 'cwd'));
    }

    keyDownTab() {
        const autoCompletionStr = this.emulator.autocomplete(this.emulatorState, this.getInput());

        this.setInput(autoCompletionStr);
    }

    getInput() {
        return this.input.value;
    }

    setInput(input) {
        this.input.value = input;
    }

    clearInput() {
        this.setInput('');
    }

    setCwd(cwd) {
        document.getElementById('cwd').innerHTML = cwd;
        document.getElementById('title').innerHTML = `root@3sq: ${cwd}`;
    }

    displayOutputs(outputs) {
        this.output.innerHTML = '';

        const outputToHTMLNode = {
            [JsTerm.OutputType.TEXT_OUTPUT_TYPE]: content => createOutputDiv('text-output', content),
            [JsTerm.OutputType.TEXT_ERROR_OUTPUT_TYPE]: content => createOutputDiv('error-output', content),
            [JsTerm.OutputType.HEADER_OUTPUT_TYPE]: content => createOutputDiv('header-output', `<span class="host">root@3sq</span>:<span class="path">${content.cwd}</span>$&nbsp;${content.command}`),
        };

        outputs.map(output => outputToHTMLNode[output.type](output.content))
            .forEach(output => this.output.append(output));
    }

    setFilesystem(data) {
        this.filesystem = JsTerm.FileSystem.create(data);
    }

    addFile(path, content) {
        const file = fromJS({
            content,
        });

        const { fs } = JsTerm.FileOp.writeFile(this.emulatorState.getFileSystem(), path, file);

        this.emulatorState = this.emulatorState.setFileSystem(fs);
    }

    setCommandMapping() {
        this.commandMapping = JsTerm.CommandMapping.create({
            ...JsTerm.defaultCommandMapping,
            help: {
                function: (state, opts) => {
                    return {
                        output: JsTerm.OutputFactory.makeTextOutput('Help'),
                    };
                },
                optDef: {},
            },
        });
    }

    init() {
        const defaultEnvVariables = JsTerm.EnvironmentVariables.create();
        const customEnvVariables = JsTerm.EnvironmentVariables.setEnvironmentVariable(
            defaultEnvVariables, 'cwd', '/home/ben',
        );

        this.emulatorState = JsTerm.EmulatorState.create({
            fs: this.filesystem,
            environmentVariables: customEnvVariables,
            commandMapping: this.commandMapping,
        });

        this.historyKeyboardPlugin = new JsTerm.HistoryKeyboardPlugin(this.emulatorState);
    }
}

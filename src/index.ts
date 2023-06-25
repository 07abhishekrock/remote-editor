import { Command } from 'commander';
import setupServer from './server';

const program = new Command();

const remoteEditor = program
  .name('remote-editor')
  .option('-p --port <port-number>', 'port number to host websocket on')
  .option('-f --file <source-file>', 'file location (relative to current directory) to watch');

remoteEditor.parse();

const options = remoteEditor.opts() as {
  port ?: number;
  file ?: string; 
};

const defaultOptions = {
  port: 8080,
  file: 'src/note.txt'
};

const finalOptions = defaultOptions;

if(options.port){
  finalOptions.port = options.port;
}

if(options.file){
  finalOptions.file = options.file;
}

setupServer(finalOptions.port, finalOptions.file);

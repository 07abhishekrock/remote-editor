import chalk from 'chalk';
import * as path from 'path';
import { WebSocketServer, WebSocket } from 'ws';
import * as http from 'http';
import setupWatcher from './watcher';
import { namespaceConsole } from './console';

const serverLog = namespaceConsole(chalk.bgMagenta(' SERVER '));
const websocketLog = namespaceConsole(chalk.bgCyanBright(' CODE-PUSH '));

export default function setupServer(port = 8080, filePath = 'src/note.txt'){

  const server = http.createServer();
  const absoluteFilePath = path.resolve(filePath);

  const wss = new WebSocketServer({
    server
  }); 

  const allWebsocketClients: Set<WebSocket> = new Set();

  wss.on('connection', (ws)=>{
    serverLog(chalk.green('one websocket was connected'));
    allWebsocketClients.forEach((client)=>{
      client.close();
    });
    allWebsocketClients.clear();
    allWebsocketClients.add(ws);

    ws.on('close', ()=>{
      serverLog(chalk.redBright('Websocket Disconnected'));
      allWebsocketClients.delete(ws);
    });
  });

  setupWatcher(absoluteFilePath, (newFileContent)=>{
    allWebsocketClients.forEach(client=>{
      client.send(JSON.stringify({ 
        type: 'code-push',
        sourceCode: newFileContent
      }), (err)=>{
        if(!err){
          websocketLog(chalk.greenBright('Code pushed to ast explorer'));
          return;
        }
        websocketLog(chalk.redBright('Some error occurred'));
      });
    }); 
  });

  server.listen(port, ()=>{
    serverLog(`listening on port ${port}`);
  });

}

## Remote Editor For AST Explorer

1. Use websockets to transfer source code from a remote editor to ast explorer.
2. There can only be one remote session connected because the remote editor is where the server is.
3. The ast explorer connects to the websocket server hosted close to your remote editor. 
4. Set up a cli that starts the websocket server and console the url in the terminal.
5. The cli listens to source code changes and posts the changes via the websocket channel to the ast explorer.

### Steps on the ast explorer

1. The user enters the websocket url.
2. The ast explorer connects to the server.
3. Once the server acknowledges the connection, the ast explorer starts listening for code pushes.
4. When the file changes on server end, the server sends a code push to client.

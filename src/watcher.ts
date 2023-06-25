import Watchpack from 'watchpack';
import * as path from 'path';
import * as fs from 'fs';

export default function setupWatcher(fileToWatch: string, callback: (newFileContents: string)=>void){
  const filePath = path.resolve(fileToWatch);
  const wp = new Watchpack({
    aggregateTimeout: 1000,
    poll: true
  });

  wp.watch({
    files: [ filePath ]
  });

  wp.on('change', function(){
    callback(fs.readFileSync(filePath).toString());
  });
}

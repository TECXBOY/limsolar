const { exec } = require('child_process');
const chokidar = require('chokidar');

let timeout;
const DELAY = 30000; // 30 seconds after last change

const watcher = chokidar.watch('src/**/*', {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
});

watcher.on('change', (path) => {
  console.log(`📝 File changed: ${path}`);
  
  clearTimeout(timeout);
  
  timeout = setTimeout(() => {
    console.log('🔄 Auto-saving to GitHub...');
    
    exec('git add . && git commit -m "Auto-save: Development progress" && git push origin main', 
      (error, stdout, stderr) => {
        if (error) {
          console.error(`❌ Error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`⚠️  ${stderr}`);
          return;
        }
        console.log('✅ Changes saved to GitHub!');
        console.log(stdout);
      }
    );
  }, DELAY);
});

console.log('👀 Watching for file changes...');

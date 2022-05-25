const { app, BrowserWindow } = require('electron');

// window creation function
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  });

  win.loadFile('index.html');
};

// fire window creation function on event whenReady()
app.whenReady().then(() => {
  createWindow();
});

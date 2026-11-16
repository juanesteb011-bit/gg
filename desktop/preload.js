const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('desktopWrapper', {
  platform: process.platform,
  versions: {
    electron: process.versions.electron,
    chrome: process.versions.chrome,
  },
});

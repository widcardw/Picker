module.exports = {
    pluginOptions: {
        electronBuilder: {
            // preload: "src/preload.js",
            nodeIntegration: true,
            enableRemoteModule: true,
            // contextIsolation: false,
        }
    }
}
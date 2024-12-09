const { platform } = require('os')

module.exports = {
    productName: 'TTRPG Sounds', // Replace with your app's name
    appId: 'com.hnetinc.ttrpg-sounds.app', // Replace with your app's ID
    publish: {
        provider: 'github',
        release: true,
        owner: 'hcker2000', // Replace with your GitHub username
        repo: 'ttrpg-sounds', // Replace with your repository name
        draft: true
    },
    win: {
        target: 'nsis'
    },
    linux: {
        target: 'AppImage'
    }
}

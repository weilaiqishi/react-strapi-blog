import compressing from 'compressing'
import path from 'path'
import fs from 'fs'
import stream from 'stream'

const zipPath = path.join(__dirname, 'backend.zip')
async function run() {
    const isExist = fs.existsSync(zipPath)
    isExist && fs.unlinkSync(zipPath)
    const zipStream = new compressing.zip.Stream()
    const ignoreList = ['node_modules', 'build', '.cache', 'CD']
    function listFile(dir: string) {
        const arr = fs.readdirSync(dir)
        arr.forEach((item) => {
            if (ignoreList.every(str => !item.includes(str))) {
                const fullpath = path.join(dir, item)
                const stats = fs.statSync(fullpath)
                if (stats.isDirectory()) {
                    zipStream.addEntry(fullpath)
                } else {
                    zipStream.addEntry(fullpath)
                }
            }
        })
    }
    listFile(path.join(__dirname, '../'))
    const destStream = fs.createWriteStream(zipPath);
    zipStream.pipe(destStream).on('finish', () => { console.log('compress success -> backend.zip') })
}
run()

var fs = require('fs');
var ytdl = require('ytdl-core');
var mkdirp = require('mkdirp');
//var testurl = "http://www.youtube.com/watch?v=A02s8omM_hI";


function submit() {
    var link = document.getElementById('ytlink').value
    var log = document.getElementById('log');
    if (!fs.existsSync("./videos")) {
        mkdirp('./videos', function(err) { if (err != null) return alert(err) });
    }
    ytinfo(link);


}

function ytinfo(url) {
    var validate = ytdl.validateURL(url)
    if (validate != true) return alert("Not valid URL")
    ytdl.getInfo(url, (err, info) => {
        if (err) return alert(err);
        console.log(info.author.name + info.title)
        download(info, url)
    })

}

function download(info, url) {
    var author = info.author.name.split(' ').join('_')
    var title = info.title.split(' ').join('_')
    ytdl(url, { filter: (format) => format.container === 'mp4' })
        .pipe(fs.createWriteStream(`./videos/${author}-${title}.mp4`));
}

function printit(s) {
    log.innerHTML += s + '<br>';
}
"use strict";
const axios = require("axios");
const fs = require("fs");
const fetch = require('node-fetch')
const jimp = require("jimp")
//onst chalk = require('chalk')
const { color } = require('../lib/color')
const chalk = require('chalk')
const {getDevice,getContentType, proto } = require('@whiskeysockets/baileys');
const { sizeFormatter  } = require('human-readable')
const moment = require('moment-timezone')
const Crypto = require('crypto')
const cfonts = require('cfonts')
const spin = require('spinnies')
const FormData = require('form-data');


const checkWAVersion = async () => {
    const { data } = await axios.get('https://web.whatsapp.com/check-update?version=1&platform=web')
    return data.currentVersion.split('.').map(x => parseInt(x))
}

const GIFBufferToVideoBuffer = async (image) => {
const child_process = require('child_process')
const { unlink } = require ('fs').promises
    const filename = `${Math.random().toString(36)}`
    await fs.writeFileSync(`./stik/${filename}.gif`, image)
    child_process.exec(
        `ffmpeg -i ./stik/${filename}.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ./stik/${filename}.mp4`
    )
    await sleep(4000)

    var buffer5 = await fs.readFileSync(`./stik/${filename}.mp4`)
    Promise.all([unlink(`./stik/${filename}.mp4`), unlink(`./stik/${filename}.gif`)])
    return buffer5
}


const getRandomFile = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}
const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}

const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error in getBuffer: ${e}`)
	}
}

const fetchJson = (url, options) => new Promise(async(resolve, reject) => {
    fetch(url, options)
        .then(response => response.json())
        .then(json => {
            resolve(json)
        })
        .catch((err) => {
            reject(err)
        })
})

const resize = (buffer, ukur1, ukur2) => {
    return new Promise(async(resolve, reject) => {
        var baper = await jimp.read(buffer);
        var ab = await baper.resize(ukur1, ukur2).getBufferAsync(jimp.MIME_JPEG)
        resolve(ab)
    })
}


const fetchText = (url, options) => new Promise(async(resolve, reject) => {
    fetch(url, options)
        .then(response => response.text())
        .then(text => {
            resolve(text)
        })
        .catch((err) => {
            reject(err)
        })
})

const getGroupAdmins = function(lala){
    let admins = []
	for (let i of lala) {
		i.admin !== null ? admins.push(i.id) : ''
	}
	return admins
}

const runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

const removeEmojis = (string) => {
	var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
	return string.replace(regex, '');
}

const calculate_age = (dob) => { // new Date("month/date/year")
    var diff_ms = Date.now() - dob.getTime();
	var age_dt = new Date(diff_ms);
	return Math.abs(age_dt.getUTCFullYear() - 1970);
}

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const formatp = sizeFormatter({
    std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
}

const getCase = (cases) => {
return "case  "+`'${cases}'`+fs.readFileSync("./message/case.js").toString().split('case \''+cases+'\'')[1].split("break")[0]+"break"
}
const addCase = (q) => {
let code = fs.readFileSync('./message/case.js', 'utf8');
let indexSwitchCommand = code.indexOf('switch(command){');
if (indexSwitchCommand !== -1) {
const newCase = `\n\n\n\n${q}\n\n\n\n`;
code = code.slice(0, indexSwitchCommand + 17)  + newCase + code.slice(indexSwitchCommand + 20);
fs.writeFileSync('./message/case.js', code);
}
}


const delCase = async (q) =>{
  let whatCase = await getCase(q)
  let code = fs.readFileSync('./message/case.js', 'utf8');
  let indexAwal = code.indexOf(`case '${q}'`);
  let indexAkhir = indexAwal + whatCase.length
  code = code.slice(0, indexAwal)  + code.slice(indexAkhir);
  fs.writeFileSync('./message/case.js', code);

}
const listCase = () => {
const code = fs.readFileSync("./message/case.js", "utf8")
var regex = /case\s+'([^']+)':/g;
var matches = [];
var match;
while ((match = regex.exec(code))) {
matches.push(match[1]);
}
let teks = `*\`Total Case\`*: ${matches.length} \n\n` 
matches.forEach(function (x) {
   teks += "  *☞*  " + x + "\n"
})
return teks
}


const kyun = (seconds) =>{
    function pad(s) {
        return (s < 10 ? '0' : '') + s;
    }
    var hours = Math.floor(seconds / (60 * 60));
    var minutes = Math.floor(seconds % (60 * 60) / 60);
    var seconds = Math.floor(seconds % 60);

    //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

const parseMention = (text = '') => {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

const h2k = (number) => {
    var SI_POSTFIXES = ["", " Ribu", " Juta", " Miliar", " Triliun", " P", " E"]
      //  var SI_POSTFIXES = ["", " K", " M", " G", " T", " P", " E"]
    var tier = Math.log10(Math.abs(number)) / 3 | 0
    if(tier == 0) return number
    var postfix = SI_POSTFIXES[tier]
    var scale = Math.pow(10, tier * 3)
    var scaled = number / scale
    var formatted = scaled.toFixed(1) + ''
    if (/\.0$/.test(formatted))
      formatted = formatted.substr(0, formatted.length - 2)
    return formatted + postfix
}

const FileSize = (number) => {
    var SI_POSTFIXES = ["B", " KB", " MB", " GB", " TB", " PB", " EB"]
    var tier = Math.log10(Math.abs(number)) / 3 | 0
    if(tier == 0) return number
    var postfix = SI_POSTFIXES[tier]
    var scale = Math.pow(10, tier * 3)
    var scaled = number / scale
    var formatted = scaled.toFixed(1) + ''
    if (/\.0$/.test(formatted))
      formatted = formatted.substr(0, formatted.length - 2)
    return formatted + postfix
}


const randomBytes = (length) => {
    return Crypto.randomBytes(length)
}

const generateMessageID = () => {
    return randomBytes(4).toString('hex').toUpperCase()
}





const generateProfilePicture = async (buffer) => {
	const Jimp = await jimp.read(buffer)
	const min = Jimp.getWidth()
	const max = Jimp.getHeight()
	const cropped = Jimp.crop(0, 0, min, max)
	return {
		img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp.MIME_JPEG),
		preview: await cropped.scaleToFit(720, 720).getBufferAsync(jimp.MIME_JPEG)
	}
}

const jsonformat = (string) => {
    return JSON.stringify(string, null, 2)
}

const formatDate = (n, locale = 'id')  => {
  let d = new Date(n)
  return d.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })
}

//Random Nomer
const randomNomor = (angka) => {
return Math.floor(Math.random() * angka) + 1
}

const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
}

const toFirstCase = (str) => {
 let first = str.split(" ")              // Memenggal nama menggunakan spasi
.map(nama => 
nama.charAt(0).toUpperCase() + 
nama.slice(1))                 // Ganti huruf besar kata-kata pertama
.join(" ");

return first
 }

const isNumber = x => typeof x === 'number' && !isNaN(x)

async function catbox(filePath) {
    const form = new FormData();
    form.append('reqtype', 'fileupload');
    form.append('fileToUpload', fs.createReadStream(filePath));

    let catboxResponse;
    try {
        catboxResponse = await axios.post('https://catbox.moe/user/api.php', form, {
            headers: form.getHeaders()
        });
    } catch (uploadError) {
        console.error('Catbox API request error:', uploadError.message);
        if (uploadError.response) {
            console.error('Catbox error response data:', uploadError.response.data);
            console.error('Catbox error response status:', uploadError.response.status);
        }
        throw new Error('Failed to upload to Catbox due to API request error.');
    }

    if (!catboxResponse.data || typeof catboxResponse.data !== 'string' || !catboxResponse.data.startsWith('http')) {
        console.error('Catbox API unexpected response:', catboxResponse.data);
        throw new Error('Failed to upload to Catbox or received an invalid response.');
    }

    return catboxResponse.data;
}




module.exports = {
toFirstCase,
isNumber,
checkWAVersion,
getBuffer,
fetchJson,
fetchText,
getGroupAdmins,
runtime,
removeEmojis,
calculate_age,
sleep,
makeid,
formatp,
isUrl,
getCase,
addCase,
delCase,
listCase,
makeid,
kyun,
parseMention,
h2k,
resize,
FileSize,
randomBytes,
generateMessageID,
getRandom,
getRandomFile,
GIFBufferToVideoBuffer,
generateProfilePicture,
jsonformat,
formatDate,
randomNomor,
 pickRandom,
 catbox
}




let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.bgGreen(color("[  UPDATE ]", "black")),chalk.white(`${__filename}`) )
delete require.cache[file]
require(file)
})


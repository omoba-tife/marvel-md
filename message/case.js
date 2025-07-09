const chalk = require("chalk");
const pino = require("pino");
const fs = require("fs");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const moment = require("moment-timezone");
const util = require("util");
const crypto = require("crypto");
const { exec, spawn, execSync } = require("child_process");
const axios = require("axios");
const yts = require("yt-search");
const speed = require("performance-now");
const ms = require("parse-ms");
const os = require("os");
let platform = os.platform();
let arch = os.arch();
const { join, dirname } = require("path");
const path = require("path");
const { performance } = require("perf_hooks");
const fetch = require("node-fetch");
const { msgFilter, addSpam, SpamExpired, cekSpam } = require("../lib/antispam");
const { color } = require("../lib/color");
const {
  toFirstCase,
  isNumber,
  pickRandom,
  generateProfilePicture,
  listCase,
  runtime,
  makeid,
  isUrl,
  fetchJson,
  sleep,
  getBuffer,
  catbox,
} = require("../lib/myfunc");
const { Failed, Succes, checkDataId } = require("../lib/totalcmd");
const _sewa = require("../lib/sewa");
const _prem = require("../lib/premium");
const { bad } = require("../message/messages");
const { vnMenu, gifVid } = require("../temp/media/links.js");
const { virtex } = require("../database/virtex/virtex.js");
//database
const AntiSpam = db.data.antispam;
const DataId = db.data.data;
const ban = db.data.banned;
const premium = db.data.premium;
const listcmdblock = db.data.blockcmd;
const listerror = db.data.listerror;
const hitnya = db.data.hittoday;
const dash = db.data.dashboard;
const anonChat = db.data.anonymous;
const allcommand = db.data.allcommand;
const sewa = db.data.sewa;
const spammer = [];
//=================================================//

module.exports = async (conn, dev, chatUpdate, store) => {
  var multi = db.data.settings["settingbot"].multi;
  const m = dev;
  var Ownerin = "000@s.whatsapp.net";
  const Tnow = (new Date() / 1000).toFixed(0);
  const seli = Tnow - m.messageTimestamp.low;
  if (seli > Intervalmsg)
    return console.log(
      `Message ${Intervalmsg} seconds ago ignored to avoid spamming`
    );
  try {
    const {
      type,
      now,
      args,
      sender,
      fromMe,
      from,
      botNumber,
      senderNumber,
      groupName,
      groupId,
      groupMembers,
      groupDesc,
      groupOwner,
      pushname,
      itsMe,
      mentionByTag,
      mentionByReply,
      users,
      budy,
      content,
      body,
    } = dev;
    const isGroup = m.key.remoteJid.endsWith("@g.us");
    const prefixFile = "./database/prefix.json";
    let prefix = ".";
    if (fs.existsSync(prefixFile)) {
      try {
        const data = JSON.parse(fs.readFileSync(prefixFile, "utf8"));
        if (data.prefix) prefix = data.prefix;
      } catch (error) {
        console.error("Error loading prefix:", error);
      }
    }
    var ownerNumber = [
      `${botNumber}@s.whatsapp.net`,
      `2348135483096@s.whatsapp.net`,
      `${conn.user.jid}`,
    ];
    const ownerFile = "./database/owner.json";
    let ownerList = [];
    if (fs.existsSync(ownerFile)) {
      try {
        ownerList = JSON.parse(fs.readFileSync(ownerFile, "utf8"));
      } catch (error) {
        console.error("Error loading owner list:", error);
      }
    }
    const isOwner =
      ownerNumber.includes(sender) ||
      ownerList.includes(sender) ||
      checkDataId("owner", sender, DataId);
    const isCmd = body.startsWith(prefix);
    const isCommand = isCmd
      ? body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase()
      : "";
    const isCommandx = body.startsWith(prefix)
      ? body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase()
      : body.trim().split(/ +/).shift().toLowerCase();
    const q = args.join(" ");
    const timeWib = moment().tz("Africa/Lagos").format("HH:mm:ss");
    const text = args.join(" ");
    const command =
      _prem || isOwner
        ? body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase()
        : isCommand;
    const theOwner = sender == Ownerin;
    const timestampp = speed();
    const latensi = speed() - timestampp;
    const quoted = dev.quoted ? dev.quoted : dev;
    const mime = (quoted.msg || quoted).mimetype || "";
    const more = String.fromCharCode(8206);
    const readmore = more.repeat(4001);
    const numberQuery =
      q.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`;
    const Input =
      mentionByTag && mentionByTag[0]
        ? mentionByTag[0]
        : mentionByReply || q
        ? numberQuery
        : false;
    let publik = true;
    const replyCommand = isCmd
      ? isCmd
      : allcommand.includes(toFirstCase(command));
    const selectedButton =
      type == "buttonsResponseMessage"
        ? dev.message.buttonsResponseMessage.selectedButtonId
        : "";
    const isMessage =
      m.message.conversation ||
      m.message.extendedTextMessage?.text ||
      m.message.imageMessage?.caption ||
      m.message.imageMessage?.url ||
      m.message.videoMessage?.caption ||
      m.message.videoMessage?.url ||
      m.message.stickerMessage?.url ||
      m.message.documentMessage?.caption ||
      m.message.documentMessage?.url ||
      m.message.audioMessage?.url ||
      m.message.buttonsResponseMessage?.selectedButtonId ||
      m.message.templateButtonReplyMessage?.selectedId ||
      m.message.listResponseMessage?.singleSelectReply?.selectedRowId ||
      m.message.contactMessage?.displayName ||
      m.message.locationMessage?.degreesLatitude ||
      m.message.pollCreationMessage?.name ||
      "";
    const user = global.db.data.users[m.sender];
    const chat = isGroup ? global.db.data.chats[m.chat] : false;
    const kickon = global.db.data.kickon[m.chat];
    const botRun = global.db.data.others["runtime"];
    const botTime = new Date() - botRun.runtime || "Not detected";
    const runTime = clockString(botTime);
    if (global.autoReadChat === true && isMessage) {
      await conn.readMessages([m.key]);
    }
    if (global.autotyping === true) {
      conn.sendPresenceUpdate("composing", from);
    }
    if (global.alwaysonline === true) {
      conn.sendPresenceUpdate("available", from);
    }
    //Waktu
    let d = new Date();
    let locale = "en";
    let gmt = new Date(0).getTime() - new Date("1 Januari 2021").getTime();
    let weton = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][
      Math.floor((d * 1 + gmt) / 84600000) % 5
    ];
    let week = d.toLocaleDateString(locale, {
      weekday: "long",
    });
    const calender = d.toLocaleDateString("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    function clockString(ms) {
      let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000);
      let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24;
      let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
      let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
      var dDisplay = d > 0 ? d + (d == 1 ? " hari, " : " hari, ") : "";
      var hDisplay = h > 0 ? h + (h == 1 ? " jam, " : " jam, ") : "";
      var mDisplay = m > 0 ? m + (m == 1 ? " menit, " : " menit, ") : "";
      var sDisplay = s > 0 ? s + (s == 1 ? " detik" : " detik") : "";
      let time =
        d > 0
          ? dDisplay + hDisplay + mDisplay + sDisplay
          : hDisplay + mDisplay + sDisplay;
      return time;
    }
    if (isGroup && chat) {
      if (!("name" in chat)) chat.name = groupNmae;
      if (!isNumber(chat.add)) chat.add = 0;
      if (!("welcome" in chat)) chat.welcome = false;
      if (!("detect" in chat)) chat.detect = true;
      if (!("sWelcome" in chat)) chat.sWelcome = "";
      if (!("sBye" in chat)) chat.sBye = "";
      if (!("sPromote" in chat)) chat.sPromote = "";
      if (!("sDemote" in chat)) chat.sDemote = "";
      if (!("desc" in chat)) chat.desc = true;
      if (!("descUpdate" in chat)) chat.descUpdate = true;
      if (!("stiker" in chat)) chat.stiker = false;
      if (!("antibot" in chat)) chat.antibot = false;
      if (!("antiimage" in chat)) chat.antiimage = false;
      if (!("antisticker" in chat)) chat.antisticker = false;
      if (!("antivideo" in chat)) chat.antivideo = false;
      if (!("antiaudio" in chat)) chat.antiaudio = false;
      if (!("antiLink" in chat)) chat.antiLink = false;
      if (!isNumber(chat.expired)) chat.expired = 0;
      if (!("antiBadword" in chat)) chat.antiBadword = true;
      if (!("antispam" in chat)) chat.antispam = true;
      if (!("antitroli" in chat)) chat.antitroli = false;
      if (!("antivirtex" in chat)) chat.antivirtex = true;
      if (!("antiwame" in chat)) chat.antiwame = false;
      if (!("antitoxic" in chat)) chat.antitoxic = false;
      if (!("viewonce" in chat)) chat.viewonce = true;
      if (!("nsfw" in chat)) chat.nsfw = false;
      if (!("rpg" in chat)) chat.rpg = false;
      if (!("clear" in chat)) chat.clear = false;
      if (!isNumber(chat.cleartime)) chat.clearTime = 0;
    } else if (isGroup)
      global.db.data.chats[m.chat] = {
        name: groupName,
        add: 0,
        welcome: false,
        detect: false,
        sWelcome: "",
        sBye: "",
        sPromote: "",
        sDemote: "",
        desc: true,
        descUpdate: true,
        antibot: false,
        antiimage: false,
        antisticker: false,
        antiaudio: false,
        antivideo: false,
        autostiker: false,
        antilink: false,
        antilinkgc: false,
        antidelete: false,
        antiasing: false,
        banchat: false,
        expired: 0,
        antibadword: false,
        antispam: true,
        antitroli: false,
        antivirtex: false,
        antitoxic: false,
        antipromosi: false,
        antihidetag: false,
        viewonce: false,
        nsfw: false,
        rpg: false,
        clear: false,
        clearTime: 0,
      };
    const settings = global.db.data.settings["settingbot"];
    if (settings) {
      //Auto set
      if (!isNumber(settings.status)) setting.status = new Date() * 1;
      if (!("setmenu" in settings)) settings.setmenu = "document";
      if (!("docType" in settings)) settings.docType = "docx";
      if (!("Qoted" in settings)) settings.Qoted = "ftoko";
      if (!("autoBio" in settings)) settings.autoBio = true;
      if (!("multi" in settings)) settings.multi = true;
      if (!("prefix" in settings)) settings.prefix = "!";
      if (!("fake" in settings)) settings.fake = botName;
      if (!("autoblockcmd" in settings)) settings.autoblockcmd = false;
      if (!("fake1" in settings)) settings.fake1 = "EhzStore";
      if (!("replyType" in settings)) settings.replyType = "web";
      if (!("setwelcome" in settings)) settings.setwelcome = "type11";
      if (!("autoReport" in settings)) settings.autoReport = true;
      if (!("autoLevel" in settings)) settings.autoLevel = true;
      if (!("autoSticker" in settings)) settings.autoSticker = false;
      if (!("publik" in settings)) settings.publik = true;
    } else {
      global.db.data.settings["settingbot"] = {
        status: new Date() * 1,
        setmenu: "document",
        docType: "docx",
        Qoted: "ftoko",
        autoBio: true,
        multi: true,
        prefix: "!",
        fake: botName,
        autoblockcmd: false,
        replyType: "web",
        setwelcome: "type11",
        autoReport: true,
        autoLevel: true,
        autoSticker: false,
        publik: true,
      };
    }
    const {
      downloadContentFromMessage,
      generateWAMessageFromContent,
      getDevice,
      proto,
      generateWAMessageContent,
    } = require("@whiskeysockets/baileys");
    async function createImage(url) {
      const { imageMessage } = await generateWAMessageContent(
        {
          image: {
            url,
          },
        },
        {
          upload: conn.waUploadToServer,
        }
      );
      return imageMessage;
    }
    const groupMetadata = isGroup
      ? await conn.groupMetadata(m.chat).catch((e) => {})
      : "";
    const participants = isGroup ? await groupMetadata.participants : "";
    const groupAdmins = isGroup
      ? await participants.filter((v) => v.admin !== null).map((v) => v.id)
      : "";
    const isGroupOwner = isGroup ? groupMetadata.owner : "";
    const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
    const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = isGroup ? groupAdmins.includes(sender) : false;
    const isGroupAdmins = isGroup ? groupAdmins.includes(sender) : false;
    const isAntiLink = isGroup ? db.data.chats[from].antilink : false;
    const isWelcome = isGroup ? db.data.chats[from].welcome : true;
    const isAntidelete = isGroup ? db.data.chats[from].antidelete : false;
    const isAntilinkGc = isGroup ? db.data.chats[from].antilinkgc : false;
    const isAntiVirtex = isGroup ? db.data.chats[from].antivirtex : false;
    const isAntiToxic = isGroup ? db.data.chats[from].antitoxic : false;
    const isPremium = isOwner ? true : _prem.checkPremiumUser(sender, premium);
    const isAntiViewOnce = isGroup ? db.data.chats[from].viewonce : false;
    const isAntiBot = isGroup ? db.data.chats[from].antibot : false;
    const isAntiNsfw = isGroup ? db.data.chats[from].nsfw : false;

    //User
    const userLevel = user ? db.data.users[m.sender].level : true;
    const userExp = user ? db.data.users[m.sender].exp : true;
    const userId = user ? db.data.users[m.sender].id : true;
    const amountExp = Math.floor(Math.random() * 10) + 50;
    const requiredExp = 10000 * userLevel;
    const userPersen = (userExp / requiredExp) * 100;
    const userVerified = user ? db.data.users[m.sender].date : true;

    //Ucapan Waktu
    if (timeWib < "23:59:00") {
      var ucapanWaktu = "𝙾𝚁𝙴𝚆𝙰𓃵";
    }
    if (timeWib < "19:00:00") {
      var ucapanWaktu = "𝙾𝚁𝙴𝚆𝙰𓃵";
    }
    if (timeWib < "18:00:00") {
      var ucapanWaktu = "𝙾𝚁𝙴𝚆𝙰𓃵";
    }
    if (timeWib < "15:00:00") {
      var ucapanWaktu = "𝙾𝚁𝙴𝚆𝙰𓃵";
    }
    if (timeWib < "11:00:00") {
      var ucapanWaktu = "𝙾𝚁𝙴𝚆𝙰𓃵";
    }
    if (timeWib < "06:00:00") {
      var ucapanWaktu = "𝙾𝚁𝙴𝚆𝙰𓃵";
    }
    conn.sendPresenceUpdate("unavailable", from);

    const isImage = type === "imageMessage";
    const isVideo = type === "videoMessage";
    const isSticker = type == "stickerMessage";
    const isAudio = type == "audioMessage";
    const isText = type == "conversation";
    const isMedia = type === "imageMessage" || type === "videoMessage";
    const isViewOnce = type == "viewOnceMessageV";
    const isAllMedia =
      type === "imageMessage" ||
      type === "videoMessage" ||
      type === "stickerMessage" ||
      type === "audioMessage" ||
      type === "contactMessage" ||
      type === "locationMessage";
    const isQuotedImage =
      type === "extendedTextMessage" && content.includes("imageMessage");
    const isQuotedVideo =
      type === "extendedTextMessage" && content.includes("videoMessage");
    const isQuotedSticker =
      type === "extendedTextMessage" && content.includes("stickerMessage");
    const isQuotedAudio =
      type === "extendedTextMessage" && content.includes("audioMessage");
    const isQuotedTeks =
      type === "extendedTextMessage" && content.includes("quotedMessage");
    const isQuotedTag =
      type === "extendedTextMessage" && content.includes("mentionedJid");
    const isQuotedReply =
      type === "extendedTextMessage" && content.includes("Message");
    const isQuotedText =
      type === "extendedTextMessage" && content.includes("conversation");
    const isQuotedViewOnce =
      type === "extendedTextMessage" && content.includes("viewOnceMessageV2");
    const pesilit =
      type === "conversation" && dev.message.conversation
        ? dev.message.conversation
        : type == "imageMessage" && dev.message.imageMessage.caption
        ? dev.message.imageMessage.caption
        : type == "videoMessage" && dev.message.videoMessage.caption
        ? dev.message.videoMessage.caption
        : type == "extendedTextMessage" && dev.message.extendedTextMessage.text
        ? dev.message.extendedTextMessage.text
        : "";
    const messagesD = pesilit.slice(0).trim().split(/ +/).shift().toLowerCase();
    const messagesC = pesilit.slice(0).trim();
    const logMessage = (
      type,
      colorCode,
      timestamp,
      content,
      sender,
      group = null
    ) => {
      let log =
        color(`[${type}]`, colorCode) +
        color(` [${timestamp}]`, "green") +
        color(` ${content}`, "cyan") +
        color(` from`, "gold") +
        color(` ${sender}`, "orange");

      if (group)
        log += color(` in group`, "purple") + color(` ${group}`, "deeppink");
      console.log(log);
    };
    const reply = async (text) => {
      conn.sendMessage(
        from,
        {
          text: fontx(`${text}\n> `),
        },
        {
          quoted: m,
        }
      );
    };
    const replyx = async (teks) => {
      conn.sendMessage(from, {
        text: teks,
      });
    };
    const timestamp = moment.tz("Africa/Lagos").format("HH:mm");

    if (!isGroup && !isCmd) {
      logMessage("PRIVATE", "greenyellow", timestamp, budy, pushname);
    }

    if (isGroup && !isCmd) {
      logMessage("GROUP", "gold", timestamp, budy, pushname, groupName);
    }

    if (!isGroup && isCmd) {
      logMessage(
        "CMD",
        "blue",
        timestamp,
        `${command} [${args.length}]`,
        pushname
      );
    }

    if (isGroup && isCmd) {
      logMessage(
        "CMD",
        "blue",
        timestamp,
        `${command} [${args.length}]`,
        pushname,
        groupName
      );
    }
    // Pengubah teks
    const fontx = (text, style = 1) => {
      var abc = "abcdefghijklmnopqrstuvwxyz1234567890".split("");
      var ehz = {
        1: "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ1234567890",
      };
      var replacer = [];
      abc.map((v, i) =>
        replacer.push({
          original: v,
          convert: ehz[style].split("")[i],
        })
      );
      var str = text.toLowerCase().split("");
      var output = [];
      str.map((v) => {
        const find = replacer.find((x) => x.original == v);
        find ? output.push(find.convert) : output.push(v);
      });
      return output.join("");
    };
    //×××××××××××××××××××××××××//
    let listRespon = global.db.data.respon[body];
    if (listRespon) m.reply(listRespon.respon);

    //FAKE REPLY
    const ments = (teks) => {
      return teks.match("@")
        ? [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map(
            (v) => v[1] + "@s.whatsapp.net"
          )
        : [sender];
    };

    const fcall = {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        ...(from
          ? {
              remoteJid: "status@broadcast",
            }
          : {}),
      },
      message: {
        extendedTextMessage: {
          text: body,
        },
      },
    };
    const ehan = {
      key: {
        participant: `0@s.whatsapp.net`,
        ...(m.chat
          ? {
              remoteJid: `status@broadcast`,
            }
          : {}),
      },
      message: {
        contactMessage: {
          displayName: `${pushname}`,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;menhera,;;;\nFN: ehanz Ai\nitem1.TEL;waid=${
            m.sender.split("@")[0]
          }:+${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
          jpegThumbnail: null,
          thumbnail: null,
          sendEphemeral: true,
        },
      },
    };
    //Message
    require("./message.js")(senderNumber, prefix, command, reply);
    // Custom reply function
    const sendvn = (teks) => {
      conn.sendMessage(
        from,
        {
          audio: { url: teks },
          ptt: false,
          waveform: [
            0, 0, 50, 0, 0, 0, 10, 80, 10, 60, 10, 99, 60, 30, 10, 0, 0, 0,
          ],
          mimetype: "audio/mpeg",
        },
        {
          quoted: m,
        }
      );
    };
    const sendSticker = (teks) => {
      conn.sendMessage(
        from,
        {
          sticker: {
            url: teks,
          },
        },
        {
          quoted: m,
        }
      );
    };
    const pickRandom = (arr) => {
      return arr[Math.floor(Math.random() * arr.length)];
    };
    const vnme = vnMenu;
    const dmusic = vnme[Math.floor(Math.random() * vnme.length)];
    const mentions = (teks, memberr, id) => {
      id == null || id == undefined || id == false
        ? conn.sendMessage(from, {
            text: teks,
            mentions: memberr,
            contextInfo: {
              mentionedJid: memberr,
            },
          })
        : conn.sendMessage(
            from,
            {
              mentions: memberr,
              text: teks,
              contextInfo: {
                mentionedJid: memberr,
              },
            },
            {
              quoted: dev,
            }
          );
    };
    //××××××××××××××××{××××//
    const addSpammer = function (jid, _db) {
      let position = false;
      Object.keys(_db).forEach((i) => {
        if (_db[i].id === jid) {
          position = i;
        }
      });
      if (position !== false) {
        _db[position].spam += 1;
      } else {
        let bulin = {
          id: jid,
          spam: 1,
        };
        _db.push(bulin);
      }
    };

    const FinisHim = async function (jid, _db) {
      let position = false;
      Object.keys(_db).forEach((i) => {
        if (_db[i].id === jid) {
          position = i;
        }
      });
      if (position !== false) {
        if (_db[position].spam > 7) {
          if (db.data.users[sender].banned.status || !isOwner) {
            return;
          }
          let obj = {
            id: senderNumber,
            status: true,
            date: calender,
            reason: "Spam Bot",
          };
          db.data.users[woke].banned = obj;
          console.log(
            `${jid} Terdeteksi spam lebih dari ${_db[position].spam} kali`
          );
          reply("Kamu telah di banned karena telah melakukan spam");
        }
      } else {
        console.log(`Spam ke ${_db[position].spam}`);
      }
    };
    //System Expired
    _sewa.expiredCheck(conn, sewa);
    _prem.expiredCheck(premium);

    //ANTI SPAM BERAKHIR
    if (SpamExpired(senderNumber, "Case", AntiSpam)) {
      let position = false;
      for (let i of spammer) {
        if (i.id == senderNumber) {
          position = i;
        }
      }

      if (position !== false) {
        spammer.splice(position, 1);
        console.log(
          chalk.bgGreen(color("[  Remove ]", "black")),
          "Sukses remove spammer"
        );
      }
    }

    SpamExpired(senderNumber, "NotCase", AntiSpam);
    if (isCmd && cekSpam("Case", senderNumber, AntiSpam)) {
      addSpammer(senderNumber, spammer);
      FinisHim(senderNumber, spammer);
      console.log(
        chalk.bgYellowBright(color("[  SPAM  ]", "black")),
        "antispam Case aktif"
      );
      return;
    }

    //ANTI SPAM PRIVATE CHAT
    if (
      antiSpam &&
      isCmd &&
      msgFilter.isFiltered(from) &&
      !isGroup &&
      !itsMe &&
      !isOwner
    ) {
      addSpam("Case", senderNumber, "5s", AntiSpam);
      addSpammer(senderNumber, spammer);
      return;
    }
    //Beta Function Bug New ✅
    async function SPAMNOCLICK(isTarget) {
      let Msg = {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2,
            },
            interactiveMessage: {
              contextInfo: {
                mentionedJid: ["13135550002@s.whastapp.net"],
                isForwarded: true,
                forwardingScore: 999,
                businessMessageForwardInfo: {
                  businessOwnerJid: isTarget,
                },
              },
              body: {
                text: "Pak Toya in here",
              },
              nativeFlowMessage: {
                buttons: [
                  {
                    name: "single_select",
                    buttonParamsJson: "",
                  },
                  {
                    name: "call_permission_request",
                    buttonParamsJson: "",
                  },
                  {
                    name: "mpm",
                    buttonParamsJson: "",
                  },
                  {
                    name: "mpm",
                    buttonParamsJson: "",
                  },
                  {
                    name: "mpm",
                    buttonParamsJson: "",
                  },
                  {
                    name: "mpm",
                    buttonParamsJson: "",
                  },
                ],
              },
            },
          },
        },
      };

      await conn.relayMessage(isTarget, Msg, {
        participant: { jid: isTarget },
      });
    }
    //ANTI SPAM GROUP CHAT
    if (
      antiSpam &&
      isCmd &&
      msgFilter.isFiltered(from) &&
      isGroup &&
      !itsMe &&
      !isOwner
    ) {
      addSpam("Case", senderNumber, "10s", AntiSpam);
      addSpammer(senderNumber, spammer);
      return;
    }
    if (isCmd && !isOwner) msgFilter.addFilter(from);
    // This case was invented by TIFE TECH
    if (global.autoreact && isMessage) {
      try {
        const emojis = [
          "😊",
          "👍",
          "😂",
          "🥶",
          "😵",
          "😘",
          "😑",
          "😤",
          "😍",
          "😎",
          "😋",
          "🤗",
          "🥰",
          "😜",
          "😌",
          "😬",
          "🙃",
          "😈",
          "😏",
          "🥳",
          "🤩",
          "😅",
          "🤭",
          "😷",
          "😴",
          "🤔",
          "😮",
          "😬",
          "😪",
          "😅",
          "😓",
          "😤",
          "🥺",
          "🤐",
          "😔",
          "😞",
          "😳",
          "😜",
          "😝",
          "🥶",
          "😇",
          "🙄",
          "😡",
          "😬",
          "🤧",
          "😩",
          "😏",
          "😶",
          "😳",
          "😋",
          "😌",
          "😆",
          "🤭",
          "🤩",
          "😺",
          "😶‍🌫️",
          "😤",
          "🤯",
          "😱",
          "🥵",
          "😶",
          "😕",
          "🤑",
          "🤒",
          "🤧",
          "🤮",
          "🤫",
          "🥸",
          "😧",
          "😞",
          "🫣",
          "🥱",
          "🤐",
          "😮‍💨",
          "🤠",
        ];
        const getRandomEmoji = () =>
          emojis[Math.floor(Math.random() * emojis.length)];
        if (m.key && m.key.remoteJid && m.key.id) {
          const randomEmoji = getRandomEmoji();
          await conn.sendMessage(m.chat, {
            react: {
              text: randomEmoji,
              key: m.key,
            },
          });
        }
      } catch (error) {
        console.error("Error in AutoReact:", error.message || error);
      }
    }
    if (settings) {
    } else
      global.db.data.settings["settingbot"] = {
        status: new Date() * 1,
      };
    if (
      new Date() * 1 - settings.status > 2000 &&
      settings &&
      settings.autoBio
    ) {
      let data = global.db.data.others["runtime"];
      let time = new Date() - data.runtime;
      let bio = ` 💠ＳＵＰＥＲ ＭＡＲＶＥＬ ＢＯＴ💠`;
      await conn.updateProfileStatus(bio).catch((_) => _);
      settings.status = new Date() * 1;
    }
    // Function Loading
    async function loading() {
      let emotLoad = [`${themeemoji}`];
      await conn.sendMessage(from, {
        react: {
          text: emotLoad,
          key: m.key,
        },
      });
    }
    async function loadingx() {
      let emotLoaderr = ["💀"];
      await conn.sendMessage(from, {
        react: {
          text: emotLoaderr,
          key: m.key,
        },
      });
    }
    async function killing() {
      let emotLoad = [`😈`];
      await conn.sendMessage(from, {
        react: {
          text: emotLoad,
          key: m.key,
        },
      });
    }

    async function autoViewStatus() {
      try {
        if (global.autoswview === true) {
          let statusList = await conn.fetchStatusUpdates();
          for (let status of statusList) {
            await conn.readStatus(status.id);
          }
        }
      } catch (err) {
        console.error("Error in autoViewStatus:", err);
      }
    }

    //-------------------- 》SECURITY《 ------------------\\
    if (isMessage.toLowerCase().includes("send")) {
      if (isGroup) return;
      if (!m.quoted || !m.quoted.message) return;

      let mime = Object.keys(m.quoted.message)[0]; // e.g. imageMessage, videoMessage, etc.
      let mediaType = "";
      let mediaKey = "";

      if (mime === "imageMessage") {
        mediaType = "image";
        mediaKey = "imageMessage";
      } else if (mime === "videoMessage") {
        mediaType = "video";
        mediaKey = "videoMessage";
      } else if (mime === "audioMessage") {
        mediaType = "audio";
        mediaKey = "audioMessage";
      } else {
        return reply("❌ Unsupported media type.");
      }

      try {
        let media = await m.quoted.download();
        let sendOptions = { quoted: m };

        if (m.quoted.message[mediaKey].caption) {
          sendOptions.caption = m.quoted.message[mediaKey].caption;
        }

        if (mediaType === "image") {
          await conn.sendMessage(m.sender, { image: media, ...sendOptions });
        } else if (mediaType === "video") {
          await conn.sendMessage(m.sender, { video: media, ...sendOptions });
        } else if (mediaType === "audio") {
          await conn.sendMessage(m.sender, {
            audio: media,
            mimetype: "audio/mpeg",
            ptt: false,
            ...sendOptions,
          });
        }
      } catch (err) {
        console.error("Send error:", err);
        reply("❌ Failed to send media.");
      }
    }
    //ANTI VIEWONCE
    if (
      (type == "viewOnceMessage" || isQuotedViewOnce) &&
      (isAntiViewOnce || budy.startsWith("Readviewonce"))
    ) {
      const { downloadContentFromMessage } = (
        await import("@whiskeysockets/baileys")
      ).default;
      if (isQuotedViewOnce) {
        var view = m.quoted.message;
      } else {
        var view = m.message.viewOnceMessage.message;
      }

      let Type = Object.keys(view)[0];
      let media = await downloadContentFromMessage(
        view[Type],
        Type == "imageMessage" ? "image" : "video"
      );
      let buffer = Buffer.from([]);
      for await (const chunk of media) {
        buffer = Buffer.concat([buffer, chunk]);
      }
      if (/video/.test(Type)) {
        conn.sendFile(m.chat, buffer, "media.mp4", view[Type].caption || "", m);
      } else if (/image/.test(Type)) {
        conn.sendFile(m.chat, buffer, "media.jpg", view[Type].caption || "", m);
      }
    }

    /*==========ANTILINK=========*/
    if (isGroup && isAntiLink) {
      if (budy.includes(`https:`)) {
        if (isGroupAdmins)
          return reply(
            `*「 LINK DETECTED 」*\n> *GROUP ADMINS ARE EXCEPTIONAL*`
          );
        if (ownerNumber.includes(sender)) return reply(`*「 LINK DETECTED 」*`);
        let linkgc = await conn.groupInviteCode(from);
        if (budy.includes(`${linkgc}`))
          return reply(`*「 GROUP LINK DETECTED 」*\n> *Almost kicked you ✌️*`);
        if (budy.includes("blue") || budy.includes("admin"))
          return reply(
            "*「 GROUP LINK DETECTED 」*\nADMIN PERMISSION RECEIVED"
          );
        reply(
          ` *「 LINK DETECTED 」*\n> You sent a link, sorry you were kicked from the group`
        );
        setTimeout(() => {
          if (isBotGroupAdmins)
            conn.sendMessage(from, {
              delete: m.key,
            });
          conn.groupParticipantsUpdate(from, [sender], "remove").catch((e) => {
            reply(`BOT MUST BE ADMIN`);
          });
        }, 2000);
      }
    }
    /*==========ANTILINK👆👆👆=========*/
    if (type === "protocolMessage" && global.antidelete) {
      let mess = chatUpdate.messages[0].message.protocolMessage;

      try {
        let chats = Object.entries(await conn.chats).find(
          ([user, data]) => data.messages && data.messages[mess.key.id]
        );

        if (chats && chats[1] !== undefined) {
          let msg = JSON.parse(JSON.stringify(chats[1].messages[mess.key.id]));
          let info =
            `🛑 *Deleted Message Detected*\n\n` +
            `📍 *Chat/Group Name:* ${
              chats[1]?.metadata?.subject || "Private Chat"
            }\n` +
            `👤 *Sender:* ${msg.pushName || "Unknown"}\n` +
            `> `;
          await conn.sendMessage(botNumber, {
            text: info,
          });
          await conn
            .copyNForward(botNumber, msg)
            .catch((e) => console.log(e, msg));
        }
      } catch (error) {
        console.error("Error handling anti-delete:", error);
      }
    }
    //ANTI VIRUS
    if (isGroup && isAntiVirtex) {
      if (
        budy.includes("๒๒๒๒") ||
        budy.includes("ดุ") ||
        budy.includes("ผิดุท้เึางืผิดุท้เึางื") ||
        budy.includes("๑๑๑๑๑๑๑๑") ||
        budy.includes("৭৭৭৭৭৭৭৭") ||
        budy.includes("   ⃢   ⃢   ⃢  ") ||
        budy.includes(
          "*⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃟⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢⃟⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢⃟⃟ᡃ⃟ᡃ⃟ᡃ⃢ᡃ⃢ᡃ⃢⃟⃢⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃟⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢⃟⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢⃟⃟ᡃ⃟ᡃ⃟ᡃ⃢ᡃ⃢ᡃ⃢⃟⃢⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃟⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢⃟⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢⃟⃟ᡃ⃟ᡃ⃟ᡃ⃢ᡃ⃢ᡃ⃢⃟⃢⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟"
        ) ||
        budy.includes("ผดิทุเ้ึางผืดิทุเ้") ||
        budy.includes(".*࡞ࣰࣰࣰࣲࣲࣲࣲࣩࣩࣩࣩࣶࣶ࣯࣯࣮࣮ࣦ࣯ࣨࣨࣨࣻࣻࣻࣼࣼࣼࣽࣽࣾࣷࣵࣴ࣬࣬࣬ࣤࣤࣧࣧ*") ||
        budy.includes("᥋") ||
        budy.includes("؁") ||
        budy.includes("ٯٯٯٯٯ")
      ) {
        if (isGroupAdmins) return reply("*VIRTEX DETECTED*");
        console.log(
          color("[KICK]", "red"),
          color("Received a virus text!", "yellow")
        );
        conn.sendMessage(
          m.chat,
          `*TANDAI TELAH DIBACA*\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n *Bang yg ngirim virtex nih:* \nwa.me/${
            sender.split("@")[0]
          }`
        );
        if (!isBotGroupAdmins) {
          return;
        }
        if (isOwner) {
          return;
        }
        await conn.groupParticipantsUpdate(from, [sender], "remove");
        conn.sendMessage(from, {
          delete: m.key,
        });
        await conn.sendMessage(`${botNumber}@s.whatsapp.net`, {
          text: `*Hey owner a virtex was detected ${
            isGroup ? `in ${groupName} group*` : ""
          }`,
        });
      }
    }
    const chatMemoryFile = "./database/chat_memory.json";
    if (!fs.existsSync(chatMemoryFile)) {
      fs.writeFileSync(chatMemoryFile, JSON.stringify({}), "utf8");
    }
    function renderBoard(board) {
      return (
        `${symbol(board[0])} | ${symbol(board[1])} | ${symbol(board[2])}\n` +
        `---------\n` +
        `${symbol(board[3])} | ${symbol(board[4])} | ${symbol(board[5])}\n` +
        `---------\n` +
        `${symbol(board[6])} | ${symbol(board[7])} | ${symbol(board[8])}`
      );
    }

    function symbol(cell) {
      if (cell === " ") return "_";
      return cell;
    }
    if (!settings.publik && !isOwner) return;
    try {
      switch (command) {
        case "menu": {
          try {
            // Channel information
            const channelInfo = {
              name: "MARVEL-MD OFFICIAL",
              jid: "120363398158224015@ɴᴇᴡꜱʟᴇᴛᴛᴇʀ",
              link: "https://whatsapp.com/channel/0029VbB7Tsa6WaKgDuGsnO1u",
              messageId: Math.floor(Math.random() * 1000000),
            };

            // Forwarding attributes
            const forwardAttributes = {
              forwardingScore: 999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: channelInfo.jid,
                newsletterName: channelInfo.name,
                serverMessageId: channelInfo.messageId,
              },
              externalAdReply: {
                title: "MARVEL-MD BOT",
                body: "Powered by Tife Tech",
                thumbnailUrl:
                  "https://zuctusbetucsmsywshyk.supabase.co/storage/v1/object/public/imgurl/ab3rlg_1752000334033.jpg",
                mediaType: 1,
                sourceUrl: channelInfo.link,
                showAdAttribution: true,
                renderLargerThumbnail: true,
              },
            };

            await conn.sendMessage(
              m.chat,
              {
                video: { url: gifVid },
                gifPlayback: true,
                caption: `${themeemoji}『  *MARVEL MD* 』${themeemoji}
╭═══════════════════════
│  ⚡ *USER PROFILE* ⚡
│  • Name: ${pushname}
│  • Status: ${isPremium ? "🌟 Premium" : "🔹 Free"}
│  • Mode: ${publik ? "🌐 Public" : "🔒 Self"}
│  • Prefix: [ ${prefix} ]
│  • System: ${platform.toUpperCase()} - ${arch}
│  • Date: ${calender}
│  • Time: ${timeWib}
╰═══════════════════════
${readmore}

╭─────── *OWNER MENU* ───────
│ 🔐 ${prefix}checkupdate
│ 🔄 ${prefix}update
│ 👑 ${prefix}setsudo
│ 🚫 ${prefix}delsudo
│ 📜 ${prefix}getsudo
│ 🏓 ${prefix}ping
│ 🔒 ${prefix}self 
│ 🌐 ${prefix}public 
│ ⛔ ${prefix}block
│ ✅ ${prefix}unblock
│ 🖼️ ${prefix}setpp
│ 🖼️ ${prefix}getpp
│ 📝 ${prefix}setbio
│ 🔄 ${prefix}restart
│ ✏️ ${prefix}setname
│ 👤 ${prefix}getdpn
│ 🔑 ${prefix}getsession
│ 🧹 ${prefix}clearsession
╰───────────────────────

╭────── *GROUP MENU* ───────
│ 🏷️ ${prefix}tag
│ 🏷️ ${prefix}tagall
│ 🚪 ${prefix}kick
│ ➕ ${prefix}add
│ 🔇 ${prefix}mute
│ 🔊 ${prefix}unmute
│ 📩 ${prefix}invite
│ 👤 ${prefix}tagme
│ 🚪 ${prefix}kickall
│ ℹ️ ${prefix}gcinfo
│ 🔄 ${prefix}revoke
│ 🔗 ${prefix}gclink
│ 🏷️ ${prefix}spamtag
│ 🚶 ${prefix}leavegc
│ 👥 ${prefix}listonline
│ 🖼️ ${prefix}setppgc
│ 🗑️ ${prefix}delppgc
│ 🖼️ ${prefix}getppgc
│ ⚠️ ${prefix}antivirtex
│ ⬆️ ${prefix}promote
│ ⬇️ ${prefix}demote
│ 🎉 ${prefix}welcome
│ 🕒 ${prefix}opentime
│ 🕒 ${prefix}closetime
│ 👑 ${prefix}tagadmin
│ 📋 ${prefix}listadmin
│ ✏️ ${prefix}setgcname
╰───────────────────────

╭── *MEDIA DOWNLOADS* ──
│ 🎵 ${prefix}play 
│ 🎬 ${prefix}video
│ 🎞️ ${prefix}animedl
│ 🌀 ${prefix}aio
│ 🔍 ${prefix}yts
│ 🎧 ${prefix}ytmp3
│ 📹 ${prefix}ytmp4
│ ⏏️ ${prefix}tiktok
│ ⏏️ ${prefix}tiktok2
│ 🐦 ${prefix}twitter
│ 🎵 ${prefix}tiktokaud
│ 🌀 ${prefix}all-in-one
│ 📘 ${prefix}facebook
│ 📸 ${prefix}Instagram
│ 🎶 ${prefix}sound1 to 95
╰───────────────────────

╭──── *GENERAL MENU* ────
│ 👤 ${prefix}owner
│ 📢 ${prefix}channel
│ ⏱️ ${prefix}runtime
│ ⚙️ ${prefix}setprefix
│ ⚙️ ${prefix}getprefix
│ 🔍 ${prefix}scan
│ 📋 ${prefix}listcase
│ 🎚️ ${prefix}mode 
│ 🗑️ ${prefix}delete
│ 🧹 ${prefix}clearchat
│ 🔗 ${prefix}antilink
╰───────────────────────

╭── *FILE DOWNLOADS* ──
│ 📱 ${prefix}apk
│ 📱 ${prefix}app
│ ☁️ ${prefix}gdrive
│ 📦 ${prefix}apkfab
│ 💻 ${prefix}gitclone
│ 💻 ${prefix}githubdl
│ 📦 ${prefix}mediafire
│ ☁️ ${prefix}google-drive
╰───────────────────────

╭──── *TOOLS MENU* ────
│ ▶️ ${prefix}vv
│ ▶️ ${prefix}vv2
│ 💾 ${prefix}save
│ 📤 ${prefix}send
│ 🎵 ${prefix}tomp3
│ 🖼️ ${prefix}toimg
│ 💬 ${prefix}fchat
│ 💳 ${prefix}pay
│ 🎭 ${prefix}areact
│ 🔳 ${prefix}qr
│ ➕ ${prefix}join
│ 📜 ${prefix}script
│ 🖼️ ${prefix}sticker
│ 🆔 ${prefix}getjid
│ ✨ ${prefix}fancy
│ 🎨 ${prefix}style
╰───────────────────────

╭──── *AI MENU* ────
│ 🗣️ ${prefix}tts
│ 🤖 ${prefix}marvelai
│ 🔮 ${prefix}gemini
│ 🦙 ${prefix}llama
│ 🧠 ${prefix}claude
│ 🌫️ ${prefix}mistral
│ 🔍 ${prefix}deepseek
│ 🔍 ${prefix}deepseek2
│ 📦 ${prefix}blackbox
│ 🔎 ${prefix}bing
│ 🔮 ${prefix}gemini-pro
│ 🌀 ${prefix}flux
│ 🎨 ${prefix}text2img
╰───────────────────────

╭──── *STALKER MENU* ────
│ 📦 ${prefix}npmstalk
│ 🌍 ${prefix}country
│ 📡 ${prefix}checkip
│ 📢 ${prefix}wachannel
╰───────────────────────

╭── *FUN MENU* ──
│ 🎭 ${prefix}joke
│ 💘 ${prefix}rizz
│ ❓ ${prefix}truth
│ 💌 ${prefix}flirt
│ 😈 ${prefix}dare
│ 📜 ${prefix}quote
│ 🌸 ${prefix}aniquote 
│ 💝 ${prefix}love 
│ 🤢 ${prefix}gross
│ 😠 ${prefix}angry
│ 😳 ${prefix}conf
╰───────────────────────

╭──── *NSFW MENU* ────
│ 🔞 ${prefix}waifu
│ 🔞 ${prefix}hentai
│ 🔞 ${prefix}pussy
│ 🔫 ${prefix}weapon
│ 🔗 ${prefix}xxxdl <link>
│ 🔍 ${prefix}xxxsearch
╰───────────────────────

🔗 *Official Channel:* ${channelInfo.link}
⚡ > *Powered by Tife Tech*`,
                contextInfo: forwardAttributes,
              },
              { quoted: m }
            );

            // Send additional info as forwarded message
            await conn.sendMessage(m.chat, {
              text:
                `💡 *Quick Tips*\n\n` +
                `• Use ${prefix}help <command> for details\n` +
                `• NSFW commands work in private chats only\n` +
                `• Report issues to @admin\n\n` +
                `⚡ Powered by Tife Tech`,
              contextInfo: forwardAttributes,
            });

            await sleep(3000);
            sendvn(vnMenu);
          } catch (e) {
            console.error("Menu Error:", e);
            await conn.sendMessage(
              m.chat,
              {
                text:
                  `⚠️ *Menu Failed to Load*\n\n` +
                  `Error: ${e.message}\n\n` +
                  `⚡ Powered by Tife Tech`,
                contextInfo: {
                  forwardingScore: 999,
                  isForwarded: true,
                },
              },
              { quoted: m }
            );
          }
          break;
        }
        case "hello": {
          const channelJid = "120363398158224015@newsletter";
          const thumbnailUrl =
            "https://zuctusbetucsmsywshyk.supabase.co/storage/v1/object/public/imgurl/8ligpk_1751715332780.jpg";

          const message = {
            text: "I'm here!",
            contextInfo: {
              externalAdReply: {
                title: "TIFE CYBERCRATE™",
                body: "Channel Update",
                thumbnailUrl: thumbnailUrl,
                sourceUrl:
                  "https://www.whatsapp.com/channel/0029VbB7Tsa6WaKgDuGsnO1u",
                mediaType: 1,
                mediaUrl: "",
                showAdAttribution: true,
                renderLargerThumbnail: true,
                sourceJid: channelJid,
                isForwarded: true,
              },
            },
          };

          await conn.sendMessage(m.chat, message, { quoted: m });
          break;
        }
        case "mode": {
          await loading();
          let modeStatus = settings.publik ? "Public" : "Private";
          reply(`📢 The bot is currently in *${modeStatus}* mode.`);
          break;
        }

        case "public": {
          if (!isOwner) return reply(mess.only.owner);
          if (settings.publik)
            return reply("✅ The bot is already in *public* mode.");

          settings.publik = true;
          reply("✅ The bot is now in *public* mode.");
          break;
        }

        case "self": {
          if (!isOwner) return reply(mess.only.owner);
          if (!settings.publik)
            return reply("🔒 The bot is already in *private* mode.");

          settings.publik = false;
          reply("🔒 The bot is now in *private* mode.");
          break;
        }
        case "setsudo": {
          if (!isOwner) return reply(mess.only.owner);

          let newOwner;
          if (m.quoted) {
            newOwner = m.quoted.sender;
          } else if (mentionByTag.length) {
            newOwner = mentionByTag[0];
          } else if (q) {
            newOwner = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          } else {
            return reply(
              "Please tag, reply, or provide a number to add as an owner."
            );
          }

          let ownerFile = "./database/owner.json";
          let owners = fs.existsSync(ownerFile)
            ? JSON.parse(fs.readFileSync(ownerFile, "utf8"))
            : [];

          if (owners.includes(newOwner))
            return reply("This number is already an owner.");

          owners.push(newOwner);
          fs.writeFileSync(ownerFile, JSON.stringify(owners, null, 2));

          conn.sendMessage(m.chat, {
            text: fontx(
              `✅ Successfully added @${newOwner.replace(
                "@s.whatsapp.net",
                ""
              )} as an owner.`
            ),
            mentions: [newOwner],
          });
          break;
        }

        case "delsudo": {
          if (!isOwner) return reply(mess.only.owner);

          let removeOwner;
          if (m.quoted) {
            removeOwner = m.quoted.sender;
          } else if (mentionByTag.length) {
            removeOwner = mentionByTag[0];
          } else if (q) {
            removeOwner = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          } else {
            return reply(
              "Please tag, reply, or provide a number to remove from owners."
            );
          }

          let ownerFile = "./database/owner.json";
          let owners = fs.existsSync(ownerFile)
            ? JSON.parse(fs.readFileSync(ownerFile, "utf8"))
            : [];

          if (!owners.includes(removeOwner))
            return reply("This number is not an owner.");

          owners = owners.filter((owner) => owner !== removeOwner);
          fs.writeFileSync(ownerFile, JSON.stringify(owners, null, 2));

          conn.sendMessage(m.chat, {
            text: fontx(
              `✅ Successfully removed @${removeOwner.replace(
                "@s.whatsapp.net",
                ""
              )} from owners.`
            ),
            mentions: [removeOwner],
          });
          break;
        }

        case "getsudo": {
          if (!isOwner) return reply(mess.only.owner);
          try {
            let owners = JSON.parse(
              fs.readFileSync("./database/owner.json", "utf8")
            );

            if (owners.length === 0) return reply("*No owners found.*");

            let ownerList = owners
              .map(
                (owner, index) =>
                  `${index + 1}. @${owner.replace("@s.whatsapp.net", "")}`
              )
              .join("\n");

            conn.sendMessage(m.chat, {
              text: fontx(`\`\`\`👑 Sudo List:\n\n${ownerList}\`\`\``),
              mentions: owners,
            });
          } catch (error) {
            console.error("Error reading owner file:", error);
            reply("Failed to retrieve owner list.");
          }
          break;
        }
        case "checkupdate": {
          if (!isOwner) return reply(mess.only.owner);
          await loading();

          let filesToUpdate = [
            {
              url: "https://huggingface.co/spaces/API-XX/TEST/resolve/main/newcase.json",
              path: "./message/newcase.json",
              name: "newcase.json",
            },
            {
              url: "https://huggingface.co/spaces/API-XX/TEST/resolve/main/case.js",
              path: "./message/case.js",
              name: "case.js",
            },
            {
              url: "https://huggingface.co/spaces/API-XX/TEST/resolve/main/group.js",
              path: "./message/group.js",
              name: "group.js",
            },
            {
              url: "https://huggingface.co/spaces/API-XX/TEST/resolve/main/message.js",
              path: "./message/message.js",
              name: "message.js",
            },
            {
              url: "https://huggingface.co/spaces/API-XX/TEST/resolve/main/demon.js",
              path: "./message/demon.js",
              name: "demon.js",
            },
            {
              url: "https://huggingface.co/spaces/API-XX/TEST/resolve/main/links.js",
              path: "./temp/media/links.js",
              name: "link.js",
            },
          ];

          try {
            let updateMessages = [];
            let newCases = [];
            let timestamp = new Date().toLocaleString();

            for (let file of filesToCheck) {
              let oldSize = fs.existsSync(file.path)
                ? fs.statSync(file.path).size
                : 0;

              let response = await fetch(file.url);
              if (!response.ok) {
                updateMessages.push(`❌ Could not check *${file.name}*.`);
                continue;
              }

              let newContent = await response.text();
              let newSize = Buffer.byteLength(newContent, "utf8");
              let sizeDifference = ((newSize - oldSize) / 1024).toFixed(2);

              if (file.name === "newcase.json") {
                let oldCases = fs.existsSync(file.path)
                  ? JSON.parse(fs.readFileSync(file.path, "utf8")).cases
                  : [];
                let updatedCases = JSON.parse(newContent).cases || [];

                newCases = updatedCases.filter(
                  (cmd) => !oldCases.includes(cmd)
                );
              }

              updateMessages.push(
                sizeDifference > 0
                  ? `🆕 *${file.name}* has an update available! (+${sizeDifference}KB)`
                  : `✅ *${file.name}* is up to date.`
              );
            }

            let newCasesText = newCases.length
              ? `🆕 *New Commands Detected:*\n${newCases.join("\n")}`
              : "✅ No new commands detected.";

            conn.sendMessage(m.chat, {
              image: {
                url: "https://huggingface.co/spaces/API-XX/TEST/resolve/main/Links/update.jpeg",
              },
              caption: fontx(
                `🔍 *Update Check Completed!*\n📅 *Checked On:* ${timestamp}\n\n${updateMessages.join(
                  "\n"
                )}\n\n${newCasesText}`
              ),
            });
          } catch (error) {
            console.error("Error checking updates:", error);
            reply("❌ Error while checking updates. Try again later.");
          }
          break;
        }
        case "update": {
          if (!isOwner) return reply(mess.only.owner);
          await loading();

          let filesToUpdate = [
            {
              url: "https://huggingface.co/spaces/API-XX/TEST/resolve/main/newcase.json",
              path: "./message/newcase.json",
              name: "newcase.json",
            },
            {
              url: "https://huggingface.co/spaces/API-XX/TEST/resolve/main/case.js",
              path: "./message/case.js",
              name: "case.js",
            },
            {
              url: "https://huggingface.co/spaces/API-XX/TEST/resolve/main/group.js",
              path: "./message/group.js",
              name: "group.js",
            },
            {
              url: "https://huggingface.co/spaces/API-XX/TEST/resolve/main/message.js",
              path: "./message/message.js",
              name: "message.js",
            },
            {
              url: "https://huggingface.co/spaces/API-XX/TEST/resolve/main/demon.js",
              path: "./message/demon.js",
              name: "demon.js",
            },
            {
              url: "https://huggingface.co/spaces/API-XX/TEST/resolve/main/links.js",
              path: "./temp/media/links.js",
              name: "link.js",
            },
          ];

          try {
            let updateMessages = [];
            let newCases = [];
            let timestamp = new Date().toLocaleString();

            for (let file of filesToUpdate) {
              let oldContent = fs.existsSync(file.path)
                ? fs.readFileSync(file.path, "utf8")
                : "";
              let oldSize = Buffer.byteLength(oldContent, "utf8");

              let response = await fetch(file.url);
              if (!response.ok) {
                updateMessages.push(`❌ Failed to update *${file.name}*.`);
                continue;
              }

              let newContent = await response.text();
              fs.writeFileSync(file.path, newContent, "utf8");

              let newSize = Buffer.byteLength(newContent, "utf8");
              let sizeDifference = ((newSize - oldSize) / 1024).toFixed(2);

              if (file.name === "newcase.json") {
                let oldCases = oldContent ? JSON.parse(oldContent).cases : [];
                let updatedCases = JSON.parse(newContent).cases || [];

                newCases = updatedCases.filter(
                  (cmd) => !oldCases.includes(cmd)
                );
              }

              updateMessages.push(
                sizeDifference > 0
                  ? `✅ *${file.name}* updated! (+${sizeDifference}KB)`
                  : `✅ *${file.name}* is already up to date.`
              );
            }

            let newCasesText = newCases.length
              ? `🆕 *New Commands Added:*\n${newCases.join("\n")}`
              : "✅ No new commands added.";

            conn.sendMessage(m.chat, {
              image: {
                url: "https://huggingface.co/spaces/API-XX/TEST/resolve/main/Links/update.jpeg",
              },
              caption: fontx(
                `🔄 *Update Completed!*\n📅 *Updated On:* ${timestamp}\n\n${updateMessages.join(
                  "\n"
                )}\n\n${newCasesText}`
              ),
            });
          } catch (error) {
            console.error("Error updating files:", error);
            reply("❌ Error while updating. Try again later.");
          }
          break;
        }
        case "ping": {
          const { performance } = require("perf_hooks");

          const startTime = performance.now();

          // Send "calculating speed..." message with quoted
          const initialMessage = await conn.sendMessage(
            m.chat,
            {
              text: fontx(`*⚡ 𝐂𝐚𝐥𝐜𝐮𝐥𝐚𝐭𝐢𝐧𝐠 𝐒𝐩𝐞𝐞𝐝 ⚡*\n🔃\n> ${botName}`),
            },
            { quoted: m }
          );

          const endTime = performance.now();
          const latency = (endTime - startTime).toFixed(3);

          let pingStatus = "";
          if (latency < 50) {
            pingStatus = "🚀 Excellent Connection";
          } else if (latency < 100) {
            pingStatus = "⚡ Good Connection";
          } else if (latency < 200) {
            pingStatus = "👌 Average Connection";
          } else if (latency < 500) {
            pingStatus = "😬 Slow Connection";
          } else {
            pingStatus = "🐢 Poor Connection";
          }

          const finalMessage = fontx(
            `*Marvel md Bot Speed*\n\n*Ping:* ${latency}ms\n*Status:* ${pingStatus}\n> `
          );

          // Edit the previous message using relayMessage
          await conn.relayMessage(
            m.chat,
            {
              protocolMessage: {
                key: initialMessage.key,
                type: 14,
                editedMessage: {
                  conversation: finalMessage,
                },
              },
            },
            {}
          );

          break;
        }
        case "runtime":
        case "uptime":
          {
            reply(
              `${themeemoji} \`RUNTIME\` ${themeemoji}\n*${runtime(
                process.uptime()
              )}*`
            );
          }
          break;
        case "setprefix": {
          if (!isOwner) return reply(mess.only.owner);

          if (!text)
            return reply(
              "Please provide a new prefix.\n\nExample: `.setprefix !`"
            );
          await loading();
          try {
            fs.writeFileSync(
              prefixFile,
              JSON.stringify(
                {
                  prefix: text,
                },
                null,
                2
              )
            );
            prefix = text;
            reply(`✅ Prefix successfully changed to: *${text}*`);
          } catch (error) {
            console.error("Error saving new prefix:", error);
            reply("❌ Failed to update the prefix.");
          }

          break;
        }
        case "getprefix": {
          await loading();

          try {
            const prefixData = JSON.parse(
              fs.readFileSync("./database/prefix.json", "utf8")
            );
            const currentPrefix = prefixData.prefix || ".";

            reply(`*Current Prefix:* \`${currentPrefix}\``);
          } catch (error) {
            console.error("Error reading prefix file:", error);
            reply("Failed to retrieve prefix.");
          }
          break;
        }
        case "delete":
        case "del":
        case "d": {
          if (!isOwner && !m.quoted) return;

          try {
            await conn.sendMessage(m.chat, {
              delete: {
                remoteJid: m.chat,
                fromMe: true,
                id: m.quoted.id,
                participant: m.quoted.sender,
              },
            });
            await conn.sendMessage(m.chat, {
              delete: {
                remoteJid: m.chat,
                fromMe: true,
                id: m.id,
              },
            });
          } catch (err) {
            console.error("❌ Error while deleting messages:", err);
          }
          break;
        }
        case "clearchat":
        case "clear":
          {
            if (!isOwner) return reply(mess.only.owner);

            conn.chatModify(
              {
                delete: true,
                lastMessages: [
                  {
                    key: m.key,
                    messageTimestamp: m.messageTimestamp,
                  },
                ],
              },
              m.chat
            );
            await sleep(1500);
            reply(mess.success);
          }
          break;
        case "block": {
          if (!isOwner) return reply(mess.only.owner);
          await loading();
          let users;

          if (isGroup) {
            if (m.quoted && m.quoted.sender) {
              users = m.quoted.sender;
            } else if (text) {
              users = text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
            }
          } else {
            users = m.chat;
          }

          if (users && users.replace(/[^0-9]/g, "").length >= 7) {
            await conn.updateBlockStatus(users, "block");
            reply(mess.success);
          } else {
            reply(
              "Please reply to a message or provide a valid number to block."
            );
          }
          break;
        }

        case "unblock": {
          if (!isOwner) return reply(mess.only.owner);
          await loading();
          let users;

          if (isGroup) {
            users = m.quoted
              ? m.quoted.sender
              : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          } else {
            users = m.chat;
          }

          if (users && users.replace(/[^0-9]/g, "").length >= 7) {
            await conn.updateBlockStatus(users, "unblock");
            reply(mess.success);
          } else {
            reply(
              "Please reply to a message or provide a valid number to unblock."
            );
          }
          break;
        }
        case "setppbot":
        case "setpp":
          {
            if (!isOwner) return reply(mess.only.owner);
            await loading();
            if (!quoted)
              return reply(
                `Send/Reply to Images With Caption ${prefix + command}`
              );
            if (!/image/.test(mime))
              return reply(
                `Send/Reply to Images With Caption ${prefix + command}`
              );
            if (/webp/.test(mime))
              return reply(
                `Send/Reply to Images With Caption ${prefix + command}`
              );
            var medis = await conn.downloadAndSaveMediaMessage(
              quoted,
              "ppbot.jpeg"
            );
            if (args[0] == `full`) {
              var { img } = await generateProfilePicture(medis);
              await conn.query({
                tag: "iq",
                attrs: {
                  to: botNumber,
                  type: "set",
                  xmlns: "w:profile:picture",
                },
                content: [
                  {
                    tag: "picture",
                    attrs: {
                      type: "image",
                    },
                    content: img,
                  },
                ],
              });
              fs.unlinkSync(medis);
              reply(mess.success);
            } else {
              var memeg = await conn.updateProfilePicture(botNumber, {
                url: medis,
              });
              fs.unlinkSync(medis);
              reply(mess.success);
            }
          }
          break;
        case "fetchpp":
        case "getpp": {
          if (!m.quoted)
            return reply(
              "❌ Please reply to a user's message to fetch their profile picture."
            );

          let user = m.quoted.sender;
          let profilePicUrl;

          try {
            profilePicUrl = await conn.profilePictureUrl(user, "image");
          } catch (err) {
            console.error("Error fetching profile picture:", err);
            profilePicUrl =
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThCo9sua3PNMXNAACe8MWOMbK93g-_GhThKA&usqp=CAU";
          }

          await conn.sendMessage(
            m.chat,
            {
              image: { url: profilePicUrl },
              caption: fontx(
                `🖼️ *Profile Picture Fetched!*\n👤 *User:* @${
                  user.split("@")[0]
                }`
              ),
              mentions: [user],
            },
            { quoted: m }
          );

          break;
        }
        case "setbio":
        case "setbotbio": {
          if (!isOwner) return reply(mess.only.owner);
          if (!q) return reply(`*Example: ${prefix + command} Text*`);
          try {
            await conn.updateProfileStatus(q);
            reply(`*Bio Has Been Changed To \`${q}\`*`);
          } catch (error) {
            console.error(error);
            reply(
              "An error occurred while updating the bio. Please try again."
            );
          }
          break;
        }
        case "restart":
          if (!isOwner) return reply(mess.only.owner);
          await loading();
          reply(`*restarting...*`);
          await sleep(3000);
          process.exit();
          break;
        case "setname":
        case "setbotname": {
          if (!isOwner) return reply(mess.only.owner);
          if (!text) return reply(`*Example: ${prefix + command} Tife tech*`);

          try {
            await conn.updateProfileName(text);
            reply(`*successfully changed name to \`${text}\`*`);
          } catch (error) {
            console.error(error);
            reply(
              "An error occurred while updating the name. Please try again."
            );
          }
          break;
        }
        case "owner":
        case "creator":
        case "dev":
          {
            let who =
              m.mentionedJid && m.mentionedJid[0]
                ? m.mentionedJid[0]
                : m.fromMe
                ? conn.user.jid
                : m.sender;
            let pp = await conn
              .profilePictureUrl(who)
              .catch(
                (_) =>
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60"
              );
            let name = await conn.getName(who);

            await conn.sendContactArray(
              m.chat,
              [
                [
                  `2348135483096@s.whatsapp.net`,
                  `TIFE TECH`,
                  `Bot Developer`,
                  `Feel free to contact me for assistance or inquiries.`,
                ],
              ],
              m
            );

            await reply(
              `Hello 👋, if you wish to contact the owner, please use the provided contact details.`
            );
          }
          break;
        case "tagall":
          if (!isGroup) return reply(mess.only.group);
          if (!isAdmins && !isOwner) return reply(mess.only.admin);
          let me = m.sender;
          let teks = fontx(
            ` 🕸️『 𝐌𝐀𝐑𝐕𝐄𝐋 𝐌𝐃 𝐕𝟏 』🕸️\n👀 *tagger*  @${me.split("@")[0]}\n\n`
          );
          for (let mem of participants) {
            teks += `${themeemoji} @${mem.id.split("@")[0]}\n`;
          }
          conn.sendMessage(
            m.chat,
            {
              text: teks,
              mentions: participants.map((a) => a.id),
            },
            {
              quoted: m,
            }
          );
          break;
        case "hidetag":
        case "tag": {
          if (!isGroup) return reply(mess.only.group);
          if (!isAdmins && !isOwner) return reply(mess.only.admin);
          await loading();
          conn.sendMessage(
            m.chat,
            {
              text: q ? q : "",
              mentions: participants.map((a) => a.id),
            },
            {
              quoted: m,
            }
          );
          break;
        }
        case "kick": {
          if (!isGroup) return reply(mess.only.group);
          await loading();
          if (!isBotGroupAdmins) return reply(mess.only.Badmin);
          if (!isGroupAdmins && !isOwner) return reply(mess.only.admin);

          let mentioned = [];
          if (m.quoted) {
            mentioned = [m.quoted.sender];
          } else if (mentionByTag.length > 0) {
            mentioned = mentionByTag;
          } else if (args[0]) {
            mentioned = [`${args[0].replace(/[^0-9]/g, "")}@s.whatsapp.net`];
          }

          if (mentioned.length === 0) {
            return reply(
              "Please reply to a user, tag someone, or provide a number to kick."
            );
          }

          try {
            await conn.groupParticipantsUpdate(m.chat, mentioned, "remove");
            reply(
              `Successfully kicked ${mentioned
                .map((v) => `@${v.split("@")[0]}`)
                .join(", ")}`,
              {
                mentions: mentioned,
              }
            );
          } catch (error) {
            console.error("Error in kick case:", error);
            reply(
              "Failed to kick the user. Make sure I have the correct permissions."
            );
          }
          break;
        }

        case "add": {
          if (!isGroup) return reply(mess.only.group);
          if (!isBotGroupAdmins) return reply(mess.only.Badmin);
          if (!isGroupAdmins && !isOwner) return reply(mess.only.admin);
          await loading();

          let number;
          if (args[0]) {
            number = args[0].replace(/[^0-9]/g, "");
          } else if (m.quoted && m.quoted.sender) {
            number = m.quoted.sender.split("@")[0];
          } else {
            return reply("Please provide a number or reply to a user to add.");
          }

          const user = `${number}@s.whatsapp.net`;

          try {
            await conn.groupParticipantsUpdate(m.chat, [user], "add");
            await conn.sendMessage(
              m.chat,
              {
                text: fontx(`Successfully added @${number}\n> `),
                mentions: [user],
              },
              {
                quoted: m,
              }
            );
          } catch (error) {
            reply(
              "Failed to add the user. Make sure the number is valid and I have the correct permissions."
            );
            console.error(error);
          }
          break;
        }
        case "tinyurl": {
          if (!q)
            return reply(
              `Please provide a valid URL.\n\nExample: *${
                prefix + command
              } https://example.com*`
            );

          await loading();

          try {
            let apiUrl = `https://api-ix-ix.hf.space/api/tinyurl?url=${encodeURIComponent(
              q
            )}`;
            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.success || !json.short_url) {
              return reply("❌ Failed to shorten the URL. Please try again.");
            }

            conn.sendMessage(
              m.chat,
              {
                text:
                  fontx(`🔗 *Shortened URL:*\n\n📏 *Long:* `) +
                  q +
                  fontx(`\n✂️ *Short:* `) +
                  json.short_url,
              },
              {
                quoted: m,
              }
            );
          } catch (error) {
            console.error("Error in tinyurl case:", error);
            reply(
              "❌ An error occurred while shortening the URL. Please try again later."
            );
          }
          break;
        }
        case "areact": {
          if (!isOwner) return reply(mess.only.owner);
          if (!args[0]) return reply(`Example: ${prefix + command} on/off`);
          if (args[0] === "on") {
            global.autoreact = true;
            await reply("Successfully Activated AutoReact.");
          } else if (args[0] === "off") {
            global.autoreact = false;
            await reply("Successfully Deactivated AutoReact.");
          } else {
            return reply(
              `Invalid option. Use "on" or "off" to toggle AutoReact.`
            );
          }
          break;
        }
        case "marvelai":
        case "ai": {
          if (!q) {
            return reply(
              `*Please provide a query.*\n\n*Example:* ${
                prefix + command
              } Hello, which model are you?`
            );
          }

          await loading();
          let user = m.sender;

          let chatMemory = JSON.parse(fs.readFileSync(chatMemoryFile, "utf8"));

          if (!chatMemory[user]) {
            chatMemory[user] = [];
          }

          if (chatMemory[user].length > 10) {
            chatMemory[user] = chatMemory[user].slice(-10);
          }

          let conversationHistory = chatMemory[user]
            .map((entry) => `User: ${entry.user}\nAI: ${entry.ai}`)
            .join("\n");

          let prompt = `Your model is based on GPT-5 Mini, trained by Tife Tech. You are a concise AI assistant named "MARVEL AI". Maintain a smooth conversation without excessive talk.

Conversation History:
${conversationHistory}

User: ${q}
AI: `;

          try {
            let apiUrl = `https://api-lenwy.vercel.app/ai4chat?text=${encodeURIComponent(
              prompt
            )}`;
            let response = await fetch(apiUrl);
            let res = await response.json();

            if (res.status !== 200 || !res.data) {
              return reply(
                "❌ Failed to process your request. Please try again later."
              );
            }

            let aiResponse = res.data;

            chatMemory[user].push({ user: q, ai: aiResponse });
            fs.writeFileSync(
              chatMemoryFile,
              JSON.stringify(chatMemory, null, 2),
              "utf8"
            );

            await conn.sendMessage(
              from,
              {
                image: {
                  url: "https://huggingface.co/spaces/API-XX/TEST/resolve/main/Links/thumb.jpg",
                },
                caption: fontx(`💬 *MARVEL AI Response:*\n${aiResponse}\n> `),
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error in MARVEL AI case:", error);
            reply(
              "❌ An error occurred while processing your request. Please try again later."
            );
          }

          break;
        }
        case "gemini": {
          if (!q)
            return reply(
              `*Please provide a query.*\n\n*Example:* ${
                prefix + command
              } Hello, which model are you?`
            );

          await loading();

          try {
            const apiUrl = `https://api-lenwy.vercel.app/ai4chat?text=${encodeURIComponent(
              q
            )}`;
            const response = await fetch(apiUrl);
            const res = await response.json();
            if (res.status !== 200 || !res.data) {
              return reply(
                "Failed to process your request. Please try again later."
              );
            }
            const aiResponse = res.data;
            await conn.sendMessage(
              from,
              {
                image: {
                  url: "https://huggingface.co/spaces/API-XX/TEST/resolve/main/Links/images.jpeg",
                },
                caption: fontx(`*Gemini AI Response:*\n\n${aiResponse}\n> `),
              },
              {
                quoted: m,
              }
            );
          } catch (error) {
            console.error("Error in Gemini case:", error);
            reply(
              "An error occurred while processing your request. Please try again later."
            );
          }
          break;
        }
        case "gemini-pro": {
          if (!q) {
            return reply(
              `*Please provide a query.*\n\n*Example:* ${
                prefix + command
              } Hello, what model are you?`
            );
          }

          await loading();

          try {
            const apiUrl = `https://bk9.fun/ai/gemini?q=${encodeURIComponent(
              q
            )}`;
            const response = await fetch(apiUrl);
            const res = await response.json();
            if (!res.status || !res.BK9) {
              return reply(
                "Failed to process your request. Please try again later."
              );
            }

            const aiResponse = res.BK9;

            await conn.sendMessage(
              from,
              {
                image: {
                  url: "https://huggingface.co/spaces/API-XX/TEST/resolve/main/Links/images%20(1)%20(1).jpeg",
                },
                caption: fontx(`*Gemini pro Response:*\n${aiResponse}\n> `),
              },
              {
                quoted: m,
              }
            );
          } catch (error) {
            console.error("Error in Gemini-pro case:", error);
            reply(
              "An error occurred while processing your request. Please try again later."
            );
          }
          break;
        }
        case "flux": {
          if (!q)
            return reply(
              `❌ Please enter a prompt.\n\nExample: *${
                prefix + command
              } create a cyberpunk lizard image*`
            );

          await loading(); // Display loading message

          try {
            let imageUrl = `https://api.siputzx.my.id/api/ai/flux?prompt=${encodeURIComponent(
              q
            )}`;

            await conn.sendMessage(
              m.chat,
              {
                image: { url: imageUrl },
                caption: fontx(
                  `🎨 *Flux AI Generated Image*\n\n📝 *Prompt:* ${q}\n> `
                ),
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error in flux case:", error);
            reply(
              "❌ An error occurred while generating the image. Please try again later."
            );
          }
          break;
        }
        case "llama": {
          if (!q)
            return reply(
              `❌ Please enter a question or prompt.\n\nExample: *${
                prefix + command
              } What is AI?*`
            );

          await loading(); // Show loading message

          try {
            let apiUrl = `https://api.siputzx.my.id/api/ai/meta-llama-33-70B-instruct-turbo?content=${encodeURIComponent(
              q
            )}`;
            let imageUrl =
              "https://huggingface.co/spaces/API-XX/TEST/resolve/main/Links/Llama3.4.jpg";

            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.status || !json.data) {
              return reply("❌ No response received. Try again later.");
            }

            let aiResponse = json.data;

            await conn.sendMessage(
              m.chat,
              {
                image: { url: imageUrl },
                caption: fontx(
                  `🤖 *Llama 3.4 AI Response*\n\n💬 *Query:* ${q}\n🧠 *Response:* ${aiResponse}\n> `
                ),
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error in llama3.4 case:", error);
            reply(
              "❌ An error occurred while processing your request. Please try again later."
            );
          }
          break;
        }
        case "deepseek": {
          if (!q)
            return reply(
              `❌ Please enter a question or prompt.\n\nExample: *${
                prefix + command
              } What is AI?*`
            );

          await loading(); // Show loading message

          try {
            let apiUrl = `https://api.siputzx.my.id/api/ai/deepseek-r1?content=${encodeURIComponent(
              q
            )}`;
            let imageUrl =
              "https://huggingface.co/spaces/API-XX/TEST/resolve/main/Links/deepseek.jpg";

            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.status || !json.data) {
              return reply("❌ No response received. Try again later.");
            }

            let aiResponse = json.data.replace("</think>\n\n", ""); // Clean output if necessary

            await conn.sendMessage(
              m.chat,
              {
                image: { url: imageUrl },
                caption: fontx(
                  `🧠 *DeepSeek AI Response*\n\n💬 *Query:* ${q}\n🤖 *Response:* ${aiResponse}\n> `
                ),
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error in deepseek case:", error);
            reply(
              "❌ An error occurred while processing your request. Please try again later."
            );
          }
          break;
        }
        case "deepseek2": {
          if (!q)
            return reply(
              `❌ Please enter a question or prompt.\n\nExample: *${
                prefix + command
              } What is AI?*`
            );

          await loading(); // Show loading message

          try {
            let apiUrl = `https://api.siputzx.my.id/api/ai/deepseek-llm-67b-chat?content=${encodeURIComponent(
              q
            )}`;
            let imageUrl =
              "https://huggingface.co/spaces/API-XX/TEST/resolve/main/Links/deepseek.jpg";

            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.status || !json.data) {
              return reply("❌ No response received. Try again later.");
            }

            let aiResponse = json.data;

            await conn.sendMessage(
              m.chat,
              {
                image: { url: imageUrl },
                caption: fontx(
                  `🧠 *DeepSeek 67B AI Response*\n\n💬 *Query:* ${q}\n🤖 *Response:* ${aiResponse}\n> `
                ),
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error in deepseek2 case:", error);
            reply(
              "❌ An error occurred while processing your request. Please try again later."
            );
          }
          break;
        }
        case "mistral": {
          if (!q)
            return reply(
              `❌ Please enter a question or prompt.\n\nExample: *${
                prefix + command
              } What is AI?*`
            );

          await loading(); // Show loading animation

          try {
            let apiUrl = `https://api.siputzx.my.id/api/ai/mistral-7b-instruct-v0.2?content=${encodeURIComponent(
              q
            )}`;
            let imageUrl =
              "https://huggingface.co/spaces/API-XX/TEST/resolve/main/Links/mistral.jpg";

            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.status || !json.data) {
              return reply("❌ No response received. Try again later.");
            }

            let aiResponse = json.data;

            await conn.sendMessage(
              m.chat,
              {
                image: { url: imageUrl },
                caption: fontx(
                  `🌬️ *Mistral 7B AI Response*\n\n💬 *Query:* ${q}\n🤖 *Response:* ${aiResponse}\n> `
                ),
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error in mistral case:", error);
            reply(
              "❌ An error occurred while processing your request. Please try again later."
            );
          }
          break;
        }
        case "claude": {
          if (!q)
            return reply(
              "❌ Please enter a question or prompt.\n\nExample: .claude What is AI?"
            );

          await loading();

          let apiUrl = `https://apis.davidcyriltech.my.id/ai/claude?text=${encodeURIComponent(
            q
          )}`;
          let imageUrl =
            "https://huggingface.co/spaces/API-XX/TEST/resolve/main/Links/claude.jpg";

          try {
            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.success || !json.response) {
              return reply("❌ No response received. Try again later.");
            }

            let aiResponse = json.response;

            await conn.sendMessage(
              m.chat,
              {
                image: { url: imageUrl },
                caption: fontx(
                  `🤖 *Claude AI Response*\n\n💬 *Query:* ${q}\n🧠 *Response:* ${aiResponse}\n> `
                ),
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error fetching Claude response:", error);
            reply("❌ Error while processing your request. Try again later.");
          }
          break;
        }
        case "blackbox": {
          if (!q)
            return reply(
              "❌ Please enter a question or prompt.\n\nExample: .blackbox How do I code in JavaScript?"
            );
          await loading();

          let apiUrl = `https://api.siputzx.my.id/api/ai/blackboxai-pro?content=${encodeURIComponent(
            q
          )}`;
          let imageUrl =
            "https://huggingface.co/spaces/API-XX/TEST/resolve/main/Links/blackbox.jpg";

          try {
            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.status || !json.data) {
              return reply("❌ No response received. Try again later.");
            }

            let aiResponse = json.data.replace(/<think>\n\n<\/think>\n\n/, ""); // Remove unnecessary tags

            await conn.sendMessage(
              m.chat,
              {
                image: { url: imageUrl },
                caption: fontx(
                  `🖤 *Blackbox AI Response*\n\n💬 *Query:* ${q}\n🧠 *Response:* ${aiResponse}`
                ),
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error fetching Blackbox AI response:", error);
            reply("❌ Error while processing your request. Try again later.");
          }
          break;
        }
        case "mute": {
          if (!m.isGroup) return reply(mess.only.group);
          if (!isOwner && !isAdmins) return reply(mess.only.admin);
          if (!isBotAdmins) return reply(mess.only.Badmin);
          try {
            await loading();
            await conn.groupSettingUpdate(m.chat, "announcement");
            reply(mess.success);
          } catch (err) {
            console.error(err);
            reply("Failed to mute the group. Please try again.");
          }
          break;
        }
        case "unmute": {
          if (!m.isGroup) return reply(mess.only.group);
          if (!isOwner && !isAdmins) return reply(mess.only.admin);
          if (!isBotAdmins) return reply(mess.only.Badmin);
          try {
            await loading();
            await conn.groupSettingUpdate(m.chat, "not_announcement");
            reply(mess.success);
          } catch (err) {
            console.error(err);
            reply("Failed to unmute the group. Please try again.");
          }
          break;
        }

        case "tagme":
          {
            let menst = [sender];
            conn.sendMessage(from, {
              text: `@${senderNumber}`,
              mentions: menst,
            });
          }
          break;
        case "kickall":
          {
            if (!isGroup && !isGroupAdmins) return reply(mess.only.group);
            if (!isBotGroupAdmins) return reply(mess.only.Badmin);
            const xeonkickall =
              args[0] === "numBut"
                ? q.replace(`${args[0]} `, "").split("|")
                : Number(args[0])
                ? groupMetadata.participants
                    .filter(
                      (item) =>
                        item.id.startsWith(args[0].replace("+", "")) &&
                        item.id !== botNumber &&
                        item.id !== `${botNumber}@s.whatsapp.net`
                    )
                    .map((item) => item.id)
                : groupMetadata.participants
                    .filter(
                      (item) =>
                        item.id !== botNumber &&
                        item.id !== `${botNumber}@s.whatsapp.net`
                    )
                    .map((item) => item.id);
            if (chat.welcome == false) db.data.chats[from].welcome = false;
            for (let remove of xeonkickall) {
              await conn.groupParticipantsUpdate(
                m.chat,
                [args[0] === "numBut" ? `${remove}@s.whatsapp.net` : remove],
                "remove"
              );
              await sleep(100);
            }
            reply(mess.success);
          }
          break;
        case "setppgc":
          {
            if (!isGroup) return reply(mess.only.group);
            if (!isGroupAdmins) return reply(mess.only.admin);
            if (!isBotGroupAdmins) return reply(mess.only.Badmin);
            await loading();
            if (isImage || isQuotedImage) {
              let media = await conn.downloadAndSaveMediaMessage(
                quoted,
                makeid(5)
              );
              await conn
                .updateProfilePicture(from, {
                  url: media,
                })
                .then((res) => {
                  reply(mess.success);
                  fs.unlinkSync(media);
                })
                .catch(() => reply(mess.error.api));
            } else {
              reply(`Send/reply images with captions ${command}`);
            }
          }
          break;
        case "getppgc":
          if (!isGroup) return reply(mess.only.group);
          await loading();
          try {
            var ppimg = await conn.profilePictureUrl(from, "image");
          } catch (err) {
            console.log(err);
            var ppimg =
              "https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg";
          }
          await conn.sendMessage(
            from,
            {
              image: {
                url: ppimg,
              },
            },
            {
              quoted: m,
            }
          );
          break;
        case "delppgc":
          {
            if (!isGroup) return reply(mess.only.group);
            if (!isGroupAdmins) return reply(mess.only.admin);
            if (!isBotGroupAdmins) return reply(mess.only.Badmin);
            await loading();
            await conn.removeProfilePicture(from);
          }
          break;
        case "invite": {
          if (!isGroup) return reply(mess.only.group);
          if (!isBotGroupAdmins) return reply(mess.only.Badmin);
          if (!text)
            return reply(
              `\`No WhatsApp number detected.\`\n*Example: ${
                prefix + command
              } 255734980103*`
            );
          if (text.includes("+"))
            return reply(`\`Input the WhatsApp number without *+*\``);
          if (isNaN(text))
            return reply(
              `Please enter only numbers, including your country code, without spaces.`
            );

          let group = m.chat;

          try {
            let link =
              "https://chat.whatsapp.com/" +
              (await conn.groupInviteCode(group));
            await conn.sendMessage(`${text}@s.whatsapp.net`, {
              text: ` *𝙂𝙍𝙊𝙐𝙋 𝙄𝙉𝙑𝙄𝙏𝘼𝙏𝙄𝙊𝙉 𝙇𝙄𝙉𝙆*\n*\`𝚈𝙾𝚄 𝙰𝚁𝙴 𝙸𝙽𝚅𝙸𝚃𝙴𝙳 𝚃𝙾 𝙹𝙾𝙸𝙽: ${groupMetadata.subject}\`*\n*𝙻𝙸𝙽𝙺:* ${link}`,
            });

            reply("*Group invitation link successfully sent.*");
          } catch (error) {
            console.error("Error in invite case:", error);
            reply(
              "Failed to send the invite link. Please check the number and try again."
            );
          }

          break;
        }
        case "gcinfo":
          {
            if (!isGroup) return reply(mess.only.group);
            await loading();
            let _meta = await conn.groupMetadata(from);
            console.log(_meta);
            let _img = await conn.profilePictureUrl(_meta.id, "image");

            let caption = `*G R O U P I N F O*


Anti Link : *${isAntiLink ? "ACTIVE✅" : "UNACTIVE❌"}*
Anti Virtex : *${isAntiVirtex ? "ACTIVE✅" : "UNACTIVE❌"}*
Anti Delete : *${isAntidelete ? "ACTIVE✅" : "UNACTIVE❌"}*
Anti ViewOnce : *${isAntiViewOnce ? "ACTIVE✅" : "UNACTIVE❌"}*
Anti Toxic : *${isAntiToxic ? "ACTIVE✅" : "UNACTIVE❌"}*


⭓ *Name :* ${_meta.subject}
⭓ *Group ID :* ${_meta.id}
⭓ *Created on :* ${moment(_meta.creation * 1000).format("ll")}
⭓ *GC owner:* ${_meta.subjectOwner}
⭓ *Admins length:* ${
              _meta.participants.filter((x) => x.admin === "admin").length
            }
⭓ *participants length:* ${
              _meta.participants.filter((x) => x.admin === null).length
            }
⭓ *Desc :* 
${_meta.desc}`;

            await conn.sendMessage(
              from,
              {
                caption,
                image: await getBuffer(_img),
              },
              {
                quoted: fcall,
              }
            );
          }
          break;
        case "revoke":
        case "resetgclink":
          {
            if (!isGroup) return reply(mess.only.group);
            if (!isOwner && !isGroupAdmins) return reply(mess.only.admin);
            if (!isBotGroupAdmins) return reply(mess.only.Badmin);
            conn.groupRevokeInvite(from);
          }
          break;
        case "antilink":
          {
            if (!isGroup) return reply(mess.only.group);
            if (!isGroupAdmins && !isOwner) return reply(mess.only.admin);
            await loading();
            if (args[0] === "on" || args[0] === "enable" || args[0] === "1") {
              if (isAntiLink) return reply("the feature is already active.");
              db.data.chats[from].antilink = true;
              let ih = `the antilink feature has been activated.`;
              reply(ih);
            } else if (
              args[0] === "off" ||
              args[0] === "disable" ||
              args[0] === "0"
            ) {
              if (!isAntiLink)
                return reply("the antilink feature is already off.");
              db.data.chats[from].antilink = false;
              let ih = `the antilink feature has been deactivated.`;
              reply(ih);
            } else if (!q) {
              reply(`*anti link mode*\n ${prefix + command} on/off`);
            }
          }
          break;

        case "text2img": {
          if (!q)
            return reply(
              `Please provide a prompt.\n\nExample: *${
                prefix + command
              } a big dog and a tiny cat*`
            );

          await loading();

          try {
            let imageUrl = `https://api-ix-ix.hf.space/api/text2img?prompt=${encodeURIComponent(
              q
            )}`;

            await conn.sendMessage(
              m.chat,
              {
                image: {
                  url: imageUrl,
                },
                caption: fontx(`🖼️ *Generated Image*\n\n📜 *Prompt:* ${q}\n> `),
              },
              {
                quoted: m,
              }
            );
          } catch (error) {
            console.error("Error in text2img case:", error);
            reply(
              "❌ An error occurred while generating the image. Please try again later."
            );
          }
          break;
        }
        case "tts":
        case "say": {
          if (!q) {
            return reply(
              `\`Please provide text to convert to speech.\`\n\n*Example:*\n${
                prefix + command
              } hello`
            );
          }

          try {
            await loading();
            const apiUrl = `https://bk9.fun/tools/tts?q=${encodeURIComponent(
              q
            )}&lang=en`;
            const response = await fetch(apiUrl);
            if (!response.ok) {
              return reply(
                "Failed to process your request. Please try again later."
              );
            }
            await conn.sendMessage(
              from,
              {
                audio: {
                  url: apiUrl,
                },
                mimetype: "audio/mp4",
                fileName: `tts_${Date.now()}.mp3`,
                ptt: true, // Send as a voice note
              },
              {
                quoted: m,
              }
            );
          } catch (error) {
            console.error("Error in TTS case:", error);
            reply(
              "An error occurred while processing your request. Please try again later."
            );
          }
          break;
        }
        case "qr": {
          if (!q)
            return reply(
              "Please provide text or a link to generate a QR code."
            );
          await loading();
          const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
            q
          )}`;

          await conn.sendMessage(
            m.chat,
            {
              image: {
                url: apiUrl,
              },
              caption: `✅ *QR Code Generated*\n🔗 Data: ${q}`,
            },
            {
              quoted: m,
            }
          );

          break;
        }
        case "script":
        case "repo":
        case "sc": {
          try {
            // Channel information (customize these)
            const channelInfo = {
              name: "TIFE CYBERCRATE™",
              jid: "120363398158224015@ɴᴇᴡꜱʟᴇᴛᴛᴇʀ", // Example channel ID
              link: "https://whatsapp.com/channel/0029VbB7Tsa6WaKgDuGsnO1u",
              messageId: Math.floor(Math.random() * 1000000), // Random message ID
            };

            // Forwarding attributes to make it look like it's from channel
            const forwardAttributes = {
              forwardingScore: 999, // High forwarding score
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: channelInfo.jid,
                newsletterName: channelInfo.name,
                serverMessageId: channelInfo.messageId,
              },
            };

            // Initial loading message that appears forwarded
            await conn.sendMessage(
              m.chat,
              {
                text: "⬇️ *MARVEL-MD REPOSITORY* ⬇️\n\nFetching latest version from GitHub...",
                contextInfo: forwardAttributes,
              },
              { quoted: m }
            );

            // Enhanced progress tracking with MARVEL theme
            const progress = async (percent) => {
              const spinner = ["🟥", "🟧", "🟨", "🟩", "🟦", "🟪"][
                Math.floor(Date.now() / 400) % 6
              ];
              const bars = "▰".repeat(Math.floor(percent / 5)).padEnd(20, "▱");
              await conn.sendMessage(m.chat, {
                text: `${spinner} *MARVEL-MD* Downloading...\n${bars} ${percent}%`,
                edit: m.key,
                contextInfo: forwardAttributes,
              });
            };

            // GitHub API endpoints for MARVEL-MD
            const endpoints = {
              repo: "https://api.github.com/repos/omoba-tife/marvel-md",
              zip: "https://github.com/omoba-tife/marvel-md/archive/refs/heads/master.zip",
            };

            // Start fetching with progress updates
            await progress(20);
            const repoRes = await fetch(endpoints.repo);
            await progress(50);

            // Error handling
            if (!repoRes.ok) {
              await conn.sendMessage(
                m.chat,
                {
                  text: `🛑 *MARVEL-MD Download Error*\n\nStatus: ${repoRes.status}\n${repoRes.statusText}\n\nTry manually:\n${endpoints.zip}`,
                  react: { text: "❌", key: m.key },
                  contextInfo: forwardAttributes,
                },
                { quoted: m }
              );
              return;
            }

            const repoData = await repoRes.json();
            await progress(70);

            // Download zip with progress tracking
            const zipRes = await fetch(endpoints.zip);
            if (!zipRes.ok) {
              await conn.sendMessage(
                m.chat,
                {
                  text: `🛑 *Download Failed*\n\nCouldn't fetch repository files\nStatus: ${zipRes.status}`,
                  react: { text: "⚠️", key: m.key },
                  contextInfo: forwardAttributes,
                },
                { quoted: m }
              );
              return;
            }

            const zipBuffer = await (async () => {
              const reader = zipRes.body.getReader();
              const chunks = [];
              let received = 0;
              const total = parseInt(zipRes.headers.get("content-length")) || 0;

              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                chunks.push(value);
                received += value.length;
                if (total > 0)
                  await progress(70 + Math.floor((received / total) * 25));
              }
              return Buffer.concat(chunks);
            })();

            await progress(98);

            // MARVEL-MD themed caption with channel-forwarded appearance
            const caption = `⚡ *MARVEL-MD REPOSITORY* ⚡

▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
  🎯 *Version:* ${repoData.default_branch || "Master"}
  📦 *Size:* ${(zipBuffer.length / (1024 * 1024)).toFixed(2)} MB
  ⭐ *Stars:* ${repoData.stargazers_count || "100+"}
  🛠 *Maintainer:* Omoba Tife
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

🔗 *Links:*
🌍 GitHub: ${repoData.html_url}
📢 Channel: ${channelInfo.link}

📂 *Includes:*
• Full source code
• Installation guide
• Plugin collection
• Documentation

💡 *Requirements:*
• Node.js 16+
• FFmpeg installed
• 1GB+ RAM

🔐 *Securely downloaded from GitHub*`;

            // Send the repository file with forwarding appearance
            await conn.sendMessage(
              m.chat,
              {
                document: zipBuffer,
                mimetype: "application/zip",
                fileName: `MARVEL-MD-${
                  repoData.default_branch || "master"
                }.zip`,
                caption: caption,
                contextInfo: {
                  ...forwardAttributes,
                  externalAdReply: {
                    title: "MARVEL-MD OFFICIAL",
                    body: `⭐ ${repoData.stargazers_count} Stars | 🚀 WhatsApp Bot`,
                    thumbnailUrl:
                      "https://zuctusbetucsmsywshyk.supabase.co/storage/v1/object/public/imgurl/ab3rlg_1752000334033.jpg",
                    mediaType: 1,
                    sourceUrl: channelInfo.link,
                    showAdAttribution: true,
                  },
                },
              },
              { quoted: m }
            );

            // Send installation guide as forwarded message
            await conn.sendMessage(m.chat, {
              text:
                `📜 *MARVEL-MD INSTALLATION* 📜\n\n` +
                `1. Get the ZIP file (from hosting site)\n` +
                `2. Unarchive the downloaded file\n` +
                `3. Edit \`User.js\` with your phone number\n` +
                `4. Start deployment in hosting console\n\n` +
                `💬 Support: ${channelInfo.link}`,
              contextInfo: forwardAttributes,
              react: { text: "📌", key: m.key },
            });

            // Final success reaction
            await conn.sendMessage(m.chat, {
              react: { text: "✅", key: m.key },
            });
          } catch (e) {
            console.error("MARVEL-MD Repo Error:", e);
            await conn.sendMessage(
              m.chat,
              {
                text: `⚠️ *MARVEL-MD ERROR*\n\n${e.message}\n\nPlease try again later.`,
                contextInfo: {
                  forwardingScore: 999,
                  isForwarded: true,
                },
                react: { text: "❌", key: m.key },
              },
              { quoted: m }
            );
          }
          break;
        }
        case "ssweb": {
          if (!q)
            return reply(
              "Please provide a valid URL.\nExample: *" +
                prefix +
                command +
                " https://example.com*"
            );
          await loading();
          try {
            let apiUrl = `https://api-ix-ix.hf.space/api/screenshot?url=${encodeURIComponent(
              q
            )}`;
            await conn.sendMessage(
              m.chat,
              {
                image: {
                  url: apiUrl,
                },
                caption: fontx(`🖥️ Screenshot of: `) + q,
              },
              {
                quoted: m,
              }
            );
          } catch (error) {
            console.error("Error in ssweb case:", error);
            conn.sendMessage(m.chat, {
              text: "❌ Failed to capture screenshot. Please try again later.",
            });
          }
          break;
        }
        case "welcome":
          {
            if (!isGroup) return reply(mess.only.group);
            if (!isAdmins && !isOwner) return reply(mess.only.admin);
            if (!q) return reply("Enter the query 'on' or 'off'");
            await loading();
            if (q == "on") {
              if (chat.welcome == true)
                return reply("Welcome is already active");
              db.data.chats[from].welcome = true;
              reply("successfully activated welcome in this group");
            } else if (q == "off") {
              if (chat.welcome == false)
                return reply("welcome is already inactive");
              db.data.chats[from].welcome = false;
              reply("successfully deactivated welcome in this group");
            } else reply('Choose "on" or "off"');
          }
          break;
        case "encrypt":
        case "obfuscate":
        case "hard-encrypt": {
          if (!text)
            return reply(
              `\`No JavaScript code detected\`\n*Example:* ${
                prefix + command
              } console.log('Tife Tech');`
            );

          await loading();

          try {
            const apiUrl = `https://api-ix-ix.hf.space/api/obf?code=${encodeURIComponent(
              text
            )}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
              console.error(
                `API returned status: ${response.status} ${response.message}`
              );
              return reply(
                "Failed to connect to the obfuscation service. Please try again later."
              );
            }

            const res = await response.json();

            if (res.status !== 200 || !res.success) {
              console.error(`API error: ${JSON.stringify(res)}`);
              return reply(
                "Failed to obfuscate the provided code. Please ensure the code is valid and try again."
              );
            }

            const encryptedCode = res.obfuscatedCode;
            const tempFilePath = "./blue-enc.js";

            const fs = require("fs");
            fs.writeFileSync(tempFilePath, encryptedCode, "utf8");

            await conn.sendMessage(
              m.chat,
              {
                document: {
                  url: tempFilePath,
                },
                mimetype: "application/javascript",
                fileName: "BLUE-ENC.js",
                caption: fontx(`> `),
              },
              {
                quoted: m,
              }
            );

            fs.unlinkSync(tempFilePath);
          } catch (error) {
            console.error("Error in obfuscate case:", error.message || error);
            reply(
              "An error occurred while processing your request. Please try again later."
            );
          }
          break;
        }
        case "getdevice":
        case "device":
        case "phone": {
          if (!m.quoted)
            return reply(
              `Please reply to a chat message with *${
                prefix + command
              }* to get device information.`
            );
          try {
            await loading();
            const deviceInfo = await getDevice(m.quoted.id || m.key.id);
            if (!deviceInfo)
              return reply(
                "Unable to fetch device information. Please try again later."
              );
            await conn.sendMessage(
              m.chat,
              {
                text: fontx(`📱 *\`device type\`* *${deviceInfo}*`),
              },
              {
                quoted: m,
              }
            );
          } catch (error) {
            reply(
              "An error occurred while fetching the device information. Please try again later."
            );
          }
          break;
        }
        case "html": {
          if (!q) return reply("Please provide a valid link to fetch.");

          const isValidUrl = (url) => {
            try {
              new URL(url);
              return true;
            } catch (err) {
              return false;
            }
          };

          if (!isValidUrl(q))
            return reply("Invalid URL. Please provide a proper link.");

          try {
            await loading();
            const response = await fetch(q);

            if (!response.ok) {
              return reply(
                `❌ Failed to fetch the link. Server responded with status: ${response.status}`
              );
            }

            const html = await response.text();
            const fileName = `Blue_result.html`;

            await conn.sendMessage(m.chat, {
              document: Buffer.from(html, "utf-8"),
              mimetype: "text/html",
              fileName: fileName,
              caption: `📄 *Fetched HTML Page*\n🔗 *URL:* ${q}`,
            });
          } catch (error) {
            console.error("Error in get case:", error);
            reply(
              "❌ An error occurred while fetching the link. Please try again later."
            );
          }
          break;
        }
        case "get": {
          if (!q) return reply("Please provide a valid link to fetch.");
          const isValidUrl = (url) => {
            try {
              new URL(url);
              return true;
            } catch (err) {
              return false;
            }
          };

          if (!isValidUrl(q))
            return reply("Invalid URL. Please provide a proper link.");

          try {
            await loading();
            const response = await fetch(q);
            if (!response.ok) {
              return reply(
                `Failed to fetch the link. Server responded with status: ${response.status}`
              );
            }

            const html = await response.text();
            const maxLength = 700000;
            const output =
              html.length > maxLength
                ? html.slice(0, maxLength) +
                  `\n\n*Output truncated. Full content exceeds ${maxLength} characters.*`
                : html;

            replyx(`${output}`);
          } catch (error) {
            console.error("Error in get case:", error);
            reply(
              "An error occurred while fetching the link. Please try again later."
            );
          }
          break;
        }
        case "fetch": {
          if (!q)
            return reply(
              `\`No link detected\`\nExample: *${
                prefix + command
              } https://example.com/media.mp4*`
            );
          await loading();
          try {
            let url = q.trim();
            let response = await fetch(url, {
              method: "HEAD",
            });

            if (!response.ok) {
              return conn.sendMessage(m.chat, {
                text: `❌ *Failed to fetch the link.*\nStatus: ${response.status}`,
              });
            }

            let contentType = response.headers.get("content-type") || "";
            let filename = url.split("/").pop().split("?")[0];

            let messageOptions = {
              caption: `🔗 *Fetched Content*\n📎 *Filename:* ${filename}`,
            };

            if (contentType.includes("image")) {
              conn.sendMessage(m.chat, {
                image: {
                  url,
                },
                ...messageOptions,
              });
            } else if (contentType.includes("video")) {
              conn.sendMessage(m.chat, {
                video: {
                  url,
                },
                ...messageOptions,
              });
            } else if (contentType.includes("audio")) {
              conn.sendMessage(m.chat, {
                audio: {
                  url,
                },
                mimetype: "audio/mpeg",
                ...messageOptions,
              });
            } else {
              conn.sendMessage(m.chat, {
                document: {
                  url,
                },
                mimetype: contentType || "application/octet-stream",
                fileName: filename,
                ...messageOptions,
              });
            }
          } catch (error) {
            console.error("Error in fetch case:", error);
            conn.sendMessage(m.chat, {
              text: "❌ An error occurred while fetching the content. Please try again later.",
            });
          }
          break;
        }
        case "gross": {
          const grossEmojis = [
            "🤢",
            "🤮",
            "😖",
            "😫",
            "🤢🤢",
            "🤮🤮",
            "😵‍💫",
            "🤧",
            "🤢🤮",
            "😷",
            "🤢🤢🤮",
            "🤮🤮🤮",
            "🤢🤢🤢",
            "🤮🤢🤮",
            "😵",
            "🤒",
            "🤕",
            "🤢🤮🤢",
            "🤮😫🤢",
            "🤮🤢😵",
          ];

          const grossMsg = await conn.sendMessage(
            m.chat,
            {
              text: fontx(grossEmojis[0]),
            },
            {
              quoted: m,
            }
          );

          const updateMessage = async (index = 1) => {
            if (index < grossEmojis.length) {
              await conn.relayMessage(
                m.chat,
                {
                  protocolMessage: {
                    key: grossMsg.key,
                    type: 14,
                    editedMessage: {
                      conversation: fontx(grossEmojis[index]),
                    },
                  },
                },
                {}
              );
              setTimeout(() => updateMessage(index + 1), 1000);
            }
          };

          setTimeout(() => updateMessage(), 1000);
          break;
        }
        case "love": {
          const heartEmojis = [
            "♥️",
            "❣️",
            "💘",
            "💝",
            "💖",
            "💗",
            "💓",
            "💞",
            "💕",
            "❤️‍🔥",
            "❤️",
            "🧡",
            "💛",
            "💚",
            "💙",
            "💜",
            "🤎",
            "🖤",
            "🤍",
            "💕",
            "🫀",
            "💓",
            "💝",
            "💞",
            "💓",
            "💘",
            "💗",
            "💝",
            "💓",
          ];
          const loveMsg = await conn.sendMessage(
            m.chat,
            {
              text: heartEmojis[0],
            },
            {
              quoted: m,
            }
          );
          const updateMessage = async (index = 1) => {
            if (index < heartEmojis.length) {
              await conn.relayMessage(
                m.chat,
                {
                  protocolMessage: {
                    key: loveMsg.key,
                    type: 14,
                    editedMessage: {
                      conversation: heartEmojis[index],
                    },
                  },
                },
                {}
              );
              setTimeout(() => updateMessage(index + 1), 1000);
            }
          };
          setTimeout(() => updateMessage(), 1000);
          break;
        }
        case "confuse":
        case "conf": {
          const confusedEmojis = [
            "😕",
            "🤔",
            "😵",
            "😵‍💫",
            "🤷",
            "🤷‍♂️",
            "🤷‍♀️",
            "😮‍💨",
            "😐",
            "🤨",
            "🙃",
            "😬",
            "😯",
            "😖",
            "😑",
            "😳",
            "🤪",
            "🤯",
          ];

          const confuseMsg = await conn.sendMessage(
            m.chat,
            {
              text: confusedEmojis[0],
            },
            {
              quoted: m,
            }
          );
          const updateMessage = async (index = 1) => {
            if (index < confusedEmojis.length) {
              await conn.relayMessage(
                m.chat,
                {
                  protocolMessage: {
                    key: confuseMsg.key,
                    type: 14,
                    editedMessage: {
                      conversation: confusedEmojis[index],
                    },
                  },
                },
                {}
              );
              setTimeout(() => updateMessage(index + 1), 1000);
            }
          };
          setTimeout(() => updateMessage(), 1000);
          break;
        }
        case "angry":
        case "gtf": {
          const angryEmojis = [
            "😡",
            "😠",
            "🤬",
            "👿",
            "💢",
            "🔥",
            "😾",
            "😤",
            "🤯",
            "💥",
            "😾",
            "👺",
            "👊",
            "🗯️",
            "😒",
            "👎",
            "🥵",
            "🧨",
            "👹",
            "💣",
            "😠",
            "👊",
            "💥",
            "😡",
            "🤬",
            "🔥",
            "🖕🏽",
          ];

          const angryMsg = await conn.sendMessage(
            m.chat,
            {
              text: angryEmojis[0],
            },
            {
              quoted: m,
            }
          );
          const updateMessage = async (index = 1) => {
            if (index < angryEmojis.length) {
              await conn.relayMessage(
                m.chat,
                {
                  protocolMessage: {
                    key: angryMsg.key,
                    type: 14,
                    editedMessage: {
                      conversation: angryEmojis[index],
                    },
                  },
                },
                {}
              );
              setTimeout(() => updateMessage(index + 1), 1000);
            }
          };
          setTimeout(() => updateMessage(), 1000);
          break;
        }
        case "flirt": {
          await loading();
          try {
            let response = await fetch("https://api-ix-ix.hf.space/api/flirt");
            let json = await response.json();

            if (!json.success) {
              return reply(
                fontx("Failed to fetch a flirt line. Please try again later.")
              );
            }

            let { flirt } = json;

            conn.sendMessage(
              m.chat,
              {
                text: fontx(`💘 *Flirty Line:*\n\n❝ ${flirt} ❞\n> `),
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error in flirt case:", error);
            reply(
              fontx(
                "An error occurred while fetching the flirt line. Please try again later."
              )
            );
          }
          break;
        }

        case "joke": {
          await loading();
          try {
            let response = await fetch("https://api-ix-ix.hf.space/api/joke");
            let json = await response.json();

            if (!json.success) {
              return reply(
                fontx("Failed to fetch a joke. Please try again later.")
              );
            }

            let { joke } = json;

            conn.sendMessage(
              m.chat,
              {
                text: fontx(`😂 *Here's a joke for you!*\n\n❝ ${joke} ❞\n> `),
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error in joke case:", error);
            reply(
              fontx(
                "An error occurred while fetching the joke. Please try again later."
              )
            );
          }
          break;
        }

        case "truth": {
          await loading();
          try {
            let response = await fetch("https://api-ix-ix.hf.space/api/truth");
            let json = await response.json();

            if (!json.success) {
              return reply(
                fontx(
                  "Failed to fetch a truth question. Please try again later."
                )
              );
            }

            let { truth } = json;

            conn.sendMessage(
              m.chat,
              {
                text: fontx(`🔍 *Truth Question*\n\n❝ ${truth} ❞\n> `),
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error in truth case:", error);
            reply(
              fontx(
                "An error occurred while fetching the truth question. Please try again later."
              )
            );
          }
          break;
        }

        case "dare": {
          await loading();
          try {
            let response = await fetch("https://api-ix-ix.hf.space/api/dare");
            let json = await response.json();

            if (!json.success) {
              return reply(
                fontx(
                  "Failed to fetch a dare challenge. Please try again later."
                )
              );
            }

            let { dare } = json;

            conn.sendMessage(
              m.chat,
              {
                text: fontx(`🔥 *Dare Challenge*\n\n❝ ${dare} ❞\n> `),
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error in dare case:", error);
            reply(
              fontx(
                "An error occurred while fetching the dare challenge. Please try again later."
              )
            );
          }
          break;
        }
        case "rizz":
        case "pickupline": {
          await loading();
          try {
            let response = await fetch("https://api-ix-ix.hf.space/api/rizz");
            let json = await response.json();

            if (!json.success) {
              return reply(
                fontx("Failed to fetch a rizz line. Please try again later.")
              );
            }

            let { rizz } = json;

            conn.sendMessage(
              m.chat,
              {
                text: fontx(`😏 *Rizz Line*\n\n❝ ${rizz} ❞\n> `),
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error in rizz case:", error);
            reply(
              fontx(
                "An error occurred while fetching the rizz line. Please try again later."
              )
            );
          }
          break;
        }

        case "quote": {
          await loading();
          try {
            let response = await fetch("https://api-ix-ix.hf.space/api/quote");
            let json = await response.json();

            if (!json.success) {
              return reply(
                fontx("Failed to fetch a quote. Please try again later.")
              );
            }

            let { Author, quote } = json;

            conn.sendMessage(
              m.chat,
              {
                text: fontx(
                  `📜 *Quote of the Day*\n\n❝ ${quote} ❞\n\n— *${Author}*\n> `
                ),
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error in quote case:", error);
            reply(
              fontx(
                "An error occurred while fetching the quote. Please try again later."
              )
            );
          }
          break;
        }

        case "aniquote":
        case "animequote": {
          await loading();
          try {
            let response = await fetch(
              "https://api-ix-ix.hf.space/api/aniquote"
            );
            let json = await response.json();

            if (!json.success) {
              return reply(
                fontx("Failed to fetch an anime quote. Please try again later.")
              );
            }

            let { author, anime, quote } = json;

            conn.sendMessage(
              m.chat,
              {
                text: fontx(
                  `🎌 *Anime Quote*\n\n💬 *Quote:* "${quote}"\n👤 *Author:* ${author}\n📺 *Anime:* ${anime}\n> `
                ),
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error in aniquote case:", error);
            reply(
              fontx(
                "An error occurred while fetching the anime quote. Please try again later."
              )
            );
          }
          break;
        }
        case "antivirtex": {
          if (!isGroup) return reply(mess.only.group);
          if (!isGroupAdmins) return reply(mess.only.admin);
          if (!isBotGroupAdmins) return reply(mess.only.Badmin);
          await loading();
          const mode = args[0]?.toLowerCase();
          if (["on", "enable", "1"].includes(mode)) {
            if (isAntiVirtex) return reply("antivirtex is already enabled!");
            db.data.chats[from].antivirtex = true;
            reply("successfully enabled antivirtex!");
          } else if (["off", "disable", "0"].includes(mode)) {
            if (!isAntiVirtex) return reply("Antivirtex Is Already Disabled!");
            db.data.chats[from].antivirtex = false;
            reply("successfully disabled antivirtex!");
          } else {
            reply(`*anti virtex mode*\nUsage: ${prefix + command} on/off`);
          }
          break;
        }
        case "promote":
          if (!isGroup && !isGroupAdmins) return reply(mess.only.group);
          if (!isBotGroupAdmins) return reply(mess.only.Badmin);
          await loading();
          let xxp = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await conn.groupParticipantsUpdate(m.chat, [xxp], "promote");
          reply(mess.success);
          break;
        case "demote":
          if (!isGroup && !isGroupAdmins) return reply(mess.only.group);
          if (!isBotGroupAdmins) return reply(mess.only.Badmin);
          await loading();
          let xxpx = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await conn.groupParticipantsUpdate(m.chat, [xxpx], "demote");
          reply(mess.success);
          break;
        case "gclink":
          {
            if (!isGroup) return reply(mess.only.group);
            if (!isGroupAdmins) return reply(mess.only.admin);
            if (!isBotGroupAdmins) return reply(mess.only.Badmin);
            let response = await conn.groupInviteCode(from);
            conn.sendText(
              from,
              `https://chat.whatsapp.com/${response}\n\n${themeemoji} *Group link: ${groupMetadata.subject}*`,
              m,
              {
                detectLink: true,
              }
            );
          }
          break;
        case "leavegc":
          if (!isGroup) return reply(mess.only.group);
          if (!isOwner) return reply(mess.only.owner);
          await loading();
          await conn.groupLeave(from);
          break;
        case "listonline":
          {
            if (!isGroup) return reply(mess.only.group);
            if (!isAdmins && !isOwner) return reply(mess.only.admin);
            let id = args && /\d+-\d+@g.us/.test(args[0]) ? args[0] : from;
            let online = [...Object.keys(store.presences[id]), botNumber];
            let onlineListMessage =
              "List Online:\n\n" +
              online
                .map((v) => `${themeemoji} @${v.replace(/@.+/, "")}`)
                .join("\n");
            await conn.sendText(from, onlineListMessage, m, {
              mentions: online,
            });
          }
          break;
        case "opentime": {
          if (!isGroup) return reply(mess.only.group);
          if (!isGroupAdmins) return reply(mess.only.admin);
          if (!isBotGroupAdmins) return reply(mess.only.Badmin);

          if (args[1] == "seconds") {
            var timer = args[0] * `1000`;
          } else if (args[1] == "minutes") {
            var timer = args[0] * `60000`;
          } else if (args[1] == "hours") {
            var timer = args[0] * `3600000`;
          } else if (args[1] == "days") {
            var timer = args[0] * `86400000`;
          } else {
            return reply(
              "*Choose:*\nseconds\nminutes\nhours\ndays\n\n*Example:*\n10 seconds"
            );
          }

          reply(`Open time ${q} starts now`);
          setTimeout(() => {
            const open = fontx(
              `*On time*: The group is now opened by an admin\nMembers can now send messages\n> `
            );
            conn.groupSettingUpdate(from, "not_announcement");
            reply(open);
          }, timer);
          break;
        }

        case "closetime":
          {
            if (!isGroup) return reply(mess.only.group);
            if (!isGroupAdmins) return reply(mess.only.admin);
            if (!isBotGroupAdmins) return reply(mess.only.Badmin);

            if (args[1] == "seconds") {
              var timer = args[0] * `1000`;
            } else if (args[1] == "minutes") {
              var timer = args[0] * `60000`;
            } else if (args[1] == "hours") {
              var timer = args[0] * `3600000`;
            } else if (args[1] == "days") {
              var timer = args[0] * `86400000`;
            } else {
              return reply(`Example: ${prefix}closetime 5 seconds`);
            }

            let ko = await conn.sendMessage(
              from,
              {
                text: `Close time ${q} starts now`,
              },
              {
                quoted: m,
              }
            );
            setTimeout(() => deleteMessage(ko), 5000);

            setTimeout(() => {
              const close = fontx(
                `*On time*: The group is now closed by an admin\nOnly admins can send messages\n> `
              );
              conn.groupSettingUpdate(from, "announcement");
              reply(close);
            }, timer);
          }
          break;
        case "tagadmin":
        case "listadmin":
          {
            if (!m.isGroup) return reply(mess.only.group);
            const groupAdmins = participants.filter((p) => p.admin);
            const listAdmin = groupAdmins
              .map((v, i) => `${i + 1}. @${v.id.split("@")[0]}`)
              .join("\n");
            const owner =
              groupMetadata.owner ||
              groupAdmins.find((p) => p.admin === "superadmin")?.id ||
              m.chat.split`-`[0] + "@s.whatsapp.net";
            let text = fontx(
              `   
*Group Admins:*
${listAdmin}
`.trim()
            );
            conn.sendMessage(
              m.chat,
              {
                text: text,
                mentions: [...groupAdmins.map((v) => v.id), owner],
              },
              {
                quoted: m,
              }
            );
          }
          break;
        case "setnamegc":
        case "setgcname": {
          if (!isGroup) return reply(mess.only.group);
          if (!isGroupAdmins) return reply(mess.only.admin);
          if (!isBotGroupAdmins) return reply(mess.only.Badmin);
          if (!q || q.trim().length === 0)
            return reply(`Usage: ${command} <new group name>`);

          await conn
            .groupUpdateSubject(from, q)
            .then(() => {
              reply(mess.success);
            })
            .catch(() => {
              reply(mess.error.api);
            });
          break;
        }
        case "animedl": {
          if (!q.includes("|")) {
            return conn.sendMessage(m.chat, {
              text: `\`Invalid format\`\nExample: *${
                prefix + command
              } solo leveling|1*`,
            });
          }

          await loading();

          try {
            let [anime, episode] = q.split("|").map((x) => x.trim());
            let apiUrl = `https://api-ix-ix.hf.space/api/animedl?name=${encodeURIComponent(
              anime
            )}&episode=${encodeURIComponent(episode)}`;

            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.success || !json.download_link) {
              return conn.sendMessage(m.chat, {
                text: `❌ *No download link found for ${anime} Episode ${episode}.*`,
              });
            }

            let downloadLink = json.download_link;
            let title = json.title || `${anime} - Episode ${episode}`;

            // Notify the user that the file is being downloaded
            await conn.sendMessage(m.chat, {
              text: fontx(`🎥 *Fetching ${title}*\n⏳ Please wait...`),
            });

            // **Option 1: Try sending as a document (better for large files)**
            try {
              await conn.sendMessage(m.chat, {
                document: { url: downloadLink },
                mimetype: "video/mp4",
                fileName: `${title}.mp4`,
                caption: fontx(`🎬 *${title}*\n📥 *Download Complete!*`),
              });
            } catch (error) {
              console.warn(
                "WhatsApp rejected direct file send. Sending as a link instead."
              );

              await conn.sendMessage(m.chat, {
                text:
                  fontx(`🎬 *${title}*\n📥 *Download it manually:*\n\n🔗 `) +
                  `${downloadLink}`,
              });
            }
          } catch (error) {
            console.error("Error in animedl case:", error);
            conn.sendMessage(m.chat, {
              text: "❌ An error occurred while fetching the anime. Please try again later.",
            });
          }
          break;
        }
        case "play":
        case "songs": {
          if (!text) {
            return reply(
              `\`No music title detected.\`\n*Example: ${
                prefix + command
              } Alan Walker - Faded*`
            );
          }

          try {
            await loading();
            let search = await yts(text);
            let video = search.videos[0];

            if (!video) {
              return reply("No results found for the provided query.");
            }

            let { title, timestamp, views, ago, url, thumbnail } = video;

            // Send video details
            await conn.sendMessage(m.chat, {
              image: { url: thumbnail },
              caption:
                fontx(
                  `🎶 *Title:* ${title}\n👁️ *Views:* ${views}\n⏱️ *Duration:* ${timestamp}\n📅 *Uploaded:* ${ago}\n🌐 *URL:*`
                ) + ` ${url}`,
            });

            let apiUrl = `https://api-ix-ix.hf.space/api/ytmp3?url=${encodeURIComponent(
              url
            )}`;

            try {
              let response = await fetch(apiUrl, { method: "GET" });

              if (!response.ok) {
                return reply(
                  `❌ Failed to fetch audio. API returned status ${response.status}`
                );
              }

              let json = await response.json();

              // Validate API response
              if (
                !json ||
                json.status !== 200 ||
                !json.success ||
                !json.download_link
              ) {
                return reply(
                  "❌ Failed to fetch audio. Please try again later."
                );
              }

              let { download_link, title: audioTitle } = json;

              // Send audio file
              await conn.sendMessage(
                m.chat,
                {
                  audio: { url: download_link },
                  mimetype: "audio/mp4",
                  fileName: `${audioTitle}.mp3`,
                  caption: `🎶 *Title:* ${audioTitle}\n📥 *Downloaded successfully!*`,
                },
                { quoted: m }
              );
            } catch (fetchError) {
              console.error("Error fetching audio:", fetchError);
              reply(
                "❌ Failed to fetch audio. Please check your connection and try again."
              );
            }
          } catch (error) {
            console.error("Error in play case:", error);
            reply("❌ An unexpected error occurred. Please try again later.");
          }
          break;
        }
        case "video": {
          if (!text) {
            return reply(
              `\`No video title detected.\`\n*Example: ${
                prefix + command
              } Alan Walker - Faded*`
            );
          }

          try {
            await loading();

            let search = await yts(text);
            let video = search.videos[0];
            if (!video) {
              return conn.sendMessage(
                m.chat,
                {
                  text: "No results found for the provided query.",
                },
                {
                  quoted: m,
                }
              );
            }

            let { title, timestamp, views, ago, url, thumbnail } = video;

            await conn.sendMessage(
              m.chat,
              {
                image: {
                  url: thumbnail,
                },
                caption: fontx(
                  `🎬 *Title:* ${title}\nfound sending, a sec\n> `
                ),
              },
              {
                quoted: m,
              }
            );

            let apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(
              url
            )}`;
            let res = await fetch(apiUrl);
            let json = await res.json();

            if (!json.success || !json.result || !json.result.download_url) {
              return conn.sendMessage(
                m.chat,
                {
                  text: "Failed to fetch video. Please try again later.",
                },
                {
                  quoted: m,
                }
              );
            }

            let { download_url, title: videoTitle, quality } = json.result;

            await conn.sendMessage(
              m.chat,
              {
                video: {
                  url: download_url,
                },
                caption: fontx(`> `),
                mimetype: "video/mp4",
              },
              {
                quoted: m,
              }
            );
          } catch (error) {
            console.error("Error in video case:", error);
            conn.sendMessage(
              m.chat,
              {
                text: "An unexpected error occurred while processing your request. Please try again later.",
              },
              {
                quoted: m,
              }
            );
          }

          break;
        }
        case "ytmp4": {
          if (!q) {
            return reply(
              `\`No YouTube link detected\`\n*Example:  ${
                prefix + command
              } https://youtube.com/watch?v=wKfNaV-su-M*`
            );
          }

          await loading();

          try {
            const response = await fetch(
              `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(
                q
              )}`
            );
            const json = await response.json();

            if (!json.success || !json.result) {
              return conn.sendMessage(
                m.chat,
                {
                  text: "Failed to fetch the video. Ensure the link is valid and try again.",
                },
                {
                  quoted: m,
                }
              );
            }

            const { quality, title, thumbnail, download_url } = json.result;

            const captionText = fontx(`video found sending, a sec`);

            await conn.sendMessage(
              m.chat,
              {
                image: {
                  url: thumbnail,
                },
                caption: captionText,
              },
              {
                quoted: m,
              }
            );

            await conn.sendMessage(
              m.chat,
              {
                video: {
                  url: download_url,
                },
                caption: fontx(`🎬 *${title}*\n📹 Quality: ${quality}`),
                mimetype: "video/mp4",
              },
              {
                quoted: m,
              }
            );
          } catch (error) {
            console.error("Error in ytmp4 case:", error);
            conn.sendMessage(
              m.chat,
              {
                text: "An error occurred while processing your request. Please try again later.",
              },
              {
                quoted: m,
              }
            );
          }

          break;
        }
        case "ytmp3": {
          if (!q) {
            return reply(
              `\`No YouTube link detected\`\n*Example:  ${
                prefix + command
              } https://youtube.com/watch?v=wKfNaV-su-M*`
            );
          }

          await loading();

          try {
            const response = await fetch(
              `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(
                q
              )}`
            );
            const json = await response.json();

            if (!json.success || !json.result) {
              return conn.sendMessage(
                m.chat,
                {
                  text: "Failed to fetch the audio. Ensure the link is valid and try again.",
                },
                {
                  quoted: m,
                }
              );
            }

            const { quality, title, thumbnail, download_url } = json.result;

            const captionText = fontx(`audio found sending, a sec`);

            await conn.sendMessage(
              m.chat,
              {
                image: {
                  url: thumbnail,
                },
                caption: captionText,
              },
              {
                quoted: m,
              }
            );

            await conn.sendMessage(
              m.chat,
              {
                audio: {
                  url: download_url,
                },
                mimetype: "audio/mpeg",
                fileName: `${title}.mp3`,
              },
              {
                quoted: m,
              }
            );
          } catch (error) {
            console.error("Error in ytmp3 case:", error);
            conn.sendMessage(
              m.chat,
              {
                text: "An error occurred while processing your request. Please try again later.",
              },
              {
                quoted: m,
              }
            );
          }

          break;
        }
        case "yts": {
          if (!q) return reply("Please provide a search query.");
          await loading();

          try {
            const searchResults = await yts(q);
            const videoResults = searchResults.all.filter(
              (v) => v.type === "video"
            );
            if (!videoResults || videoResults.length === 0)
              return reply("No videos found.");

            const videoID = videoResults[0].videoId;
            const thumbnail = `https://i.ytimg.com/vi/${videoID}/mqdefault.jpg`;

            let responseMessage = `🔎 *YouTube Search Results:*\n`;
            for (let video of videoResults) {
              responseMessage += `
📜 *Title:* ${video.title}
📈 *Views:* ${video.views}
📅 *Uploaded:* ${video.ago}
⏱️ *Duration:* ${video.timestamp}
🎥 *Channel:* ${video.author.name}
🔗 *Link:* ${video.url}\n\n`;
            }
            await conn.sendMessage(
              from,
              {
                caption: responseMessage.trim(),
                image: {
                  url: thumbnail,
                },
              },
              {
                quoted: dev,
              }
            );
          } catch (error) {
            console.error(error);
            reply(
              "An error occurred while fetching the YouTube search results."
            );
          }
          break;
        }
        case "nsfw":
          {
            if (!isGroup) return reply(mess.only.group);
            if (!isGroupAdmins && !isOwner) return reply(mess.only.admin);
            if (args.length < 1) return reply("Enable or disable? Use: ᴏɴ/ᴏꜰꜰ");
            if (args[0] === "on") {
              db.data.chats[from].nsfw = true;
              reply(`${command} has been enabled in this group`);
              let warning = fontx(` 
  *「 ⚠️ 𝐖𝐀𝐑𝐍𝐈𝐍𝐆 ⚠️ 」*\nThe NSFW (Not Safe For Work) feature has been activated in this group. As a result, explicit content may be accessible through the bot. Please proceed with caution and ensure compliance with community guidelines.
`);
              m.reply(warning);
            } else if (args[0] === "off") {
              db.data.chats[from].nsfw = false;
              reply(`${command} has been disabled in this group`);
            }
          }
          break;
        case "waifu": {
          if (isGroup && !isAntiNsfw) return reply(mess.nsfw);
          await loading();
          let query = q ? encodeURIComponent(q) : "demon";
          let apiUrl = `https://api-ix-ix.hf.space/api/waifu?q=${query}`;

          try {
            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.success || !json.images.length) {
              return conn.sendMessage(m.chat, {
                text: fontx(
                  `❌ No waifu images found for *${query}*. Try another category!`
                ),
              });
            }

            let randomImage =
              json.images[Math.floor(Math.random() * json.images.length)];

            await conn.sendMessage(m.chat, {
              image: { url: randomImage },
              caption: fontx(
                `🖼️ *Waifu Image*\n🔍 *Category:* ${json.category}`
              ),
            });
          } catch (error) {
            console.error("Error fetching waifu image:", error);
            conn.sendMessage(m.chat, {
              text: fontx(
                "❌ An error occurred while fetching the waifu image."
              ),
            });
          }
          break;
        }
        case "weapon": {
          if (isGroup && !isAntiNsfw) return reply(mess.nsfw);
          await loading();
          let query = q ? encodeURIComponent(q) : "weapon";
          let apiUrl = `https://api-ix-ix.hf.space/api/waifu?q=${query}`;

          try {
            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.success || !json.images.length) {
              return conn.sendMessage(m.chat, {
                text: fontx(
                  `❌ No waifu images found for *${query}*. Try another category!`
                ),
              });
            }

            let randomImage =
              json.images[Math.floor(Math.random() * json.images.length)];

            await conn.sendMessage(m.chat, {
              image: { url: randomImage },
              caption: fontx(
                `🖼️ *Waifu Image*\n🔍 *Category:* ${json.category}`
              ),
            });
          } catch (error) {
            console.error("Error fetching waifu image:", error);
            conn.sendMessage(m.chat, {
              text: fontx(
                "❌ An error occurred while fetching the waifu image."
              ),
            });
          }
          break;
        }
        case "pussy": {
          if (isGroup && !isAntiNsfw) return reply(mess.nsfw);
          await loading();
          let query = q ? encodeURIComponent(q) : "pussy";
          let apiUrl = `https://api-ix-ix.hf.space/api/waifu?q=${query}`;

          try {
            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.success || !json.images.length) {
              return conn.sendMessage(m.chat, {
                text: fontx(
                  `❌ No waifu images found for *${query}*. Try another category!`
                ),
              });
            }

            let randomImage =
              json.images[Math.floor(Math.random() * json.images.length)];

            await conn.sendMessage(m.chat, {
              image: { url: randomImage },
              caption: fontx(
                `🖼️ *Waifu Image*\n🔍 *Category:* ${json.category}`
              ),
            });
          } catch (error) {
            console.error("Error fetching waifu image:", error);
            conn.sendMessage(m.chat, {
              text: fontx(
                "❌ An error occurred while fetching the waifu image."
              ),
            });
          }
          break;
        }
        case "hentai": {
          if (isGroup && !isAntiNsfw) return reply(mess.nsfw);
          await loading();
          let apiUrl = `https://api-ix-ix.hf.space/api/hentai`;

          try {
            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.success || !json.videoUrl) {
              return conn.sendMessage(m.chat, {
                text: fontx(`❌ No hentai content found. Try again later!`),
              });
            }

            await conn.sendMessage(
              m.chat,
              {
                video: { url: json.videoUrl },
                mimetype: "video/mp4",
                fileName: `${json.title}.mp4`,
                caption: fontx(`🔞 *${json.title}*\n> `),
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error fetching hentai content:", error);
            conn.sendMessage(m.chat, {
              text: fontx(
                "❌ An error occurred while fetching the hentai video."
              ),
            });
          }
          break;
        }
        case "xxxsearch": {
          if (isGroup && !isAntiNsfw) return reply(mess.nsfw);
          if (!q)
            return reply(
              "❌ Please enter a search query.\nExample: `.xxxsearch big ass`"
            );

          await loading();
          let apiUrl = `https://api-ix-ix.hf.space/api/xxxsearch?q=${encodeURIComponent(
            q
          )}`;

          try {
            let response = await fetch(apiUrl);
            if (!response.ok)
              throw new Error(`API responded with ${response.status}`);

            let json = await response.json();
            if (!json.success || !json.videoUrl) {
              return conn.sendMessage(m.chat, {
                text: fontx(`❌ No results found for *${q}*.`),
              });
            }

            await conn.sendMessage(m.chat, {
              video: { url: json.videoUrl },
              caption: fontx(`🔥 *${json.videoTitle}*\n> `),
            });
          } catch (error) {
            console.error("❌ Error fetching XXX video:", error);
            conn.sendMessage(m.chat, {
              text: fontx("❌ Failed to fetch video. Try again later."),
            });
          }
          break;
        }
        case "xxxdl": {
          if (isGroup && !isAntiNsfw) return reply(mess.nsfw);
          if (!q)
            return reply(
              "❌ Please provide a valid *XVideos* link.\nExample: `.xxxdl https://www.xvideos.com/`"
            );

          await loading();
          let apiUrl = `https://api-ix-ix.hf.space/api/xvideos?url=${encodeURIComponent(
            q
          )}`;

          try {
            let response = await fetch(apiUrl);
            if (!response.ok)
              throw new Error(`API responded with ${response.status}`);

            let json = await response.json();
            if (!json.success || !json.videoUrl) {
              return reply("❌ No video found for the provided link.");
            }

            await conn.sendMessage(m.chat, {
              video: { url: json.videoUrl },
              caption: `🔥 *${json.title}*\n> `,
            });
          } catch (error) {
            console.error("❌ Error fetching XXX video:", error);
            reply("❌ Failed to fetch video. Try again later.");
          }
          break;
        }
        case "cecan-china":
        case "cecan-korea":
        case "cecan-thailand":
        case "cecan-vietnam":
        case "cecan-indo":
        case "cecan-japan": {
          await loading();
          let apiUrl = `https://api-ix-ix.hf.space/api/${command}`;

          try {
            await conn.sendMessage(m.chat, {
              image: { url: apiUrl },
              caption: fontx(
                `🌸 *cecan ${command.replace("cecan-", "").toUpperCase()}*\n> `
              ),
            });
          } catch (error) {
            console.error("❌ Error fetching Cecan image:", error);
            reply("❌ Failed to fetch image. Try again later.");
          }
          break;
        }
        case "alive": {
          await loading();

          const quote =
            "i refuse to be weak. i reject death. i am the one who goes forward, who slays, who reigns over shadows... *i am alive.*";
          const imageUrl =
            "https://zuctusbetucsmsywshyk.supabase.co/storage/v1/object/public/imgurl/5yuq4o_1751839051492.jpg";

          await conn.sendMessage(
            m.chat,
            {
              image: { url: imageUrl },
              caption: fontx(
                `${quote}\n\n👤 creator: Tife CyberCrate\n⏳ runtime: ${runtime(
                  process.uptime()
                )}\n> `
              ),
            },
            { quoted: m }
          );

          break;
        }
        case "scan": {
          try {
            await loading();

            const checkForUpdates = async () => {
              let filesToCheck = [
                {
                  url: "https://huggingface.co/spaces/API-XX/TEST/raw/main/case.js",
                  path: "./message/case.js",
                  name: "case.js",
                },
                {
                  url: "https://huggingface.co/spaces/API-XX/TEST/raw/main/links.js",
                  path: "./temp/media/links.js",
                  name: "links.js",
                },
                {
                  url: "https://huggingface.co/spaces/API-XX/TEST/raw/main/group.js",
                  path: "./message/group.js",
                  name: "group.js",
                },
                {
                  url: "https://huggingface.co/spaces/API-XX/TEST/raw/main/message.js",
                  path: "./message/message.js",
                  name: "message.js",
                },
              ];

              let updatesAvailable = false;
              for (let file of filesToCheck) {
                let oldSize = fs.existsSync(file.path)
                  ? fs.statSync(file.path).size
                  : 0;
                let response = await fetch(file.url);
                if (!response.ok) continue;

                let newContent = await response.text();
                let newSize = Buffer.byteLength(newContent, "utf8");
                if (newSize > oldSize) {
                  updatesAvailable = true;
                  break;
                }
              }
              return updatesAvailable;
            };

            const updatesAvailable = await checkForUpdates();
            const updateStatus = updatesAvailable
              ? fontx(`🛠 *Update Available! Use .update*`)
              : fontx(`✅ *No Updates Found*`);

            const animations = [
              fontx(`💻 *System Check Initiated...*\n> `),
              fontx(`🔄 *Loading Modules...*\n> `),
              fontx(`✅ *Module: Messaging [OK]*`),
              fontx(`✅ *Module: Connectivity [OK]*`),
              fontx(`✅ *Module: AI Responses [OK]*`),
              fontx(`🔍 *Scanning for Updates...*`),
              updateStatus,
              fontx(`🔄 *System Optimization: 87% Complete...*`),
              fontx(`✅ *System Optimization: Complete*`),
              fontx(`📡 *Establishing Secure Connection...*`),
              fontx(`✅ *Connection Established Successfully*`),
              fontx(`🚀 *Ready for Commands!*\n> `),
            ];

            const initialMessage = await conn.sendMessage(
              m.chat,
              { text: animations[0] },
              { quoted: m }
            );

            let currentIndex = 1;
            const animationInterval = setInterval(async () => {
              if (currentIndex >= animations.length) {
                clearInterval(animationInterval);
              } else {
                try {
                  await conn.sendMessage(m.chat, {
                    edit: initialMessage.key,
                    text: animations[currentIndex],
                  });
                  currentIndex++;
                } catch (err) {
                  console.error("Error editing alive animation:", err);
                  clearInterval(animationInterval);
                }
              }
            }, 2000);
          } catch (err) {
            console.error("Error in alive case:", err);
            reply(fontx("❌ An error occurred while processing your request."));
          }
          break;
        }
        case "aza":
        case "pay":
        case "acc": {
          reply(
            `💳 *Banking Details* 💳\n\n🏦 *Bank Name:* *${bank}*\n🔢 *Acc Number:* *${accnumber}*\n👤 *Acc Name:* *${bankname}*`
          );
          break;
        }
        case "tiktok":
        case "tt": {
          if (!q) return reply("❌ Please provide a TikTok link.");

          await loading();

          let apiUrl = `https://api-ix-ix.hf.space/api/tkdl2?url=${encodeURIComponent(
            q
          )}`;

          try {
            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.success || !json.download_link) {
              return reply(
                "❌ Failed to download the TikTok video. Please check the link and try again."
              );
            }

            await conn.sendMessage(
              m.chat,
              {
                video: { url: json.download_link },
                caption: fontx(
                  `🎵 *TikTok Video Downloaded!*\n\n` +
                    `👤 *Creator:* ${
                      json.username || json.creator || "Unknown"
                    }\n` +
                    `📝 *Caption:* ${json.caption || "No caption"}\n\n`
                ),
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error in TikTok download case:", error);
            reply("❌ An error occurred while processing your request.");
          }
          break;
        }
        case "tiktokaud":
        case "ttaud": {
          if (!q) return reply("❌ Please provide a TikTok link.");

          await loading();
          let apiUrl = `https://apis.davidcyriltech.my.id/download/tiktok?url=${encodeURIComponent(
            q
          )}`;

          try {
            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.success || !json.result.music) {
              return reply(
                "❌ Failed to download the TikTok audio. Please check the link and try again."
              );
            }

            await conn.sendMessage(
              m.chat,
              {
                audio: { url: json.result.music },
                mimetype: "audio/mpeg",
                fileName: `tiktok_audio.mp3`,
                caption: fontx(
                  `🎶 *TikTok Audio Downloaded!*\n\n👤 *Creator:* ${json.result.author.nickname}\n❤️ *Likes:* ${json.result.statistics.likeCount}\n💬 *Comments:* ${json.result.statistics.commentCount}\n🔄 *Shares:* ${json.result.statistics.shareCount}\n\n📝 *Description:* ${json.result.desc}`
                ),
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error in TikTok audio download case:", error);
            reply("❌ An error occurred while processing your request.");
          }
          break;
        }
        case "all-in-one":
        case "aio":
        case "instagram":
        case "facebook":
        case "fb":
        case "tiktok2":
        case "twitter": {
          if (!q) return reply("❌ Please provide a valid video link.");

          await loading();
          let apiUrl = `https://bk9.fun/download/alldownload?url=${encodeURIComponent(
            q
          )}`;

          try {
            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.status || !json.BK9.high) {
              return reply(
                "❌ Failed to download the video. Please check the link and try again."
              );
            }

            await conn.sendMessage(
              m.chat,
              {
                video: { url: json.BK9.high },
                caption: fontx(
                  `🎥 *Video Downloaded!*\n\n📝 *Title:* ${json.BK9.title}\n> `
                ),
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error in all-in-one video download case:", error);
            reply("❌ An error occurred while processing your request.");
          }
          break;
        }
        case "sound1":
        case "sound2":
        case "sound3":
        case "sound4":
        case "sound5":
        case "sound6":
        case "sound7":
        case "sound8":
        case "sound9":
        case "sound10":
        case "sound11":
        case "sound12":
        case "sound13":
        case "sound14":
        case "sound15":
        case "sound16":
        case "sound17":
        case "sound18":
        case "sound19":
        case "sound20":
        case "sound21":
        case "sound22":
        case "sound23":
        case "sound24":
        case "sound25":
        case "sound26":
        case "sound27":
        case "sound28":
        case "sound29":
        case "sound30":
        case "sound31":
        case "sound32":
        case "sound33":
        case "sound34":
        case "sound35":
        case "sound36":
        case "sound37":
        case "sound38":
        case "sound39":
        case "sound40":
        case "sound41":
        case "sound42":
        case "sound43":
        case "sound44":
        case "sound45":
        case "sound46":
        case "sound47":
        case "sound48":
        case "sound49":
        case "sound50":
        case "sound51":
        case "sound52":
        case "sound53":
        case "sound54":
        case "sound55":
        case "sound56":
        case "sound57":
        case "sound58":
        case "sound59":
        case "sound60":
        case "sound61":
        case "sound62":
        case "sound63":
        case "sound64":
        case "sound65":
        case "sound66":
        case "sound67":
        case "sound68":
        case "sound69":
        case "sound70":
        case "sound71":
        case "sound72":
        case "sound73":
        case "sound74":
        case "sound75":
        case "sound76":
        case "sound77":
        case "sound78":
        case "sound79":
        case "sound80":
        case "sound81":
        case "sound82":
        case "sound83":
        case "sound84":
        case "sound85":
        case "sound86":
        case "sound87":
        case "sound88":
        case "sound89":
        case "sound90":
        case "sound91":
        case "sound92":
        case "sound93":
        case "sound94":
        case "sound95": {
          try {
            await loading();

            const url = `https://github.com/anonphoenix007/phonk-api/raw/main/all/${command}.mp3`;
            const reslt = await getBuffer(url);
            await conn.sendMessage(
              m.chat,
              {
                audio: reslt,
                mimetype: "audio/mp4",
                ptt: true,
              },
              {
                quoted: m,
              }
            );
            await conn.sendMessage(
              m.chat,
              {
                text: fontx(`> `),
              },
              {
                quoted: m,
              }
            );
          } catch (error) {
            console.error(`Error in ${command} case:`, error);
            reply(
              "An error occurred while processing your request. Please try again later."
            );
          }
          break;
        }
        case "apk":
        case "app": {
          if (!q)
            return reply(
              "❌ Please provide the name of an app to download.\n\nExample: *.apk Facebook*"
            );

          await loading();
          let apiUrl = `https://bk9.fun/download/apk?id=${encodeURIComponent(
            q
          )}`;

          try {
            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.status || !json.BK9.dllink) {
              return reply(
                "❌ APK not found. Please check the app name and try again."
              );
            }
            await conn.sendMessage(
              m.chat,
              {
                image: { url: json.BK9.icon },
                caption: fontx(
                  `📲 *APK Download*\n\n📝 *Name:* ${json.BK9.name}\n📦 *Package:* ${json.BK9.package}\n📅 *Last Updated:* ${json.BK9.lastup}\n\n📥 *Downloading file...*`
                ),
              },
              { quoted: m }
            );
            await conn.sendMessage(m.chat, {
              document: { url: json.BK9.dllink },
              mimetype: "application/vnd.android.package-archive",
              fileName: `${json.BK9.name}.apk`,
              caption: fontx(
                `✅ *${json.BK9.name} APK downloaded successfully!*`
              ),
            });
          } catch (error) {
            console.error("Error in APK download case:", error);
            reply("❌ An error occurred while processing your request.");
          }
          break;
        }
        case "apkfab": {
          if (!q) {
            return reply(
              `*\`Please provide an APK URL.\`*\n*Example: ${
                prefix + command
              } apkfab-link*`
            );
          }

          try {
            await loading();
            const apiUrl = `https://bk9.fun/download/apkfab?url=${encodeURIComponent(
              q
            )}`;
            const response = await fetch(apiUrl);
            const res = await response.json();
            if (!res.status || !res.BK9) {
              return reply(
                "Failed to fetch APK details. Please try again later."
              );
            }
            const { title, link, size } = res.BK9;
            await conn.sendMessage(
              m.chat,
              {
                text: fontx(
                  `🖥️ *APK Details:*\n\n📌 *Title: ${title}*\n📦 *Size:* ${
                    size || "Unknown"
                  }\nMay take few minutes🔃\n> `
                ),
              },
              {
                quoted: m,
              }
            );
            await conn.sendMessage(
              m.chat,
              {
                document: {
                  url: link,
                },
                mimetype: "application/octet-stream",
                fileName: `${title}.apk`,
                caption: `📥 *APK Download: ${title}*`,
              },
              {
                quoted: m,
              }
            );
          } catch (error) {
            console.error("Error in APKFab case:", error);
            reply(
              "An error occurred while processing your request. Please try again later."
            );
          }
          break;
        }
        case "gitclone":
        case "githubdl": {
          if (!q || !q.includes("github.com")) {
            return reply(
              "❌ Please provide a valid GitHub repository link.\n\nExample: *!gitclone https://github.com/user/repository*"
            );
          }

          await loading();

          let repoUrl = q.trim().replace(/\/$/, "");
          let zipUrl = `${repoUrl}/archive/refs/heads/master.zip`;

          try {
            let response = await fetch(zipUrl);
            if (!response.ok) {
              return reply(
                `❌ Failed to download repository.\n\n🔗 *Repo:* ${repoUrl}\n⚠️ *Error:* ${response.statusText}`
              );
            }

            let zipBuffer = await response.arrayBuffer();

            await conn.sendMessage(m.chat, {
              document: Buffer.from(zipBuffer),
              mimetype: "application/zip",
              fileName: `${repoUrl.split("/").pop()}-master.zip`,
              caption:
                fontx(`✅ *GitHub Repository Cloned!*\n\n🔗 *Repository:* `) +
                repoUrl +
                fontx(`\n📦 *Download:* Attached ZIP file.\n> `),
            });
          } catch (error) {
            console.error("Error in gitclone case:", error);
            reply("❌ An error occurred while processing your request.");
          }
          break;
        }
        case "mediafire": {
          if (!q || !q.includes("mediafire.com")) {
            return reply(
              "❌ Please provide a valid MediaFire link.\n\nExample: *!mediafire https://www.mediafire.com/file/xyz123/file.zip/file*"
            );
          }

          await loading();

          let apiUrl = `https://apis.davidcyriltech.my.id/mediafire?url=${encodeURIComponent(
            q
          )}`;

          try {
            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.downloadLink) {
              return reply("❌ Failed to retrieve the file from MediaFire.");
            }

            await conn.sendMessage(m.chat, {
              document: { url: json.downloadLink },
              mimetype: `application/${json.mimeType || "octet-stream"}`,
              fileName: json.fileName,
              caption: fontx(
                `✅ *MediaFire Download Complete!*\n\n📂 *File:* ${json.fileName}\n📦 *Size:* ${json.size}\n> `
              ),
            });
          } catch (error) {
            console.error("Error in mediafire case:", error);
            reply("❌ An error occurred while processing your request.");
          }
          break;
        }
        case "google-drive":
        case "gdrive": {
          if (!q)
            return reply(
              "❌ Please provide a Google Drive link.\nExample: *!gdrive <link>*"
            );

          await loading();

          let apiUrl = `https://apis.davidcyriltech.my.id/gdrive?url=${encodeURIComponent(
            q
          )}`;

          try {
            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.success || !json.download_link) {
              return reply(
                "❌ Failed to retrieve the Google Drive file. Please check the link and try again."
              );
            }

            await conn.sendMessage(
              m.chat,
              {
                document: { url: json.download_link },
                mimetype: "application/octet-stream",
                fileName: json.name,
                caption: fontx(
                  `📁 *Google Drive File Downloaded!*\n\n📌 *File Name:* ${json.name}\n🔗 *Download Link:* ${json.download_link}\n> `
                ),
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error in Google Drive case:", error);
            reply(
              "❌ An error occurred while processing your request. Please try again later."
            );
          }
          break;
        }
        case "s":
        case "sticker":
        case "take":
          {
            if (!m.quoted) {
              return reeply(
                `*Reply to an image or video with the caption ${
                  prefix + command
                }*\n> Video Duration: 1-9 Seconds`
              );
            }
            let mime = (m.quoted.msg || m.quoted).mimetype || "";
            try {
              if (/image/.test(mime)) {
                let media = await m.quoted.download();
                await conn.sendImageAsSticker(m.chat, media, m, {
                  packname: fontx(caption) || "Sticker Pack",
                  author: fontx("marvel md") || "Bot",
                });
              } else if (/video/.test(mime)) {
                if ((m.quoted.msg || m.quoted).seconds > 9) {
                  return reply(
                    `*Video duration must be 1-9 seconds!*\nReply to a shorter video with ${
                      prefix + command
                    }`
                  );
                }
                let media = await m.quoted.download();
                await conn.sendVideoAsSticker(m.chat, media, m, {
                  packname: fontx(caption) || "Sticker Pack",
                  author: fontx("marvel md") || "Bot",
                });
              } else {
                reply(
                  `*Unsupported media type!*\nReply to an image or video with the caption ${
                    prefix + command
                  }\n> Video Duration: 1-9 Seconds`
                );
              }
            } catch (err) {
              console.error("Error creating sticker:", err);
              reply(`Failed to create sticker. Please try again.`);
            }
          }
          break;
        case "vv": {
          if (!m.quoted) {
            return reply(
              `*Reply to an image, video, or audio with the caption ${
                prefix + command
              }*`
            );
          }

          let mime = (m.quoted.msg || m.quoted).mimetype || "";

          try {
            if (/image/.test(mime)) {
              let media = await m.quoted.download();
              await conn.sendMessage(
                m.chat,
                {
                  image: media,
                  caption: fontx("📸 *Here is your image!*"),
                },
                { quoted: m }
              );
            } else if (/video/.test(mime)) {
              let media = await m.quoted.download();
              await conn.sendMessage(
                m.chat,
                {
                  video: media,
                  caption: fontx("🎥 *Here is your video!*"),
                },
                { quoted: m }
              );
            } else if (/audio/.test(mime)) {
              let media = await m.quoted.download();
              await conn.sendMessage(
                m.chat,
                {
                  audio: media,
                  mimetype: "audio/mpeg",
                  ptt: false, // Set to true if you want to send as a voice note
                },
                { quoted: m }
              );
            } else {
              reply(
                `❌ Unsupported media type!\nReply to an image, video, or audio with *${
                  prefix + command
                }*`
              );
            }
          } catch (err) {
            console.error("Error processing media:", err);
            reply(`❌ Failed to process media. Please try again.`);
          }

          break;
        }
        case "vv2": {
          if (!isOwner) return;
          if (!m.quoted) {
            return reply(
              `*Reply to an image, video, or audio with the caption ${
                prefix + command
              }*`
            );
          }

          let mime = (m.quoted.msg || m.quoted).mimetype || "";
          let userJid = m.sender;
          try {
            if (/image/.test(mime)) {
              let media = await m.quoted.download();
              await conn.sendMessage(userJid, {
                image: media,
                caption: fontx("📸 *Here is your image sent privately!*"),
              });
            } else if (/video/.test(mime)) {
              let media = await m.quoted.download();
              await conn.sendMessage(userJid, {
                video: media,
                caption: fontx("🎥 *Here is your video sent privately!*"),
              });
            } else if (/audio/.test(mime)) {
              let media = await m.quoted.download();
              await conn.sendMessage(userJid, {
                audio: media,
                mimetype: "audio/mpeg",
                ptt: false,
              });
            } else {
              reply(
                `❌ Unsupported media type!\nReply to an image, video, or audio with *${
                  prefix + command
                }*`
              );
            }
            await loading();
          } catch (err) {
            console.error("Error forwarding media:", err);
            reply(`❌ Failed to send media to private chat. Please try again.`);
          }

          break;
        }
        case "getjid":
          {
            reply(from);
          }
          break;
        case "fancy": {
          if (!q)
            return reply(
              "❌ Please provide a text to convert.\n\nExample: *!fancy marvel md*"
            );

          await loading();
          let apiUrl = `https://api-ix-ix.hf.space/api/font?text=${encodeURIComponent(
            q
          )}`;

          try {
            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.success || !json.fancy_texts.length) {
              return reply("❌ Failed to fetch fancy fonts. Please try again.");
            }

            let fancyTextList = json.fancy_texts
              .slice(0, 15)
              .map((text, i) => `${i + 1}. *${text}*`)
              .join("\n");

            conn.sendMessage(
              m.chat,
              {
                text: fontx(
                  `🎨 *Fancy Text Generator*\n\n📝 *Original:* ${json.original_text}\n\n${fancyTextList}\n> `
                ),
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error fetching fancy fonts:", error);
            reply(
              "❌ An error occurred while generating fancy text. Please try again later."
            );
          }
          break;
        }
        case "join": {
          if (!isOwner) return reply(mess.only.owner);
          if (!text)
            return reply(
              `\`No Group link detected\`\n*Example:  ${prefix + command} link*`
            );
          if (!isUrl(text) || !text.includes("chat.whatsapp.com"))
            return reply("`Invalid Link!`");

          const result = text.split("https://chat.whatsapp.com/")[1];
          await loading();
          try {
            await conn.groupAcceptInvite(result);
          } catch (error) {
            if (error.response) {
              switch (error.response.status) {
                case 400:
                  return reply("Group Not Found❗");
                case 401:
                  return reply("Bot Kicked From The Group❗");
                case 409:
                  return reply("Bot Has Already Joined the Group❗");
                case 410:
                  return reply("Group URL Has Been Reset❗");
                case 500:
                  return reply("Group Is Full❗");
                default:
                  return reply("An unknown error occurred.");
              }
            }
            reply("An unexpected error occurred.");
          }
          break;
        }
        case "bible": {
          if (!q)
            return reply(
              "❌ Please provide a Bible verse reference.\n\nExample: *!bible John 3:16*"
            );

          await loading();
          let apiUrl = `https://apis.davidcyriltech.my.id/bible?reference=${encodeURIComponent(
            q
          )}`;

          try {
            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.success || !json.text) {
              return reply(
                "❌ Verse not found. Please check the reference and try again."
              );
            }

            let bibleMessage = `📖 *Bible Verse*\n\n📜 *Reference:* ${
              json.reference
            }\n📖 *Translation:* ${json.translation}\n🔢 *Verses Count:* ${
              json.verses_count
            }\n\n🕊️ *${json.text.trim()}*\n> `;

            conn.sendMessage(
              m.chat,
              { text: fontx(bibleMessage) },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error fetching Bible verse:", error);
            reply(
              "❌ An error occurred while retrieving the Bible verse. Please try again later."
            );
          }
          break;
        }
        case "lyrics": {
          if (!q)
            return reply(
              "❌ Please provide a song name.\n\nExample: *!lyrics Not Like Us*"
            );

          await loading();
          let apiUrl = `https://api-ix-ix.hf.space/api/lyrics?q=${encodeURIComponent(
            q
          )}`;

          try {
            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.success || !json.lyrics) {
              return reply(
                "❌ Lyrics not found. Please check the song name and try again."
              );
            }

            let lyricsMessage = `🎵 *Song Lyrics*\n\n🎶 *Title:* ${json.song}\n\n📜 *Lyrics:*\n\n${json.lyrics}\n> `;

            conn.sendMessage(
              m.chat,
              { text: fontx(lyricsMessage) },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error fetching lyrics:", error);
            reply(
              "❌ An error occurred while retrieving the lyrics. Please try again later."
            );
          }
          break;
        }
        case "spotify": {
          if (!q)
            return reply(
              "❌ Please provide a song name.\n\nExample: *!spotify Faded*"
            );

          await loading();
          let apiUrl = `https://apis.davidcyriltech.my.id/search/spotify?text=${encodeURIComponent(
            q
          )}`;

          try {
            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.success || json.result.length === 0) {
              return reply(
                "❌ No results found. Please check the song name and try again."
              );
            }

            let spotifyResults = fontx("🎵 *Spotify Search Results*\n\n");

            json.result.slice(0, 5).forEach((song, index) => {
              spotifyResults +=
                fontx(
                  `🎶 *${song.trackName}*\n👤 *Artist:* ${song.artistName}\n💿 *Album:* ${song.albumName}\n⏱️ *Duration:* ${song.duration}\n🔗 *Link:* `
                ) +
                song.externalUrl +
                `\n\n`;
            });

            conn.sendMessage(m.chat, { text: spotifyResults }, { quoted: m });
          } catch (error) {
            console.error("Error fetching Spotify search results:", error);
            reply(
              "❌ An error occurred while retrieving the Spotify results. Please try again later."
            );
          }
          break;
        }
        case "pinterest": {
          if (!q)
            return reply(
              `\`No search query detected\`.\n*Example: ${
                prefix + command
              } beautiful landscapes*`
            );
          await loading();
          try {
            const apiUrl = `https://www.bhandarimilan.info.np/pinterest?query=${encodeURIComponent(
              q
            )}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (!data || data.data.length === 0) {
              return reply(
                "No results found. Please try with a different query."
              );
            }
            const images = data.data.slice(0, 5);
            for (let url of images) {
              await conn.sendMessage(
                m.chat,
                {
                  image: {
                    url,
                  },
                  caption: fontx(`🔗 *Pinterest Result*\n${q}\n> `),
                },
                {
                  quoted: m,
                }
              );
            }
          } catch (error) {
            console.error("Error in Pinterest case:", error);
            reply(
              "An error occurred while fetching Pinterest results. Please try again later."
            );
          }
          break;
        }
        case "element": {
          if (!q)
            return reply(
              `\`provide an element name/symbol\`.\nExample: ${
                prefix + command
              } bohrium`
            );
          await loading();
          try {
            const apiUrl = `https://api.popcat.xyz/periodic-table?element=${encodeURIComponent(
              q
            )}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (!data || !data.name) {
              return reply(
                "Invalid element name or symbol. Please check your input."
              );
            }
            const {
              name,
              symbol,
              atomic_number,
              atomic_mass,
              period,
              phase,
              discovered_by,
              image,
              summary,
            } = data;
            await conn.sendMessage(
              m.chat,
              {
                image: {
                  url: image,
                },
                caption: fontx(
                  `🧪 *Periodic Table Element*\n${readmore}\n🔹 *Name*: ${name}\n🔹 *Symbol*: ${symbol}\n🔹 *Atomic Number*: ${atomic_number}\n🔹 *Atomic Mass*: ${atomic_mass}\n🔹 *Period*: ${period}\n🔹 *Phase*: ${phase}\n🔹 *Discovered By*: ${discovered_by}\n\n📘 *Summary*: ${summary}\n> `
                ),
              },
              {
                quoted: m,
              }
            );
          } catch (error) {
            console.error("Error in elements case:", error);
            reply(
              "An error occurred while fetching element details. Please try again later."
            );
          }
          break;
        }
        case "randomcolor": {
          await loading();
          try {
            const apiUrl = `https://api.popcat.xyz/randomcolor`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (!data || !data.hex || !data.name) {
              return reply(
                "Failed to fetch a random color. Please try again later."
              );
            }
            const { hex, name, image } = data;
            await conn.sendMessage(
              m.chat,
              {
                image: {
                  url: image,
                },
                caption: fontx(
                  `🎨 *Random Color*\n\n🔹 *Name*: ${name}\n🔹 *HEX*: #${hex}\n\n> `
                ),
              },
              {
                quoted: m,
              }
            );
          } catch (error) {
            console.error("Error in randomcolor case:", error);
            reply(
              "An error occurred while fetching a random color. Please try again later."
            );
          }
          break;
        }
        case "npmstalk":
        case "npmcheck": {
          if (!q)
            return reply(
              "❌ Please provide an NPM package name.\n\nExample: *!npmstalk express*"
            );

          await loading();
          let apiUrl = `https://api-ix-ix.hf.space/api/npmcheck?package=${encodeURIComponent(
            q
          )}`;

          try {
            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.success) {
              return reply(
                "❌ Package not found. Please check the package name and try again."
              );
            }

            let npmInfo =
              fontx(`📦 *NPM Package Info*\n\n`) +
              fontx(`📛 *Package:* ${json.package}\n`) +
              fontx(`🆕 *Version:* ${json.version}\n`) +
              fontx(`📅 *Published:* ${json.publishedDate}\n`) +
              fontx(`📊 *Version Count:* ${json.versionNumber}\n`) +
              fontx(`🔗 *Dependents:* ${json.dependentsCount}\n`) +
              fontx(`📂 *Dependencies:* ${json.dependenciesCount}\n> `);

            conn.sendMessage(
              m.chat,
              {
                image: { url: json.codetypeimg },
                caption: npmInfo,
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error fetching NPM package info:", error);
            reply(
              "❌ An error occurred while retrieving the package details. Please try again later."
            );
          }
          break;
        }
        case "wachannel": {
          if (!q)
            return reply(
              "❌ Please provide a WhatsApp Channel link.\n\nExample: .wachannel <link>"
            );

          await loading();
          let apiUrl = `https://api-ix-ix.hf.space/api/wachannel?url=${encodeURIComponent(
            q
          )}`;

          try {
            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.success) {
              return reply(
                "❌ Channel not found. Please check the link and try again."
              );
            }

            let channelInfo =
              fontx(`📢 *WhatsApp Channel Info*\n\n`) +
              fontx(`📛 *Name:* ${json.data.name}\n`) +
              fontx(`👥 *Followers:* ${json.data.followers}\n`) +
              fontx(`📝 *Description:* ${json.data.description}\n> `);

            conn.sendMessage(
              m.chat,
              {
                image: { url: json.data.image },
                caption: channelInfo,
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error fetching WhatsApp Channel info:", error);
            reply(
              "❌ An error occurred while retrieving the channel details. Please try again later."
            );
          }
          break;
        }
        case "country": {
          if (!q)
            return reply(
              "❌ Please provide a country name.\n\nExample: *!country Nigeria*"
            );

          await loading();
          let apiUrl = `https://api-ix-ix.hf.space/api/country?q=${encodeURIComponent(
            q
          )}`;

          try {
            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.success) {
              return reply(
                "❌ Country not found. Please check the spelling and try again."
              );
            }

            let countryInfo =
              fontx(`🌍 *Country Information*\n\n`) +
              fontx(`📛 *Name:* ${json.data.name}\n`) +
              fontx(`🏙️ *Capital:* ${json.data.capital}\n`) +
              fontx(`📞 *Phone Code:* ${json.data.phoneCode}\n`) +
              fontx(`💰 *Currency:* ${json.data.currency}\n`) +
              fontx(`🚗 *Driving Side:* ${json.data.drivingSide}\n`) +
              fontx(`🌐 *Internet TLD:* ${json.data.internetTLD}\n`) +
              fontx(
                `📍 *Location:* [Google Maps](${json.data.googleMapsLink})\n`
              ) +
              fontx(
                `🗺️ *Continent:* ${json.data.continent.emoji} ${json.data.continent.name}`
              );

            conn.sendMessage(
              m.chat,
              {
                image: { url: json.data.flag },
                caption: countryInfo,
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error fetching country info:", error);
            reply(
              "❌ An error occurred while retrieving country details. Please try again later."
            );
          }
          break;
        }
        case "listcase":
        case "allcase":
          {
            reply(listCase());
          }
          break;
        case "bing": {
          if (!q) return reply("Please provide a search query.");
          try {
            await loading();
            const apiUrl = `https://api.siputzx.my.id/api/s/bimg?query=${encodeURIComponent(
              q
            )}`;
            const response = await fetch(apiUrl);
            const res = await response.json();
            if (!res.status || !res.data || res.data.length === 0) {
              return reply(
                "No images found for your query. Please try again later."
              );
            }
            const imageUrl = res.data[0];
            await conn.sendMessage(from, {
              image: {
                url: imageUrl,
              },
              caption: fontx(`🔎 *bing Image Search Results for:* "${q}"\n> `),
            });
          } catch (error) {
            console.error("Error in bing case:", error);
            reply(
              "An error occurred while fetching the images. Please try again later."
            );
          }
          break;
        }
        case "brave": {
          if (!q)
            return reply(
              "❌ Please enter a search query.\n\nExample: .brave github"
            );
          await loading();

          let apiUrl = `https://api.siputzx.my.id/api/s/brave?query=${encodeURIComponent(
            q
          )}`;

          try {
            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.status || !json.data.results.length) {
              return reply("❌ No search results found. Try another query.");
            }

            let searchResults = json.data.results.slice(0, 5); // Show top 5 results
            let totalResults = json.data.metadata.totalResults;
            let timestamp = new Date().toLocaleString();

            let message = `🔎 *Brave Search Results*\n📅 *Checked On:* ${timestamp}\n📊 *Total Results:* ${totalResults}\n\n`;

            searchResults.forEach((result, index) => {
              message += `🔹 *${index + 1}. ${fontx(result.title)}*\n`;
              message += `📖 ${fontx(result.description)}\n`;
              message += `🌐 ${result.siteName}\n`;
              if (result.date) message += `📅 ${result.date}\n`;
              message += "\n";
            });

            conn.sendMessage(
              m.chat,
              {
                text: message,
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error fetching Brave search results:", error);
            reply("❌ Error while fetching search results. Try again later.");
          }
          break;
        }
        case "checkip": {
          if (!q)
            return reply(
              `\`Please provide an IP address.\`\n*Example: .checkip 8.8.8.8*`
            );
          await loading();
          try {
            // API Endpoint
            const apiUrl = `https://ipinfo.io/${encodeURIComponent(
              q
            )}/json?token=022a73cf539237`;
            const response = await fetchJson(apiUrl);

            if (!response || response.error) {
              return reply(
                "Failed to fetch IP information. Please check the IP address and try again."
              );
            }
            const {
              ip,
              hostname,
              city,
              region,
              country,
              loc,
              postal,
              timezone,
              asn,
              company,
              privacy,
              abuse,
              domains,
            } = response;
            const replyMessage =
              `*IP Information*\n\n` +
              `❖ *IP:* ${ip || "N/A"}\n` +
              `❖ *Hostname:* ${hostname || "N/A"}\n` +
              `❖ *City:* ${city || "N/A"}\n` +
              `❖ *Region:* ${region || "N/A"}\n` +
              `❖ *Country:* ${country || "N/A"}\n` +
              `❖ *Location (Lat, Long):* ${loc || "N/A"}\n` +
              `❖ *Postal Code:* ${postal || "N/A"}\n` +
              `❖ *Timezone:* ${timezone || "N/A"}\n` +
              `❖ *ASN:* ${asn?.asn || "N/A"}\n` +
              `❖ *ASN Name:* ${asn?.name || "N/A"}\n` +
              `❖ *ASN Domain:* ${asn?.domain || "N/A"}\n` +
              `❖ *Company Name:* ${company?.name || "N/A"}\n` +
              `❖ *Company Domain:* ${company?.domain || "N/A"}\n` +
              `❖ *VPN:* ${privacy?.vpn ? "Yes" : "No"}\n` +
              `❖ *Proxy:* ${privacy?.proxy ? "Yes" : "No"}\n` +
              `❖ *TOR:* ${privacy?.tor ? "Yes" : "No"}\n` +
              `❖ *Relay:* ${privacy?.relay ? "Yes" : "No"}\n` +
              `❖ *Abuse Contact Name:* ${abuse?.name || "N/A"}\n` +
              `❖ *Abuse Contact Email:* ${abuse?.email || "N/A"}\n` +
              `❖ *Abuse Contact Phone:* ${abuse?.phone || "N/A"}\n` +
              `❖ *Domains Linked:* ${domains?.total || "N/A"}\n` +
              `❖ *Example Domains:* ${
                (domains?.domains || []).slice(0, 5).join(", ") || "N/A"
              }\n`;
            reply(replyMessage);
          } catch (error) {
            console.error("Error in checkip case:", error);
            reply(
              "An error occurred while fetching the IP information. Please try again later."
            );
          }
          break;
        }
        case "translate": {
          if (!args[0])
            return reply(
              `\`Please provide a target language.\`\n*Example: ${
                prefix + command
              } en hello*\n*Or reply to a message with: ${prefix + command} en*`
            );

          const targetLang = args[0];
          const textToTranslate = m.quoted?.text || args.slice(1).join(" "); // Check if replying to a message or taking input
          if (!textToTranslate)
            return reply(
              `\`Please provide text to translate or reply to a message.\``
            );

          try {
            await loading();

            // API call
            const apiUrl = `https://api.popcat.xyz/translate?to=${encodeURIComponent(
              targetLang
            )}&text=${encodeURIComponent(textToTranslate)}`;
            const response = await fetch(apiUrl);
            const json = await response.json();

            // Validate API response
            if (!json.translated) {
              return reply(
                "Failed to translate the text. Please try again later."
              );
            }

            // Send the translated text
            reply(
              `*🌐 Translated to ${targetLang.toUpperCase()}:*\n\n${
                json.translated
              }`
            );
          } catch (error) {
            console.error("Error in translate case:", error);
            reply(
              "An error occurred while processing your request. Please try again later."
            );
          }
          break;
        }
        case "encode": {
          if (!q)
            return reply(
              `❌ Please enter a text to encode.\n\nExample: *${
                prefix + command
              } Hello-world*`
            );

          await loading();

          try {
            let apiUrl = `https://api-ix-ix.hf.space/api/encode?text=${encodeURIComponent(
              q
            )}`;
            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.status || !json.success || !json.encoded) {
              return reply("❌ Failed to encode text. Try again later.");
            }

            let encodedText = json.encoded.binaryEncoded;

            reply(
              fontx(
                `🔐 *Encoded Result*\n\n📜 *Input:* ${q}\n🔢 *Binary:* ${encodedText}`
              )
            );
          } catch (error) {
            console.error("Error in encode case:", error);
            reply("❌ An error occurred while encoding. Please try again.");
          }
          break;
        }
        case "decode": {
          if (!q)
            return reply(
              `❌ Please enter a binary code to decode.\n\nExample: *${
                prefix + command
              } 01001000 01101001*`
            );

          await loading();

          try {
            let apiUrl = `https://api-ix-ix.hf.space/api/decode?binary=${encodeURIComponent(
              q
            )}`;
            let response = await fetch(apiUrl);
            let json = await response.json();

            if (!json.status || !json.success || !json.decoded) {
              return reply(
                "❌ Failed to decode. Ensure the binary is correct and try again."
              );
            }

            let decodedText = json.decoded;

            reply(
              fontx(
                `🔓 *Decoded Result*\n\n🔢 *Binary:* ${q}\n📜 *Text:* ${decodedText}`
              )
            );
          } catch (error) {
            console.error("Error in decode case:", error);
            reply("❌ An error occurred while decoding. Please try again.");
          }
          break;
        }
        case "broadcast": {
          if (!isOwner) return reply(mess.only.owner);

          if (!q)
            return reply(
              `❌ No message detected.\n\n*Example:* ${
                prefix + command
              } Hello, this is a broadcast message!`
            );

          await loading();

          try {
            const groups = Object.values(
              await conn.groupFetchAllParticipating()
            );
            if (!groups.length)
              return reply("❌ You are not part of any groups.");

            let successCount = 0;
            let failCount = 0;
            let totalGroups = groups.length;
            let broadcastPreview = fontx(
              `📢 *Broadcast Preview*\n\n📜 *Message:* ${q}\n👥 *Total Groups:* ${totalGroups}\n\n🔄 *Broadcasting...*`
            );

            // Send preview message
            reply(broadcastPreview);

            for (const group of groups) {
              try {
                await conn.sendMessage(group.id, {
                  text: fontx(
                    `📣 *BROADCAST MESSAGE* 📣\n\n📝 *Message:* ${q}\n\n> `
                  ),
                });
                successCount++;
                await sleep(1000); // Prevent rate limits
              } catch (error) {
                console.error(
                  `❌ Failed to send message to group ${group.id}:`,
                  error
                );
                failCount++;
              }
            }

            let broadcastSummary = fontx(
              `✅ *Broadcast Completed!*\n\n📨 *Total Sent:* ${successCount}/${totalGroups}\n❌ *Failed:* ${failCount}`
            );

            reply(broadcastSummary);
          } catch (error) {
            console.error("❌ Error in broadcast case:", error);
            reply(
              "❌ An error occurred while broadcasting. Please try again later."
            );
          }
          break;
        }
        case "$": {
          if (!isOwner) return reply(mess.only.owner);
          await loading();
          exec(q, async (err, stdout) => {
            if (err) return reply(`Error:~ ${err}`);
            if (stdout) {
              await reply(`*>_ Console*\n\n${stdout}`);
            }
          });
          break;
        }
        case "exchange": {
          if (!args[0] || !args[1] || !args[2])
            return reply(
              "`Invalid Input or Format`\n*Example: exchange 100 USD EUR*"
            );
          await loadingx();
          const amount = parseFloat(args[0]);
          const fromCurrency = args[1].toUpperCase();
          const toCurrency = args[2].toUpperCase();

          if (isNaN(amount)) return reply("*Please enter a valid amount*.");

          try {
            const apiKey = "43f31fb84c391ced11b216a4";
            const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`;

            const response = await axios.get(url);
            const exchangeRate = response.data.conversion_rate;
            const convertedAmount = (amount * exchangeRate).toFixed(2);
            reply(
              `💱 *CURRENCY EXCHANGE* 💱\n\n*Amount:* *\`${amount} ${fromCurrency}\`*\n*Converted Amount:* *\`${convertedAmount} ${toCurrency}\`*\n*Exchange Rate:* *\`1 ${fromCurrency} = ${exchangeRate} ${toCurrency}\`*`
            );
          } catch (error) {
            console.error(error);
            reply(
              "Error: Unable to retrieve exchange rates. Please try again later."
            );
          }
          break;
        }
        case "listgroup": {
          if (!isOwner) return reply(mess.only.owner);

          await loading();

          try {
            const groups = Object.values(
              await conn.groupFetchAllParticipating()
            );
            if (!groups.length)
              return reply("❌ The bot is not in any groups.");

            let groupList = groups
              .map(
                (group, index) =>
                  `🔹 *${index + 1}.* ${group.subject} (${group.id})`
              )
              .join("\n");

            conn.sendMessage(
              m.chat,
              {
                text: fontx(
                  `📋 *Groups List*\n\n${groupList}\n\n👥 *Total Groups:* ${groups.length}`
                ),
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("❌ Error fetching group list:", error);
            reply(
              "❌ An error occurred while retrieving the group list. Please try again later."
            );
          }
          break;
        }
        case "members": {
          if (!isGroup) return reply(mess.only.group);

          await loading();

          try {
            let groupMetadata = await conn.groupMetadata(m.chat);
            let participants = groupMetadata.participants;
            let owner = groupMetadata.owner;

            if (!participants.length)
              return reply("❌ No members found in this group.");

            let membersList = participants
              .map((member, index) => {
                let role =
                  member.id === owner
                    ? "👑 *Owner*"
                    : member.admin
                    ? "⭐ *Admin*"
                    : "👤 *Member*";

                return `🔹 *${index + 1}.* @${
                  member.id.split("@")[0]
                } - ${role}`;
              })
              .join("\n");

            conn.sendMessage(
              m.chat,
              {
                text: fontx(
                  `📋 *Group Members List*\n\n${membersList}\n\n👥 *Total Members:* ${participants.length}`
                ),
                mentions: participants.map((member) => member.id),
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("❌ Error fetching members list:", error);
            reply(
              "❌ An error occurred while retrieving the member list. Please try again later."
            );
          }
          break;
        }
        case "text2pdf": {
          if (!q)
            return reply(
              `\`No text detected\`\n*Example:  ${prefix + command} text*`
            );

          try {
            await loading();
            const apiUrl = `https://bk9.fun/tools/pdf?q=${encodeURIComponent(
              q
            )}`;
            const response = await fetch(apiUrl);
            if (!response.ok)
              throw new Error(
                `Failed to fetch PDF. Status: ${response.status}`
              );

            const buffer = await response.buffer();
            await conn.sendMessage(
              m.chat,
              {
                document: buffer,
                mimetype: "application/pdf",
                fileName: "text2pdf.pdf",
                caption: fontx(
                  `Here is your PDF file for the provided text.\n> `
                ),
              },
              {
                quoted: m,
              }
            );
          } catch (error) {
            console.error("Error in text2pdf case:", error);
            reply(
              "An error occurred while converting the text to a PDF. Please try again later."
            );
          }
          break;
        }
        case "autotyping": {
          if (!isOwner) return reply(mess.only.owner);

          if (!args[0]) return reply(`Example: ${prefix + command} on/off`);
          if (args[0] === "on") {
            global.autotyping = true;
            await reply("Successfully Activated Autotyping.");
          } else if (args[0] === "off") {
            global.autotyping = false;
            await reply("successfully deactivated autotyping.");
          } else {
            return reply(
              `Invalid option. Use "on" or "off" to toggle Anticall.`
            );
          }
          break;
        }
        case "antidelete": {
          if (!isOwner) return reply(mess.only.owner);
          if (!args[0]) return reply(`Example: ${prefix + command} on/off`);
          if (args[0] === "on") {
            global.antidelete = true;
            await reply("successfully activated antidelete.");
          } else if (args[0] === "off") {
            global.antidelete = false;
            await reply("successfully deactivated antidelete.");
          } else {
            return reply(
              `\`Invalid option. Use "on" or "off" to toggle Antidelete.\``
            );
          }
          break;
        }
        case "alwaysonline": {
          if (!isOwner) return reply(mess.only.owner);
          if (!args[0]) return reply(`Example: ${prefix + command} on/off`);

          if (args[0] === "on") {
            global.alwaysonline = true;
            await reply("successfully activated alwaysonline.");
          } else if (args[0] === "off") {
            global.alwaysonline = false;
            await reply("Successfully Deactivated Alwaysonline.");
          } else {
            return reply(
              `Invalid option. Use "on" or "off" to toggle Alwaysonline.`
            );
          }
          break;
        }
        case "channel": {
          await loading();

          let channelLink =
            "https://whatsapp.com/channel/0029VbB7Tsa6WaKgDuGsnO1u";

          conn.sendMessage(
            m.chat,
            {
              text:
                fontx(`📢 *Official Channel*\n\n🔗 *Join Now:* `) +
                channelLink +
                fontx(
                  `\n\nStay updated with the latest news, updates, and exclusive content!`
                ),
            },
            { quoted: m }
          );

          break;
        }
        case "save": {
          if (!m.quoted) return;

          let mime = m.quoted.mimetype || "";
          let mediaType = "";

          if (/image/.test(mime)) {
            mediaType = "image";
          } else if (/video/.test(mime)) {
            mediaType = "video";
          } else if (/audio/.test(mime)) {
            mediaType = "audio";
          } else {
            return reply(
              "❌ This is not a supported media type. Reply to an *image, video, or audio* status."
            );
          }

          await loading();

          try {
            let media = await m.quoted.download();
            let userNumber = m.sender; // Get the user's number

            let messageOptions = { quoted: m };

            if (mediaType === "image") {
              await conn.sendMessage(
                userNumber,
                { image: media, caption: fontx(`📸 *Saved Image*`) },
                messageOptions
              );
            } else if (mediaType === "video") {
              await conn.sendMessage(
                userNumber,
                { video: media, caption: fontx(`🎥 *Saved Video*`) },
                messageOptions
              );
            } else if (mediaType === "audio") {
              await conn.sendMessage(
                userNumber,
                { audio: media, mimetype: "audio/mp4", ptt: false },
                messageOptions
              );
            }

            reply("✅ *Status saved successfully!* Check your *DM*.");
          } catch (error) {
            console.error("Error saving status:", error);
            reply(
              "❌ An error occurred while saving the status. Please try again."
            );
          }

          break;
        }

        case "fchat": {
          if (!q.includes("|")) {
            return reply(
              `❌ Invalid format.\n\nExample:\n.fchat 2347012345678 | hi | hello`
            );
          }

          const [jidRaw, msg1, msg2] = q.split("|").map((v) => v.trim());
          if (!jidRaw || !msg1 || !msg2) {
            return reply(
              `❌ Incomplete data. Format: number | message1 | message2`
            );
          }

          const fakeJid = jidRaw.includes("@s.whatsapp.net")
            ? jidRaw
            : jidRaw + "@s.whatsapp.net";

          const quotedMsg = {
            key: {
              remoteJid: m.chat,
              fromMe: false,
              id: Math.random().toString(36).substring(2, 15),
              participant: fakeJid,
            },
            message: {
              conversation: msg1,
            },
          };
          await conn.sendMessage(
            m.chat,
            {
              text: msg2,
            },
            {
              quoted: quotedMsg,
            }
          );

          break;
        }
        case "getcase": {
          if (!isOwner) return reply(mess.only.owner);
          if (!q)
            return reply(
              "❌ Please specify the command name.\nExample: .getcase tagall"
            );

          const fs = require("fs");
          const path = require("path");

          try {
            const file = path.join(__dirname, "case.js");
            const raw = fs.readFileSync(file, "utf8");

            const pattern = new RegExp(
              `case ['"\`]${q}['"\`]:\\s*{([\\s\\S]*?)break;\\s*}`,
              "i"
            );
            const match = raw.match(pattern);

            if (!match) return reply(`❌ No case found for '${q}'`);

            const extracted = match[0];
            if (extracted.length > 4000) {
              return reply("⚠️ Case is too long to send here.");
            }

            replyx(
              `\`\`\`${themeemoji} case: ${q} ${themeemoji}\n\n ${extracted} \n\`\`\``
            );
          } catch (err) {
            console.error(err);
            reply("❌ Failed to read case source.");
          }
          break;
        }
        case "getcreds":
        case "getsession": {
          if (!isOwner) return reply(mess.only.owner);
          await loading();
          const fs = require("fs");
          const path = require("path");

          try {
            const credsPath = path.join(
              __dirname,
              "..",
              "session",
              "creds.json"
            );

            if (!fs.existsSync(credsPath)) {
              return reply("❌ Session creds.json not found.");
            }

            await conn.sendMessage(
              m.chat,
              {
                document: fs.readFileSync(credsPath),
                mimetype: "application/json",
                fileName: "creds.json",
                caption: fontx("✅ Here is your session creds.json file."),
              },
              { quoted: m }
            );
          } catch (err) {
            console.error("❌ Failed to send creds.json:", err);
            reply("❌ Error fetching creds.json.");
          }

          break;
        }
        case "cleansession":
        case "clearsession": {
          if (!isOwner) return reply(mess.only.owner);
          await loading();
          const fs = require("fs");
          const path = require("path");

          const sessionFolder = path.join(__dirname, "..", "session");

          try {
            if (!fs.existsSync(sessionFolder)) {
              return reply("❌ Session folder does not exist.");
            }

            const files = fs.readdirSync(sessionFolder);

            for (const file of files) {
              const filePath = path.join(sessionFolder, file);
              if (file !== "creds.json") {
                if (fs.lstatSync(filePath).isDirectory()) {
                  fs.rmSync(filePath, { recursive: true, force: true });
                } else {
                  fs.unlinkSync(filePath);
                }
              }
            }

            reply("✅ Session folder cleaned. Only creds.json was kept.");
          } catch (err) {
            console.error("❌ Error cleaning session folder:", err);
            reply("❌ Failed to clean session folder.");
          }

          break;
        }
        case "getdpn": {
          if (!isOwner) return reply(mess.only.owner);
          await loading();
          const fs = require("fs");
          const path = require("path");

          try {
            const packageJsonPath = path.join(__dirname, "..", "package.json");
            const packageJson = JSON.parse(
              fs.readFileSync(packageJsonPath, "utf-8")
            );

            if (!packageJson.dependencies) {
              return reply("❌ No dependencies found in package.json.");
            }

            let text = `📦 *Dependencies List:*\n\n`;
            for (const [pkg, version] of Object.entries(
              packageJson.dependencies
            )) {
              text += `• ${pkg}: _${version}_\n`;
            }

            conn.sendMessage(
              m.chat,
              {
                text: fontx(text + `\n> `),
              },
              { quoted: m }
            );
          } catch (err) {
            console.error("❌ Error reading package.json:", err);
            reply("❌ Failed to read dependencies.");
          }

          break;
        }

        case "tomp3": {
          if (!m.quoted) return reply("❌ Please reply to a video.");
          await loading();
          let mime = m.quoted.mimetype || "";
          if (!/video/.test(mime))
            return reply("❌ Reply to a *video* to convert it to MP3.");

          try {
            const { toAudio } = require("../lib/exif");
            let media = await m.quoted.download();
            let audio = await toAudio(media, "mp4");

            await conn.sendMessage(
              m.chat,
              {
                audio: audio,
                mimetype: "audio/mpeg",
                ptt: false,
                fileName: "converted.mp3",
              },
              { quoted: m }
            );
          } catch (err) {
            console.error("❌ tomp3 error:", err);
            reply("❌ Failed to convert video to MP3.");
          }
          break;
        }
        case "toimg": {
          if (!m.quoted) {
            return reply(
              `*Reply to an image with the caption ${prefix + command}*`
            );
          }
          await loading();
          let mime = (m.quoted.msg || m.quoted).mimetype || "";

          try {
            if (/image/.test(mime)) {
              let media = await m.quoted.download();
              await conn.sendMessage(
                m.chat,
                {
                  image: media,
                  caption: fontx("📸 *Here is your image!*"),
                },
                { quoted: m }
              );
            } else {
              reply(
                `❌ Unsupported media type!\nReply to an image with *${
                  prefix + command
                }*`
              );
            }
          } catch (err) {
            console.error("Error processing media:", err);
            reply(`❌ Failed to process media. Please try again.`);
          }

          break;
        }
        case "json": {
          if (!q || !q.startsWith("http")) {
            return reply(
              "❌ Please provide a valid JSON URL.\nExample: .jsonlink https://api.example.com/data"
            );
          }
          await loading();
          try {
            const res = await axios.get(q);
            const json = res.data;

            const pretty = JSON.stringify(json, null, 2).slice(0, 3000); // Telegram limit-safe
            replyx("```json\n" + pretty + "\n```");
          } catch (err) {
            console.error("❌ json error:", err);
            reply(
              "❌ Failed to fetch or parse the JSON. Make sure the URL returns valid JSON."
            );
          }
          break;
        }
        case "spamtag": {
          if (!isOwner) return reply(mess.only.owner);
          if (!isGroup) return reply(mess.only.group);
          if (!q.includes("|"))
            return reply("❌ Use format: .spamtag @user | count");

          const [target, countStr] = q.split("|").map((x) => x.trim());
          const count = parseInt(countStr);

          if (
            !target.startsWith("@") ||
            isNaN(count) ||
            count < 1 ||
            count > 20
          ) {
            return reply(
              "❌ Invalid usage. Max spam: 20\n\nExample: .spamtag @user | 5"
            );
          }

          const number =
            target.replace("@", "").replace(/\D/g, "") + "@s.whatsapp.net";

          for (let i = 0; i < count; i++) {
            await conn.sendMessage(m.chat, {
              text: fontx(`📣 Hey! ${target}`),
              mentions: [number],
            });
            await sleep(800);
          }

          break;
        }
        case "test":
        case ">": {
          if (!isOwner) return reply(mess.only.owner);

          if (!q)
            return reply(
              "❌ Provide an expression to evaluate.\nExample: .test m.chat"
            );

          try {
            let result = await eval(`(async () => { return ${q} })()`);
            if (typeof result !== "string")
              result = require("util").inspect(result);
            replyx("```js\n" + result.slice(0, 300000) + "\n```");
          } catch (err) {
            replyx("❌ Error:\n```" + err.message + "```");
          }

          break;
        }

        case "tolink":
        case "tourl": {
          if (!m.quoted)
            return reply(
              "❌ Reply to a media message to convert it to a link."
            );
          const mimeType = m.quoted.mimetype;
          if (!mimeType) return replyx("```❌ Unable to detect file type.```");
          await loading();
          const ext = mimeType.split("/")[1] || "bin";
          const buffer = await m.quoted.download();

          const fileName = `temp_${Date.now()}.${ext}`;
          const filePath = path.join(__dirname, fileName);

          try {
            fs.writeFileSync(filePath, buffer);

            const url = await catbox(filePath);
            fs.unlinkSync(filePath);

            replyx(`\`\`\`✅ Uploaded to Catbox:\n${url}\`\`\``);
          } catch (err) {
            console.error(err);
            replyx("```❌ Failed to upload file.```");
          }

          break;
        }

        case "🧑‍💻":
        case "node": {
          if (!isOwner) return reply(mess.only.owner);
          if (!m.quoted || !m.quoted.text)
            return reply("❌ Reply to a JavaScript code message to run it.");

          const code = m.quoted.text.trim();
          const util = require("util");
          const fs = require("fs");
          const path = require("path");
          const axios = require("axios");

          const logs = [];
          const oldLog = console.log;
          console.log = (...args) =>
            logs.push(
              args
                .map((a) => (typeof a === "string" ? a : util.inspect(a)))
                .join(" ")
            );

          try {
            const AsyncFunction = Object.getPrototypeOf(
              async function () {}
            ).constructor;
            const exec = new AsyncFunction(
              "conn",
              "m",
              "fs",
              "path",
              "axios",
              "require",
              code
            );
            const result = await exec(conn, m, fs, path, axios, require);

            console.log = oldLog;

            let output = logs.join("\n");
            if (result !== undefined) {
              output += `\n\n[Return Value]:\n${util.inspect(result)}`;
            }

            replyx(
              "```>_\n" +
                (output || "✅ Executed with no output").slice(0, 3000) +
                "\n```"
            );
          } catch (err) {
            console.log = oldLog;
            replyx("```❌ Error:\n" + err.message + "```");
          }

          break;
        }

        default:
      }
      if (!isGroup && user && isPremium && new Date() - user.pc < 86400000) {
      } else if (!isGroup && user && isPremium && !itsMe) {
        reply(
          `${ucapanWaktu} *${pushname}*  how can i help you? please type *${prefix}menu*`
        );
        user.pc = new Date() * 1;
      }
      if (
        global.badword === true &&
        bad.some((word) => budy.toLowerCase().includes(word.toLowerCase()))
      ) {
        if (cekSpam("NotCase", senderNumber, AntiSpam)) return;

        addSpam("NotCase", senderNumber, "10s", AntiSpam);

        if (isGroup) {
          if (isBotGroupAdmins) {
            await conn.sendMessage(from, {
              delete: {
                remoteJid: from,
                fromMe: false,
                id: m.key.id,
                participant: m.sender,
              },
            });

            await conn.sendMessage(
              from,
              {
                text: `*Warning: Badwords are prohibited in this group.*\nYour message has been deleted.`,
              },
              {
                quoted: m,
              }
            );
          } else {
            await conn.sendMessage(
              from,
              {
                text: `*Warning: Badwords are prohibited in this group.*\nI don't have admin privileges to delete the message.`,
              },
              {
                quoted: m,
              }
            );
          }
        } else {
          await conn.sendMessage(
            from,
            {
              text: `*Warning: Badwords are prohibited.*\nPlease refrain from using inappropriate language.`,
            },
            {
              quoted: m,
            }
          );
        }
      }
    } catch (err) {
      console.log(err);
      if (isCmd) Failed(toFirstCase(command), dash);
      let e = util.format(err);
      if (err.message.includes("Cannot find module")) {
        let module = err.message.split("Cannot find module '")[1].split("'")[0];
        let teks = `Module ${module} has not been installed
Please install it first`;
        return await conn.sendText(dev.key.remoteJid, teks, dev);
      }
      await conn.sendText(
        Ownerin,
        `]─────「 *SYSTEM-ERROR* 」─────[\n\n${e}\n\n© ${botName}`,
        dev
      );
    }
  } catch (err) {
    console.log(chalk.bgRed(color("[  ERROR  ]", "black")), util.format(err));
    let e = String(err);
    if (e.includes("this.isZero")) {
      return;
    }
    if (e.includes("rate-overlimit")) {
      if (!publik) return;
      publik = false;
      await conn.sendMessage(botNumber + "@s.whatsapp.net", {
        text: `Rate-overlimit occurred
The bot has switched from public mode to Self mode
To avoid excessive spam,
Please wait 1 minute until all messages
have been read by the bot`,
      });
      await setTimeout(() => {
        publik = true;
        conn.sendMessage(botNumber + "@s.whatsapp.net", {
          text: `Successfully changed self mode to public mode`,
        });
      }, 60000);
      return;
    }
    if (e.includes("Connection Closed")) {
      return;
    }
    if (e.includes("Timed Out")) {
      return;
    }
    if (e.includes("Value not found")) {
      return;
    }
    console.log(
      color("Message Error : %s", "white"),
      color(util.format(e), "green")
    );
  }
};
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(
    chalk.bgGreen(color("[  UPDATE ]", "black")),
    chalk.white(`${__filename}`)
  );
  delete require.cache[file];
  require(file);
});

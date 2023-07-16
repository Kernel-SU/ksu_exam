const browserLang = navigator.language || navigator.userLanguage; 
const zhLangs = ['zh-CN', 'zh-TW', 'zh-HK', 'zh'];
let isZH = zhLangs.some(lang => browserLang.startsWith(lang));

var bootMessageLines_en = [
            "System loading...<br>",
            (new Date()).toString()+"<br>",
            "&nbsp;_______&nbsp;&nbsp;&nbsp;______&nbsp;<br>|__&nbsp;&nbsp;&nbsp;__|&nbsp;|&nbsp;&nbsp;____|<br>&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|__&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;__|&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;|_|&nbsp;&nbsp;&nbsp;&nbsp;|_|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>",
            "Terminal Faker version "+version+"<br>",
            "By Sherri Wheeler (SyntaxSeed.com)<br>",
            "Ready. Type 'help' to get started.<br><br>",
            "Question:<br>",
            "Here is a GKI 2.0 device with kernel version 5.10.117-android12-9-xxxx-xxxx, android version 13, The kernel compression method is unknown, please read the tutorial carefully on the website and flash the image of the correct version and compression format for the device.<br><br>",
            "Condition:<br>",
            "Device Status: OS is booted<br><br>",
            "terminalfaker Built-in commands (type help to view) : status, adb, fastboot, magiskboot, cd, ls, cat, clear, echo, help, history, pwd, reboot, rm, touch, uname, version, whoami<br><br>",
            "magiskboot: The binary file of the x86_64 platform is used here, and it can be operated directly on the linux terminal, without trying to push it and boot.img to the phone.<br><br>",
            "status: Used to check the device status (system/bootloader/fastbootd/recovery).<br><br>",
            "Do not add ./ to execute any command in terminalfaker<br><br>",
            "Directory /home/user/workdir : All the files used in this test are placed in this directory, such as magiskboot, boot-official.img, etc<br><br>"
        ];

var bootMessageLines_zh = [
            "System loading...<br>",
            (new Date()).toString()+"<br>",
            "&nbsp;_______&nbsp;&nbsp;&nbsp;______&nbsp;<br>|__&nbsp;&nbsp;&nbsp;__|&nbsp;|&nbsp;&nbsp;____|<br>&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|__&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;__|&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;|_|&nbsp;&nbsp;&nbsp;&nbsp;|_|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>",
            "Terminal Faker version "+version+"<br>",
            "By Sherri Wheeler (SyntaxSeed.com)<br>",
            "Ready. Type 'help' to get started.<br><br>",
            "题目:<br>",
            "这里有一台内核版本为5.10.117-android12-9-xxxx-xxxx,Android版本为13的GKI 2.0设备，内核压缩方式未知，请在网站上认真翻阅教程后为该设备刷入正确版本和压缩格式的镜像。<br><br>",
            "条件:<br>",
            "设备状态:  已进入系统<br><br>",
            "terminalfaker内置命令(可键入help查看) : status, adb, fastboot, magiskboot, cd, ls, cat, clear, echo, help, history, pwd, reboot, rm, touch, uname, version, whoami<br><br>",
            "magiskboot: 这里使用的是x86_64平台的二进制文件,直接在linux终端操作即可,无需尝试将它和boot.img推送至手机。<br><br>",
            "status: 用于检查设备状态(system/bootloader/fastbootd/recovery)<br><br>",
            "在terminalfaker中执行任何命令都不要加上 ./<br><br>",
            "目录/home/user/workdir : 本次测试所有用到的文件都被放在这个目录下,如magiskboot,boot-official.img等<br><br>"
        ];

let bootMessageLines = isZH ? bootMessageLines_zh : bootMessageLines_en;
// Whether to use the longer boot load screen. If this is missing, defaults to true.
var useBootLoader = true;

// Set the command prompt style:
var customPrompt = function () { return "root@Arch ("+Terminal.path+") # ";};

// Initialize the terminal:
var term = Terminal.init(document.getElementById("terminal"), commands, customPrompt);

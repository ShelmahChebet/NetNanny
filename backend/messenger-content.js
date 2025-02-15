function extractMessages() {
    let messages = [];
    
    // Find message elements (selectors may need updates)
    console.log("Test working");
    /*let chatElements = document.querySelectorAll(".x5yr21d.x17qophe.x10l6tqk.x13vifvy.xh8yej3");

    chatElements.forEach(el => {
        messages.push(el.innerText);
    });

    console.log("Extracted Messages:", messages);

    // Send messages to background script
    chrome.runtime.sendMessage({ action: "analyzeMessages", messages: messages });*/
}

// Run extraction every 5 seconds
setInterval(extractMessages, 5000);

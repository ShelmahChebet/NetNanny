chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "analyzeMessages") {
        console.log("Messages Extracted:", request.messages);
        return true;  // Keeps the message channel open for async response
    }
    return false;
});

(() => {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function cookieBanner() {
    let body = document.querySelector('body') 
    return getTextNode(body);
  }

  function getTextNode(element) {
    for (let node of element.childNodes) {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE:
                getTextNode(node);
                break;
            case Node.TEXT_NODE:
                //look for cookie word
                const regex = /.*cookie.*|.*data.*/gmi
                let text = node.textContent;
                if (regex.test(text)) {
                  let parentNode = node.parentElement
                  parentNode.style.border = "10px solid red"; //add border to element ?
                  console.log(parentNode);
                  return parentNode.tagName; //return element
                  //look through element's childrenfor buttons
                  //get style??
                } 
                break;
            case Node.DOCUMENT_NODE:
                getTextNode(node);
        }
    }
}

function lookForCookieInTextContent() {
  const regex = /.*cookie.*law.*|.*cookie.*notice.*|.*cookie.*bar.*/gmi
}

  /**
   * Count the number of nodes element on the website
   */
  function countNodes() {
    //document.querySelector("body").style.border = "5px solid red";
    let nodesCount = document.querySelectorAll('*');
    return (nodesCount.length)
  }

  function removeText() {
    //document.querySelector("body").style.border = "0px";
  }

  /**
   * Listen for messages from the background script.
   * Call "countNodes()" or "removeNodes()".
   */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "getNodes") {
      //countNodes();
      let nodesNumber = countNodes();
      browser.runtime.sendMessage({
        command: "countNodes",
        nodes: nodesNumber
      });
    } else if (message.command === "reset") {
      removeText();
      browser.runtime.sendMessage({
        command: "removeCountNodes"
      });
    } else if (message.command === "getCookieBanner") {
      let element = cookieBanner();
      browser.runtime.sendMessage({
        command: "cookieBanner",
        banner: element
      });
    }

  });
})();

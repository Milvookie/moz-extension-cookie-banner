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

  /**
   * Count the number of nodes element on the website
   */
  function countNodes() {
    document.querySelector("body").style.border = "5px solid red";
    let nodesCount = document.querySelectorAll('*');
    return (nodesCount.length)
  }

  function removeText() {
    document.querySelector("body").style.border = "0px";
  }

  /**
   * Listen for messages from the background script.
   * Call "countNodes()" or "removeNodes()".
   */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "getNodes") {
      countNodes();
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
    }
  });
})();

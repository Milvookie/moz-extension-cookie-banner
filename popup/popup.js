function listenForClicks() {
  document.addEventListener("click", (e) => {
    /**
     * send a message to the content script in the active tab.
     */
    function getNodes(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
          command: "getNodes"
        });
    }

    function getCookieBanner(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "getCookieBanner"
      });
  }

    /**
     * send a "reset" message to the content script in the active tab.
     */
    function reset(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
          command: "reset",
        });
    }

    /**
     * Just log the error to the console.
     */
    function reportError(error) {
      console.error(`Could not get: ${error}`);
    }

    /**
     * Get the active tab,
     * then call "getNodes()" or "reset()" as appropriate.
     */
    if (e.target.id == 'nodes-button') {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(getNodes)
        .catch(reportError);
    } else if (e.target.classList.contains("reset")) {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(reset)
        .catch(reportError);
    } else if (e.target.id == 'cookie-banner') {
      browser.tabs
      .query({ active: true, currentWindow: true })
      .then(getCookieBanner)
      .catch(reportError);
    }
  });

}

browser.tabs
  .executeScript({ file: "/content_scripts/get_cookie_banner.js" })
  .then(listenForClicks)
  .catch((err) => {
    console.log(err);
  });
/**
 * Listen for message from the content script
 */
browser.runtime.onMessage.addListener((message) => {
  if (message.command === "countNodes") {
    let number = message.nodes;
    numberOfNodes('add', number);
    console.log('number of nodes from script content')
    console.log(message.nodes)
  } else if (message.command === "removeCountNodes") {
    numberOfNodes('remove')
  } else if (message.command === "cookieBanner") {
    let resultDiv = document.getElementById("results-cookie");
    resultDiv.innerHTML = 'yes'
    let cookieBanner = message.banner
    console.log(cookieBanner);
  }
});
/**
 * Add or remove the text string of the number of elements
 * @param {*} param add or remove the text string
 * @param {*} number number of nodes elements in the webpage
 */
function numberOfNodes(param, number) {
  var results_nodes = document.getElementById("results-nodes");
  if (param == 'add') {
    results_nodes.innerHTML = number;
  } else if (param == 'remove') {
    results_nodes.innerHTML = '';
  }
}

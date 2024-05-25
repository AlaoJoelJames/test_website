function initializeSmartSupp(key) {
    const script = document.createElement('script');
    script.src = `https://www.smartsuppchat.com/loader.js?key=${key}`;
    script.async = true;
    document.head.appendChild(script);
  
    // Mock SmartSupp initialization for testing purposes
    window.smartsupp = { key: key };
  }
  
  module.exports = { initializeSmartSupp };
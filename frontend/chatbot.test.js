const { JSDOM } = require('jsdom');
const { initializeSmartSupp } = require('./initializeSmartSupp.js');

describe('SmartSupp Integration', () => {
  let window;
  let document;

  beforeEach(() => {
    const { window: domWindow } = new JSDOM(`<!DOCTYPE html><head></head><body></body>`, {
      url: "http://localhost:3000/",
    });
    window = domWindow;
    document = domWindow.document;
    global.window = window;
    global.document = document;
  });

  it('should initialize SmartSupp with the correct key', () => {
    // Call the function to initialize SmartSupp
    const key = '4f2c4202a1c09f302be0042a0938673779483edb';
    initializeSmartSupp(key);

    // Check if the script tag was inserted correctly
    const insertedScript = document.querySelector(`script[src="https://www.smartsuppchat.com/loader.js?key=4f2c4202a1c09f302be0042a0938673779483edb"]`);
    expect(insertedScript);

    // Check if the smartsupp object is defined
    expect(window.smartsupp).toBeUndefined();
    expect(window.smartsupp.key).toBe(key);
  });
});
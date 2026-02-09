
const fs = require('fs');
const path = require('path');

// Mock browser environment
global.window = {};
global.self = global.window;
global.document = {
    createElement: () => ({}),
    getElementsByTagName: () => []
};

// Mock React
global.window.React = {
    createElement: () => { },
    forwardRef: () => { },
    useRef: () => { },
    useState: () => [null, () => { }],
    useLayoutEffect: () => { },
    useCallback: () => { },
    useMemo: () => { },
    useContext: () => { },
    createContext: () => ({ Provider: {}, Consumer: {} })
};

function loadLib(filename) {
    console.log(`Loading ${filename}...`);
    const content = fs.readFileSync(path.join(__dirname, 'libs', filename), 'utf8');
    try {
        eval(content);
    } catch (e) {
        console.error(`Error loading ${filename}:`, e.message);
    }
}

// Load in order
loadLib('history.js');
console.log('window keys after history:', Object.keys(window));
// Check history export
if (window.HistoryLibrary) console.log('HistoryLibrary FOUND');
else if (window.History) console.log('History FOUND');
else console.log('No history export found');

// Apply patch if needed
if (!window.HistoryLibrary && window.History) {
    console.log('Patching HistoryLibrary = History');
    window.HistoryLibrary = window.History;
}

loadLib('react-router.js');
console.log('ReactRouter:', window.ReactRouter ? 'FOUND' : 'MISSING');

loadLib('react-router-dom.js');
console.log('ReactRouterDOM:', window.ReactRouterDOM ? 'FOUND' : 'MISSING');

if (window.ReactRouterDOM) {
    console.log('ReactRouterDOM.Routes:', window.ReactRouterDOM.Routes ? 'FOUND' : 'MISSING');
    console.log('ReactRouterDOMkeys:', Object.keys(window.ReactRouterDOM));
}

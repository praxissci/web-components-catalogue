import 'markdown-it';
import './catalogue-app.js';
import '../node_modules/@rhi-ui/demo-snippet/rhi-ui-demo-snippet-demo.js';
import '../node_modules/@rhi-ui/logo/rhi-ui-logo-demo.js';
import '../node_modules/@rhi-ui/markdown-viewer/rhi-ui-markdown-viewer-demo.js';
import '../node_modules/@rhi-ui/selectable-grid/rhi-ui-selectable-grid-demo.js';

window.markdownit = require('markdown-it');
window.preloadedElements = {
    'rhi-ui-demo-snippet': true,
    'rhi-ui-logo': true,
    'rhi-ui-markdown-viewer': true,
    'rhi-ui-selectable-grid': true
};
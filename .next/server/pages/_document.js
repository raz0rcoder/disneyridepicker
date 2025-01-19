"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_document";
exports.ids = ["pages/_document"];
exports.modules = {

/***/ "./pages/_document.js":
/*!****************************!*\
  !*** ./pages/_document.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyDocument)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/document */ \"./node_modules/next/document.js\");\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _mui_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/styles */ \"@mui/styles\");\n/* harmony import */ var _mui_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_styles__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nclass MyDocument extends (next_document__WEBPACK_IMPORTED_MODULE_2___default()) {\n    render() {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_2__.Html, {\n            lang: \"en\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_2__.Head, {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"stylesheet\",\n                        href: \"https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap\"\n                    }, void 0, false, {\n                        fileName: \"/Users/jnguyen/Documents/AI/disneyland-ride-picker/disneyridepicker/pages/_document.js\",\n                        lineNumber: 10,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/jnguyen/Documents/AI/disneyland-ride-picker/disneyridepicker/pages/_document.js\",\n                    lineNumber: 9,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"body\", {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_2__.Main, {}, void 0, false, {\n                            fileName: \"/Users/jnguyen/Documents/AI/disneyland-ride-picker/disneyridepicker/pages/_document.js\",\n                            lineNumber: 16,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_2__.NextScript, {}, void 0, false, {\n                            fileName: \"/Users/jnguyen/Documents/AI/disneyland-ride-picker/disneyridepicker/pages/_document.js\",\n                            lineNumber: 17,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/jnguyen/Documents/AI/disneyland-ride-picker/disneyridepicker/pages/_document.js\",\n                    lineNumber: 15,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/jnguyen/Documents/AI/disneyland-ride-picker/disneyridepicker/pages/_document.js\",\n            lineNumber: 8,\n            columnNumber: 7\n        }, this);\n    }\n}\n// Resolution order\n//\n// On the server:\n// 1. app.getInitialProps\n// 2. page.getInitialProps\n// 3. document.getInitialProps\n// 4. app.render\n// 5. page.render\n// 6. document.render\n//\n// On the server with error:\n// 1. document.getInitialProps\n// 2. app.render\n// 3. page.render\n// 4. document.render\n//\n// On the client\n// 1. app.getInitialProps\n// 2. page.getInitialProps\n// 3. app.render\n// 4. page.render\nMyDocument.getInitialProps = async (ctx)=>{\n    // Resolution order\n    //\n    // On the server:\n    // 1. app.getInitialProps\n    // 2. page.getInitialProps\n    // 3. document.getInitialProps\n    // 4. app.render\n    // 5. page.render\n    // 6. document.render\n    //\n    // On the server with error:\n    // 1. document.getInitialProps\n    // 2. app.render\n    // 3. page.render\n    // 4. document.render\n    //\n    // On the client\n    // 1. app.getInitialProps\n    // 2. page.getInitialProps\n    // 3. app.render\n    // 4. page.render\n    // Create a new server-side instance of MUI's style generation\n    const sheets = new _mui_styles__WEBPACK_IMPORTED_MODULE_3__.ServerStyleSheets();\n    const originalRenderPage = ctx.renderPage;\n    ctx.renderPage = ()=>originalRenderPage({\n            enhanceApp: (App)=>(props)=>sheets.collect(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(App, {\n                        ...props\n                    }, void 0, false, {\n                        fileName: \"/Users/jnguyen/Documents/AI/disneyland-ride-picker/disneyridepicker/pages/_document.js\",\n                        lineNumber: 75,\n                        columnNumber: 54\n                    }, undefined))\n        });\n    const initialProps = await next_document__WEBPACK_IMPORTED_MODULE_2___default().getInitialProps(ctx);\n    return {\n        ...initialProps,\n        styles: [\n            ...react__WEBPACK_IMPORTED_MODULE_1__.Children.toArray(initialProps.styles),\n            sheets.getStyleElement()\n        ]\n    };\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fZG9jdW1lbnQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUErQjtBQUN3QztBQUN2QjtBQUVqQyxNQUFNTyxtQkFBbUJOLHNEQUFRQTtJQUM5Q08sU0FBUztRQUNQLHFCQUNFLDhEQUFDTiwrQ0FBSUE7WUFBQ08sTUFBSzs7OEJBQ1QsOERBQUNOLCtDQUFJQTs4QkFDSCw0RUFBQ087d0JBQ0NDLEtBQUk7d0JBQ0pDLE1BQUs7Ozs7Ozs7Ozs7OzhCQUdULDhEQUFDQzs7c0NBQ0MsOERBQUNULCtDQUFJQTs7Ozs7c0NBQ0wsOERBQUNDLHFEQUFVQTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJbkI7QUFDRjtBQUVBLG1CQUFtQjtBQUNuQixFQUFFO0FBQ0YsaUJBQWlCO0FBQ2pCLHlCQUF5QjtBQUN6QiwwQkFBMEI7QUFDMUIsOEJBQThCO0FBQzlCLGdCQUFnQjtBQUNoQixpQkFBaUI7QUFDakIscUJBQXFCO0FBQ3JCLEVBQUU7QUFDRiw0QkFBNEI7QUFDNUIsOEJBQThCO0FBQzlCLGdCQUFnQjtBQUNoQixpQkFBaUI7QUFDakIscUJBQXFCO0FBQ3JCLEVBQUU7QUFDRixnQkFBZ0I7QUFDaEIseUJBQXlCO0FBQ3pCLDBCQUEwQjtBQUMxQixnQkFBZ0I7QUFDaEIsaUJBQWlCO0FBRWpCRSxXQUFXTyxlQUFlLEdBQUcsT0FBT0M7SUFDbEMsbUJBQW1CO0lBQ25CLEVBQUU7SUFDRixpQkFBaUI7SUFDakIseUJBQXlCO0lBQ3pCLDBCQUEwQjtJQUMxQiw4QkFBOEI7SUFDOUIsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQixxQkFBcUI7SUFDckIsRUFBRTtJQUNGLDRCQUE0QjtJQUM1Qiw4QkFBOEI7SUFDOUIsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQixxQkFBcUI7SUFDckIsRUFBRTtJQUNGLGdCQUFnQjtJQUNoQix5QkFBeUI7SUFDekIsMEJBQTBCO0lBQzFCLGdCQUFnQjtJQUNoQixpQkFBaUI7SUFFakIsOERBQThEO0lBQzlELE1BQU1DLFNBQVMsSUFBSVYsMERBQWlCQTtJQUNwQyxNQUFNVyxxQkFBcUJGLElBQUlHLFVBQVU7SUFFekNILElBQUlHLFVBQVUsR0FBRyxJQUNmRCxtQkFBbUI7WUFDakJFLFlBQVksQ0FBQ0MsTUFBUSxDQUFDQyxRQUFVTCxPQUFPTSxPQUFPLGVBQUMsOERBQUNGO3dCQUFLLEdBQUdDLEtBQUs7Ozs7OztRQUMvRDtJQUVGLE1BQU1FLGVBQWUsTUFBTXRCLG9FQUF3QixDQUFDYztJQUVwRCxPQUFPO1FBQ0wsR0FBR1EsWUFBWTtRQUNmQyxRQUFRO2VBQUl4QiwyQ0FBYyxDQUFDMEIsT0FBTyxDQUFDSCxhQUFhQyxNQUFNO1lBQUdSLE9BQU9XLGVBQWU7U0FBRztJQUNwRjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGlzbmV5bGFuZC1yaWRlLXBpY2tlci8uL3BhZ2VzL19kb2N1bWVudC5qcz81MzhiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBEb2N1bWVudCwgeyBIdG1sLCBIZWFkLCBNYWluLCBOZXh0U2NyaXB0IH0gZnJvbSAnbmV4dC9kb2N1bWVudCc7XG5pbXBvcnQgeyBTZXJ2ZXJTdHlsZVNoZWV0cyB9IGZyb20gJ0BtdWkvc3R5bGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlEb2N1bWVudCBleHRlbmRzIERvY3VtZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8SHRtbCBsYW5nPVwiZW5cIj5cbiAgICAgICAgPEhlYWQ+XG4gICAgICAgICAgPGxpbmtcbiAgICAgICAgICAgIHJlbD1cInN0eWxlc2hlZXRcIlxuICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9U291cmNlK1NhbnMrUHJvOndnaHRANDAwOzYwMDs3MDAmZGlzcGxheT1zd2FwXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L0hlYWQ+XG4gICAgICAgIDxib2R5PlxuICAgICAgICAgIDxNYWluIC8+XG4gICAgICAgICAgPE5leHRTY3JpcHQgLz5cbiAgICAgICAgPC9ib2R5PlxuICAgICAgPC9IdG1sPlxuICAgICk7XG4gIH1cbn1cblxuLy8gUmVzb2x1dGlvbiBvcmRlclxuLy9cbi8vIE9uIHRoZSBzZXJ2ZXI6XG4vLyAxLiBhcHAuZ2V0SW5pdGlhbFByb3BzXG4vLyAyLiBwYWdlLmdldEluaXRpYWxQcm9wc1xuLy8gMy4gZG9jdW1lbnQuZ2V0SW5pdGlhbFByb3BzXG4vLyA0LiBhcHAucmVuZGVyXG4vLyA1LiBwYWdlLnJlbmRlclxuLy8gNi4gZG9jdW1lbnQucmVuZGVyXG4vL1xuLy8gT24gdGhlIHNlcnZlciB3aXRoIGVycm9yOlxuLy8gMS4gZG9jdW1lbnQuZ2V0SW5pdGlhbFByb3BzXG4vLyAyLiBhcHAucmVuZGVyXG4vLyAzLiBwYWdlLnJlbmRlclxuLy8gNC4gZG9jdW1lbnQucmVuZGVyXG4vL1xuLy8gT24gdGhlIGNsaWVudFxuLy8gMS4gYXBwLmdldEluaXRpYWxQcm9wc1xuLy8gMi4gcGFnZS5nZXRJbml0aWFsUHJvcHNcbi8vIDMuIGFwcC5yZW5kZXJcbi8vIDQuIHBhZ2UucmVuZGVyXG5cbk15RG9jdW1lbnQuZ2V0SW5pdGlhbFByb3BzID0gYXN5bmMgKGN0eCkgPT4ge1xuICAvLyBSZXNvbHV0aW9uIG9yZGVyXG4gIC8vXG4gIC8vIE9uIHRoZSBzZXJ2ZXI6XG4gIC8vIDEuIGFwcC5nZXRJbml0aWFsUHJvcHNcbiAgLy8gMi4gcGFnZS5nZXRJbml0aWFsUHJvcHNcbiAgLy8gMy4gZG9jdW1lbnQuZ2V0SW5pdGlhbFByb3BzXG4gIC8vIDQuIGFwcC5yZW5kZXJcbiAgLy8gNS4gcGFnZS5yZW5kZXJcbiAgLy8gNi4gZG9jdW1lbnQucmVuZGVyXG4gIC8vXG4gIC8vIE9uIHRoZSBzZXJ2ZXIgd2l0aCBlcnJvcjpcbiAgLy8gMS4gZG9jdW1lbnQuZ2V0SW5pdGlhbFByb3BzXG4gIC8vIDIuIGFwcC5yZW5kZXJcbiAgLy8gMy4gcGFnZS5yZW5kZXJcbiAgLy8gNC4gZG9jdW1lbnQucmVuZGVyXG4gIC8vXG4gIC8vIE9uIHRoZSBjbGllbnRcbiAgLy8gMS4gYXBwLmdldEluaXRpYWxQcm9wc1xuICAvLyAyLiBwYWdlLmdldEluaXRpYWxQcm9wc1xuICAvLyAzLiBhcHAucmVuZGVyXG4gIC8vIDQuIHBhZ2UucmVuZGVyXG5cbiAgLy8gQ3JlYXRlIGEgbmV3IHNlcnZlci1zaWRlIGluc3RhbmNlIG9mIE1VSSdzIHN0eWxlIGdlbmVyYXRpb25cbiAgY29uc3Qgc2hlZXRzID0gbmV3IFNlcnZlclN0eWxlU2hlZXRzKCk7XG4gIGNvbnN0IG9yaWdpbmFsUmVuZGVyUGFnZSA9IGN0eC5yZW5kZXJQYWdlO1xuXG4gIGN0eC5yZW5kZXJQYWdlID0gKCkgPT5cbiAgICBvcmlnaW5hbFJlbmRlclBhZ2Uoe1xuICAgICAgZW5oYW5jZUFwcDogKEFwcCkgPT4gKHByb3BzKSA9PiBzaGVldHMuY29sbGVjdCg8QXBwIHsuLi5wcm9wc30gLz4pLFxuICAgIH0pO1xuXG4gIGNvbnN0IGluaXRpYWxQcm9wcyA9IGF3YWl0IERvY3VtZW50LmdldEluaXRpYWxQcm9wcyhjdHgpO1xuXG4gIHJldHVybiB7XG4gICAgLi4uaW5pdGlhbFByb3BzLFxuICAgIHN0eWxlczogWy4uLlJlYWN0LkNoaWxkcmVuLnRvQXJyYXkoaW5pdGlhbFByb3BzLnN0eWxlcyksIHNoZWV0cy5nZXRTdHlsZUVsZW1lbnQoKV0sXG4gIH07XG59OyJdLCJuYW1lcyI6WyJSZWFjdCIsIkRvY3VtZW50IiwiSHRtbCIsIkhlYWQiLCJNYWluIiwiTmV4dFNjcmlwdCIsIlNlcnZlclN0eWxlU2hlZXRzIiwiTXlEb2N1bWVudCIsInJlbmRlciIsImxhbmciLCJsaW5rIiwicmVsIiwiaHJlZiIsImJvZHkiLCJnZXRJbml0aWFsUHJvcHMiLCJjdHgiLCJzaGVldHMiLCJvcmlnaW5hbFJlbmRlclBhZ2UiLCJyZW5kZXJQYWdlIiwiZW5oYW5jZUFwcCIsIkFwcCIsInByb3BzIiwiY29sbGVjdCIsImluaXRpYWxQcm9wcyIsInN0eWxlcyIsIkNoaWxkcmVuIiwidG9BcnJheSIsImdldFN0eWxlRWxlbWVudCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_document.js\n");

/***/ }),

/***/ "@mui/styles":
/*!******************************!*\
  !*** external "@mui/styles" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@mui/styles");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./pages/_document.js")));
module.exports = __webpack_exports__;

})();
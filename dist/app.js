/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/app/TodoItem.tsx":
/*!*****************************************!*\
  !*** ./src/components/app/TodoItem.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Mode_1 = __webpack_require__(/*! ../../constants/Mode */ \"./src/constants/Mode.ts\");\r\nvar Keys_1 = __webpack_require__(/*! ../../constants/Keys */ \"./src/constants/Keys.ts\");\r\nvar DomCreator = __importStar(__webpack_require__(/*! ../../view/DomCreator */ \"./src/view/DomCreator.ts\"));\r\nvar Dynamic_1 = __webpack_require__(/*! ../../models/core/Dynamic */ \"./src/models/core/Dynamic.ts\");\r\nvar Revealer_1 = __webpack_require__(/*! ../common/Revealer */ \"./src/components/common/Revealer.ts\");\r\nfunction TodoItem(props) {\r\n    var item = props.item;\r\n    var mode = Dynamic_1.dynamic(Mode_1.Mode.Normal);\r\n    var showEdit = Dynamic_1.derived([mode], function () { return mode.get() === Mode_1.Mode.Edit; });\r\n    var editInput = Dynamic_1.dynamic();\r\n    var newText = Dynamic_1.derived([item.text], function () { return item.text.get(); });\r\n    function toggleItem() {\r\n        item.ticked.set(!item.ticked.get());\r\n    }\r\n    function updateText(e) {\r\n        newText.set(e.target.value);\r\n    }\r\n    function setMode(newMode) {\r\n        mode.set(newMode);\r\n        props.onmodechange(newMode);\r\n    }\r\n    function editMode() {\r\n        setMode(Mode_1.Mode.Edit);\r\n        var input = editInput.get();\r\n        input.focus();\r\n        input.setSelectionRange(input.value.length, input.value.length);\r\n    }\r\n    function enterNewText() {\r\n        var newTextValue = newText.get();\r\n        if (!newTextValue.length) {\r\n            removeItem();\r\n        }\r\n        else {\r\n            item.text.set(newTextValue);\r\n        }\r\n        setMode(Mode_1.Mode.Normal);\r\n    }\r\n    function editTextKeydown(e) {\r\n        if (e.which === Keys_1.Keys.Enter) {\r\n            enterNewText();\r\n        }\r\n    }\r\n    function removeItem() {\r\n        props.onremove(item);\r\n    }\r\n    return [(DomCreator.createElement(DomCreator.Fragment, null,\r\n            DomCreator.createElement(\"div\", { className: \"view\" },\r\n                DomCreator.createElement(\"input\", { className: \"toggle\", type: \"checkbox\", checked: item.ticked, onclick: toggleItem }),\r\n                DomCreator.createElement(\"label\", { ondblclick: editMode }, item.text),\r\n                DomCreator.createElement(\"button\", { className: \"destroy\", onclick: removeItem })),\r\n            DomCreator.createElement(Revealer_1.Revealer, { show: showEdit },\r\n                DomCreator.createElement(\"input\", { autocomplete: \"off\", spellcheck: false, ref: editInput, type: \"input\", className: \"edit\", oninput: updateText, onblur: enterNewText, onkeydown: editTextKeydown, value: item.text })))), function () {\r\n            mode.destroy();\r\n            showEdit.destroy();\r\n        }];\r\n}\r\nexports.TodoItem = TodoItem;\r\n\n\n//# sourceURL=webpack:///./src/components/app/TodoItem.tsx?");

/***/ }),

/***/ "./src/components/app/TodoList.tsx":
/*!*****************************************!*\
  !*** ./src/components/app/TodoList.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Status_1 = __webpack_require__(/*! ../../constants/Status */ \"./src/constants/Status.ts\");\r\nvar Keys_1 = __webpack_require__(/*! ../../constants/Keys */ \"./src/constants/Keys.ts\");\r\nvar Mode_1 = __webpack_require__(/*! ../../constants/Mode */ \"./src/constants/Mode.ts\");\r\nvar ListItems_1 = __webpack_require__(/*! ../../models/ListItems */ \"./src/models/ListItems.ts\");\r\nvar Dynamic_1 = __webpack_require__(/*! ../../models/core/Dynamic */ \"./src/models/core/Dynamic.ts\");\r\nvar DomCreator = __importStar(__webpack_require__(/*! ../../view/DomCreator */ \"./src/view/DomCreator.ts\"));\r\nvar events_1 = __webpack_require__(/*! ../../utils/events */ \"./src/utils/events.ts\");\r\nvar Revealer_1 = __webpack_require__(/*! ../common/Revealer */ \"./src/components/common/Revealer.ts\");\r\nvar List_1 = __webpack_require__(/*! ../common/List */ \"./src/components/common/List.ts\");\r\nvar ToggleLink_1 = __webpack_require__(/*! ../ui/ToggleLink */ \"./src/components/ui/ToggleLink.tsx\");\r\nvar TodoItem_1 = __webpack_require__(/*! ./TodoItem */ \"./src/components/app/TodoItem.tsx\");\r\nfunction TodoList() {\r\n    var listItems = new ListItems_1.ListItems(getItems());\r\n    if (!window.location.hash) {\r\n        window.location.hash = '#/';\r\n    }\r\n    var status = Dynamic_1.dynamic(getStatusFromUrl());\r\n    var inputText = Dynamic_1.dynamic('');\r\n    var tickedItems = Dynamic_1.derived([listItems.list], function () {\r\n        return listItems.list.get().map(function (item) { return item.ticked; });\r\n    });\r\n    var tickedItemUpdates = Dynamic_1.derived(tickedItems);\r\n    var textItems = Dynamic_1.derived([listItems.list], function () {\r\n        return listItems.list.get().map(function (item) { return item.text; });\r\n    });\r\n    var textItemUpdates = Dynamic_1.derived(textItems);\r\n    var tickedListChanges = Dynamic_1.derived([listItems.list, tickedItemUpdates]);\r\n    var allListChanges = Dynamic_1.derived([tickedListChanges, textItemUpdates]);\r\n    var visibleListItems = Dynamic_1.derived([tickedListChanges, status], function () {\r\n        switch (status.get()) {\r\n            default:\r\n            case Status_1.Status.All:\r\n                return listItems.list.get();\r\n            case Status_1.Status.Active:\r\n                return listItems.list.get().filter(function (item) { return !item.ticked.get(); });\r\n            case Status_1.Status.Completed:\r\n                return listItems.list.get().filter(function (item) { return item.ticked.get(); });\r\n        }\r\n    });\r\n    var allTicked = Dynamic_1.derived([tickedListChanges], function () {\r\n        return listItems.list.get().every(function (newListItem) { return newListItem.ticked.get(); });\r\n    });\r\n    var showList = Dynamic_1.derived([listItems.list], function () {\r\n        return listItems.list.get().length > 0;\r\n    });\r\n    var remainingText = Dynamic_1.derived([tickedListChanges], function () {\r\n        var count = listItems.list.get().filter(function (item) { return !item.ticked.get(); }).length;\r\n        return count + \" item\" + (count !== 1 ? 's' : '') + \" left\";\r\n    });\r\n    var showClear = Dynamic_1.derived([tickedListChanges], function () {\r\n        return listItems.list.get().some(function (item) { return item.ticked.get(); });\r\n    });\r\n    function getStatusFromUrl() {\r\n        var newStatus = window.location.hash.substring(1);\r\n        if (Status_1.statusUrlMap.has(newStatus)) {\r\n            return Status_1.statusUrlMap.get(newStatus);\r\n        }\r\n        return Status_1.Status.All;\r\n    }\r\n    function getItems() {\r\n        var store = localStorage.getItem('todo');\r\n        if (!store) {\r\n            return [];\r\n        }\r\n        var storeObject = JSON.parse(store);\r\n        if (!storeObject) {\r\n            return [];\r\n        }\r\n        return storeObject.items.map(function (item) { return ({\r\n            ticked: Dynamic_1.dynamic(item.ticked),\r\n            text: Dynamic_1.dynamic(item.text)\r\n        }); });\r\n    }\r\n    function storeItems() {\r\n        var storeObject = {\r\n            items: listItems.list.get().map(function (item) { return ({\r\n                ticked: item.ticked.get(),\r\n                text: item.text.get()\r\n            }); })\r\n        };\r\n        localStorage.setItem('todo', JSON.stringify(storeObject));\r\n    }\r\n    function urlHashChange() {\r\n        var newStatus = getStatusFromUrl();\r\n        if (newStatus) {\r\n            status.set(newStatus);\r\n        }\r\n    }\r\n    function clearCompleted() {\r\n        listItems.clearCompleted();\r\n    }\r\n    function setNewText(e) {\r\n        inputText.set(e.target.value);\r\n    }\r\n    function addItem() {\r\n        var text = inputText.get();\r\n        if (text.length) {\r\n            listItems.addListItem(text);\r\n            inputText.set('');\r\n        }\r\n    }\r\n    function newTextKeydown(e) {\r\n        if (e.which === Keys_1.Keys.Enter) {\r\n            addItem();\r\n        }\r\n    }\r\n    function toggleAllTicked() {\r\n        listItems.toggleAllItems();\r\n    }\r\n    function removeItem(item) {\r\n        listItems.removeItem(item);\r\n    }\r\n    window.addEventListener('hashchange', urlHashChange);\r\n    events_1.on(allListChanges, 'change', listItems, function () {\r\n        storeItems();\r\n    });\r\n    return [(DomCreator.createElement(\"section\", { className: \"todoapp\" },\r\n            DomCreator.createElement(\"header\", { className: \"header\" },\r\n                DomCreator.createElement(\"h1\", null, \"todos\"),\r\n                DomCreator.createElement(\"input\", { className: \"new-todo\", autocomplete: \"off\", spellcheck: false, onblur: addItem, onkeydown: newTextKeydown, oninput: setNewText, value: inputText, placeholder: \"What needs to be done?\", autofocus: true })),\r\n            DomCreator.createElement(Revealer_1.Revealer, { show: showList },\r\n                DomCreator.createElement(\"section\", { className: \"main\" },\r\n                    DomCreator.createElement(\"input\", { id: \"toggle-all\", className: \"toggle-all\", type: \"checkbox\", onclick: toggleAllTicked, checked: allTicked }),\r\n                    DomCreator.createElement(\"label\", { htmlFor: \"toggle-all\" }, \"Mark all as complete\"),\r\n                    DomCreator.createElement(\"ul\", { className: \"todo-list\" },\r\n                        DomCreator.createElement(List_1.List, { collection: visibleListItems, func: function (item) {\r\n                                var itemMode = Mode_1.Mode.Normal;\r\n                                var determineCompleted = function () {\r\n                                    var classes = [];\r\n                                    if (item.ticked.get()) {\r\n                                        classes.push('completed');\r\n                                    }\r\n                                    if (itemMode === Mode_1.Mode.Edit) {\r\n                                        classes.push('editing');\r\n                                    }\r\n                                    return classes.join(' ');\r\n                                };\r\n                                var completedClassName = Dynamic_1.dynamic(determineCompleted(), [item.ticked], determineCompleted);\r\n                                var changeMode = function (newMode) {\r\n                                    itemMode = newMode;\r\n                                    completedClassName.set(determineCompleted());\r\n                                };\r\n                                return [\r\n                                    DomCreator.createElement(\"li\", { className: completedClassName },\r\n                                        DomCreator.createElement(TodoItem_1.TodoItem, { item: item, onremove: removeItem, onmodechange: changeMode })),\r\n                                    function () {\r\n                                        completedClassName.destroy();\r\n                                    }\r\n                                ];\r\n                            } })),\r\n                    DomCreator.createElement(\"footer\", { className: \"footer\" },\r\n                        DomCreator.createElement(\"span\", { className: \"todo-count\" }, remainingText),\r\n                        DomCreator.createElement(\"ul\", { className: \"filters\" },\r\n                            DomCreator.createElement(\"li\", null,\r\n                                DomCreator.createElement(ToggleLink_1.ToggleLink, { item: status, value: Status_1.Status.All }, \"All\")),\r\n                            DomCreator.createElement(\"li\", null,\r\n                                DomCreator.createElement(ToggleLink_1.ToggleLink, { item: status, value: Status_1.Status.Active }, \"Active\")),\r\n                            DomCreator.createElement(\"li\", null,\r\n                                DomCreator.createElement(ToggleLink_1.ToggleLink, { item: status, value: Status_1.Status.Completed }, \"Completed\"))),\r\n                        DomCreator.createElement(Revealer_1.Revealer, { show: showClear },\r\n                            DomCreator.createElement(\"button\", { className: \"clear-completed\", onclick: clearCompleted }, \"Clear completed\"))))))), function () {\r\n            events_1.off(allListChanges, 'change', listItems);\r\n            window.removeEventListener('hashchange', urlHashChange);\r\n            listItems.destroy();\r\n            status.destroy();\r\n            inputText.destroy();\r\n            tickedItems.destroy();\r\n            tickedItemUpdates.destroy();\r\n            visibleListItems.destroy();\r\n            allTicked.destroy();\r\n            showList.destroy();\r\n            remainingText.destroy();\r\n            showClear.destroy();\r\n            allListChanges.destroy();\r\n        }];\r\n}\r\nexports.TodoList = TodoList;\r\n\n\n//# sourceURL=webpack:///./src/components/app/TodoList.tsx?");

/***/ }),

/***/ "./src/components/common/List.ts":
/*!***************************************!*\
  !*** ./src/components/common/List.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar DomCreator_1 = __webpack_require__(/*! ../../view/DomCreator */ \"./src/view/DomCreator.ts\");\r\nvar Dynamic_1 = __webpack_require__(/*! ../../models/core/Dynamic */ \"./src/models/core/Dynamic.ts\");\r\nfunction List(props, children) {\r\n    function iterate(iterateProps) {\r\n        if (props.item)\r\n            props.item.set(iterateProps.item);\r\n        if (props.index)\r\n            props.index.set(iterateProps.index);\r\n        return [DomCreator_1.createFragment(children), function () { }];\r\n    }\r\n    var getDynamicContents;\r\n    var getContents;\r\n    var destructors;\r\n    var isDynamic = props.collection instanceof Dynamic_1.Dynamic;\r\n    if (props.func) {\r\n        destructors = [];\r\n        getContents = function (items) {\r\n            return items.map(function (item, index) {\r\n                var itemFuncResults = props.func(item, index);\r\n                destructors.push(itemFuncResults[1]);\r\n                return itemFuncResults[0];\r\n            });\r\n        };\r\n        if (isDynamic) {\r\n            getDynamicContents = function () {\r\n                destructors.forEach(function (destructor) { return destructor(); });\r\n                destructors = [];\r\n                return getContents(props.collection.get());\r\n            };\r\n        }\r\n    }\r\n    else {\r\n        getContents = function (items) {\r\n            return items.map(function (item, index) { return DomCreator_1.createFunction(iterate, { item: item, index: index }); });\r\n        };\r\n        if (isDynamic) {\r\n            getDynamicContents = function () { return getContents(props.collection.get()); };\r\n        }\r\n    }\r\n    var newChildren;\r\n    if (isDynamic) {\r\n        var collection = props.collection;\r\n        newChildren = Dynamic_1.dynamic(getContents(collection.get()), [collection], getDynamicContents);\r\n    }\r\n    else {\r\n        newChildren = getContents(props.collection);\r\n    }\r\n    return [DomCreator_1.createFragment(newChildren), function () {\r\n            if (newChildren instanceof Dynamic_1.Dynamic) {\r\n                newChildren.destroy();\r\n            }\r\n            if (destructors) {\r\n                destructors.forEach(function (destructor) { return destructor(); });\r\n            }\r\n        }];\r\n}\r\nexports.List = List;\r\n\n\n//# sourceURL=webpack:///./src/components/common/List.ts?");

/***/ }),

/***/ "./src/components/common/Revealer.ts":
/*!*******************************************!*\
  !*** ./src/components/common/Revealer.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar DomCreator_1 = __webpack_require__(/*! ../../view/DomCreator */ \"./src/view/DomCreator.ts\");\r\nvar Dynamic_1 = __webpack_require__(/*! ../../models/core/Dynamic */ \"./src/models/core/Dynamic.ts\");\r\nfunction Revealer(props, children) {\r\n    function getContents(show) {\r\n        return show ? children : undefined;\r\n    }\r\n    var newChildren;\r\n    if (props.show instanceof Dynamic_1.Dynamic) {\r\n        var show_1 = props.show;\r\n        newChildren = Dynamic_1.dynamic(getContents(show_1.get()), [show_1], function () { return getContents(show_1.get()); });\r\n    }\r\n    else {\r\n        newChildren = getContents(props.show);\r\n    }\r\n    return [DomCreator_1.createFragment(newChildren), function () {\r\n            if (newChildren instanceof Dynamic_1.Dynamic) {\r\n                newChildren.destroy();\r\n            }\r\n        }];\r\n}\r\nexports.Revealer = Revealer;\r\n\n\n//# sourceURL=webpack:///./src/components/common/Revealer.ts?");

/***/ }),

/***/ "./src/components/ui/ToggleLink.tsx":
/*!******************************************!*\
  !*** ./src/components/ui/ToggleLink.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar DomCreator = __importStar(__webpack_require__(/*! ../../view/DomCreator */ \"./src/view/DomCreator.ts\"));\r\nvar Dynamic_1 = __webpack_require__(/*! ../../models/core/Dynamic */ \"./src/models/core/Dynamic.ts\");\r\nvar Status_1 = __webpack_require__(/*! ../../constants/Status */ \"./src/constants/Status.ts\");\r\nfunction ToggleLink(props, children) {\r\n    var linkClass = Dynamic_1.dynamic(getLinkClass(), [props.item], getLinkClass);\r\n    function getLinkClass() {\r\n        return props.item.get() === props.value ? 'selected' : '';\r\n    }\r\n    function setState() {\r\n        props.item.set(props.value);\r\n    }\r\n    return [(DomCreator.createElement(DomCreator.Fragment, null,\r\n            DomCreator.createElement(\"a\", { href: '#' + Status_1.inverseStatusUrlMap.get(props.value), className: linkClass, onclick: setState }, children))), function () {\r\n            linkClass.destroy();\r\n        }];\r\n}\r\nexports.ToggleLink = ToggleLink;\r\n\n\n//# sourceURL=webpack:///./src/components/ui/ToggleLink.tsx?");

/***/ }),

/***/ "./src/constants/Keys.ts":
/*!*******************************!*\
  !*** ./src/constants/Keys.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Keys;\r\n(function (Keys) {\r\n    Keys[Keys[\"Enter\"] = 13] = \"Enter\";\r\n})(Keys = exports.Keys || (exports.Keys = {}));\r\n;\r\n\n\n//# sourceURL=webpack:///./src/constants/Keys.ts?");

/***/ }),

/***/ "./src/constants/Mode.ts":
/*!*******************************!*\
  !*** ./src/constants/Mode.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Mode;\r\n(function (Mode) {\r\n    Mode[Mode[\"Normal\"] = 0] = \"Normal\";\r\n    Mode[Mode[\"Edit\"] = 1] = \"Edit\";\r\n})(Mode = exports.Mode || (exports.Mode = {}));\r\n\n\n//# sourceURL=webpack:///./src/constants/Mode.ts?");

/***/ }),

/***/ "./src/constants/Status.ts":
/*!*********************************!*\
  !*** ./src/constants/Status.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Status;\r\n(function (Status) {\r\n    Status[\"All\"] = \"all\";\r\n    Status[\"Active\"] = \"active\";\r\n    Status[\"Completed\"] = \"completed\";\r\n})(Status = exports.Status || (exports.Status = {}));\r\nexports.statusUrlMap = new Map([\r\n    ['/', Status.All],\r\n    ['/active', Status.Active],\r\n    ['/completed', Status.Completed]\r\n]);\r\nexports.inverseStatusUrlMap = new Map();\r\nexports.statusUrlMap.forEach(function (value, key) { return exports.inverseStatusUrlMap.set(value, key); });\r\n\n\n//# sourceURL=webpack:///./src/constants/Status.ts?");

/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar DomCreator = __importStar(__webpack_require__(/*! ./view/DomCreator */ \"./src/view/DomCreator.ts\"));\r\nvar TodoList_1 = __webpack_require__(/*! ./components/app/TodoList */ \"./src/components/app/TodoList.tsx\");\r\nfunction load() {\r\n    var todoList = DomCreator.render(DomCreator.createElement(TodoList_1.TodoList, null));\r\n    document.body.appendChild(todoList[0]);\r\n}\r\nfunction bootstrap() {\r\n    if (document.readyState === 'loading') {\r\n        document.addEventListener('DOMContentLoaded', function () { return load(); });\r\n    }\r\n    else {\r\n        load();\r\n    }\r\n}\r\nbootstrap();\r\n\n\n//# sourceURL=webpack:///./src/index.tsx?");

/***/ }),

/***/ "./src/models/ListItems.ts":
/*!*********************************!*\
  !*** ./src/models/ListItems.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar DynamicList_1 = __webpack_require__(/*! ./core/DynamicList */ \"./src/models/core/DynamicList.ts\");\r\nvar Dynamic_1 = __webpack_require__(/*! ./core/Dynamic */ \"./src/models/core/Dynamic.ts\");\r\nvar ListItems = (function () {\r\n    function ListItems(items) {\r\n        this.list = new DynamicList_1.DynamicList(items || []);\r\n    }\r\n    ListItems.prototype.addListItem = function (text) {\r\n        this.list.add({\r\n            text: new Dynamic_1.Dynamic(text),\r\n            ticked: new Dynamic_1.Dynamic(false)\r\n        });\r\n    };\r\n    ListItems.prototype.toggleAllItems = function () {\r\n        var allTicked = !this.list.get().some(function (item) { return !item.ticked.get(); }), newTickStatus = allTicked ? false : true;\r\n        this.list.get().forEach(function (item) {\r\n            item.ticked.set(newTickStatus);\r\n        });\r\n    };\r\n    ListItems.prototype.removeItem = function (item) {\r\n        item.text.destroy();\r\n        item.ticked.destroy();\r\n        this.list.removeValue(item);\r\n    };\r\n    ListItems.prototype.clearCompleted = function () {\r\n        var _this = this;\r\n        var listCopy = this.list.get().slice();\r\n        listCopy.reverse().forEach(function (item) {\r\n            if (item.ticked.get()) {\r\n                _this.removeItem(item);\r\n            }\r\n        });\r\n    };\r\n    ListItems.prototype.destroy = function () {\r\n        var _this = this;\r\n        this.list.get().slice().reverse().forEach(function (item) {\r\n            _this.removeItem(item);\r\n        });\r\n        this.list.destroy();\r\n    };\r\n    return ListItems;\r\n}());\r\nexports.ListItems = ListItems;\r\n\n\n//# sourceURL=webpack:///./src/models/ListItems.ts?");

/***/ }),

/***/ "./src/models/core/CleanFunction.ts":
/*!******************************************!*\
  !*** ./src/models/core/CleanFunction.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar CleanFunction = (function () {\r\n    function CleanFunction(func) {\r\n        this.func = func;\r\n    }\r\n    return CleanFunction;\r\n}());\r\nexports.CleanFunction = CleanFunction;\r\n\n\n//# sourceURL=webpack:///./src/models/core/CleanFunction.ts?");

/***/ }),

/***/ "./src/models/core/Dynamic.ts":
/*!************************************!*\
  !*** ./src/models/core/Dynamic.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar events_1 = __webpack_require__(/*! ../../utils/events */ \"./src/utils/events.ts\");\r\nfunction dynamic(value, dependencies, calculate) {\r\n    return new Dynamic(value, dependencies, calculate);\r\n}\r\nexports.dynamic = dynamic;\r\nfunction derived(dependencies, calculate) {\r\n    var initialValue = calculate ? calculate() : undefined;\r\n    return new Dynamic(initialValue, dependencies, calculate);\r\n}\r\nexports.derived = derived;\r\nvar Dynamic = (function () {\r\n    function Dynamic(value, dependencies, calculate) {\r\n        var _this = this;\r\n        this.needsUpdate = false;\r\n        this.value = value;\r\n        this.calculate = calculate;\r\n        if (dependencies) {\r\n            this.dependencies = dependencies;\r\n            if (dependencies instanceof Dynamic) {\r\n                this.originalDepedencies = dependencies.get();\r\n                this.originalDepedencies.forEach(function (dependency) { return events_1.on(dependency, 'change', _this, function () { return _this.markUpdated(); }); });\r\n                events_1.on(dependencies, 'change', this, function () {\r\n                    _this.originalDepedencies.forEach(function (dependency) { return events_1.off(dependency, 'change', _this); });\r\n                    _this.dependencies.get().forEach(function (dependency) { return events_1.on(dependency, 'change', _this, function () { return _this.markUpdated(); }); });\r\n                });\r\n            }\r\n            else {\r\n                dependencies.forEach(function (dependency) { return events_1.on(dependency, 'change', _this, function () { return _this.markUpdated(); }); });\r\n            }\r\n        }\r\n    }\r\n    Dynamic.prototype.update = function () {\r\n        events_1.trigger(this, 'change');\r\n    };\r\n    Dynamic.prototype.markUpdated = function () {\r\n        this.needsUpdate = true;\r\n        this.update();\r\n    };\r\n    ;\r\n    Dynamic.prototype.destroy = function () {\r\n        var _this = this;\r\n        if (this.dependencies) {\r\n            if (this.dependencies instanceof Dynamic) {\r\n                events_1.off(this.dependencies, 'change', this);\r\n                this.dependencies.get().forEach(function (dependency) { return events_1.off(dependency, 'change', _this); });\r\n            }\r\n            else {\r\n                this.dependencies.forEach(function (dependency) { return events_1.off(dependency, 'change', _this); });\r\n            }\r\n        }\r\n    };\r\n    Dynamic.prototype.set = function (value, force) {\r\n        this.needsUpdate = false;\r\n        if (this.value === value && !force) {\r\n            return;\r\n        }\r\n        this.value = value;\r\n        this.update();\r\n    };\r\n    Dynamic.prototype.get = function () {\r\n        if (this.needsUpdate && this.calculate) {\r\n            this.needsUpdate = false;\r\n            this.value = this.calculate();\r\n        }\r\n        return this.value;\r\n    };\r\n    return Dynamic;\r\n}());\r\nexports.Dynamic = Dynamic;\r\n\n\n//# sourceURL=webpack:///./src/models/core/Dynamic.ts?");

/***/ }),

/***/ "./src/models/core/DynamicList.ts":
/*!****************************************!*\
  !*** ./src/models/core/DynamicList.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Dynamic_1 = __webpack_require__(/*! ./Dynamic */ \"./src/models/core/Dynamic.ts\");\r\nvar DynamicList = (function (_super) {\r\n    __extends(DynamicList, _super);\r\n    function DynamicList() {\r\n        return _super !== null && _super.apply(this, arguments) || this;\r\n    }\r\n    DynamicList.prototype.addItems = function (items) {\r\n        var _a;\r\n        if (items) {\r\n            (_a = this.value).push.apply(_a, items);\r\n        }\r\n    };\r\n    DynamicList.prototype.removeItems = function (indexes) {\r\n        var _this = this;\r\n        indexes.sort(function (a, b) { return b - a; }).some(function (index) {\r\n            if (index < 0) {\r\n                return true;\r\n            }\r\n            _this.value.splice(index, 1);\r\n        });\r\n    };\r\n    DynamicList.prototype.clear = function () {\r\n        this.value = new Array();\r\n        this.update();\r\n    };\r\n    DynamicList.prototype.add = function () {\r\n        var items = [];\r\n        for (var _i = 0; _i < arguments.length; _i++) {\r\n            items[_i] = arguments[_i];\r\n        }\r\n        this.addItems(items);\r\n        this.update();\r\n    };\r\n    DynamicList.prototype.remove = function () {\r\n        var indexes = [];\r\n        for (var _i = 0; _i < arguments.length; _i++) {\r\n            indexes[_i] = arguments[_i];\r\n        }\r\n        this.removeItems(indexes);\r\n        this.update();\r\n    };\r\n    DynamicList.prototype.removeValue = function () {\r\n        var _this = this;\r\n        var items = [];\r\n        for (var _i = 0; _i < arguments.length; _i++) {\r\n            items[_i] = arguments[_i];\r\n        }\r\n        this.removeItems(items.map(function (item) { return _this.value.indexOf(item); }));\r\n        this.update();\r\n    };\r\n    DynamicList.prototype.getItem = function (index) {\r\n        return this.value[index];\r\n    };\r\n    DynamicList.prototype.setItem = function (index, value) {\r\n        if (this.value[index] === value) {\r\n            return;\r\n        }\r\n        this.value[index] = value;\r\n        this.update();\r\n    };\r\n    return DynamicList;\r\n}(Dynamic_1.Dynamic));\r\nexports.DynamicList = DynamicList;\r\n\n\n//# sourceURL=webpack:///./src/models/core/DynamicList.ts?");

/***/ }),

/***/ "./src/utils/events.ts":
/*!*****************************!*\
  !*** ./src/utils/events.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar events = new WeakMap();\r\nfunction on(obj, eventName, owner, callback) {\r\n    if (events.has(obj)) {\r\n        var objEvents = events.get(obj);\r\n        if (objEvents.has(eventName)) {\r\n            var eventOwners = objEvents.get(eventName);\r\n            if (eventOwners.has(owner)) {\r\n                var eventFunctions = eventOwners.get(owner);\r\n                if (!eventFunctions.has(callback)) {\r\n                    eventFunctions.add(callback);\r\n                }\r\n            }\r\n            else {\r\n                eventOwners.set(owner, new Set([callback]));\r\n            }\r\n        }\r\n        else {\r\n            objEvents.set(eventName, new Map([\r\n                [owner, new Set([callback])]\r\n            ]));\r\n        }\r\n    }\r\n    else {\r\n        events.set(obj, new Map([\r\n            [eventName, new Map([\r\n                    [owner, new Set([callback])]\r\n                ])]\r\n        ]));\r\n    }\r\n}\r\nexports.on = on;\r\nfunction off(obj, eventName, owner, callback) {\r\n    if (!events.has(obj)) {\r\n        return;\r\n    }\r\n    if (eventName === undefined) {\r\n        events.delete(obj);\r\n        return;\r\n    }\r\n    var objEvents = events.get(obj);\r\n    if (!objEvents.has(eventName)) {\r\n        return;\r\n    }\r\n    if (owner === undefined) {\r\n        objEvents.delete(eventName);\r\n        return;\r\n    }\r\n    var eventOwners = objEvents.get(eventName);\r\n    if (!eventOwners.has(owner)) {\r\n        return;\r\n    }\r\n    if (callback === undefined) {\r\n        eventOwners.delete(owner);\r\n        return;\r\n    }\r\n    var eventFunctions = eventOwners.get(owner);\r\n    eventFunctions.delete(callback);\r\n}\r\nexports.off = off;\r\nfunction trigger(obj, eventName) {\r\n    var args = [];\r\n    for (var _i = 2; _i < arguments.length; _i++) {\r\n        args[_i - 2] = arguments[_i];\r\n    }\r\n    return __awaiter(this, void 0, void 0, function () {\r\n        var objEvents, eventOwners, funcs;\r\n        return __generator(this, function (_a) {\r\n            switch (_a.label) {\r\n                case 0:\r\n                    if (!events.has(obj)) {\r\n                        return [2];\r\n                    }\r\n                    objEvents = events.get(obj);\r\n                    if (!objEvents.has(eventName)) {\r\n                        return [2];\r\n                    }\r\n                    eventOwners = objEvents.get(eventName);\r\n                    funcs = new Array();\r\n                    eventOwners.forEach(function (eventOwner) {\r\n                        eventOwner.forEach(function (eventFunction) {\r\n                            funcs.push(eventFunction.apply(void 0, args));\r\n                        });\r\n                    });\r\n                    return [4, Promise.all(funcs)];\r\n                case 1: return [2, _a.sent()];\r\n            }\r\n        });\r\n    });\r\n}\r\nexports.trigger = trigger;\r\n\n\n//# sourceURL=webpack:///./src/utils/events.ts?");

/***/ }),

/***/ "./src/view/DomCreator.ts":
/*!********************************!*\
  !*** ./src/view/DomCreator.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar CleanFunction_1 = __webpack_require__(/*! ../models/core/CleanFunction */ \"./src/models/core/CleanFunction.ts\");\r\nvar Dynamic_1 = __webpack_require__(/*! ../models/core/Dynamic */ \"./src/models/core/Dynamic.ts\");\r\nvar events_1 = __webpack_require__(/*! ../utils/events */ \"./src/utils/events.ts\");\r\nvar FragmentNode = (function () {\r\n    function FragmentNode() {\r\n    }\r\n    return FragmentNode;\r\n}());\r\nexports.FragmentNode = FragmentNode;\r\nvar ElementNode = (function () {\r\n    function ElementNode() {\r\n    }\r\n    return ElementNode;\r\n}());\r\nexports.ElementNode = ElementNode;\r\nvar FunctionNode = (function () {\r\n    function FunctionNode() {\r\n    }\r\n    return FunctionNode;\r\n}());\r\nexports.FunctionNode = FunctionNode;\r\nexports.Fragment = {};\r\nfunction renderFragment(node) {\r\n    var fragment = document.createDocumentFragment();\r\n    if (!node.children) {\r\n        return [fragment, function () { }];\r\n    }\r\n    var destructors = new Array();\r\n    if (node.children instanceof Dynamic_1.Dynamic) {\r\n        var children_1 = node.children, nodeChildren = children_1.get(), entryNode_1 = document.createTextNode(''), exitNode_1 = document.createTextNode('');\r\n        fragment.appendChild(entryNode_1);\r\n        if (nodeChildren) {\r\n            var childNodes_1 = new Array();\r\n            nodeChildren.forEach(function (child) {\r\n                var childRender = render(child);\r\n                childNodes_1.push(childRender[0]);\r\n                destructors.push(childRender[1]);\r\n            });\r\n            childNodes_1.forEach(function (childNode) { return fragment.appendChild(childNode); });\r\n        }\r\n        fragment.appendChild(exitNode_1);\r\n        events_1.on(children_1, 'change', node, function () {\r\n            var newChildren = children_1.get();\r\n            var parentNode = exitNode_1.parentNode;\r\n            if (!parentNode) {\r\n                return;\r\n            }\r\n            var lastSibling = exitNode_1, prevSibling = lastSibling.previousSibling;\r\n            while (prevSibling !== entryNode_1) {\r\n                lastSibling = prevSibling;\r\n                prevSibling = lastSibling.previousSibling;\r\n                parentNode.removeChild(lastSibling);\r\n            }\r\n            destructors.forEach(function (destructor) { return destructor(); });\r\n            destructors = [];\r\n            if (newChildren) {\r\n                var childNodes_2 = new Array();\r\n                newChildren.forEach(function (child) {\r\n                    var childRender = render(child);\r\n                    childNodes_2.push(childRender[0]);\r\n                    destructors.push(childRender[1]);\r\n                });\r\n                childNodes_2.forEach(function (childNode) { return parentNode.insertBefore(childNode, exitNode_1); });\r\n            }\r\n        });\r\n    }\r\n    else {\r\n        var childNodes_3 = new Array();\r\n        node.children.forEach(function (child) {\r\n            var childRender = render(child);\r\n            childNodes_3.push(childRender[0]);\r\n            destructors.push(childRender[1]);\r\n        });\r\n        childNodes_3.forEach(function (childNode) { return fragment.appendChild(childNode); });\r\n    }\r\n    return [fragment, function () {\r\n            if (node.children instanceof Dynamic_1.Dynamic) {\r\n                events_1.off(node.children, 'change', node);\r\n            }\r\n            destructors.forEach(function (destructor) { return destructor(); });\r\n        }];\r\n}\r\nexports.renderFragment = renderFragment;\r\nfunction renderFunction(node) {\r\n    var result = node.func(node.props, node.children);\r\n    var renderedResult = render(result[0]);\r\n    return [renderedResult[0], function () {\r\n            renderedResult[1]();\r\n            result[1]();\r\n        }];\r\n}\r\nexports.renderFunction = renderFunction;\r\nfunction setAttributeValue(obj, key, value) {\r\n    if (value === undefined || value === null) {\r\n        delete obj[key];\r\n    }\r\n    else {\r\n        obj[key] = value;\r\n    }\r\n}\r\nexports.setAttributeValue = setAttributeValue;\r\nfunction setAttribute(element, propName, propValue) {\r\n    var destructor;\r\n    var dynamics;\r\n    if (propValue instanceof CleanFunction_1.CleanFunction) {\r\n        var valResult = propValue.func();\r\n        propValue = valResult[0];\r\n        destructor = valResult[1];\r\n    }\r\n    if (typeof propValue === 'object' && propValue !== null) {\r\n        dynamics = [];\r\n        var _loop_1 = function (key) {\r\n            var objValue = propValue[key];\r\n            if (objValue instanceof Dynamic_1.Dynamic) {\r\n                dynamics.push(objValue);\r\n                events_1.on(objValue, 'change', element, function () { return setAttributeValue(element[propName], key, objValue.get()); });\r\n                setAttributeValue(element[propName], key, objValue.get());\r\n            }\r\n            else {\r\n                setAttributeValue(element[propName], key, objValue);\r\n            }\r\n        };\r\n        for (var key in propValue) {\r\n            _loop_1(key);\r\n        }\r\n    }\r\n    else {\r\n        setAttributeValue(element, propName, propValue);\r\n    }\r\n    return function () {\r\n        if (dynamics) {\r\n            dynamics.forEach(function (dynamic) { return events_1.off(dynamic, 'change', element); });\r\n        }\r\n        if (destructor) {\r\n            destructor();\r\n        }\r\n    };\r\n}\r\nexports.setAttribute = setAttribute;\r\nfunction renderElement(node) {\r\n    var element = document.createElement(node.tagName);\r\n    var argDestructors;\r\n    var dynamics;\r\n    var fragmentDestructor;\r\n    var destructors;\r\n    if (node.args) {\r\n        argDestructors = new Map();\r\n        dynamics = [];\r\n        destructors = [];\r\n        var _loop_2 = function (argName) {\r\n            if (argName === 'ref') {\r\n                node.args[argName].set(element);\r\n                return \"continue\";\r\n            }\r\n            var nodeArgs = node.args;\r\n            var value = nodeArgs[argName];\r\n            if (value instanceof CleanFunction_1.CleanFunction) {\r\n                var valResult = value.func();\r\n                value = valResult[0];\r\n                destructors.push(valResult[1]);\r\n            }\r\n            if (value instanceof Dynamic_1.Dynamic) {\r\n                dynamics.push(value);\r\n                var argDestructor_1 = setAttribute(element, argName, value.get());\r\n                argDestructors.set(argName, argDestructor_1);\r\n                events_1.on(value, 'change', element, function () {\r\n                    if (argDestructor_1) {\r\n                        argDestructor_1();\r\n                    }\r\n                    argDestructor_1 = setAttribute(element, argName, value.get());\r\n                    argDestructors.set(argName, argDestructor_1);\r\n                });\r\n            }\r\n            else {\r\n                setAttribute(element, argName, value);\r\n            }\r\n        };\r\n        for (var argName in node.args) {\r\n            _loop_2(argName);\r\n        }\r\n    }\r\n    if (node.children) {\r\n        var fragmentResults = renderFragment(node);\r\n        element.appendChild(fragmentResults[0]);\r\n        fragmentDestructor = fragmentResults[1];\r\n    }\r\n    return [element, function () {\r\n            if (dynamics) {\r\n                dynamics.forEach(function (dynamic) { return events_1.off(dynamic, 'change', element); });\r\n            }\r\n            if (argDestructors) {\r\n                argDestructors.forEach(function (destructor) {\r\n                    if (destructor) {\r\n                        destructor();\r\n                    }\r\n                });\r\n            }\r\n            if (fragmentDestructor) {\r\n                fragmentDestructor();\r\n            }\r\n            if (destructors) {\r\n                destructors.forEach(function (destructor) { return destructor(); });\r\n            }\r\n        }];\r\n}\r\nexports.renderElement = renderElement;\r\nfunction serializePrintable(node) {\r\n    return (node === null || node === undefined) ? '' : '' + node;\r\n}\r\nexports.serializePrintable = serializePrintable;\r\nfunction renderPrintable(node) {\r\n    var textNode;\r\n    if (node instanceof Dynamic_1.Dynamic) {\r\n        textNode = document.createTextNode(serializePrintable(node.get()));\r\n        events_1.on(node, 'change', node, function () {\r\n            textNode.textContent = serializePrintable(node.get());\r\n        });\r\n    }\r\n    else {\r\n        textNode = document.createTextNode(serializePrintable(node));\r\n    }\r\n    return [textNode, function () {\r\n            if (node instanceof Dynamic_1.Dynamic) {\r\n                events_1.off(node, 'change', node);\r\n            }\r\n        }];\r\n}\r\nexports.renderPrintable = renderPrintable;\r\nfunction render(node) {\r\n    if (node instanceof FragmentNode) {\r\n        return renderFragment(node);\r\n    }\r\n    if (node instanceof ElementNode) {\r\n        return renderElement(node);\r\n    }\r\n    if (node instanceof FunctionNode) {\r\n        return renderFunction(node);\r\n    }\r\n    return renderPrintable(node);\r\n}\r\nexports.render = render;\r\nfunction createFunction(func, props, children) {\r\n    return Object.assign(new FunctionNode(), {\r\n        func: func,\r\n        props: props,\r\n        children: children\r\n    });\r\n}\r\nexports.createFunction = createFunction;\r\nfunction createFragment(children) {\r\n    return Object.assign(new FragmentNode(), {\r\n        children: children\r\n    });\r\n}\r\nexports.createFragment = createFragment;\r\nfunction createElement(tagName, args) {\r\n    var children = [];\r\n    for (var _i = 2; _i < arguments.length; _i++) {\r\n        children[_i - 2] = arguments[_i];\r\n    }\r\n    if (tagName === exports.Fragment) {\r\n        return createFragment(children);\r\n    }\r\n    switch (typeof tagName) {\r\n        case 'string':\r\n            return Object.assign(new ElementNode(), {\r\n                tagName: tagName,\r\n                args: args,\r\n                children: children\r\n            });\r\n        case 'function':\r\n            return createFunction(tagName, args, children);\r\n    }\r\n}\r\nexports.createElement = createElement;\r\n\n\n//# sourceURL=webpack:///./src/view/DomCreator.ts?");

/***/ })

/******/ });
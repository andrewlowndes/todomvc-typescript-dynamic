# TODO List UI App using Components

Using Typescript and JSX. The creation of a new reactive component framework, and a sample TODO list app.

Note: no Angular or React is used, instead a fast implementation based on dynamic values is employed.

An implementation of TodoMVC (http://todomvc.com/examples/vanilla-es6/#/) component-style using pure Typescript/JSX.

## Feature List:

- [x] Dynamic DOM support 
- [x] Attribute object parameter - support Dynamic
- [x] Attribute parameter - support Clean Functions
- [-] FunctionNode props - support Clean Functions
- [x] List supports custom func
- [x] Optimised DomCreator FragmentNode dynamic change
- [x] Optimised List component dynamic change
- [x] Lazy evaluation (run only when has registered listeners)
- [x] Element lifecycle events
- [ ] Remove need for dynamic destroy
- [ ] Clean up code

## 

The app can be loaded from `dist/index.html`.

## Build

Run `npm i` then `npm run build`. Alternatively run `npm run start` to use the webpack dev server.

## Components:

### TodoList

- new text field
  - blur / enter key functionality (add new list item)

- tick all toggle button
  - click functionality (change list item state)
  - styling (based on state)
  - visibility (based on number of items)

- list of todoItems
  - visibility (based on number of items)

- footer
  - visibility (based on number of items)

  - item count summary (with status unticked)
    - pluralisation
    - array count

  - list of Toggle Buttons to customise list view

  - clear completed button
    - visibility (based on items state)
    - click functionality (change list items)

### TodoItem

- tick toggle button
  - visiblity (based on edit mode)
  - style (based on item state)
  - click functionality (toggle item state)

- text
  - visibility (based on edit mode)
  - style (based on item state)
  - animated style

- edit text field
  - visibiliy
  - blur / enter key functionality (edit list item)

- remove button
  - visibility (based on edit mode and item hover)
  - click functionality (edit lists items)

### Toggle Button

- button
  - click functionality (change list items shown)
  - styling (based on all buttons state)

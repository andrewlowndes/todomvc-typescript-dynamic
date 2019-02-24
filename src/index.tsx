import * as DomCreator from './view/DomCreator';

import { TodoList } from './components/app/TodoList';

function load() {
  const todoList = DomCreator.render(<TodoList />);
  document.body.appendChild(todoList[0]);
}

function bootstrap() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => load());
  } else {
    load();
  }
}

bootstrap();

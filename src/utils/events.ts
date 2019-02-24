import { Callable } from './../interfaces/Callable';

type KeyType = string | number | symbol;
type ObjectCallables = Map<object, Set<Callable>>;
type ObjectEvents = WeakMap<object, Map<KeyType, ObjectCallables>>;

const events: ObjectEvents = new WeakMap();

export function on<F extends Callable = Callable>(obj: object, eventName: KeyType, owner: object, callback: F) {
  if (events.has(obj)) {
    const objEvents = events.get(obj);

    if (objEvents.has(eventName)) {
      const eventOwners = objEvents.get(eventName);

      if (eventOwners.has(owner)) {
        const eventFunctions = eventOwners.get(owner);

        if (!eventFunctions.has(callback)) {
          eventFunctions.add(callback);
        }
      } else {
        eventOwners.set(owner, new Set([callback]));
      }
    } else {
      objEvents.set(eventName, new Map([
        [owner, new Set([callback])]
      ]));
    }
  } else {
    events.set(obj, new Map([
      [eventName, new Map([
        [owner, new Set([callback])]
      ])]
    ]));
  }
}

export function off<F extends Callable = Callable>(obj: object, eventName?: KeyType, owner?: object, callback?: F) {
  if (!events.has(obj)) {
    return;
  }

  if (eventName === undefined) {
    events.delete(obj);
    return;
  }

  const objEvents = events.get(obj);

  if (!objEvents.has(eventName)) {
    return;
  }

  if (owner === undefined) {
    objEvents.delete(eventName);
    return;
  }

  const eventOwners = objEvents.get(eventName);
  
  if (!eventOwners.has(owner)) {
    return;
  }

  if (callback === undefined) {
    eventOwners.delete(owner);
    return;
  }

  const eventFunctions = eventOwners.get(owner);

  eventFunctions.delete(callback);
}

export async function trigger<F extends Callable = Callable>(obj: object, eventName: KeyType, ...args: Parameters<F>) {
  if (!events.has(obj)) {
    return;
  }

  const objEvents = events.get(obj);
  
  if (!objEvents.has(eventName)) {
    return;
  }

  const eventOwners = objEvents.get(eventName);

  const funcs = new Array<any>();

  eventOwners.forEach((eventOwner) => {
    eventOwner.forEach((eventFunction) => {
      funcs.push(eventFunction(...args));
    });
  });

  return await Promise.all(funcs);
}

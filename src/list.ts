import ListNode from "./listnode";
import from from "./list/from";
import reduce from "./list/reduce";

export default class List {
  private _length: number = 0;
  private _rear: ListNode = null;
  private _head: ListNode = null;
  [Symbol.iterator]() {
    let currentNode = this._head;
    return {
      next() {
        currentNode = currentNode.nextNode;
        return {
          done: !currentNode,
          value: currentNode && currentNode.value
        };
      }
    };
  }

  get length() {
    return this._length;
  }

  get rear() {
    return this._rear;
  }

  get head() {
    return this._head;
  }

  constructor(...args) {
    if (args.length) {
      Object.assign(this, List.of(...args));
    } else {
      this._head = new ListNode();
      this._rear = this._head;
    }
  }

  static from(...args): List {
    return from.apply(this, args);
  }

  static of(...args): List {
    return List.from(args);
  }

  static isList(node): boolean {
    return node instanceof List;
  }

  push(value, key = null): void {
    let node = new ListNode(value, key);
    this._rear.insertAfter(node);
    this._rear = node;
    this._length++;
  }

  pop(): ListNode {
    let node = null;
    if (this._length > 0) {
      this._rear = this._rear.prevNode;
      node = this._rear.deleteAfter();
      this._length--;
    }
    return node || new ListNode();
  }

  shift(): ListNode {
    let node = null;
    if (this._length > 0) {
      node = this._head.deleteAfter();
      this._length--;
    }
    return node || new ListNode();
  }

  unshift(value, key = null): void {
    let node = new ListNode(value, key);
    this._head.insertAfter(node);
    this._length++;
  }

  reduce(callback, initialValue) {
    return reduce.call(this, callback, initialValue);
  }

  // Like c++ std::list::front
  front(): ListNode {
    return this._head.nextNode;
  }
}

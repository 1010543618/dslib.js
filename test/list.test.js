const List = require("../dist/list");

beforeAll(() => {
  global.testList = new List(
    1,
    "zxc",
    [1, 2, 3],
    { 1: "zxc", 2: "zxc", 3: "zxc" },
    new List("1", "2", "3")
  );
});

test("List", () => {
  let arr = [...testList];
  expect(arr.slice(0, 4)).toEqual([
    1,
    "zxc",
    [1, 2, 3],
    { 1: "zxc", 2: "zxc", 3: "zxc" }
  ]);
  expect(arr[4] instanceof List).toBeTruthy();
});

test("List.length", () => {
  expect(testList.length).toEqual(5);
});

test("List.from()", () => {
  // Array
  let testList = List.from([1, 2, 3, "zxc"]);
  expect([...testList]).toEqual([1, 2, 3, "zxc"]);
  testList = List.from([1, 2, 3], x => x * 2);
  expect([...testList]).toEqual([2, 4, 6]);

  // this implementation does not support generic iterables as defined in the 6th edition of ECMA-262.
  /*
  // Set
  testList = List.from(new Set([1, 2, 3, 'zxc', 1]));
  expect([...testList]).toEqual([1, 2, 3, 'zxc']);

  // Map
  testList = List.from(new Map([[1, 2], [2, 4], [4, 8]]));
  expect([...testList]).toEqual([[1, 2], [2, 4], [4, 8]]);
  */
});

test("List.of()", () => {
  let testList = List.of(1, 2, 3, 4, 5, "zxc", "sad", "qwe");
  expect([...testList]).toEqual([1, 2, 3, 4, 5, "zxc", "sad", "qwe"]);
});

test("List.isList()", () => {
  expect(List.isList(testList)).toBeTruthy();
  expect(List.isList([])).toBeFalsy();
});

test("List.prototype.push(), List.unshift()", () => {
  let testList = new List();
  testList.push(123);
  testList.unshift(0);
  expect([...testList]).toEqual([0, 123]);
});

test("List.prototype.pop(), List.shift", () => {
  let testList = new List(0, 123);
  expect(testList.pop().value).toBe(123);
  expect(testList.shift().value).toBe(0);
  expect(testList.pop().value).toBeNull();
  expect(testList.shift().value).toBeNull();
  expect([...testList]).toEqual([]);
});

test("List.prototype.reduce()", () => {
  let testList = new List(2, 3, 4);
  expect(testList.reduce((sum, cur) => sum + cur, 0)).toBe(9);
});

test("List.prototype.forEach()", () => {
  let testList = new List(1, 2, 3);
  expect([...testList.forEach((d, node) => node.setValue(node.value + 1))]).toEqual([2, 3, 4]);
});

test("List.prototype.sort()", () => {
  let testList = new List(9, 4, 8, 3, 1, 2, 5);
  expect([...testList.sort((a, b) => a - b)]).toEqual([2, 3, 4]);
  expect([...testList.sort((a, b) => b - a)]).toEqual([2, 3, 4]);
});

test("List.prototype.front()", () => {
  expect(testList.front().value).toBe(1);
});

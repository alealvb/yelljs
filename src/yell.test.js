const Yell = require('../dist/index.js');

test('hear and receive a number', () => {
  const value = 15;
  Yell.hear('testingNumber', (number) => {
    expect(number).toBe(value);
  });
  Yell.yell('testingNumber', value);
});

test('hear and receive a string', () => {
  const value = 'this is a string';
  Yell.hear('testingString', (str) => {
    expect(str).toBe(value);
  });
  Yell.yell('testingString', value);
});

test('hear and receive an object', () => {
  const value = { a: 12, b: 'string' };
  Yell.hear('testingObject', (obj) => {
    expect(obj).toBe(value);
  });
  Yell.yell('testingObject', value);
});

test('hear and receive multiple parameters', () => {
  const values = ['foo', 'bar', 123, 456]
  Yell.hear('testingMultiple', (...params) => {
    expect(params).toEqual(values);
  });
  Yell.yell('testingMultiple', ...values);
});

test('multiple hear to sum', () => {
  let sum = 0;
  Yell.hear('sum', () => {
    sum += 1;
  });
  Yell.yell('sum');
  Yell.yell('sum');
  expect(sum).toBe(2);
});

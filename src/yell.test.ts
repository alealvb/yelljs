import Yell, { hear, yell, mute } from './yell';

test('hear and receive a value', () => {
  const value = 'this is a string';
  hear('testingValue', (str: string) => {
    expect(str).toBe(value);
  });
  yell('testingValue', value);
});

test('hear and receive an object', () => {
  const value = { a: 12, b: 'string' };
  hear('testingObject', (obj: any) => {
    expect(obj).toBe(value);
  });
  yell('testingObject', value);
});

test('hear and receive multiple parameters', () => {
  const values = ['foo', 'bar', 123, 456]
  hear('testingMultiple', (...params: any[]) => {
    expect(params).toEqual(values);
  });
  yell('testingMultiple', ...values);
});

test('sum using hear and yell', () => {
  let total = 0;
  hear('sum', () => {
    total += 1;
  });
  yell('sum');
  yell('sum');
  expect(total).toBe(2);
});

test('unsubscribe/stop/mute', () => {
  let total = 0;
  const sumFunction = () => {
    total += 1;
  };
  hear('sum', sumFunction);
  yell('sum');
  mute('sum', sumFunction);
  yell('sum');
  expect(total).toBe(1);
});

test('hear should return a stop/mute function', () => {
  let total = 0;
  const sumFunction = () => {
    total += 1;
  };
  const stop = hear('sum', sumFunction);
  yell('sum');
  stop()
  yell('sum');
  expect(total).toBe(1);
});

test('creating own yell instance', () => {
  const yellInstance = new Yell();
  let total = 0;
  yellInstance.hear('plus', () => {
    total += 1;
  })
  yellInstance.yell('plus');
  expect(total).toBe(1);
});

test('yell instance must not affect global yell', () => {
  const yellInstance = new Yell();
  let total = 0;
  const plusTwo = () => {
    total = total + 2
  }
  yellInstance.hear('+2', plusTwo)

  // notice we are using 'global' yell here
  yell('+2');
  expect(total).toBe(0);
  
  yellInstance.yell('+2');
  expect(total).toBe(2);
});



import { isValidEmail, isValidPassword } from './validation';

describe('All should be a function', () => {
  [isValidEmail, isValidPassword].forEach((item) => {
    it(`${item?.name} should be a function`, () => {
      expect(typeof isValidEmail).toBe('function');
    });
  });
});

describe('Test suite for isValidPassword', () => {
  const testData = [
    { password: '', result: false },
    { password: '12345678', result: true },
    { password: '12345678901234567', result: false },
    { password: 'ascvbndsfgfd', result: true },
    { password: 'JHJKLHJKHFL', result: true },
    { password: 'aA!4567890123456', result: true }
  ];

  testData.forEach(({ password, result }) => {
    it(`should return ${result} for ${password}`, () => {
      expect(isValidPassword(password)).toBe(result);
    });
  });
});

describe('Test suite for isValidEmail', () => {
  const validTestData = [
    'simple@example.com',
    'very.common@example.com',
    'x@example.com',
    'long.email-address-with-hyphens@and.subdomains.example.com',
    'user.name+tag+sorting@example.com',
    'name/surname@example.com',
    'admin@example',
    'example@s.example',
    'mailhost!username@example.org'
  ];

  validTestData.forEach((email) => {
    it(`should return ${true} for ${email}`, () => {
      expect(isValidEmail(email)).toBe(true);
    });
  });

  const invalidTestData = [
    '',
    'abc.example.com',
    'a@b@c@example.com',
    // eslint-disable-next-line no-useless-escape
    'a"b(c)d,e:f;g<h>i[jk]l@example.com',
    'just"not"right@example.com'
    // eslint-disable-next-line max-len
    // '1234567890123456789012345678901234567890123456789012345678901234+x@example.com'
  ];

  invalidTestData.forEach((email) => {
    it(`should return ${false} for ${email}`, () => {
      expect(isValidEmail(email)).toBe(false);
    });
  });
});

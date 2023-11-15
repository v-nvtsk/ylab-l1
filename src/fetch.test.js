import fetch from './fetch';

describe('Fetch test', () => {
  it('fetch should be a function', () => {
    expect(typeof fetch).toBe('function');
  });

  let url;
  let options = {};
  describe('fetch method="POST"', () => {
    beforeEach(() => {
      url = 'https://anyurl.com/api/login';
      options = {
        method: 'POST'
      };
    });

    it('fetch should return promise', async () => {
      const response = fetch(url, options);
      expect(typeof response).toBe('object');
    });
    it('fetch should return status 200', async () => {
      const response = await fetch(url, options);
      expect(response.status).toBe(200);
    });
    it('fetch should return json', async () => {
      const response = await fetch(url, options);
      expect(typeof response.json).toBe('function');
      expect(response.json()).resolves.toEqual({ message: 'success', token: 'some_token' });
    });
  });

  describe('fetch method="GET"', () => {
    beforeEach(() => {
      url = 'https://anyurl.com/api/login';
      options = {
        method: 'GET'
      };
    });
    it('fetch should return promise', async () => {
      const response = fetch(url, options);
      expect(typeof response).toBe('object');
    });
    it('fetch should return status 400', async () => {
      const response = await fetch(url, options);
      expect(response.status).toBe(400);
      expect(response.json()).resolves.toEqual({ message: 'error' });
    });
  });
});

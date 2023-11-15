export default function fetch(url, options) {
  if (options.method === 'POST') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 200,
          json: () =>
            new Promise((resolveJSON) => {
              resolveJSON({
                message: 'success',
                token: 'some_token'
              });
            })
        });
      }, 1000);
    });
  }
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          status: 400,
          json: () =>
            new Promise((resolveJSON) => {
              resolveJSON({
                message: 'error'
              });
            })
        }),
      1000
    );
  });
}

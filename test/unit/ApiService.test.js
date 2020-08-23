import ApiService from 'ApiService';

describe('ApiService', () => {
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({'test': 'response'})
    }));
    let apiService = new ApiService();

    describe('send', () => {
       it('use fetch and return json', () => {
          apiService.send('login', 'POST', {'username': 'MKathy'}).then((response) => {
              expect(global.fetch).toBeCalled();
              expect(response).toStrictEqual({'test': 'response'});
          });
       });
    });
});
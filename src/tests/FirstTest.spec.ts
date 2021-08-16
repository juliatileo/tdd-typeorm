import User from '../models/User';

test('it should be ok', () => {
  const user = new User('teste', 12);

  expect(user.name).toEqual('teste');
});

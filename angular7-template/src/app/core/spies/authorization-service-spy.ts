import { AuthService } from '../services';

export const authorizationServiceSpyFactory = () => {
  const spy = jasmine.createSpyObj<AuthService>('AuthService', [
    'signIn',
    'signOut',
    'isAuth'
  ]);

  return spy;
};

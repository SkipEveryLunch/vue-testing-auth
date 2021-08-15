import App from './App.vue';
import { render, screen } from '@testing-library/vue';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import router from './router';
import store from './store';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const userData = {
  id: 1,
  name: 'John Smith',
  email: 'js@test.io',
};

const server = setupServer(
  rest.post('/api/login', (req, res, ctx) => {
    return res(ctx.status(200), ctx.cookie('token', '12345'));
  }),
  rest.delete('/api/logout', (req, res, ctx) => {
    return res(ctx.status(204), ctx.cookie('token', null));
  }),
  rest.get('/api/currentUser', (req, res, ctx) => {
    const { token } = req.cookies;
    if (token === '12345') {
      return res(ctx.status(200), ctx.json(userData));
    } else {
      return res(ctx.status(404), ctx.json({ message: 'user not found' }));
    }
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());

it('should not display logout before loggin in', async () => {
  render(App, {
    global: { plugins: [store, router] },
  });
  router.replace('/login');
  await router.isReady();
  const logoutLink = screen.queryByTestId('logout-link');
  expect(logoutLink).not.toBeInTheDocument();
});

it('should display logout after loggin in', async () => {
  render(App, {
    global: { plugins: [store, router] },
  });
  router.replace('/login');
  await router.isReady();
  const loginButton = screen.queryByTestId('login-btn');
  await userEvent.click(loginButton);
  const logoutLink = await screen.findByTestId('logout-link');
  expect(logoutLink).toBeInTheDocument();
});

it('should display logout link while logged in', async () => {
  render(App, {
    global: { plugins: [store, router] },
  });
  router.replace('/');
  await router.isReady();
  // const loginButton = screen.queryByTestId('login-btn');
  // await userEvent.click(loginButton);
  const logoutLink = await screen.findByTestId('logout-link');
  expect(logoutLink).toBeInTheDocument();
});

it('should not display login link while logged in', async () => {
  render(App, {
    global: { plugins: [store, router] },
  });
  router.replace('/');
  await router.isReady();
  const logoutLink = await screen.findByTestId('logout-link');
  expect(logoutLink).toBeInTheDocument();
});

it('should not display logout link after logged out', async () => {
  render(App, {
    global: { plugins: [store, router] },
  });
  router.replace('/');
  await router.isReady();
  const logoutLink = await screen.findByTestId('logout-link');
  await userEvent.click(logoutLink);
  await screen.findByTestId('login-link');
  expect(logoutLink).not.toBeInTheDocument();
});

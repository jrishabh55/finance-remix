import {
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useCatch
} from 'remix';
import styles from './tailwind.css';

export const meta: MetaFunction = () => {
  return { title: 'Finance helper for non financial people.' };
};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="dark">
        <div className="bg-primary/30 text-secondary dark:bg-background dark:text-secondary">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  switch (caught.status) {
    case 401: {
      return redirect('/login');
    }
    case 404: {
      throw new Error('404');
    }
    default: {
      throw new Error(`Unhandled error: ${caught.status}`);
    }
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="dark">
        <div className="flex bg-primary/30 text-secondary dark:bg-background dark:text-secondary h-screen w-screen items-center justify-center">
          <span className="text-4xl text-error">
            {error.message === '404' ? '404 Page not found' : 'Something went wrong.'}
          </span>
        </div>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

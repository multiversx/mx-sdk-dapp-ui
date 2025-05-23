let devTools: any = null;

interface IDevtoolsType extends Window {
  __REDUX_DEVTOOLS_EXTENSION__?: {
    connect: (options?: { name?: string }) => {
      init: (state?: unknown) => void;
      send: (action: string, state: unknown) => void;
    };
  };
}

if (typeof window !== 'undefined') {
  const reduxDevTools = (window as IDevtoolsType).__REDUX_DEVTOOLS_EXTENSION__;

  if (reduxDevTools) {
    devTools = reduxDevTools.connect({ name: 'sdk-dapp-ui' });
    devTools.init({});
  }
}

export function sendToDevtools(action: string, data: unknown) {
  if (!devTools) {
    return;
  }

  devTools.send(action, data);
}

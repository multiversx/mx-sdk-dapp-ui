interface IDevTools {
  init: (state?: unknown) => void;
  send: (action: string, state: unknown) => void;
}

interface IDevtoolsType extends Window {
  __REDUX_DEVTOOLS_EXTENSION__?: {
    connect: (options?: { name?: string }) => IDevTools;
  };
}

let devTools: IDevTools | null = null;

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

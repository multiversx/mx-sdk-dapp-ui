import type { IEventBus } from 'utils/EventBus';

type EventBusElement = HTMLElement & { getEventBus: () => Promise<IEventBus> };

export const publishTo = async (
  canvasElement: HTMLElement,
  tag: string,
  events: [string, unknown?][],
): Promise<IEventBus> => {
  const element = canvasElement.querySelector<EventBusElement>(tag);

  if (!element) {
    throw new Error(`publishTo: <${tag}> was not found in the story canvas.`);
  }

  await customElements.whenDefined(tag);
  const eventBus = await element.getEventBus();

  events.forEach(([name, payload]) => {
    eventBus.publish(name, payload);
  });

  return eventBus;
};

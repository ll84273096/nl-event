/* eslint-disable @typescript-eslint/no-explicit-any */
import { Event } from '../event';

const isFunction = (value: unknown): boolean => typeof value === 'function';

abstract class EventTarget {
    private listeners: Map<string | symbol, ((event: Event) => void)[]> = new Map();

    public addEventListener(type: string | symbol, listener: (event: Event) => void): void {
        if (!this.listeners.has(type)) {
            this.listeners.set(type, []);
        }
        if (isFunction(listener) && !this.listeners.get(type).includes(listener)) {
            this.listeners.get(type).push(listener);
        }
    }

    public removeEventListener(type: string | symbol, listener?: (event: Event) => void): void {
        if (this.listeners.has(type)) {
            if (isFunction(listener)) {
                this.listeners.get(type).splice(this.listeners.get(type).indexOf(listener), 1);
            } else {
                this.listeners.delete(type);
            }
        }
    }

    public removeAllEventListeners(): void {
        this.listeners.clear();
    }

    public dispatchEvent(event: Event): void {
        const type: string | symbol = event.type;
        if (this.listeners.has(type)) {
            this.listeners.get(type).forEach((listener: (event: Event) => void): void => {
                event.currentTarget = this;
                event.freeze();
                listener.call(this, event);
            });
        }
    }
}

export default EventTarget;

import { useSyncExternalStore } from 'react';
import { TIDIO_PUBLIC_KEY } from './constants';

/**
 * Tidio live chat (https://developers.tidio.com/docs/javascript-api).
 *
 * The widget draws its own chat bubble and window. Its colours, welcome
 * message and automations are set in the Tidio panel, not in this code.
 */

export interface TidioVisitor {
    distinct_id: string;
    email?: string;
    name?: string;
    phone?: string;
}

interface TidioChatApi {
    open: () => void;
    close: () => void;
    setVisitorData: (visitor: TidioVisitor) => void;
}

declare global {
    interface Window {
        tidioChatApi?: TidioChatApi;
    }
    interface Document {
        // Read by the widget when it starts
        tidioIdentify?: TidioVisitor;
    }
}

const SCRIPT_ID = 'tidio-chat-script';

let isReady = false;
let visitor: TidioVisitor | null = null;
const listeners = new Set<() => void>();

const handleReady = (): void => {
    isReady = true;
    if (visitor) window.tidioChatApi?.setVisitorData(visitor);
    listeners.forEach((notify) => notify());
};

/** Add the Tidio script to the page (once). */
export const loadTidio = (): void => {
    if (!TIDIO_PUBLIC_KEY || document.getElementById(SCRIPT_ID)) return;

    document.addEventListener('tidioChat-ready', handleReady, { once: true });

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = `https://code.tidio.co/${TIDIO_PUBLIC_KEY}.js`;
    script.async = true;
    document.body.appendChild(script);
};

/** Tell Tidio who the visitor is, so the team sees the customer's name and email in the chat. */
export const identifyTidioVisitor = (next: TidioVisitor): void => {
    visitor = next;
    document.tidioIdentify = next;
    if (isReady) window.tidioChatApi?.setVisitorData(next);
};

/** Open the chat window. Does nothing until the widget is ready. */
export const openTidioChat = (): void => {
    if (isReady) window.tidioChatApi?.open();
};

const subscribe = (notify: () => void) => {
    listeners.add(notify);
    return () => {
        listeners.delete(notify);
    };
};

/** True once the widget has loaded (false when it is turned off or blocked, e.g. by an ad blocker). */
export const useTidioReady = (): boolean => useSyncExternalStore(subscribe, () => isReady);

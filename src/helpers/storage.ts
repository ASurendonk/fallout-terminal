declare global {
    interface Window {
        storageManager: StorageManager;
    }
}

export enum StorageCode {
    color = "color",
}

export class StorageManager {
    getItem(code: StorageCode, orDefault?: any) {
        const item = localStorage.getItem(code);
        if (!item) {
            return orDefault;
        }
        return JSON.parse(item);
    }

    setItem(code: StorageCode, item: any) {
        localStorage.setItem(code, JSON.stringify(item));
    }

    deleteItem(code: StorageCode) {
        localStorage.removeItem(code);
    }
}

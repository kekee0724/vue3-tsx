import * as router from 'react-router-dom';

export interface PageWrap {
    goBack(e?: MouseEvent | boolean): void;
}

export type Match = router.match & { isExact?: boolean; params?: any; path?: string; url?: string; searchParams?: URLSearchParams };

export type Location = { pathname?: string; search?: string; hash?: string; state?: any };

export interface MessageInstance {
    info(content: React.ReactNode, duration?: number, onClose?: () => void): void;
    success(content: React.ReactNode, duration?: number, onClose?: () => void): void;
    error(content: React.ReactNode, duration?: number, onClose?: () => void): void;
    warning(content: React.ReactNode, duration?: number, onClose?: () => void): void;
    loading(content: React.ReactNode, duration?: number, onClose?: () => void): void;
}

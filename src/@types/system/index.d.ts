declare namespace Levi {
    namespace Config {
        /**
         * 客户端配置
         *
         * @interface Client
         */
        interface Client {
            title: string;
            /**
             * 资源配置
             *
             * @type {client.Config.Assets}
             * @memberof Client
             */
            Assets?: Client.Assets;
            tabBar?: Client.TabBar.Config;
            theme?: string;
            showheader: boolean;
            showloading: boolean;
            openMapLocation: boolean;
            mapKey?: string;
        }

        namespace Client {
            /**
             *  客户端资源配置
             *
             * @interface assets
             */
            interface Assets {
                Js?: (string | string[])[];

                Css?: (string | string[])[];
            }

            namespace TabBar {
                interface Config {
                    items: Item[];

                    isActive?: isActive;
                }

                type isActive = (type: string, item: Item) => boolean;

                interface Item {
                    icon: object | string;

                    selectedIcon?: object | string;

                    title: string;

                    key?: string;

                    type: string | number;
                }
            }
        }

        /**
         * 服务端配置
         *
         * @interface Server
         */
        interface Server {
            /**
             * Api Key
             *
             * @memberof Server
             */
            apiKey?: Server.ApiKey;

            /**
             * 认证配置信息
             *
             * @type {Server.Auth}
             * @memberof Server
             */
            auth?: Server.Auth;

            /**
             * 接口版本
             *
             * @type {(number | string)}
             * @memberof Server
             */
            apiVersion?: number | string;

            /**
             * 服务端访问地址
             *
             * @type {string}
             * @memberof Server
             */
            url?: string;
            /**
             * 联系方式
             *
             */
            userMobile?: any;
            /**
             * 使用位置信息及地图服务
             *
             */
            useLocation?: any;

            imgURL?: any;

            assetsUrl?: any;

            previewUrl?: any;

            h5url?: string;
            rsa?: any;
        }

        namespace Server {
            /**
             * Api Key
             *
             * @interface ApiKey
             */
            interface ApiKey {
                /**
                 * Api Key
                 *
                 * @type {string}
                 * @memberof Server
                 */
                apiKey: string;

                /**
                 * api Secret
                 *
                 * @type {string}
                 * @memberof Server
                 */
                secret: string;
            }

            /**
             * 认证配置
             *
             * @interface Auth
             */
            interface Auth {
                /**
                 * 认证控制器路径
                 *
                 * @type {string}
                 * @memberof Auth
                 */
                oauth2Url: string;
                /**
                 * 是否启用自动登录
                 *
                 * @type {boolean}
                 * @memberof Auth
                 */
                autoLogin: boolean;
                /**
                 * 是否启用自动刷新 Token
                 *
                 * @type {boolean}
                 * @memberof Auth
                 */
                autoRefreshToken: boolean;
                /**
                 * 是否启用匿名登录
                 *
                 * @type {boolean}
                 * @memberof Auth
                 */
                anonymousLogin: boolean;
            }
        }
    }
}

// 客户端配置
declare const client: Levi.Config.Client;

// 服务端配置
declare const server: Levi.Config.Server;

// 数组拓展
interface Array<T> {
    remove(v: T, deleteCount?: number): number | void;

    removeGrep<TResult = never>(fn: (v: T, index: number, array: this) => TResult, inv: TResult): T | void;

    removeGrepAll<TResult = never>(fn: (v: T, index: number, array: this) => TResult, inv: TResult): T[];

    groupBy(field: string): { key: string; value: T[] }[];

    treeSort(tmpl: string, rootLayer?: number, useVirtualRoot?: boolean): T[];

    treeChild(parentNode?: T): T[];

    add(...items: T[]): number;

    clear(): void;

    first(): T;

    last(): T;

    contains(item: T): boolean;
}

// 日期拓展
interface Date {
    dateDiff(interval: "y" | "m" | "d" | "w" | "h" | "n" | "s" | "l", date: Date): number | void;

    dateDiffDecimals(interval: "y" | "m" | "d" | "w" | "h" | "n" | "s" | "l", date: Date): number | void;

    dateAdd(interval: "s" | "n" | "h" | "d" | "w" | "q" | "m" | "y", number: number): Date;

    format(fmt: string): string;
}

// 数字拓展
interface Number {
    /**
     * 加
     *
     * @param {number} v 加数
     * @returns {number} 运算结果
     *
     * @memberOf Number
     */
    add(v: number): number;

    /**
     * 减
     *
     * @param {number} v 减数
     * @returns {number} 运算结果
     *
     * @memberOf Number
     */
    sub(v: number): number;

    /**
     * 乘
     *
     * @param {number} v 乘数
     * @returns {number} 运算结果
     *
     * @memberOf Number
     */
    mul(v: number): number;

    /**
     * 除
     *
     * @param {number} v 除数
     * @returns {number} 运算结果
     *
     * @memberOf Number
     */
    div(v: number): number;
}

// 字符串拓展
interface String {
    htmlInjectDecode(tagExp?: RegExp): string;

    htmlInjectEncode(tagExp?: RegExp): string;
}
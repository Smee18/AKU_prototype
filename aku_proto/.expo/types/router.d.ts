/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `${'/(tabs)'}/index` | `/index`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/entries` | `/entries`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/results` | `/results`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `${'/(tabs)'}/index` | `/index`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/entries` | `/entries`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/results` | `/results`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `${'/(tabs)'}/index${`?${string}` | `#${string}` | ''}` | `/index${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/entries${`?${string}` | `#${string}` | ''}` | `/entries${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/results${`?${string}` | `#${string}` | ''}` | `/results${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `${'/(tabs)'}/index` | `/index`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/entries` | `/entries`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/results` | `/results`; params?: Router.UnknownInputParams; };
    }
  }
}

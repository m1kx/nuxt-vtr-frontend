import { defineNuxtPlugin, useRuntimeConfig } from '#app';
import { Integrations } from "@sentry/tracing";
import * as Sentry from "@sentry/vue";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    const { vueApp } = nuxtApp;
    Sentry.init({
        app: [vueApp],
        dsn: "https://0f8251aac67d44f3835d55cfe5206683@o4504923258028032.ingest.sentry.io/4504923263205376",
        integrations: [
            new Integrations.BrowserTracing({
                routingInstrumentation: Sentry.vueRouterInstrumentation(nuxtApp.$router),
                tracingOrigins: ["m1kx.github.io", /^\//],
            }),
        ],
        logErrors: false,
        tracesSampleRate: config.SENTRY_TRACES_SAMPLE_RATE || 1.0,
        debug: config.SENTRY_ENABLE_DEBUG || false,
        environment: config.ENVIRONMENT || 'dev',
        beforeSend(event, hint) {
            if (event.exception) {
                console.error(`[Exeption handled by Sentry]: (${hint.originalException})`, { event, hint })
            }
            return event;
        },
    });

    vueApp.mixin(Sentry.createTracingMixins({ trackComponents: true, timeout: 2000, hooks: ['activate', 'mount', 'update'] }))
    Sentry.attachErrorHandler(vueApp, { logErrors: false, attachProps: true, trackComponents: true, timeout: 2000, hooks: ['activate', 'mount', 'update'] });

    return {
        provide: {
            sentrySetContext: (n: string, context: { [key: string]: any; } | null) => Sentry.setContext(n, context),
            sentrySetUser: (user: Sentry.User | null) => Sentry.setUser(user),
            sentrySetTag: (tagName: string, value: string | number | bigint | boolean | symbol | null | undefined) => Sentry.setTag(tagName, value),
            sentryAddBreadcrumb: (breadcrumb: Sentry.Breadcrumb) => Sentry.addBreadcrumb(breadcrumb),
        }
      }
})
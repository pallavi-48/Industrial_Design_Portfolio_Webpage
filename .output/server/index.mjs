globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/branding-2-BwCNMqSl.jpg": {
		"type": "image/jpeg",
		"etag": "\"30e26-99ZNVTOhJDpgTAZmbv7zUzSoVH0\"",
		"mtime": "2026-09-27T14:11:23.616Z",
		"size": 200230,
		"path": "../public/assets/branding-2-BwCNMqSl.jpg"
	},
	"/assets/branding-1-CMjKphXZ.jpg": {
		"type": "image/jpeg",
		"etag": "\"405ce-4l8sDW00T0Q0T9DWKJbZtQ86yx4\"",
		"mtime": "2026-09-27T14:11:23.614Z",
		"size": 263630,
		"path": "../public/assets/branding-1-CMjKphXZ.jpg"
	},
	"/assets/index-CFTe6vrW.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"f6-RZ61GWwZkiRC9RVhFDF4O74o3cM\"",
		"mtime": "2026-09-27T14:11:23.621Z",
		"size": 246,
		"path": "../public/assets/index-CFTe6vrW.css"
	},
	"/assets/designer-portrait-BNDIgd-v.jpg": {
		"type": "image/jpeg",
		"etag": "\"3ee23-AnsDM0nojv1CuqY1LIsKIEWSGtU\"",
		"mtime": "2026-09-27T14:11:23.619Z",
		"size": 257571,
		"path": "../public/assets/designer-portrait-BNDIgd-v.jpg"
	},
	"/assets/index-DWk5mKgK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"68c70-7XdnP59vR9lH4/GOuzeQmqUsiX4\"",
		"mtime": "2026-09-27T14:11:23.601Z",
		"size": 429168,
		"path": "../public/assets/index-DWk5mKgK.js"
	},
	"/assets/product-design-3-BPikxg97.jpg": {
		"type": "image/jpeg",
		"etag": "\"2c552-N+CZoXRUK4SMKEX/DtBiY58X0ak\"",
		"mtime": "2026-09-27T14:11:23.654Z",
		"size": 181586,
		"path": "../public/assets/product-design-3-BPikxg97.jpg"
	},
	"/assets/product-design-2-C_Pvymiq.jpg": {
		"type": "image/jpeg",
		"etag": "\"4d2e5-7diPMhK0TJSyC+Mvexls+VI4pXQ\"",
		"mtime": "2026-09-27T14:11:23.652Z",
		"size": 316133,
		"path": "../public/assets/product-design-2-C_Pvymiq.jpg"
	},
	"/assets/product-design-1-PoAJijNu.jpg": {
		"type": "image/jpeg",
		"etag": "\"30791-qwNFOMYr+YlJXO/oz/GofDfdd1Y\"",
		"mtime": "2026-09-27T14:11:23.650Z",
		"size": 198545,
		"path": "../public/assets/product-design-1-PoAJijNu.jpg"
	},
	"/assets/product-design-4-CF9XSlin.jpg": {
		"type": "image/jpeg",
		"etag": "\"4abe6-2bLDSIq0rg+W+DkfqFrTDK0ibsM\"",
		"mtime": "2026-09-27T14:11:23.656Z",
		"size": 306150,
		"path": "../public/assets/product-design-4-CF9XSlin.jpg"
	},
	"/assets/routes-IpEUaBeK.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"2612-yk3jSay66+Tg4Dneyf4xg8MW5qI\"",
		"mtime": "2026-09-27T14:11:23.666Z",
		"size": 9746,
		"path": "../public/assets/routes-IpEUaBeK.css"
	},
	"/assets/research-DJEZfjy6.jpg": {
		"type": "image/jpeg",
		"etag": "\"4c161-lNtFUPX9CJaL7F8vhxfIKHFlI04\"",
		"mtime": "2026-09-27T14:11:23.665Z",
		"size": 311649,
		"path": "../public/assets/research-DJEZfjy6.jpg"
	},
	"/assets/styles-Ci8cCSMr.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"17e58-6akftHPFusAs4VfX+L5JNZq2ssk\"",
		"mtime": "2026-09-27T14:11:23.668Z",
		"size": 97880,
		"path": "../public/assets/styles-Ci8cCSMr.css"
	},
	"/assets/routes-CpLngjoI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9707f-40AEnPg/ec1cUVgMp/aR/EcbWGY\"",
		"mtime": "2026-09-27T14:11:23.604Z",
		"size": 618623,
		"path": "../public/assets/routes-CpLngjoI.js"
	},
	"/assets/pdf.worker.min-yatZIOMy.mjs": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14fe5e-iGC1A5RKrS0JublO5W5Pq4QUymk\"",
		"mtime": "2026-09-27T14:11:23.648Z",
		"size": 1375838,
		"path": "../public/assets/pdf.worker.min-yatZIOMy.mjs"
	},
	"/assets/b-2-B9PpY-Fr.pdf": {
		"type": "application/pdf",
		"etag": "\"1f5ab8-Y1zj6BqTYx3DfbUjhYJZANJQ+Jw\"",
		"mtime": "2026-09-27T14:11:23.612Z",
		"size": 2054840,
		"path": "../public/assets/b-2-B9PpY-Fr.pdf"
	},
	"/assets/pd-3-FHcb1m5m.pdf": {
		"type": "application/pdf",
		"etag": "\"455448-JS30NTIN5MKUUFK/6X8aOmACkII\"",
		"mtime": "2026-09-27T14:11:23.637Z",
		"size": 4543560,
		"path": "../public/assets/pd-3-FHcb1m5m.pdf"
	},
	"/assets/pd-4-w7vpxWvg.pdf": {
		"type": "application/pdf",
		"etag": "\"57d66c-QTQP901qeC3Ybf9GKpsI5VIG39A\"",
		"mtime": "2026-09-27T14:11:23.646Z",
		"size": 5756524,
		"path": "../public/assets/pd-4-w7vpxWvg.pdf"
	},
	"/assets/pd-1-Ch1_xw2U.pdf": {
		"type": "application/pdf",
		"etag": "\"5da6fd-ycXpuMqhLDw54vrg6LjZ9bKeleM\"",
		"mtime": "2026-09-27T14:11:23.627Z",
		"size": 6137597,
		"path": "../public/assets/pd-1-Ch1_xw2U.pdf"
	},
	"/assets/pd-2-BdgeQgqw.pdf": {
		"type": "application/pdf",
		"etag": "\"5963c6-nSQNW+l6ohvlvdmm/owGee04Grk\"",
		"mtime": "2026-09-27T14:11:23.632Z",
		"size": 5858246,
		"path": "../public/assets/pd-2-BdgeQgqw.pdf"
	},
	"/assets/b-1-DzcnWp0f.pdf": {
		"type": "application/pdf",
		"etag": "\"78ffe6-4bVjUonEkJVj5rcDdgt+H/xfL2U\"",
		"mtime": "2026-09-27T14:11:23.609Z",
		"size": 7929830,
		"path": "../public/assets/b-1-DzcnWp0f.pdf"
	},
	"/assets/r-DYHPqhAG.pdf": {
		"type": "application/pdf",
		"etag": "\"8ada67-Kqq3JLp1b5LABqPaZRa5/4SY8/I\"",
		"mtime": "2026-09-27T14:11:23.663Z",
		"size": 9099879,
		"path": "../public/assets/r-DYHPqhAG.pdf"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_SGRC18 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_SGRC18
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };

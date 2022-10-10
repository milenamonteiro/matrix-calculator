import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";

import katex from "katex";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import "../node_modules/katex/dist/katex.min.css";

const app = createApp(App).use(IonicVue).use(router);

app.component("katex-span", {
	props: ["expr"],
	computed: {
		math() {
			return katex.renderToString(this.expr);
		},
	},
	render() {
		return App.h("span", { innerHTML: this.math });
	},
});

app.component("katex-div", {
	props: ["expr"],
	computed: {
		math() {
			return katex.renderToString(this.expr);
		},
	},
	render() {
		return App.h("div", { innerHTML: this.math });
	},
});

router.isReady().then(() => {
	app.mount("#app");
});

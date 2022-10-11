import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		component: () => import("../views/OperacoesElementares.vue"),
	},
	{
		path: "/OperacoesElementares",
		component: () => import("../views/OperacoesElementares.vue"),
	},
	{
		path: "/MatrizInversa",
		component: () => import("../views/MatrizInversa.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;

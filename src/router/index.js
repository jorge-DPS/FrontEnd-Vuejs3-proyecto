import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/auth/Login.vue";
import AppLayaout from "@/layout/AppLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiereAutenticacion: true }
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      // meta para el login, si ya estoy autenticado, bloquear esta pagina
      meta: { redireccionarSiEstaAutenticado: true },
    },
    {
      path: "/admin",
      component: AppLayaout,
      children: [
        {
          path: "about",
          name: "About",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/AboutView.vue"),
          // para bloquear esta ruta, por que requiere autenticacion
          meta: { requiereAutenticacion: true },
        },
        {
          path: "usuario",
          name: "Usuario",
          component: () => import("../views/admin/UsuarioView.vue"),
          // para proteger esta ruta necesita estar autenticacdo
          meta: { requiereAutenticacion: true },
        },
        {
          path: "categoria",
          name: "Categoria",
          component: () => import("../views/admin/CategoriaView.vue"),
        },
        {
          path: "producto",
          name: "Producto",
          component: () => import("../views/admin/Producto/ProductoView.vue"),
        }
      ],
    },
  ],
});

// Guards
// lo vamos a verificar antes de entrar
router.beforeEach((to, from, next) => {
  // console.log("TO: ", to);
  // console.log("FROM: ", from);
  let token = localStorage.getItem("access_token");

  // estamod berificando si hay token
  if (to.meta.requiereAutenticacion) {
    if (!token) {
      // si no tiene token
      return next({ name: "Login" });
    }
    return next();
  }

  /// si ya esta autenticado redireccionamos el login al perfil
  if (to.meta.redireccionarSiEstaAutenticado && token) {
    return next({ name: "About" });
  }

  return next();
});

export default router;

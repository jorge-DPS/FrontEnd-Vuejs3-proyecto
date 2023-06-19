<template>
    <ProgressBar mode="indeterminate" style="height: 6px" v-if="mis_datos == null"></ProgressBar>
  
  <div class="card" v-else>
    <h1>PERFIL</h1>
    <H3>Nombre: {{ mis_datos.name }}</H3>
    <H3>Correo: {{ mis_datos.email }}</H3>
    <Button @click="salir">Salir</Button>
  </div>
</template>

<script>

import authService from "@/services/AuthService"
import { ref } from "vue";
import router from "../router";

export default{
  setup() {

    const mis_datos = ref(null)
    
    const perfil = async () => {
      // aqui capturamos el ususario logeado
      const { data } = await authService.getPerfil();
      mis_datos.value = data
      // console.log(mis_datos, 'aqui el data');
    }

    const salir = async () => {
      await authService.logout();

      // borrar el token
      localStorage.removeItem('access_token')
      // redireccionar la ruta cuando ya salimos de la cuenta
      router.push({name: 'Login'})

    }

    perfil();

    return {
      mis_datos,
      salir
    }
  },
}
</script>
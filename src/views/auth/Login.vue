<template>
  <!-- <div>
    <h1>Login - ingresar</h1>

    {{ usuario }}
    <br />
    <input type="email" v-model="usuario.email" />
    <br />
    <input type="password" v-model="usuario.password" />
    <br />
    <button @click="funIngresar">Ingreser</button>
  </div> -->

  <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-column align-items-center justify-content-center">
      <!-- <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" /> -->
      <div
        style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
          <div class="text-center mb-5">
            <img src="https://d500.epimg.net/cincodias/imagenes/2015/05/08/pyme/1431098283_691735_1431098420_noticia_normal.jpg" alt="Image" height="50" class="mb-3" />
            <div class="text-900 text-3xl font-medium mb-3">Ingresar</div>
            <span class="text-600 font-medium">Ingrese sus Credenciales</span>
          </div>

          <div>
            <label for="email1" class="block text-900 text-xl font-medium mb-2">correo electronico</label>
            <InputText id="email1" type="text" placeholder="Correo" class="w-full md:w-30rem mb-5"
              style="padding: 1rem" v-model="usuario.email" />

            <label for="password1" class="block text-900 font-medium text-xl mb-2">Contraseña</label>
            <Password id="password1" v-model="usuario.password" placeholder="Contraseña" :toggleMask="true" class="w-full mb-3"
              inputClass="w-full" inputStyle="padding:1rem"></Password>

            <div class="flex align-items-center justify-content-between mb-5 gap-5">
              <div class="flex align-items-center">
                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                <label for="rememberme1">Remember me</label>
              </div>
              <a class="font-medium no-underline ml-2 text-right cursor-pointer"
                style="color: var(--primary-color)">Forgot password?</a>
            </div>
            <Button label="Ingresar" class="w-full p-3 text-xl" @click="funIngresar"></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authService from "@/services/AuthService.js";
import { ref } from "vue";
import router from "../../router";
export default {
  setup() {
    const usuario = ref({
      email: "prueba",
      password: "",
    });

    const funIngresar = async () => {
      // alert('ingresando...');
      // console.log(usuario.value);
      const { data } = await authService.login(usuario.value);
      console.log(data, "aqui la data");
      localStorage.setItem("access_token", data.access_token);

      // una ves inicado sesion empujamos al usuario su cuneta
      router.push({ name: "About" })
    };

    return {
      usuario,
      funIngresar,
    };
  },
};
</script>

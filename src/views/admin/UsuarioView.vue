<template>
  <div>
    <h1>{{ titulo }}</h1>

    <!-- {{ usuario }} -->

    <label for="">NOMBRE</label>
    <input type="text" v-model="usuario.name" />
    {{ errores?.name }}
    <br />
    <label for="">CORREO</label>
    <input type="email" v-model="usuario.email" required />
    {{ errores?.email }}
    <br />
    <label for="">Contraseña</label>
    <input type="password" v-model="usuario.password" required />
    {{ errores?.password }}
    <br />
    <!-- para modificar el texto del boton lo hacemos con el if ternario  -->
    <button @click="guardarUsuario">
      {{ usuario.id ? "Modificar Usuario" : "Guardar Usuario" }}
    </button>
    <button type="button" @click="limpiar">Reset</button>

    <input type="search" v-model="buscar" @keypress.enter="listarUsuarios()" />

    <Button label="Show" icon="pi pi-external-link" @click="abrirModalNuevoUsuario" />

    <Dialog v-model:visible="mostrarModal" modal header="Header" :style="{ width: '450px' }" class="p-fluid">
      <div class="field">
        <label for="nombre">Nombre</label>
        <InputText id="nombre" type="text" v-model="usuario.name" />
      </div>

      <div class="field">
        <label for="email">Email</label>
        <InputText id="email" type="email" v-model="usuario.email" />
      </div>

      <div class="field">
        <label for="pass">Password</label>
        <InputText id="pass" type="password" v-model="usuario.password" />
      </div>
      
      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" @click="mostrarModal = false" text />
        <Button label="Guardar" icon="pi pi-check" @click="guardarUsuario" autofocus />
      </template>
    </Dialog>

    <DataTable :value="usuarios" responsiveLayout="scroll">
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="email" header="Email"></Column>

      <Column field="created_at" header="creado en"></Column>
    </DataTable>

    <!-- <pre> {{ usuarios }} </pre> -->
  </div>
</template>

<script setup>
import UsuariosService from "@/services/UsuarioService";
import { ref } from "vue";

const titulo = "Gestión Usuarios";
const usuarios = ref([]);
const errores = ref();
const buscar = ref("");

// para el modal
const mostrarModal = ref(false);

// empaquetar usuario par enviarlo como datos a la base de datos
const usuario = ref({
  name: "",
  email: "",
  password: "",
});

// metodos

const listarUsuarios = async () => {
  const { data } = await UsuariosService.listar(buscar.value);
  usuarios.value = data;
  console.log(data, "aqui los datos");
};

listarUsuarios();

const guardarUsuario = async () => {
  try {
    if (usuario.value.id) {
      // modificar
      const { data } = await UsuariosService.modificar(
        usuario.value.id,
        usuario.value
      );
      listarUsuarios();
      limpiarFormulario();
    } else {
      const { data } = await UsuariosService.guardar(usuario.value);
      console.log("se guardo", data);
      // listarUsuarios();
      usuarios.value.push(data.data);
      limpiarFormulario();
    }
  } catch (errors) {
    console.log(errors.response.data);
    errores.value = errors.response.data.errors;
  }

  mostrarModal.value = false

};

// funcion se utiliza para cargar en el formulario el usuario a editar
const editarUsuario = (editUser) => {
  // usuario.value = editUser
  // console.log(usuario.value.name, 'aqui el usuario');

  const { name, email, id } = editUser;
  usuario.value = { name, email, id };
  // console.log(usuario.value, 'aqui los datos');
};

const eliminar = async (id) => {
  if (confirm("¿esta seguro de eliminar al usuario?")) {
    const { data } = await UsuariosService.eliminar(id);
    listarUsuarios();
    limpiarFormulario();
  }
};

const limpiarFormulario = () => {
  usuario.value.id = null;
  usuario.value = { name: "", email: "", password: "" };
  console.log(usuario.value, "datos limpios");
};

// begin:: Modal
const abrirModalNuevoUsuario = () => {
  mostrarModal.value = true;
};
</script>

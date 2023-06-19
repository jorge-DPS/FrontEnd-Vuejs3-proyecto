<template>
  <div class="card">
    <h1>hola desde la categoria</h1>
    <Button label="Nueva Categoria" icon="pi pi-external-link" @click="visible = true" />
    <Dialog v-model:visible="visible" p-dialog modal header="Nueva Categoria" :style="{ width: '50vw' }" p-dialog-titlebar-close>
      
          <InputText v-model="nuevaCategoria.nombre" type="text" placeholder="Nombre categoria" />

          <template #footer>
            <Button label="Cerrar" @click="visible = false" icon="pi pi-times" autofocus />
            <Button label="Guardar" @click="guardarCategoria" icon="pi pi-check" autofocus />
          </template>
      
    </Dialog>
      <ProgressBar mode="indeterminate" style="height: 6px" v-if="loading"></ProgressBar>

    <!-- {{ categorias }} -->
    <div class="card">
          <DataTable :value="categorias" tableStyle="min-width: 50rem">
              <Column field="id" header="ID"></Column>
              <Column field="nombre" header="Nombre"></Column>
              <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
              <Column field="Acciones" header="Reviews">
                <template #body="slotProps">
                  <!-- slotProps.data.id :: aqui le dicimos que valor vamos a editar en este caso estamos traendo todo el objeto osea data -->
                  <Button @click="editarCategoria(slotProps.data)" />
                </template>
      </Column>
          </DataTable>
      </div>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import CategoriaService from "@/services/CategoriaService.js";

/** begin:: Dialog */
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';

const visible = ref(false);

const categorias = ref([])
const nuevaCategoria = ref({
  nombre: '',
})

const loading = ref(true)

onMounted(() => {
  getCategorias()
  console.log("onmounted");
})

const getCategorias = async () => {
  loading.value= true
  const { data } = await CategoriaService.listar();
  console.log(data);
  categorias.value = data
  loading.value = false
}

const guardarCategoria = async () => {
  try {
  
  loading.value = true

    if (nuevaCategoria.value.id) {
      const { data } = await CategoriaService.modificar(nuevaCategoria.value.id, nuevaCategoria.value)
      nuevaCategoria.value = { nombre: '' }
      
    } else {
      const { data } = await CategoriaService.guardar(nuevaCategoria.value);
      nuevaCategoria.value = {nombre:''}
      

    }
    loading.value = false;
    visible.value = false;
    getCategorias()

  } catch (error) {
    console.log(error);
    loading.value = true

  }
}

const editarCategoria = async (objCat) => {
  nuevaCategoria.value = objCat
  visible.value = true;
  console.log(nuevaCategoria.value);
  // getCategorias()

}

const modificarCategoria = async () => {
  try {
    const { data } = await CategoriaService.modificar(categoria.value)
    getCategorias()
    visible.value = false
  } catch (error) {
    console.log(error);
  }
}
</script>
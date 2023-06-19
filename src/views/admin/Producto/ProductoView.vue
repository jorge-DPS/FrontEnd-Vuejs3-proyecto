<template>
  <div class="card flex justify-content-center">
    <Button label="Nuevo Producto" icon="pi pi-external-link" @click="abrirDialogProducto" />
    <Dialog v-model:visible="dialogNuevoProducto" modal header="Nuevo Producto" :style="{ width: '50vw' }"
      class="p-fluid">
      {{ producto }}
      <div class="filed">
        <label for="nombre">Ingrese Nombre</label>
        <InputText type="text" id="nombre" v-model="producto.nombre" required autofocus />
      </div>

      <div class="filed">
        <label for="desc">Descripcion</label>
        <Textarea id="desc" v-model="producto.descripcion"></Textarea>
      </div>

      <div class="filed">
        <label for="categori">Categoria</label>
        <div class="formgrid grid">
          <div class="field-radiobutton col-6" v-for="item_cat in categorias" :key="item_cat.id">
            <RadioButton :value="item_cat.id" v-model="producto.categoria_id"></RadioButton>
            <label>{{ item_cat.nombre }}</label>
          </div>
          
        </div>
      </div>

      <div class="formgrid grid">
        <div class="field col">
          <label for="pr">Precio</label>
          <InputNumber id="pr" v-model="producto.precio" mode="currency" currency="USD" locale="en-US"></InputNumber>
        </div>
        <div class="field col">
          <label for="cant">Cantidad</label>
          <InputNumber id="cant" v-model="producto.stock" integeronly></InputNumber>
        </div>
      </div>

      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" @click="cerrarDialog" />
        <Button label="Guardar" icon="pi pi-check" @click="guardarProducto" autofocus />
      </template>
    </Dialog>
  </div>
  <div class="card">
    <DataTable :value="productos" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">Products</span>
          <Button icon="pi pi-refresh" rounded raised />
        </div>
      </template>
      <Column field="id" header="ID"></Column>
      <Column field="nombre" header="Nombre"></Column>
      <Column header="Imagen">
        <template #body="slotProps">
          <img :src="`http://127.0.0.1:8000/${slotProps.data.imagen}`" :alt="slotProps.data.imagen"
            class="w-6rem shadow-2 border-round" />
        </template>
      </Column>
      <Column field="precio" header="Precio">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.precio) }}
        </template>
      </Column>
      <Column field="categoria_id" header="Categoria"></Column>

      <Column header="Estado"> </Column>
      <template #footer>
        En total hay {{ productos ? productos.length : 0 }} Productos.
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import { ref } from "vue";
import productoService from "@/services/ProductoService";
import categoriaService from "@/services/CategoriaService";

const productos = ref([]);
const dialogNuevoProducto = ref(false);
const producto = ref({});
const categorias = ref([]);

const abrirDialogProducto = () => {
  dialogNuevoProducto.value = true;
};

const cerrarDialogProducto = () => {
  dialogNuevoProducto.value = false;

};

// produtoService
const listaProductos = async () => {
  const { data } = await productoService.listar();
  productos.value = data.data;
  console.log("aqui los datos de productos", productos.value);
};

const listaCategoria = async () => {
  const { data } = await categoriaService.listar();
  categorias.value = data;
  console.log(data);
};


listaProductos();
listaCategoria();

const guardarProducto = async () => {
  await productoService.guardar(producto.value)
  listaProductos()
  cerrarDialogProducto()
}

const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
</script>

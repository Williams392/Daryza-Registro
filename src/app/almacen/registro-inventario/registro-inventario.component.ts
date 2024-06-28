import { Component, OnInit } from '@angular/core';
import { Producto } from '../../core/models/Producto';
import { ProductoService } from '../../core/services/producto.service';

@Component({
  selector: 'app-registro-inventario',
  templateUrl: './registro-inventario.component.html',
  styleUrl: './registro-inventario.component.css'
})
export class RegistroInventarioComponent implements OnInit {

  productosRegistrados: Producto[] = [];
  nuevoProducto: Producto = new Producto();

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerProductosRegistrar();
  }

  obtenerProductosRegistrar(): void {
    this.productoService.obtenerProductos().subscribe(
      (datos: Producto[]) => {
        this.productosRegistrados = datos;
      },
      (error) => {
        console.error('Error al obtener productos', error);
      }
    );
  }

  selectProduct(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const productoId = parseInt(selectElement.value, 10);
    const productoSeleccionado = this.productosRegistrados.find(producto => producto.codigoProd === productoId);
    if (productoSeleccionado) {
      this.nuevoProducto = { ...productoSeleccionado }; // Copia el producto seleccionado a nuevoProducto
    }
  }

  guardarProducto(): void {
    if (this.validarProducto(this.nuevoProducto)) {
      this.productoService.agregarProducto(this.nuevoProducto).subscribe(
        (productoAgregado: Producto) => {
          console.log('Producto agregado:', productoAgregado); // nuevo
          const index = this.productosRegistrados.findIndex(prod => prod.codigoProd === productoAgregado.codigoProd);
          if (index !== -1) {
            this.productosRegistrados[index] = productoAgregado;
          } else {
            this.productosRegistrados.push(productoAgregado);
          }
          this.nuevoProducto = new Producto(); // Limpiar formulario después de agregar
        },
        (error) => {
          console.error('Error al agregar producto', error);
        }
      );
    }
  }

  validarProducto(producto: Producto): boolean {
    if (!producto.nombreProd || producto.nombreProd.trim() === '') {
      alert('El nombre del producto es obligatorio.');
      return false;
    }
    if (!producto.descripcion || producto.descripcion.trim() === '') {
      alert('La descripción del producto es obligatoria.');
      return false;
    }
    if (producto.cantidadExistencia <= 0) {
      alert('La cantidad recibida debe ser mayor que cero.');
      return false;
    }
    if (!producto.marca || producto.marca.trim() === '') {
      alert('La marca del producto es obligatoria.');
      return false;
    }
    // Agrega más validaciones según tus necesidades
    return true;
  }

  eliminarProducto(id: number) {
    this.productoService.eliminarProducto(id).subscribe(
      () => {
        this.obtenerProductosRegistrar(); // Actualizar la lista de productos después de eliminar
      },
      (error) => {
        console.error('Error al eliminar producto', error);
      }
    );
  }

  cancelar(): void {
    this.nuevoProducto = new Producto(); // Limpiar formulario al cancelar
  }
  
}
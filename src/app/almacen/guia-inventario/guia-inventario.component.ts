import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductoService } from '../../core/services/producto.service';
import { Producto } from '../../core/models/Producto';
import { AlmacenService } from '../../core/services/almacen.service';
import { Almacen } from '../../core/models/Almacen';
import { Guia_Inventario } from '../../core/models/Guia_Inventario';

@Component({
  selector: 'app-guia-inventario',
  templateUrl: './guia-inventario.component.html',
  styleUrl: './guia-inventario.component.css'
})
export class GuiaInventarioComponent implements OnInit {

  nuevoProducto: Producto = new Producto();
  productosRegistrados: Producto[] = [];

  productos: Producto[] = []; // Para el select de la lista de productos.
  selectedProduct: Producto | null = null;

  cantidadExistencia: number = 0;
  almacenes: Almacen[] = [];

  constructor(
    private productoService: ProductoService,
    private almacenService: AlmacenService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos(); 
    this.obtenerProductosRegistrar();
    this.obtenerAlmacenes();
  }
  
  // Para la el panel de lista de productos:
  obtenerProductos(): void {
    this.productoService.obtenerProductos().subscribe(
      (productos: Producto[]) => {
        this.productos = productos; // Asigna los productos obtenidos al arreglo de productos
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }
  selectProduct(producto: Producto): void {
    this.selectedProduct = producto;
    this.cantidadExistencia = producto.cantidadExistencia;
    // this.cantidadExistencia = producto.cantidadExistencia || 0;
  }

  obtenerAlmacenes(): void {
    this.almacenService.obtenerAlmacenes().subscribe(
      almacenes => {
        this.almacenes = almacenes;
      },
      error => {
        console.error('Error obteniendo almacenes:', error);
      }
    );
  }


  // IMPORTANTE - PARA EL REGISTRO DEL FORM:
  
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

  guardarProducto(): void {
    if (this.nuevoProducto.cantidadExistencia <=0){
      alert('La cantidad recibida debe ser mayor que cero.');
      return;
    }

    // llamar al servicio para agregar el producto
    this.productoService.agregarProducto(this.nuevoProducto).subscribe(
      productoAgregado => {
        this.productosRegistrados.push(productoAgregado);
        this.nuevoProducto = new Producto();
      },
      error => {
        console.error('Error al agregar producto:', error);
      }
    );

  }

  cancelar(): void {
    this.selectedProduct = null;
    this.cantidadExistencia = 0;
  }

  // Boton eliminar:
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
  
}
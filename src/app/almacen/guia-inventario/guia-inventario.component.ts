import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductoService } from '../../core/services/producto.service';
import { Producto } from '../../core/models/Producto';
import { AlmacenService } from '../../core/services/almacen.service';
import { Almacen } from '../../core/models/Almacen';
import { Guia_Inventario } from '../../core/models/Guia_Inventario';
import { GuiaInventarioService } from '../../core/services/guia_inventario.service';

@Component({
  selector: 'app-guia-inventario',
  templateUrl: './guia-inventario.component.html',
  styleUrl: './guia-inventario.component.css'
})
export class GuiaInventarioComponent implements OnInit {
  productosRegistrados: Producto[] = [];
  productos: Producto[] = [];

  selectedProduct: Producto = new Producto(); // Inicialización con un objeto Producto vacío
  cantidadExistencia: number = 0;
  almacenes: Almacen[] = [];
  
  guiasInventario: Guia_Inventario[] = [];

  constructor(
    private productoService: ProductoService,
    private guiaInventarioService: GuiaInventarioService,
    private almacenService: AlmacenService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerAlmacenes();
    this.obtenerGuiasInventario();
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
  
  obtenerGuiasInventario(): void {
    this.guiaInventarioService.obtenerGuiasInventario().subscribe(
      guiasInventario => {
        this.guiasInventario = guiasInventario;
      },
      error => {
        console.error('Error obteniendo guías de inventario:', error);
      }
    );
  }

  obtenerProductos(): void {
    this.productoService.obtenerProductos().subscribe(
      (productos: Producto[]) => {
        this.productos = productos;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  selectProduct(producto: Producto): void {
    this.selectedProduct = { ...producto }; // Copiar el producto seleccionado para evitar cambios directos
    this.cantidadExistencia = producto.cantidadExistencia || 0;
  
    // Asignar la ubicación seleccionada
    if (producto.numAlmacen) {
      this.selectedProduct.ubicacion = producto.numAlmacen.ubi_Almacen;
    }
  
    // Asignar la categoría seleccionada
    if (producto.num_GuiaInv) {
      this.selectedProduct.categoria = producto.num_GuiaInv.tipoProd;
    }
  }
  

  registrarProducto(): void {
    if (this.selectedProduct && this.selectedProduct.codigoProd) {
      // Asignación de la categoría (tipoProd) y ubicación (ubi_Almacen)
      if (this.selectedProduct.num_GuiaInv) {
        const guiaSeleccionada = this.guiasInventario.find(guia => guia.num_GuiaInv === this.selectedProduct.num_GuiaInv.num_GuiaInv);
        if (guiaSeleccionada) {
          this.selectedProduct.num_GuiaInv.tipoProd = guiaSeleccionada.tipoProd;
        }
      }
      
      if (this.selectedProduct.numAlmacen) {
        const almacenSeleccionado = this.almacenes.find(almacen => almacen.num_Almacen === this.selectedProduct.numAlmacen.num_Almacen);
        if (almacenSeleccionado) {
          this.selectedProduct.numAlmacen.ubi_Almacen = almacenSeleccionado.ubi_Almacen;
        }
      }
  
      // Actualización del producto en la base de datos
      this.productoService.actualizarProducto(this.selectedProduct.codigoProd, this.selectedProduct).subscribe(
        (productoActualizado: Producto) => {
          const index = this.productosRegistrados.findIndex(prod => prod.codigoProd === productoActualizado.codigoProd);
          if (index !== -1) {
            this.productosRegistrados[index] = { ...productoActualizado };
          } else {
            this.productosRegistrados.push({ ...productoActualizado });
          }
  
          this.cancelar(); // Limpia el formulario después de registrar
        },
        error => {
          console.error('Error al actualizar el producto:', error);
        }
      );
    }
  }
  
  

  cancelar(): void {
    this.selectedProduct = new Producto(); // Reinicializar selectedProduct
    this.cantidadExistencia = 0;
  }
}
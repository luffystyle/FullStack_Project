// customer.component.ts
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [CustomerService],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers: any[] = [];
  mostrarClientes = false;
  mostrarFormulario = false;
  
  // Objeto para el nuevo cliente
  nuevoCliente = {
    name: '',
    surname: '',
    code: '',
    phone: '',
    address: '',
    iban: ''
  };

  // Para edición
  clienteEditando: any = null;
  modoEdicion = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.customerService.getCustomers().subscribe(
      data => {
        this.customers = data;
      },
      error => {
        console.error('Error al cargar clientes:', error);
        alert('Error al cargar los clientes');
      }
    );
  }

  toggleMostrarClientes(): void {
    this.mostrarClientes = !this.mostrarClientes;
    if (this.mostrarClientes) {
      this.cargarClientes();
    }
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.modoEdicion = false;
    this.limpiarFormulario();
  }

  limpiarFormulario(): void {
    this.nuevoCliente = {
      name: '',
      surname: '',
      code: '',
      phone: '',
      address: '',
      iban: ''
    };
    this.clienteEditando = null;
  }

  agregarCliente(): void {
    if (this.validarFormulario()) {
      this.customerService.addCustomer(this.nuevoCliente).subscribe(
        response => {
          console.log('Cliente agregado:', response);
          this.cargarClientes();
          this.limpiarFormulario();
          this.mostrarFormulario = false;
          alert('Cliente agregado exitosamente');
        },
        error => {
          console.error('Error al agregar cliente:', error);
          alert('Error al agregar el cliente');
        }
      );
    }
  }

  editarCliente(cliente: any): void {
    this.modoEdicion = true;
    this.mostrarFormulario = true;
    this.clienteEditando = cliente;
    this.nuevoCliente = {
      name: cliente.name,
      surname: cliente.surname,
      code: cliente.code,
      phone: cliente.phone,
      address: cliente.address,
      iban: cliente.iban
    };
  }

  actualizarCliente(): void {
    if (this.validarFormulario() && this.clienteEditando) {
      this.customerService.updateCustomer(this.clienteEditando.id, this.nuevoCliente).subscribe(
        response => {
          console.log('Cliente actualizado:', response);
          this.cargarClientes();
          this.limpiarFormulario();
          this.mostrarFormulario = false;
          this.modoEdicion = false;
          alert('Cliente actualizado exitosamente');
        },
        error => {
          console.error('Error al actualizar cliente:', error);
          alert('Error al actualizar el cliente');
        }
      );
    }
  }

  eliminarCliente(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      this.customerService.deleteCustomer(id).subscribe(
        response => {
          console.log('Cliente eliminado:', response);
          this.cargarClientes();
          alert('Cliente eliminado exitosamente');
        },
        error => {
          console.error('Error al eliminar cliente:', error);
          alert('Error al eliminar el cliente');
        }
      );
    }
  }

  validarFormulario(): boolean {
    if (!this.nuevoCliente.name || !this.nuevoCliente.surname || !this.nuevoCliente.code) {
      alert('Por favor, completa al menos los campos de Nombre, Apellido y Código');
      return false;
    }
    return true;
  }

  cancelarEdicion(): void {
    this.mostrarFormulario = false;
    this.modoEdicion = false;
    this.limpiarFormulario();
  }

  trackByCustomerId(index: number, customer: any): any {
  return customer.id;  // ← Esta línea devuelve el ID único del cliente
}
}
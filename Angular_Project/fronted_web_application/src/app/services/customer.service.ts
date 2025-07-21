// src/app/services/customer.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Puedes crear una interfaz Customer para tipar mejor los datos, pero por ahora usaremos any

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://customer-springboot.onrender.com/customer'; // URL base de tu backend

  constructor(private http: HttpClient) { }

  // Obtener todos los clientes
  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener cliente por ID
  getCustomer(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo cliente
  addCustomer(customer: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, customer);
  }

  // Actualizar cliente
  updateCustomer(id: number, customer: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, customer);
  }

  // Eliminar cliente
  deleteCustomer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

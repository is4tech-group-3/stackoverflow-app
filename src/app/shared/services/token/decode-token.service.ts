import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class DecodeTokenService {
  constructor() {}
  DecodeToken(token: string): any {
    try {
      console.log("🚀 ~ DecodeTokenService ~ DecodeToken ~ token:", token)
      return jwtDecode(token);
    } catch (error) {
      console.error('Error al decodificar el token', error);
      return null;
    }
  }
}

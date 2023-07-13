import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string;
  password: string;
  
  constructor(private http: HttpClient) { }

  login() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.http.post('http://ruta-api-laravel/api/login', credentials)
      .subscribe((response: any) => {
        // Aquí puedes manejar la respuesta del servidor después de iniciar sesión
        // Por ejemplo, puedes guardar el token en el almacenamiento local (localStorage) para futuras solicitudes
        const token = response.token;
        localStorage.setItem('token', token);

        // También puedes redirigir al usuario a otra página
        // Ejemplo: this.router.navigate(['/dashboard']);
      }, (error) => {
        // Aquí puedes manejar los errores en caso de que falle el inicio de sesión
        console.error(error);
      });
  }
}

  

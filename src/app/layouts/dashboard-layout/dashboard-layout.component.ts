import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';


@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardLayoutComponent {
  private readonly router = inject(Router);
  private readonly _authService = inject(AuthService);

  // true solo cuando el usuario en sesión es administrador.
  // Se usa en la plantilla para ocultar Usuarios y Reportes al operador.
  readonly isAdmin = this._authService.isAdmin();

  // Nombre del usuario en sesión para mostrarlo en la barra superior.
  readonly userName = this._authService.getStoredUser()?.user_first_name ?? 'Usuario';

  logout(): void {
    this._authService.logout();
    this.router.navigate(['/login']);
  }
}

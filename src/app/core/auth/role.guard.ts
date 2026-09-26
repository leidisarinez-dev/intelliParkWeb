import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/* Guard de autorización por rol.
   Complementa al authGuard: authGuard revisa que exista sesión,
   este roleGuard revisa que el rol del usuario tenga permiso para la ruta.
   Los roles permitidos se declaran en la ruta con: data: { roles: [...] }.
*/
export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const allowedRoles = (route.data?.['roles'] as string[] | undefined) ?? [];
  const role = authService.getRole();

  if (role && allowedRoles.includes(role)) {
    return true; // El rol tiene permiso -> permite el acceso
  }

  // Sin permiso: devolvemos al usuario al dashboard en lugar de mostrar la ruta
  return router.createUrlTree(['/dashboard']);
};

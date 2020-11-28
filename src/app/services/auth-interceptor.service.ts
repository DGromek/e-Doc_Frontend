import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import {TTokenDto} from '../model/TTokenDto';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  decodedToken: TTokenDto;
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.token;

    if (!token) {
      return next.handle(req);
    }

    this.decodedToken = jwt_decode(token);
    // Date.now() returns time in milliseconds while jwt token times value are stored in seconds.
    if (this.decodedToken.exp < Math.round(Date.now() / 1000)) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(req1).pipe(
      tap(evt => {
          if (evt instanceof HttpResponse) {
            const refreshedToken = evt.headers.get('Refreshed-token');
            localStorage.setItem('token', refreshedToken);
          }
        }
      ));
  }
}

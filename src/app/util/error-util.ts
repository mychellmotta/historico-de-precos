import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class ErrorUtil {
  public static handleError(error: HttpErrorResponse) {
    console.log('handleError');
    let errorMessage = '';
    console.log(error);

    if (error instanceof Error || error instanceof ErrorEvent) {
      console.error('cliente');
      errorMessage = 'Ops! Um problema inesperado aconteceu! (cliente)';
    } else {
      console.error('servidor');
      errorMessage = ErrorUtil.getServerErrorMessage(error);
    }

    //retorna um Error
    return throwError(new Error(errorMessage));
  }

  private static getServerErrorMessage(error: HttpErrorResponse) {
    switch (error.status) {
      case 404: {
        return `O recurso informado não foi encontrado!`;
      }
      case 403: {
        return `O acesso foi negado!`;
      }
      case 500: {
        return `Ops! Um erro inesperado aconteceu!`;
      }
      default: {
        return `Ops! Um erro inesperado aconteceu! Tente novamente mais tarde!`;
      }
    }
  }
}

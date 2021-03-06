import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UsersRepositoryService } from '../../services';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class UsersRepositoryServiceFake extends UsersRepositoryService {
  constructor() {
    super(null);
  }

  getUsers(): Observable<any> {
    return of({
      data: [
        {
          id: 1,
          first_name: 'George',
          last_name: 'Bluth',
          avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg'
        },
        {
          id: 2,
          first_name: 'Janet',
          last_name: 'Weaver',
          avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg'
        },
        {
          id: 3,
          first_name: 'Emma',
          last_name: 'Wong',
          avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg'
        }
      ]
    });
  }
}

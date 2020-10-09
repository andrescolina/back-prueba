import { Router } from 'express';

import CrudDatabase from '../controlers/crud.controller';

class CrudRoutes{

  public router: Router;

  constructor(){
    this.router = Router();
    this.config();
  }

  config(): void {

    this.router.get('/', CrudDatabase.get );
    this.router.post('/', CrudDatabase.post );
    this.router.put('/:postId', CrudDatabase.put);
    this.router.get('/:postId', CrudDatabase.getUser);
    this.router.delete('/:postId', CrudDatabase.delete);
  }

}

const CrudApp = new CrudRoutes();
export default CrudApp.router;
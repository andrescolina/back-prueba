import { Request, Response } from 'express';

import { connect } from '../database/database';
import { TableDB } from '../interfaces/model'

class CrudDatabase{

  constructor(){


  }


  public async get( req:Request, res:Response ): Promise<void>{

    const conn = await connect();

    const posts = await conn.query('SELECT * FROM usuarios')


    res.status(200).json(posts[0])

  }

  public async post( req:Request, res:Response ): Promise<void>{ 

    const conn = await connect();
    try {

        let body: TableDB = req.body;

        let data: any = await conn.query('INSERT INTO usuarios SET ?', [body]);
        
        let dataResponse: any = await conn.query(`SELECT * FROM usuarios WHERE id = ${data[0].insertId}`)
        
        res.status(201).json(dataResponse[0][0]);
    } 
    catch (e) {
        console.error(e);
        
        res.status(400).json({
            'msg': 'Datos invalidos'
        })
    }
  }

  public async put(req: Request, res: Response): Promise<void>{
    try {
      const id = req.params.postId;
      const updatePost: TableDB = req.body;
      const conn = await connect();
      
      let data: any = await conn.query('UPDATE usuarios set ? WHERE id = ?', [updatePost, id]);
      let dataResponse: any = await conn.query(`SELECT * FROM usuarios WHERE id = ${id}`)
      
      res.status(201).json(dataResponse[0][0]);
    } catch (e) {
      console.error(e);
      
      res.status(400).json({
          'msg': 'Datos invalidos'
      })
  }
    const id = req.params.postId;
    const updatePost: TableDB = req.body;
    const conn = await connect();
    
    let data: any = await conn.query('UPDATE usuarios set ? WHERE id = ?', [updatePost, id]);
    let dataResponse: any = await conn.query(`SELECT * FROM usuarios WHERE id = ${data[0].insertId}`)
    
    
    res.status(201).json(dataResponse[0][0]);
  }


  public async getUser( req:Request, res:Response ): Promise<void>{

    const conn = await connect();
    const id = req.params.postId;
    const posts: any = await conn.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    
    if (posts[0].length == 0) {
      res.status(400).json({
        'msg': "User doesn't exists"
      })
    } else {
      res.json(posts[0][0]);
    }

  }

  public async delete( req:Request, res:Response ): Promise<void>{

    const id = req.params.postId;
    const conn = await connect();
    await conn.query('DELETE FROM usuarios WHERE id = ?', [id]);
    res.status(204).send()
  }
}

const apiCrud = new CrudDatabase();

export default apiCrud;
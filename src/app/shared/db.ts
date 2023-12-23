import Dexie, { Table } from 'dexie';
import { Suscrito } from './suscritos.model';
import { Parabola } from './parabolas.model';

export class AppDB extends Dexie {
  suscritos!: Table<Suscrito, number>;
  parabolas!: Table<Parabola, number>;

  constructor() {
    super('examenUABtecIntern');
    this.version(3).stores({
      suscritos: '++id, correo, nombreCompleto, celular',
      parabolas: '++id, nickname, tipoPubli, tuparabola, fechapubli',
    });
    // this.on('populate', () => this.populate());
  }

  // async populate() {
  //   await db.suscritos.bulkAdd([
  //     {
  //       id: 1,
  //       correo: 'micorreo',
  //       nombreCompleto: 'Sven',
  //     },
  //     {
  //       id: 2,
  //       correo: 'micor',
  //       nombreCompleto: 'Sazy',
  //     },
  //     {
  //       id: 3,
  //       correo: 'micocom',
  //       nombreCompleto: 'Salchis',
  //     },
  //   ]);
  // }
}

export const db = new AppDB();

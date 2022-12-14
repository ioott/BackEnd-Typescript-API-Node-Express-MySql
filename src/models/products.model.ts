import { ResultSetHeader } from 'mysql2/promise';
import connection from './connection';
import { Product } from '../../interfaces';

const ProductModel = {
  async create(product: Product): Promise<Product> {
    const { name, amount } = product;
    const result = await connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products ( name, amount) VALUES (?, ?)',
      [name, amount],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, name, amount };
  },

  async getAll(): Promise<Product[]> {
    const result = await connection.execute(
      'SELECT * FROM Trybesmith.Products',
    );
    const [rows] = result;
    return rows as Product[];
  },
};

export default ProductModel;

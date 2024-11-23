import { DataSource } from "typeorm";
import { addTransactionalDataSource } from "typeorm-transactional";

export async function dataSourceFactory(options) {
    if (!options) {
        throw new Error('Invalid options passed');
    }
    return addTransactionalDataSource(new DataSource(options));
}
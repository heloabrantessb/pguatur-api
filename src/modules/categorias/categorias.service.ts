import { CategoriaRepository } from "./categorias.repository";
import { CategoriaInput } from "./categorias.schema";

export class CategoriaService {
    constructor(
        private readonly categoriaRepository: CategoriaRepository
    ){}

    public async criarCategoria(data: CategoriaInput){
        return await this.categoriaRepository.create(data)
    }

    public async buscarCategorias(){
        return await this.categoriaRepository.findAll()
    }

    public async buscarCategoriaPorId(id: number){
        return await this.categoriaRepository.findById(id)
    }

    public async atualizarCategoria(id: number, data: CategoriaInput){
        return await this.categoriaRepository.update(id, data)
    }

    public async deletarCategoria(id: number){
        return await this.categoriaRepository.delete(id)
    }
}
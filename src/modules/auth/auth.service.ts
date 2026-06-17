import bcrypt from 'bcryptjs'
import { AuthRepository } from './auth.repository'
import { RegistroInput, LoginInput } from './auth.schema'

export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository
    ) {}

    public async registrar(data: RegistroInput) {
        const usuarioExistente = await this.authRepository.findByEmail(data.email)
        if (usuarioExistente) {
            throw new Error('Email já cadastrado')
        }

        const hashSenha = await bcrypt.hash(data.senha, 10)

        const usuario = await this.authRepository.create({
            nome: data.nome,
            email: data.email,
            hashSenha,
            funcao: data.funcao,
        })

        // Retorna o usuário sem o hash da senha
        const { hashSenha: _, ...usuarioSemSenha } = usuario
        return usuarioSemSenha
    }

    public async login(data: LoginInput) {
        const usuario = await this.authRepository.findByEmail(data.email)
        if (!usuario) {
            throw new Error('Email ou senha inválidos')
        }

        const senhaValida = await bcrypt.compare(data.senha, usuario.hashSenha)
        if (!senhaValida) {
            throw new Error('Email ou senha inválidos')
        }

        // Retorna o usuário sem o hash da senha
        const { hashSenha: _, ...usuarioSemSenha } = usuario
        return usuarioSemSenha
    }

    public async buscarPorId(id: number) {
        const usuario = await this.authRepository.findById(id)
        if (!usuario) {
            throw new Error('Usuário não encontrado')
        }

        const { hashSenha: _, ...usuarioSemSenha } = usuario
        return usuarioSemSenha
    }
}

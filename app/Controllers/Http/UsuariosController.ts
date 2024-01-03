import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuarios from 'App/Models/Usuarios'
import { DateTime } from 'luxon'
import { md5 } from 'js-md5'

export default class UsuariosController {
  public async index({}: HttpContextContract) {
    return Usuarios.all()
  }

  public async store({ request, response }: HttpContextContract) {
    const { nome, cpf, senha } = request.body()
    const novoUsuarios = { nome, cpf, senha }
    const novasenha = md5(senha)
    novoUsuarios.senha = novasenha
    Usuarios.create(novoUsuarios)
    return response.status(201).send(novoUsuarios)
  
  }

  public async show({ params, response }: HttpContextContract) {
    //funcao callback
    let UsuariosEncontrado = await Usuarios.findByOrFail('id', params.id)
    if (UsuariosEncontrado == undefined) return response.status(404)
    return UsuariosEncontrado
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { nome, cpf, senha } = request.body()
    let UsuariosEncontrado = await Usuarios.findByOrFail('id', params.id)
    if (!UsuariosEncontrado) return response.status(404)
    UsuariosEncontrado.nome = nome
    UsuariosEncontrado.cpf = cpf
    UsuariosEncontrado.senha = senha

    await UsuariosEncontrado.save()
    await UsuariosEncontrado.merge({ updatedAt: DateTime.local() }).save()
    return response.status(200).send(UsuariosEncontrado)
  }

  public async destroy({ response, params }: HttpContextContract) {
    let UsuariosEncontrado = await Usuarios.findByOrFail('id', params.id)
    if (!UsuariosEncontrado) return response.status(404)
    UsuariosEncontrado.delete()
    return response.status(204)
  }
}
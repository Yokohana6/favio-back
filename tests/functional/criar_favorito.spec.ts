import { test } from '@japa/runner'

test.group('Criar favorito', () => {
  test('criar favorito', async ({client})=>{
    const resposta=await client.post('/favoritos').json(
      {nome: 'IFRN',
      url:'wwww.ifrn.edu.br',
      importante:false
      })
    resposta.assertStatus(201)
    resposta.assertBodyContains({nome:"IFRN"})
  })
  test('criarmfavorito com campo faltante')
})

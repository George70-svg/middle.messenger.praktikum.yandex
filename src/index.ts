import App from './app.ts'
import { HTTPTransport, METHOD } from './api/apiService.ts'

document.addEventListener('DOMContentLoaded', () => {
  const app = new App()
  app.render()

  const requestTesting = async () => {
    //GET Test
    const xhrGet = await new HTTPTransport().get('https://jsonplaceholder.typicode.com/todos/1')
    console.log(xhrGet.response)

    //POST Test
    const xhrPost = await new HTTPTransport().post('https://jsonplaceholder.typicode.com/posts', {
      method: METHOD.POST,
      data: {
        title: 'foo',
        body: 'bar',
        userId: 1
      },
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    console.log(xhrPost.response)

    //PUT Test
    const xhrPut = await new HTTPTransport().put('https://jsonplaceholder.typicode.com/posts/1', {
      method: METHOD.PUT,
      data: {
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1
      },
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    console.log(xhrPut.response)

    //DELETE Test
    const xhrDelete = await new HTTPTransport().delete('https://jsonplaceholder.typicode.com/posts/1')
    console.log(xhrDelete.response)
  }

  // eslint-disable-next-line no-void
  void requestTesting()
    .then((r) => {
      console.log(r)
    })
})

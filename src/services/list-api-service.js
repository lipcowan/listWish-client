import TokenService from '../services/token-service';
import config from '../config';

const ListApiService = {
    getLists() {
      return fetch(`${config.API_ENDPOINT}/lists`, {
          headers: {    
          },
      })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )
    },

    postList(title, description) {
      return fetch(`${config.API_ENDPOINT}/lists`, {
          method: 'POST',
          headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${TokenService.getAuthToken()}`
          },
          body: JSON.stringify({
              list_title: title,
              list_description: description,
          }),
      })
        .then(res => 
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
            )
    },

    getList(listId) {
        return fetch(`${config.API_ENDPOINT}/lists/${listId}`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
          .then(res => 
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    },
    
    deleteList(listId) {
      return fetch(`${config.API_ENDPOINT}/lists/${listId}`, {
        method: 'DELETE',
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`
        },
      })
      //returning 204 or 404
        .then(res => 
           (!res.ok)
             ? res.json().then(e => Promise.reject(e))
             : res 
        )
    },

    getListWishes(listId) {
        return fetch(`${config.API_ENDPOINT}/lists/${listId}/wishes`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
          .then(res => 
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    },

    postWish(listId, title, url) {
        return fetch(`${config.API_ENDPOINT}/wishes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                list_id: listId,
                wish_title: title,
                wish_url: url,
            }),
        })
          .then(res => 
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    },

    editWish(listId, wishId, title, url) {
        return fetch(`${config.API_ENDPOINT}/wishes/${wishId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                id: wishId,
                wish_title: title,
                wish_url: url,
                list_id: listId
            }),  
        })
          .then(res => 
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : null
            )
    }
}

export default ListApiService
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
    }
}

export default ListApiService
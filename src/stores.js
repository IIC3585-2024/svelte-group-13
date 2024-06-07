import {writable} from 'svelte/store'

export const user = writable({})
export const userToken = writable('')
export const userIsLoggedIn = writable(false)
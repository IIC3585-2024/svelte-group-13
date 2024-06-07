<script>
	import Navbar from './Navbar.svelte';
	import github from '$lib/images/github.svg';
	import './styles.css';
	import { userIsLoggedIn, user } from '@stores';
	import { onAuthStateChanged, signOut } from 'firebase/auth';
	import { auth } from '@firebaseconf';
    import { onMount } from 'svelte';
	import {goto} from '$app/navigation';
	onMount(() => {
		onAuthStateChanged(auth, (u) => {
			console.log("XD",$userIsLoggedIn)
			user.set(u);
			userIsLoggedIn.set(!!u);
			console.log("XD2",$user)
			if (!$userIsLoggedIn) {
				goto('/login')
			}
		});
	});
	//user.known.then(()=>{console.log($user)})

	/*
	onAuthStateChanged(auth, (u) => {
		console.log(user.known);
		//user.set(u);
		//userIsLoggedIn.set(!!u);
		//$user = u;
		//console.log(u)
		//console.log($user)
		//$userIsLoggedIn = !!u;
	});//*/

</script>

<div class="app">
	<Navbar />

	<main>
		<slot />
	</main>

	<footer>
		<p>Aplicación hecho con svelte para IIC3585</p>
		<div class="corner">
			<a href="https://github.com/IIC3585-2024/svelte-group-13/tree/main">
				<img src={github} alt="GitHub" />
			</a>
		</div>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
	footer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
	.corner {
		width: 2em;
		height: 2em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 1.5em;
		height: 1.5em;
		object-fit: contain;
	}
</style>

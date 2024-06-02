<script>
</script>

<svelte:head>
	<title>Mybooks</title>
	<meta name="description" content="Mybooks demo app" />
</svelte:head>

<section>
	<h1 class="logo">
		myBooks
	</h1>
	<input />

	<div class="buttons">
		<button on:click={() => console.log("hola1")}>
			Buscar MyBooks
		</button>
		<button on:click={() => console.log("hola2")}>
			Quiero probar suerte
		</button>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
	.logo {
		font-size: 10em;
		margin: 0;
		margin-bottom: 0.2em;
	}
	input {
		width: 70%;
		padding: 0.2em 0 0.2em 0.5em;
		font-size: 1.5em;
		margin-bottom: 1em;
	}
	.buttons {
		margin-top: 0.3em;
		display: flex;
		flex-direction: row;
		gap: 1em;
	}
</style>

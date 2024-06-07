<script>
    import { auth } from '@firebaseconf';
    import { onMount } from 'svelte';
    import { getDatabase, ref, onValue } from "firebase/database";
	import { user } from '@stores';
	import { goto } from '$app/navigation';

    let markedBooks = []; // Almacena los libros marcados por el usuario

    onMount(() => {
        if (user) {
            // Obtiene la instancia de la base de datos
            const db = getDatabase();

            // Referencia a la lista de libros marcados del usuario actual
            const userMarkedBooksRef = ref(db, `markedBooks/${$user.uid}`);

            // Escucha cambios en la lista de libros marcados del usuario
            onValue(userMarkedBooksRef, (snapshot) => {
				
                const data = snapshot.val();
				console.log("XD",userMarkedBooksRef)
                if (data) {
                    // Convierte los datos del snapshot en un array
                    markedBooks = Object.values(data);
                }
            });
        }
    });

	const handleBookClick = (id) => {
        goto(`/book/${id}`);
    }
</script>

<svelte:head>
    <title>Marked Books</title>
    <meta name="description" content="Marked Books" />
</svelte:head>

{#if !markedBooks}
    <p>Loading...</p>
{:else}
    <div class="grid-container">
        {#each markedBooks as book}
            <div class="book" on:click={() => handleBookClick(book.key.split('/').pop())}>
                <img src="{book.cover_url}" alt="{book.title} cover">
                <div class="details">
                    <h3>{book.title}</h3>
                    <p>by {book.author}</p>
                </div>
            </div>
        {/each}
    </div>
{/if}


<style>
    .grid-container {
        display: grid;
        grid-template-columns: repeat(5, 1fr); /* 5 columnas */
        grid-gap: 20px; /* Espacio entre las celdas */
    }

    .book {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid #ccc;
        padding: 10px;
        cursor: pointer;
    }

    .book img {
        width: 100px;
        height: auto;
        margin-bottom: 10px;
    }

    .details {
        text-align: center;
    }
</style>

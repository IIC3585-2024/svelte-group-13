<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { getDatabase, ref, push, onValue, query, equalTo, remove } from "firebase/database";
    import { user } from '@stores';
    import { goto } from '$app/navigation';

    const { bookId } = $page.params;
    let loading = true;
    let data = {};
    let isBookMarked = false;

    onMount(async () => {
        await getBookInfo();
        await checkIfBookIsMarked();
        loading = false;
    });

    const getBookInfo = async () => {
        try {
            const response = await fetch(`https://openlibrary.org/works/${bookId}.json`);
            data = await response.json();
            data.cover_url = `https://covers.openlibrary.org/b/id/${data?.covers[0]}-L.jpg`;
            const response2 = await fetch(`https://openlibrary.org${data.authors[0].author.key}.json`);
            const authorData = await response2.json();
            data.author_name = authorData.name;
        } catch (error) {
            console.error(error);
        }
    };

    const checkIfBookIsMarked = async () => {
        if (!$user) return;
        const db = getDatabase();

        try {
            const userMarkedBooksRef = ref(db, `markedBooks/${$user.uid}`);

            const q = query(userMarkedBooksRef, equalTo("title", `${data.title}`));
			
            onValue(q, (snapshot) => {
                isBookMarked = snapshot.exists();
				console.log(isBookMarked )
            });
        } catch (error) {
            console.error("Error al verificar si el libro está marcado:", error);
        }
    };

    const toggleBookMark = async () => {
        if (!$user) {
            console.log("Debe iniciar sesión para marcar o desmarcar un libro.");
            return;
        }

        const db = getDatabase();

        try {
            const userMarkedBooksRef = ref(db, `markedBooks/${$user.uid}`);

            if (isBookMarked) {
                await remove(userMarkedBooksRef);
                console.log("Libro desmarcado exitosamente.");
                alert("Libro desmarcado exitosamente.");
            } else {
                await push(userMarkedBooksRef, {
                    title: data.title,
                    author: data.author_name,
                    cover_url: data.cover_url,
                    key: data.key
                });
                console.log("Libro marcado exitosamente.");
                alert("Libro marcado exitosamente.");
            }
            goto('/marked');
        } catch (error) {
            console.error("Error al marcar o desmarcar el libro:", error);
        }
    };
</script>

<svelte:head>
    <title>{data.title || 'Book Details'}</title>
    <meta name="description" content="About this app" />
</svelte:head>

{#if loading}
    <p>Loading...</p>
{:else}
    <div class="book-container">
        <img src="{data.cover_url}" alt="{data.title} cover" class="cover">
        <div class="details">
            <h3>{data.title}</h3>
            <p>by {data.author_name}</p>
            <p>Descripción: {data.description?.value || data.description}</p>
            {#if isBookMarked}
                <button class="unmark-button" on:click={toggleBookMark}>Desmarcar</button>
            {:else}
                <button class="mark-button" on:click={toggleBookMark}>Marcar</button>
            {/if}
        </div>
    </div>
{/if} 

<style>
    .book-container {
        display: flex;
        align-items: flex-start;
        border: 1px solid #ccc;
        padding: 20px;
        gap: 20px; /* Espacio entre la portada y los detalles */
    }

    .cover {
        width: 200px;
        height: auto;
    }

    .details {
        display: flex;
        flex-direction: column;
    }

    .details h3 {
        margin: 0 0 10px 0;
    }

    .details p {
        margin: 5px 0;
    }

    .details button {
        margin-top: 10px;
    }

    .mark-button, .unmark-button {
        max-width: fit-content;
        margin-top: 10px;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        transition: background-color 0.3s ease;
    }

    .mark-button {
        background-color: #8BC34A; /* Verde claro */
        color: white;
    }

    .mark-button:hover {
        background-color: #7CB342;
    }

	.mark-button:active {
	background-color: #689F38; 
}
  </style>
  
<script>
    import { onMount } from "svelte";
    import {goto} from '$app/navigation';

    let books = [];
    let booksWithCovers = [];
    let loading = true;

    onMount(async () => {
        await getBooks();
        loading = false;
    });

    const getBooks = async () => {
        try {
            const response = await fetch('https://openlibrary.org/subjects/love.json');
            const data = await response.json();
            books = data.works;
            booksWithCovers = await Promise.all(books.map(async (book) => {
                if (book.cover_id) {
                    const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`;
                    book.cover_url = coverUrl;
                } else {
                    book.cover_url = 'path/to/default/cover.jpg';
                }
                return book;
            }));
        } catch (error) {
            console.error(error);
        }
    }
    const handleBookClick = (id) => {
        goto(`/book/${id}`);
    }
</script>

<h1>Recomendaciones</h1>

{#if loading}
    <p>Loading...</p>
{:else}
    <div class="grid-container">
        {#each booksWithCovers as book}
            <div class="book" on:click={() => handleBookClick(book.key.split('/').pop())}>
                <img src="{book.cover_url}" alt="{book.title} cover">
                <div class="details">
                    <h3>{book.title}</h3>
                    <p>by {#each book.authors as author}{author.name}{/each}</p>
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

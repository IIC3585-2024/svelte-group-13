// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
/*
export async function load() {
    try {
      const response = await fetch('https://openlibrary.org/subjects/love.json');
      const data = await response.json();
      const books = data.works;
  
      
      const booksWithCovers = await Promise.all(books.map(async (book) => {
        if (book.cover_id) {
          const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`;
          book.cover_url = coverUrl;
        } else {
          book.cover_url = 'path/to/default/cover.jpg'; // URL de una portada por defecto si no tiene portada
        }
        return book;
      }));
      return {
        
        props: {
          books: booksWithCovers
        }
      };
    } catch (error) {
      return {
        status: 500,
        error: new Error('Failed to fetch books')
      };
    }
  }*/
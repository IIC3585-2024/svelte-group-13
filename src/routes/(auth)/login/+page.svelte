<script>
    import { auth } from '../firebase';
    import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
    import { userIsLoggedIn, user } from '@stores';
    import { goto } from '$app/navigation';

    const login = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            $user = result;
            $userIsLoggedIn = true;
            goto('/');
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };
</script>



<div class="centered-container">
    <button class="google-btn" on:click={login}>
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Logo">
        Sign in with Google
    </button>
</div>

<style>
    .centered-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .google-btn {
        background-color: #f48b46; /* Color de fondo de Google */
        color: white;
        padding: 12px 24px;
        font-size: 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
        display: flex;
        align-items: center;
    }

    .google-btn img {
        margin-right: 8px; 
        height: 24px; 
        width: auto; 
    }

    .google-btn:hover {
        background-color: #f3ae64;
    }
</style>
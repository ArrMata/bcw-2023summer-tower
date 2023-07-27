<template>
    <nav class="navbar navbar-expand-md flex-column justify-content-start vh-md-100 col-md-2 col-12 px-md-3">
        <div class="row w-100">
            <div class="col-12 d-flex justify-content-md-start justify-content-between">
                <h1><i class="mdi mdi-kangaroo"></i> Tower</h1>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <div v-if="account.id" class="d-flex flex-column w-100">
                    <div class="d-flex align-items-center mb-2">
                        <img class="img-fluid avatar" :src="account.picture">
                        <p class="fs-2 mb-0 ms-3">{{ account.name }}</p>
                    </div>
                    <p class="divider fs-4 mt-1">Main Menu</p>
                    <RouterLink class="my-2" :to="{name: 'Home'}"><p role="button" class="link fs-3"><i class="mdi mdi-home-variant"></i> Home</p></RouterLink>
                    <RouterLink class="my-2" :to="{name: 'Account'}"><p role="button" class="link fs-3"><i class="mdi mdi-account-box"></i> Account</p></RouterLink>
                    <p class="divider fs-4 mt-1">Actions</p>
                    <button class="primary-button fs-3 my-3" data-bs-toggle="modal" data-bs-target="#CreateEventForm"><i class="mdi mdi-plus-box"></i> New Event</button>
                    <button @click="logout" class="secondary-button fs-3 my-3"><i class="mdi mdi-logout-variant"></i> Logout</button>
                </div>
                <div v-else class="d-flex flex-column w-100">
                    <p class="divider fs-4 mt-1">Main Menu</p>
                    <RouterLink class="my-2" :to="{name: 'Home'}"><p role="button" class="link fs-3"><i class="mdi mdi-home-variant"></i> Home</p></RouterLink>
                    <p class="divider fs-4 mt-1">Actions</p>
                    <button @click="login" class="primary-button fs-3 my-3"><i class="mdi mdi-login-variant"></i> Login</button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { RouterLink } from 'vue-router'
export default {
    setup() {
        return {
            user: computed(() => AppState.user),
            account: computed(() => AppState.account),
            async login() {
                AuthService.loginWithPopup()
            },
            async logout() {
                AuthService.logout({ returnTo: window.location.origin })
            }
        }
    }, components: { RouterLink }
}
</script>

<style lang="scss" scoped>

    .navbar {
        background-color: var(--secondary);
        color: var(--text);
    }

    .navbar-toggler{
        background-color: var(--text);
        color: var(--primary);
    }

    .navbar-collapse {
        font-family: 'Ubuntu', sans-serif;
    }

    .link {
        color: var(--text-unselected);
        padding: 0.25rem;
        transition: all 0.15s ease;
        border-radius: 1rem;
        width: 100%;
    }

    .link:hover {
        color: var(--text);
        background-color: var(--hover-highlight);
    }

    .avatar {
        height: 4rem;
        width: 4rem;
        border-radius: 1rem;
        object-fit: cover;
        object-position: center;
    }

    .primary-button {
        background-color: var(--primary);
        color: var(--text);
        border: none;
        padding: 0.25rem;
        border-radius: 1rem;
        transition: all 0.25s ease;
    }

    .primary-button:hover {
        transform: translateY(-5px);
        box-shadow: 0px 0px 15px var(--primary);
    }

    .secondary-button {
        background-color: var(--background);
        color: var(--text);
        border: none;
        padding: 0.25rem;
        border-radius: 1rem;
        transition: all 0.25s ease;
    }

    .secondary-button:hover {
        transform: translateY(-5px);
        background-color: red;
        box-shadow: 0px 0px 15px red;
    }

    h1 {
        font-size: 3.5rem;
        font-family: 'Lobster', cursive;
    }
    
    p{
        margin-bottom: 0;
    }
    
    .vh-md-100{
        @media screen and (min-width: 768px) {
            height: 100dvh;
        }
    }

</style>
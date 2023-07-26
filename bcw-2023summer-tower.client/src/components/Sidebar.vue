<template>
    <div class="row sidebar">
        <div class="col-12 text-center p-0">
            <h1><i class="mdi mdi-kangaroo"></i> Tower</h1>
            <div v-if="account.id" class="d-flex flex-column align-items-center">
                <img class="img-fluid avatar" :src="account.picture">
                <h3 class="mt-2">{{account.name}}</h3>
                <RouterLink :to="{name: 'Home'}"><button type="button" class="btn btn-primary fs-4 mt-3">Home</button></RouterLink>
                <RouterLink :to="{name: 'Account'}"><button class="btn btn-primary fs-3 mt-3">Account</button></RouterLink>
                <button class="btn btn-primary fs-3 my-3" data-bs-toggle="modal" data-bs-target="#CreateEventForm">New Event</button>
                <button @click="logout" class="btn btn-primary fs-3">Logout</button>
            </div>
            <div v-else class="d-flex flex-column align-items-center">
                <RouterLink :to="{name: 'Home'}"><button type="button" class="btn btn-primary fs-4 mt-3">Home</button></RouterLink>
                <button @click="login" type="button" class="btn btn-primary fs-4 my-3">Login</button>
            </div>
        </div>
    </div>
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

    .sidebar {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: .5rem;
        margin: 0;
        background-color: var(--secondary);
        color: var(--text);
    }

    .avatar {
        height: 7rem;
        width: 7rem;
        border-radius: 2rem;
        object-fit: cover;
        object-position: center;
    }

    h1 {
        font-size: 3.5rem;
        font-family: 'Lobster', cursive;
    }

</style>
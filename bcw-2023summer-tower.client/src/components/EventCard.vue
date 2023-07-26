<template>
    <img class="img-fluid event-img" :src="te.coverImg">
    <div class="bg-light p-2">
        <p class="fs-4">{{ te.name }}</p>
        <p class="fs-4">{{ te.location }}</p>
    </div>
</template>

<script>
import { TowerEvent } from '../models/TowerEvent';

export default {
    props: {
        te: {type: TowerEvent, required: true}
    },
    setup() {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

.event-img {
  height: 35vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
}


</style>
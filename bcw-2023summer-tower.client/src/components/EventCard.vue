<template>
    <div class="event-card">
        <img class="img-fluid event-img" :src="te.coverImg">
        <div class="event-content p-2">
            <h2 class="fs-4 mb-0">{{ te.name }}</h2>
            <div class="mt-auto">
                <p class="fs-5"> {{ te.startDate.toLocaleDateString() }}</p>
                <p class="fs-5">{{ te.location }}</p>
            </div>
        </div>
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
  height: 65% ;
  width: 100%;
  object-fit: cover;
  object-position: center;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  transition: all 0.25 ease;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.event-card {
    height: 60vh;
    transition: all 0.25s ease;
    border-radius: 1rem;
}

.event-card:hover {
    height: 60vh;
    transform: scale(1.025);
    box-shadow: 0 0 50px var(--primary);
    // border: solid 2px var(--primary);
}

.event-content {
    height: 35%;
    display: flex;
    flex-direction: column;
    color: var(--text);
    background-color: var(--primary);
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
}

.event-content h2 {
    font-weight: 700;
}
.event-content p {
    font-weight: 300;
}

</style>
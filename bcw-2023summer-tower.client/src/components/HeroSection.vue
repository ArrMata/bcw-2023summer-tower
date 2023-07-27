<template>
    <img class="hero-img" src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNyb3dkfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="Hero Image">
    <div class="hero-content">
        <h2>Get <span class="color-primary">ahead</span> of the scalpers.</h2>
        <h2>Reserve your seat now for</h2>
        <h2><span class="color-primary">real events</span> with <span class="color-primary">real people.</span></h2>
    </div>
</template>

<script>
export default {
    setup() {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

.hero-img {
  position: absolute;
  z-index: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: 50% 75%;
  bottom: 0;
  left: 0;
  padding: inherit;
  border-radius: 1rem;
}

.hero-content {
  position: relative;
  z-index: 1;
}

h2 {
    font-weight: 700;
  text-shadow: 0 0 4px rgb(0, 0, 0);
  padding: 0 .5rem;
  @media screen and (min-width: 768px) {
    font-size: 2.5rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 1.35rem;
  }
}

</style>
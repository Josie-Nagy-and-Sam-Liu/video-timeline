<template>
  <div id="app">
    <nav>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "assets/stylesheets/styleguild";

html {
  font-size: 625%; /* 1px = 0.01rem */
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

body {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  font-family: Montserrat, "Avenir", "Hiragino Sans", "Microsoft JhengHei";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

button {
  font-family: inherit;
}

nav {
  height: 0.56rem;
}
</style>

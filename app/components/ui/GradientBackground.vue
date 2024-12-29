<template>
  <GridLayout class="gradient-container">
      <ContentView class="gradient-overlay">
          <slot></slot>
      </ContentView>
  </GridLayout>
</template>

<style scoped lang="scss">
.gradient-container {
  background: linear-gradient(45deg, #2193b0, #6dd5ed);
}

.gradient-overlay {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
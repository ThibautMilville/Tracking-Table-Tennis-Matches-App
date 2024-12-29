<template>
  <StackLayout class="input-container">
      <Label :text="label" class="input-label" />
      <TextField
          :text="modelValue"
          :hint="placeholder"
          :returnKeyType="returnKeyType"
          class="input-field"
          @textChange="$emit('update:modelValue', $event.value)"
      />
  </StackLayout>
</template>

<script>
export default {
  props: {
      label: String,
      modelValue: String,
      placeholder: String,
      returnKeyType: {
          type: String,
          default: 'done'
      }
  }
}
</script>

<style scoped lang="scss">
.input-container {
  margin: 10 0;
}

.input-label {
  color: #ffffff;
  font-size: 16;
  margin-bottom: 5;
  font-weight: bold;
}

.input-field {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8;
  padding: 12 15;
  color: #2c3e50;
  font-size: 16;
}
</style>
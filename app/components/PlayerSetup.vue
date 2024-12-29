<template>
    <StackLayout class="setup-container">
        <Label text="Table Tennis Scorer" class="app-title" />
        <StackLayout class="form-container">
            <StackLayout class="input-group">
                <Label text="Player 1" class="input-label" />
                <TextField v-model="p1Name" 
                          hint="Enter player 1 name" 
                          class="input-field"
                          returnKeyType="next" />
            </StackLayout>
            
            <StackLayout class="input-group">
                <Label text="Player 2" class="input-label" />
                <TextField v-model="p2Name" 
                          hint="Enter player 2 name" 
                          class="input-field"
                          returnKeyType="done" />
            </StackLayout>
            
            <Button text="Start Match" 
                    @tap="onStartMatch" 
                    class="start-button" />
        </StackLayout>
    </StackLayout>
  </template>
  
  <script>
  export default {
      data() {
          return {
              p1Name: '',
              p2Name: ''
          };
      },
      methods: {
          onStartMatch() {
              if (!this.p1Name.trim() || !this.p2Name.trim()) {
                  alert('Please enter names for both players');
                  return;
              }
              this.$emit('start-match', { 
                  p1Name: this.p1Name, 
                  p2Name: this.p2Name 
              });
          }
      }
  }
  </script>
  
  <style scoped lang="scss">
  .setup-container {
      padding: 20;
      background-color: #f8f9fa;
  }
  
  .app-title {
      font-size: 24;
      font-weight: bold;
      color: #2c3e50;
      text-align: center;
      margin-bottom: 30;
  }
  
  .form-container {
      background-color: white;
      border-radius: 10;
      padding: 20;
  }
  
  .input-group {
      margin-bottom: 20;
  }
  
  .input-label {
      font-size: 16;
      color: #495057;
      margin-bottom: 5;
  }
  
  .input-field {
      font-size: 16;
      padding: 12;
      background-color: #f8f9fa;
      border-radius: 5;
      border-width: 1;
      border-color: #dee2e6;
  }
  
  .start-button {
      margin-top: 20;
      background-color: #007bff;
      color: white;
      font-size: 18;
      font-weight: bold;
      padding: 15;
      border-radius: 5;
  }
  </style>
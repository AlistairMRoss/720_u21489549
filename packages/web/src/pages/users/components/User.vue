<template>
    <div class="card mt-5">
      <div class="card-header">
        <h5 class="card-title">{{ getAttribute("given_name") }} {{ getAttribute("family_name") }}</h5>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-5">
            {{ getAttribute("email")}}
          </div>
        </div>
      </div>
    </div>
</template>
  
<script lang="ts">
  export default {
    name: 'User',
    props: ["user"],
    methods: {
      getAttribute(attributeName: any) {
        const attribute = this.user.Attributes.find((attr: { Name: any; }) => attr.Name === attributeName);
        return attribute ? attribute.Value : 'Not available';
      }
    }
  }
  
</script>
  
<style scoped>
  .card {
    border: 1px solid var(--bs-primary);
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .card-header {
    background-color: #f8f9fa;
    border-bottom: 1px solid var(--bs-primary)
  }

  .card-title {
    margin-bottom: 0;
  }
</style>
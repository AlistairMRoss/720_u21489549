<template>
    <div class="box-container">
        <div class="box">
            <div class="box-header text-white">
                {{ course.courseId }}
            </div>
            <div class="box-subsection">
                {{ course.description }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "Course",
        props: ["course"]
    }
</script>

<style scoped>
.box-container {
    display: flex;
    padding: 1rem;
}

.box {
    border: 1px solid var(--bs-primary);
    border-radius: 0.25rem;
    overflow: hidden;
    max-width: 100%;
    width: 100%;
}

.box-header {
    background-color: var(--bs-primary);
    padding: 1rem;
    font-weight: bold;
}

.box-subsection {
    padding: 1rem;
    background-color: #f8f9fa;
}
</style>

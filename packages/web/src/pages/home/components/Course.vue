<template>
    <div class="box-container mt-4">
        <div class="box">
            <div class="box-header text-white animation-bg">
                {{ course.courseId }}
            </div>
            <div class="box-subsection p-4 bg-light">
                <h5 class="mb-3">Description:</h5>
                <p>{{ course.description }}</p>
            </div>
            <div class="box-subsubsection p-3 bg-light animation-bg">
                <h5 class="mb-2">Lecture:</h5>
                <p>{{ course.lecture }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "Course",
        props: ["course"],
    }
</script>

<style scoped>
    .box {
        border: 1px solid var(--bs-primary);
        border-radius: 0.25rem;
        overflow: hidden;
    }

    .box-header {
        padding: 1rem;
        font-weight: bold;
    }

    .box-subsection,
    .box-subsubsection {
        border-bottom: 1px solid var(--bs-primary);
    }

    .box-subsection:last-child,
    .box-subsubsection:last-child {
        border-bottom: none;
    }

    .box-subsection h5,
    .box-subsubsection h5 {
        font-size: 1.2rem;
        font-weight: bold;
        color: rgb(70, 66, 66);
    }

    .animation-bg {
        background: linear-gradient(45deg, var(--bs-primary), #71e9bb, #a4c4b7);
        background-size: 400% 400%;
        animation: gradientAnimation 10s ease infinite;
    }

    @keyframes gradientAnimation {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
</style>

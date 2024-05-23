<template>
    <div class="popup-wrapper">
        <div class="popup">
            <slot name="header" />
            <slot />
        </div>
    </div>
</template>
  
<style scoped>
.popup-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.popup {
    background: var(--bs-body-bg);
    padding: 20px;
    border-radius: 8px;
    width: 30%;
    position: relative;
    z-index: 9999;
}
</style>
  
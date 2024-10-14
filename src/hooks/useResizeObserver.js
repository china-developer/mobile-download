import { ref, onMounted, onUnmounted } from 'vue';

export function useResizeObserver() {
  const viewportWidth = ref(window.innerWidth);

  const handleResize = () => {
    viewportWidth.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

  return viewportWidth;
}
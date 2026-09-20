<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

interface Props {
  speed?: number;
  autoAnimate?: boolean;
  followMouse?: boolean;
  primaryColor?: string;
  shineColor?: string;
  baseColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  speed: 1.2,
  autoAnimate: true,
  followMouse: true,
  primaryColor: '#38bdf8', // Brilho specular celeste elegante
  shineColor: '#ffffff',   // Ponto máximo de reflexo branco
  baseColor: 'rgba(36, 59, 79, 0.18)', // Cor base da borda alinhada à paleta
});

const containerRef = ref<HTMLElement | null>(null);
const angle = ref(0);
let targetAngle = 0;
let isHovering = false;
let rafId: number | null = null;

function handleMouseMove(e: MouseEvent) {
  if (!props.followMouse || !containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const rad = Math.atan2(e.clientY - centerY, e.clientX - centerX);
  let deg = (rad * 180) / Math.PI;
  if (deg < 0) deg += 360;
  targetAngle = deg;
  isHovering = true;
}

function handleMouseLeave() {
  isHovering = false;
}

function animate() {
  if (isHovering && props.followMouse) {
    let diff = (targetAngle - angle.value) % 360;
    if (diff < -180) diff += 360;
    if (diff > 180) diff -= 360;
    angle.value = (angle.value + diff * 0.12) % 360;
  } else if (props.autoAnimate) {
    angle.value = (angle.value + props.speed) % 360;
  }

  rafId = requestAnimationFrame(animate);
}

onMounted(() => {
  rafId = requestAnimationFrame(animate);
});

onUnmounted(() => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
  }
});

const gradientStyle = computed(() => {
  const a = Math.round(angle.value);
  return {
    background: `conic-gradient(from ${a}deg at 50% 50%, 
      ${props.baseColor} 0deg, 
      ${props.baseColor} 100deg, 
      ${props.primaryColor} 160deg, 
      ${props.shineColor} 180deg, 
      ${props.primaryColor} 200deg, 
      ${props.baseColor} 260deg, 
      ${props.baseColor} 360deg)`
  };
});
</script>

<template>
  <div
    ref="containerRef"
    class="relative p-[2.5px] rounded-3xl transition-shadow duration-300"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Brilho difuso exterior (Glow Specular) -->
    <div
      class="absolute inset-0 rounded-3xl blur-[8px] opacity-40 transition-opacity duration-300 pointer-events-none"
      :style="gradientStyle"
    />

    <!-- Linha especular na borda (Specular Rim Light) -->
    <div
      class="absolute inset-0 rounded-3xl pointer-events-none"
      :style="gradientStyle"
    />

    <!-- Conteúdo do card protegido no topo com fundo sólido -->
    <div class="relative z-10 bg-white p-4 sm:p-5 rounded-[22px] shadow-sm">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* Otimização de aceleração por GPU para transições suaves */
.rounded-3xl {
  will-change: transform;
}
</style>

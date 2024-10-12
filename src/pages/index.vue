<script setup lang="ts">
import type { PickerColumn } from 'vant'
import useAppStore from '@/stores/modules/app'
import { languageColumns, locale } from '@/utils/i18n'
import { gsap } from "gsap";

const appStore = useAppStore()
const checked = ref<boolean>(isDark.value)

watch(
  () => isDark.value,
  (newMode) => {
    checked.value = newMode
  },
  { immediate: true },
)

function toggle() {
  toggleDark()
  appStore.switchMode(isDark.value ? 'dark' : 'light')
}

const { t } = useI18n()

const showLanguagePicker = ref(false)
const languageValues = ref<Array<string>>([locale.value])
const language = computed(() => languageColumns.find(l => l.value === locale.value).text)

function onLanguageConfirm(event: { selectedOptions: PickerColumn }) {
  locale.value = event.selectedOptions[0].value as string
  showLanguagePicker.value = false
}

function getImageUrl(url) {
  return new URL(`../assets/images/${url}`, import.meta.url).href;
}

const img1 = ref(null);
const img2 = ref(null);
const phone = ref(null);
const download = ref(null)
const iconSrc = ref(getImageUrl('az.png'));
const iconSrc2 = ref(getImageUrl('ios.png'));
let animation;
function handleMouseOver() {
  gsap.to(img1.value, {
    backgroundColor: '#FFD1D1', duration:0.1, onComplete: () => {
      iconSrc.value = getImageUrl('download.png'); // 悬浮时切换图标
    }
  });
}

function handleMouseLeave() {
  gsap.to(img1.value, {
    backgroundColor: '#fff', duration: 0.1, onComplete: () => {
      iconSrc.value = getImageUrl('az.png'); // 离开时恢复图标
    }
  });
}

function handleMouseOver2() {
  gsap.to(img2.value, {
    backgroundColor: '#FFD1D1', duration:0.1, onComplete: () => {
      iconSrc2.value = getImageUrl('download.png'); // 悬浮时切换图标
    }
  });
}

function handleMouseLeave2() {
  gsap.to(img2.value, {
    backgroundColor: '#fff', duration: 0.1, onComplete: () => {
      iconSrc2.value = getImageUrl('ios.png'); // 离开时恢复图标
    }
  });
}

onMounted(() => {
  animation = gsap.fromTo(phone.value, {
    opacity: 0,
    rotationY: 90, // 控制翻转的角度
  }, { duration: 1, opacity: 1, rotationY: 180, ease: 'power2.inOut' });
  gsap.fromTo(download.value, { opacity: 0, y: 100 }, { opacity: 1, y: -50, duration: 1 });
  // img1.value.addEventListener('mouseenter', switchImgGsapIn(), { passive: true });
  // img1.value.addEventListener('mouseleave', switchImgGsapOut(), { passive: true });
});

onUnmounted(() => {
  if (animation) {
    animation.kill();
  }
});

</script>

<template>
  <div class='container relative mx-auto'>
    <van-image class="absolute top-0 left-0" width="100%" height="auto" :src="getImageUrl('bg.png')" />
    <div class="phone_container" ref="phone">
      <van-image class="phone_img" width="500" height="auto" :src="getImageUrl('phone.png')" />
      <van-swipe class="my-swipe" :autoplay="3000" :show-indicators="false" indicator-color="white">
        <van-swipe-item>
          <img class="w-full h-full" src="@/assets/images/slide-01.jpg" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img class="w-full h-full" src="@/assets/images/slide-02.jpg" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img class="w-full h-full" src="@/assets/images/slide-03.jpg" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <ul class="flex flex-col mt-10 lg:gap-30 absolute lg:bottom-320 lg:right-450 z-999 cursor-pointer" ref="download">
      <li class="w-250 h-60 bg-white rounded-full flex items-center justify-center text-center text-black " @mouseover.stop="handleMouseOver()"  @mouseleave.stop="handleMouseLeave()" ref="img1">
        <img class="w-30 h-auto mr-20" :src="iconSrc" >
        <span>Android下载</span>
      </li>
      <li class="w-250 h-60 bg-white rounded-full flex items-center justify-center text-center text-black "@mouseover.stop="handleMouseOver2()"  @mouseleave.stop="handleMouseLeave2()" ref="img2">
        <img class="w-30 h-auto mr-20" :src="iconSrc2" alt="">
        <span>iPhone下载</span>
      </li>
    </ul>
    <!-- <VanCellGroup :title="t('menus.basicSettings')" :border="false" :inset="true">
    <VanCell center :title="t('menus.darkMode')">
      <template #right-icon>
        <VanSwitch v-model="checked" size="20px" aria-label="on/off Dark Mode" @click="toggle()" />
      </template>
</VanCell>
<VanCell is-link :title="t('menus.language')" :value="language" @click="showLanguagePicker = true" />
</VanCellGroup>

<van-popup v-model:show="showLanguagePicker" position="bottom">
  <van-picker v-model="languageValues" :columns="languageColumns" @confirm="onLanguageConfirm"
    @cancel="showLanguagePicker = false" />
</van-popup> -->
  </div>
</template>
<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  /* background-color: yellow; */
}

.phone_container {
  width: 25rem;
  height: 48rem;
  margin: 0 auto;
  bottom: 2rem;
  left: 15rem;
  /* background-color: red; */
  position: absolute;
  overflow: hidden;
}

.my-swipe {
  width: 20rem;
  height: 42.2rem;
  position: absolute;
  top: 1.5rem;
  left: 2.45rem;
  /* margin:1rem auto 0; */
  border-radius: 5%;
}

.my-swipe .van-swipe-item {
  width: 100%;
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #0c192c;
}

.phone_img {
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
}
</style>


<route lang="json">{
  "name": "home",
  "meta": {
    "title": "主页",
    "i18n": "menus.home"
  }
}</route>

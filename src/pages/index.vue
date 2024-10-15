<script setup lang="ts">
import { showConfirmDialog } from 'vant'
import { gsap } from "gsap";
import { useResizeObserver } from '@/hooks/useResizeObserver';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

definePage({
  name: "downLoadPage",
  meta: {
    level: 1,
    title: "Lotaria VN100",
    i18n: "home.downLoadPage",
  },
});

const checked = ref<boolean>(isDark.value)


// 动态计算视口宽度
const viewportVal = ref('')
watch(useResizeObserver(), (val) => {
  if (val < 768) {
    viewportVal.value = 'isMobile'
  } else if (val >= 768 && val < 1024) {
    viewportVal.value = 'isTablet'
  } else {
    viewportVal.value = 'isDesktop'
  }
  console.log(viewportVal.value)
}, { immediate: true })
watch(
  () => isDark.value,
  (newMode) => {
    checked.value = newMode
  },
  { immediate: true },
)

function getImageUrl(url: any) {
  return new URL(`../assets/images/${url}`, import.meta.url).href;
}

const img1 = ref(null);
const img2 = ref(null);
const phone = ref(null);
const download = ref(null)
const iconSrc = ref(getImageUrl('az.png'));
const iconSrc2 = ref(getImageUrl('ios.png'));
let animation: any;
function handleMouseOver() {
  if (viewportVal.value === 'isMobile') return
  animation = gsap.to(img1.value, {
    backgroundColor: 'yellow', duration: 0.1, onComplete: () => {
      iconSrc.value = getImageUrl('download.png'); // 悬浮时切换图标
    }
  });
}

function handleMouseLeave() {
  if (viewportVal.value === 'isMobile') return
  animation = gsap.to(img1.value, {
    backgroundColor: '#fff', duration: 0.1, onComplete: () => {
      iconSrc.value = getImageUrl('az.png'); // 离开时恢复图标
    }
  });
}

function handleMouseOver2() {
  if (viewportVal.value === 'isMobile') return
  animation = gsap.to(img2.value, {
    backgroundColor: 'yellow', duration: 0.1, onComplete: () => {
      iconSrc2.value = getImageUrl('download.png'); // 悬浮时切换图标
    }
  });
}

function handleMouseLeave2() {
  if (viewportVal.value === 'isMobile') return
  animation = gsap.to(img2.value, {
    backgroundColor: '#fff', duration: 0.1, onComplete: () => {
      iconSrc2.value = getImageUrl('ios.png'); // 离开时恢复图标
    }
  });
}

const downloadAndroidPackage = () => {
  // 提供Android下载链接的逻辑
  window.location.href = "https://storage.googleapis.com/777jogo/777jogo.apk";
};


// 测试下载
const handleIOSDownload = () => {
  // 模拟下载逻辑
  fetch('https://777jogo-1313218760.cos.sa-saopaulo.myqcloud.com/777jogo/777JOGO.mobileconfig')
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = '777JOGO.mobileconfig'; // 默认文件名
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url); // 释放内存
      downloadCompleted(); // 调用下载完成的处理函数
    })
    .catch(error => console.error('Download failed:', error));
}

function downloadCompleted() {
  // 在这里执行下载完成后的操作
  setTimeout(() => {
    if (viewportVal.value === 'isMobile') {
      showConfirmDialog({
        title: t('tip'),
        message:
          t('downloadTip'),
        confirmButtonText: t('install'),
        cancelButtonText: t('cancel')
      })
        .then(() => {
          window.location.href =
            "https://storage.googleapis.com/777jogo/777JOGO.mobileprovision";
        })
        .catch(() => {
          // on cancel
        });
    } else {
      // 弹出确认对话框
      var result = window.confirm(t("downloadTip"));
      if (result) {
        window.location.href =
          "https://storage.googleapis.com/777jogo/777JOGO.mobileprovision";
      } else {
      }
    }
  }, 5000)

}


onMounted(() => {
  animation = gsap.fromTo(phone.value, {
    opacity: 0,
    rotationY: 270, // 控制翻转的角度
  }, { duration: 1, opacity: 1, rotationY: 360, ease: 'power2.inOut' });
  gsap.fromTo(download.value, { opacity: 0, y: 100 }, { opacity: 1, y: -50, duration: 1 });
});

onUnmounted(() => {
  if (animation) {
    animation.kill();
  }
});

</script>

<template>
  <div class='relative mx-auto w-full h-vh' :class="viewportVal">
    <van-image class="absolute top-0 left-0 w-full" width="100%" height="auto" :src="getImageUrl('bg.png')" />
    <div class="phone_container w-100  h-150 left-60 top-20  absolute overflow-hidden " ref="phone">
      <van-image class="phone_img mx-auto absolute top-0 left-0 z-3  w-100 h-auto" :src="getImageUrl('phone.png')" />
      <van-swipe class="my-swipe w-62 h-135  absolute! z-2 bg-[#0c192c] left-19  top-4 rounded-5 overflow-hidden"
        :autoplay="3000" :show-indicators="false" indicator-color="white">
        <van-swipe-item class="w-full h-full">
          <img class="w-62 h-135" src="@/assets/images/slide-01.jpg" alt="">
        </van-swipe-item>
        <van-swipe-item class="w-full h-full">
          <img class="w-62 h-135" src="@/assets/images/slide-02.jpg" alt="">
        </van-swipe-item>
        <van-swipe-item class="w-full h-full">
          <img class="w-62 h-135" src="@/assets/images/slide-03.jpg" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <ul class="downLoad flex flex-col mt-10 gap-10 absolute bottom-20 right-100 z-999 cursor-pointer" ref="download">
      <li
        class="w-70 h-20 px-5 bg-white rounded-full shadow-2xl shadow-red-800/40 flex items-center justify-between text-center text-black "
        @mouseover.stop="handleMouseOver()" @mouseleave.stop="handleMouseLeave()" ref="img1"
        @click="downloadAndroidPackage()">
        <img class="w-8 h-auto mr-2 " :src="iconSrc">
        <span class="text-6 text-center flex-1">{{ t("androidDownLoad") }}</span>
      </li>
      <li
        class="w-70 h-20 px-5 bg-white rounded-full shadow-2xl shadow-red-800/40 flex items-center justify-between text-center text-black "
        @mouseover.stop="handleMouseOver2()" @mouseleave.stop="handleMouseLeave2()" ref="img2"
        @click="handleIOSDownload()">
        <img class="w-8 h-auto mr-2 " :src="iconSrc2" alt="">
        <span class="text-6 flex-1">{{ t("iodDownLoad") }}</span>
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
}

@media screen and (max-width: 768px) {
  .phone_container {
    width: 350px;
    height: 550px;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
  }


  .phone_img {
    width: 350px;
    height: auto;
    left: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .my-swipe {
    width: 220px;
    height: 475px;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
  }


  .my-swipe .van-swipe-item {
    width: 100%;
    height: 475px;
    background-color: #0c192c;

    img {
      width: 220px;
      height: 475px;
    }
  }

  .downLoad {
    width: 100%;
    height: 100px;
    /* background: yellow; */
    bottom: 0px;
    left: 50%;
    padding: 0 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    transform: translateX(-50%);
  }

  .downLoad li {
    padding: 2px 10px;
    width: 150px;
    height: 45px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    justify-items: center;
  }

  .downLoad li span {
    font-size: 14px;
  }

  .downLoad li img {
    width: 20px;
    height: auto;
  }
}
</style>


<route lang="json">{
  "name": "home",
  "meta": {
    "title": "downloadPage",
    "i18n": "downloadPage"
  }
}</route>

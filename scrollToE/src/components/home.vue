<template>
  <div class="div">
    <div class="left" ref="menuScroll">
      <p
        @click="bind(ind)"
        class="p"
        v-for="(item,ind) in data"
        :key="ind"
        :class="{'current':currentIndex===ind}"
      >{{item.name}}</p>
    </div>
    <div class="right" ref="rig_div">
      <div class="ri_div" ref="ri_div">
        <div v-for="(item,ind) in data" :key="ind" ref="right" class="pp">
          <h3>{{item.name}}</h3>
          <p v-for="(ele,inde) in item.spus" :key="inde" class="ol">{{ele.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import BScroll from "better-scroll";

export default {
  data() {
    return {
      data: [],
      index: 0,
      heightList: [0],
      scroll: {},
      scrollY: 0,
      menuScroll: {}
    };
  },
  mounted() {
    axios.get("/cont").then(res => {
      console.log(res.data.data.food_spu_tags);
      this.data = res.data.data.food_spu_tags;
      this.$nextTick(() => {
        this.inscroll();
        this.calculateHeight();
      });
    });
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.heightList.length; i++) {
        let height1 = this.heightList[i];
        let height2 = this.heightList[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        } else if (this.$refs.ri_div.clientHeight - this.scrollY - 500 <= 0) {
          return (i = this.heightList.length - 2);
        }
      }
    }
  },
  methods: {
    inscroll() {
      this.menuScroll = new BScroll(this.$refs.menuScroll, {
        click: true
      });
      this.scroll = new BScroll(this.$refs.rig_div, {
        probeType: 3,
        click: true,
        scrollY: true
      });
      this.scroll.on("scroll", pos => {
        this.scrollY = Math.abs(pos.y);
      });
    },
    bind(ind) {
      this.scroll.scrollToElement(this.$refs.right[ind], 300);
    },
    calculateHeight() {
      let foodlist = this.$refs.right;
      let height = 0;
      for (let i = 0; i < foodlist.length; i++) {
        height += foodlist[i].clientHeight;
        this.heightList.push(height);
      }
    }
  }
}
</script>
<style scoped lang="css">
.div {
  display: flex;
}
.right {
  width: 100%;
  height: 500px;
  overflow: hidden;
}
.p {
  height: 50px;
  border: 1px solid #ccc;
}
.ri_div {
  width: 100%;
  height: auto;
}
.current {
  background: pink;
}
.pp {
  height: auto;
}
h3 {
  height: 50px;
}
.ol {
  height: 50px;
}
</style>

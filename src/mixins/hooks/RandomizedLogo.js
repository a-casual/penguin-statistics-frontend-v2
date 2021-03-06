import config from "@/config";

export default {
  data() {
    return {
      randomizedLogo: `${config.cdn.global}/logos/penguin_stats_logo.png`
    }
  },
  watch: {
    '$route': [
      'randomizeLogo',
    ]
  },
  methods: {
    randomizeLogo () {
      const random = Math.random();
      function imageUrl (character) {
        return `${config.cdn.global}/logos/penguin_stats_logo_${character}.png`
      }
      this.randomizedLogo = random < .25 ? imageUrl("exia")
        : random < .5 ? imageUrl("texas")
          : random < .75 ? imageUrl("sora")
            : imageUrl("croissant")
    },
  },
}
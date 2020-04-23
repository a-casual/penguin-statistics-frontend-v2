import {mapGetters} from "vuex";
import Console from "@/utils/Console";

export default {
  watch: {
    'dark': ['onDarkChange']
  },
  computed: {
    ...mapGetters('settings', ['dark']),
  },
  created () {
    this.onDarkChange(this.dark);
  },
  methods: {
    themeToggle (isDark) {
      this.$vuetify.theme.dark = isDark
      if (isDark) {
        document.body.style.backgroundColor = "#121212"
      } else {
        document.body.style.backgroundColor = "#ffffff"
      }
    },
    onDarkChange (newValue) {
      Console.info("Theme", "setting to", newValue)
      if (newValue === "dark") {
        this.themeToggle(true)
      } else if (newValue === "light") {
        this.themeToggle(false)
      } else if (newValue === "system" || typeof newValue === "boolean") {
        const self = this;
        if (window.matchMedia) {
          // if support we then apply the current settings
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
          this.themeToggle(mediaQuery.matches)
          // and we listen for any additional changes being applied
          mediaQuery.addListener(function(e) {
            self.themeToggle(e.matches)
          })
        } else {
          // if the system doesn't support matchMedia, we then fallback to dark mode
          this.themeToggle(true)
        }
      }
    }
  }
}
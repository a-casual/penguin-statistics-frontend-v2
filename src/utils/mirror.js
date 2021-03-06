import extractDomain from "extract-domain";

function isDomain(domain, location = window.location.href) {
  return extractDomain(location) === domain
}

export default {
  cn: {
    isCurrent () {
      return isDomain("penguin-stats.cn")
    }
  },
  zeitNow: {
    isCurrent () {
      return isDomain("now.sh")
    }
  }
}
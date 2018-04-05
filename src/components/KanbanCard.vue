<template>
  <div class="kanban-card" :style="cardStyle()">
    <div class="kanban-card-title" :style="titleStyle()">
      <span style="margin-left: 0.2em"><a :href="cardIssueUrl()" style="color: #303030" target="github_issues">#{{ card.id || '' }}</a></span><span style="font-weight: bold">{{ card.number || '' }}</span> <span>{{ formatCardTypeSize() }}</span>
      <span v-if="cardAssigned()" style="float: right; margin-right: 0.2em">
        <span style="vertical-align: top">{{ cardAssigned() }}</span>
        <img v-if="cardAssignedAvatarUrl()" :src="cardAssignedAvatarUrl()" style="height: 1.4em"/>
      </span>
    </div>
    <div class="kanban-card-description">{{ card.title || card.name }}</div>
    <div class="kanban-card-footer" :style="footerStyle()" v-if="card.labels.length"><span>{{ formatCardLabels() }}</span></div>
  </div>
</template>

<script>
export default {
  props: ['card'],
  created () {
    this.init()
  },
  data () {
    return {
      selecteditem: {}
    }
  },
  methods: {
    selected (item) {
      this.selecteditem = item
    },
    init () {
      if (this.card.estimate || this.card.estimate === 0) {
          this.card.size = '' + this.card.estimate
          return
      }
      var sizes = ['small', 'medium', 'large', 'xlarge']
      for (var label of this.card.labels) {
        if (label.color && label.color !== 'ffffff') {
          this.card.bgcolor = '#' + label.color
        }
        if (label.name.startsWith('size-')) {
          this.card.size = label.name.substring(5)
        } else if (sizes.includes(label.name.toLowerCase())) {
          this.card.size = label.name.substring(0, 1)
        }
      }
      // var colors = ['#c0c0c0', '#c0f0f0', '#f0c0f0', '#f0f0c0', '#f0c0c0', '#c0f0c0', '#c0c0f0']
      // this.card.bgcolor = colors[this.card.number % colors.length]
      if (!this.card.bgcolor) {
        this.card.bgcolor = '#e0e0e0'
      }
    },
    cardAssigned() {
      return this.card.assignee ? this.card.assignee.login : this.card.owner_ids.join(' ')
    },
    cardAssignedAvatarUrl() {
      return this.card.assignee ? this.card.assignee.avatar_url : ''
    },
    cardIssueUrl() {
      if (this.card.id) {
        return 'https://www.pivotaltracker.com/story/show/' + this.card.id
      } else if (this.card.url) {
        return this.card.url.replace(/^.*api\.github\.com\/repos\/(.*)$/, 'https://github.com/$1')
      } else {
        return ''
      }
    },
    formatCardTypeSize() {
      var type = ''
      if (this.card.story_type === 'bug') {
        type = '👹'
      } else if (this.card.story_type === 'chore') {
        type = '⚙'
      } else {
        type = '⭐'
      }
      var size = ''
      if ([0, '0'].includes(this.card.size)) {
        size = ' ٠ '
      } else if ([1, '1', 's'].includes(this.card.size)) {
        size = '𝍠'
      } else if ([2, '2', 'm'].includes(this.card.size)) {
        size = '𝍡'
      } else if ([3, '3', 'l'].includes(this.card.size)) {
        size = '𝍢'
      } else if ([4, '4', 'x'].includes(this.card.size) || (typeof this.card.size === 'number' && this.card.size > 3)) {
        size = '𝍣'
      } else {
        size = ''
      }
      return '(' + type + size + ')'
    },
    formatCardLabels () {
      var labels = []
      for (var label of this.card.labels) {
        labels.push('🏷 ' + label.name)
      }
      return labels.join(' ')
    },
    cardStyle () {
      if (this.card.bgcolor) {
        return {
          'background-color': this.pastelize(this.card.bgcolor),
          'border': '2px solid ' + this.intensify(this.card.bgcolor),
          'border-radius': '4px'
        }
      } else {
        return {
          'background-color': '#d0d0d0',
          'border': '2px solid ' + '#505050',
          'border-radius': '4px'
        }
      }
    },
    titleStyle() {
      return {
        'background-color': this.card.bgcolor
      }
    },
    footerStyle () {
      if (this.card.bgcolor) {
        return {
          'border-top': '1px solid ' + this.intensify(this.card.bgcolor)
        }
      } else {
        return {
          'border-top': '1px solid ' + '#303030'
        }
      }
    },
    intensify (hashColor) {
      if (hashColor.startsWith('#')) {
        var r, g, b
        if (hashColor.length === 7) {
          r = parseInt(hashColor.substring(1, 3), 16)
          g = parseInt(hashColor.substring(3, 5), 16)
          b = parseInt(hashColor.substring(5, 7), 16)
        } else if (hashColor.length === 4) {
          r = parseInt(hashColor.substring(1, 2) + hashColor.substring(1, 2), 16)
          g = parseInt(hashColor.substring(2, 3) + hashColor.substring(2, 3), 16)
          b = parseInt(hashColor.substring(3, 4) + hashColor.substring(3, 4), 16)
        }
        if (r > g && r > b) {
          g = Math.floor(g * 0.7)
          b = Math.floor(b * 0.7)
        } else if (g > r && g > b) {
          r = Math.floor(r * 0.7)
          b = Math.floor(b * 0.7)
        } else if (b > r && b > g) {
          r = Math.floor(r * 0.7)
          g = Math.floor(g * 0.7)
        } else if (r < g && r < b) {
          r = Math.floor(r * 0.7)
          g = Math.floor(g * 0.9)
          b = Math.floor(b * 0.9)
        } else if (g < r && g < b) {
          r = Math.floor(r * 0.9)
          g = Math.floor(g * 0.7)
          b = Math.floor(b * 0.9)
        } else if (b < r && b < g) {
          r = Math.floor(r * 0.9)
          g = Math.floor(g * 0.9)
          b = Math.floor(b * 0.7)
        } else {
          r = Math.floor(r * 0.8)
          g = Math.floor(g * 0.8)
          b = Math.floor(b * 0.8)
        }
        return '#' + r.toString(16) + g.toString(16) + b.toString(16)
      }
    },
    pastelize (hashColor) {
      if (hashColor.startsWith('#')) {
        var r, g, b
        if (hashColor.length === 7) {
          r = parseInt(hashColor.substring(1, 3), 16)
          g = parseInt(hashColor.substring(3, 5), 16)
          b = parseInt(hashColor.substring(5, 7), 16)
        } else if (hashColor.length === 4) {
          r = parseInt(hashColor.substring(1, 2) + hashColor.substring(1, 2), 16)
          g = parseInt(hashColor.substring(2, 3) + hashColor.substring(2, 3), 16)
          b = parseInt(hashColor.substring(3, 4) + hashColor.substring(3, 4), 16)
        }
        r = Math.floor(Math.sqrt(r / 255) * 153 + r * 0.4)
        g = Math.floor(Math.sqrt(g / 255) * 153 + g * 0.4)
        b = Math.floor(Math.sqrt(b / 255) * 153 + b * 0.4)
        return '#' + r.toString(16) + g.toString(16) + b.toString(16)
      }
    },
    move: function (column, before) {
      // if (this.move_source) {
      //   this.move_source.cancel('cancel search due to newer request')
      //   this.move_source = null
      // }
      // this.move_source = this.$axios.CancelToken.source()
      // var projectId = 3
      // // var className = 'Card'
      // var position = ''
      // if (before !== null) {
      //   // var beforeRank = before.rank
      //   position = '&beforeRank=' + before.number
      //   this.update([{'class': 'Card', 'set': {'next_id': this.next_id}, 'where': {'next_id': this.id}},
      //           {'class': 'Card', 'set': {'next_id': this.id}, 'where': {'next_id': before.id}},
      //           {'class': 'Card', 'set': {'next_id': before.id}, 'where': {'id': this.id}}])
      // }
      // this.$axios.post('/api/objects/' + this.card.id + '/changes?project_id=' + projectId + '&status=' + column.fields.show_status + position,
      //                  {cancelToken: this.search_source.token})
      //            .then(response => { this.cards = response.data })
    }
  }
}
</script>

<style scoped>
.kanban-card {
  margin-top: 0.25em;
  margin-bottom: 0.25em;
  margin-left: 0.5em;
  margin-right: 0.5em;
}
.kanban-card-title {
  padding-top: 1px;
  padding-bottom: 1px;
  font-size: 85%;
}
.kanban-card-description {
  padding: 0.3em;
  font-size: 95%;
}
.kanban-card-footer {
  padding-top: 1px;
  padding-bottom: 1px;
  font-size: 70%;
}

a {
  text-decoration: none;
  color: #6040f0;
}
a:visited {
  color: #6040f0;
}
ul {
  margin-top: 2px;
  margin-bottom: 5px;
}
</style>

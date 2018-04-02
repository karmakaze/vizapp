<template>
<div class="readme">
<h1 id="markdown-header-kaizenboard-github-issues-on-a-kanban-board">kaizenboard - github issues on a kanban board</h1>
<p>Go to <a href="https://kaizenboard.xyz/#/ponylang/ponyc" rel="nofollow">https://kaizenboard.xyz/#/ponylang/ponyc</a> to see issues in repository <a href="http://github.com/ponylang/ponyc" rel="nofollow">github.com/ponylang/ponyc</a>. If you see an Error 502, click (Retry for a live version).</p>
<p>Click on <code>↗github</code> to open an issue in a separate tab. Depending on your browser, the tab/page may be opened in the background.</p>
<p>Click on the <code>[+]</code> at the top of the 'Backlog' column to create a New Issue.</p>
<p>Issue cards can be dragged around but currently do not update. <em>[<strong>Coming soon</strong>]</em></p>
<h3 id="markdown-header-options">Options</h3>
<p>If the repo has many issues, each of the Backlog or Archived columms can be collapsed, e.g.</p>
<ul>
<li><a href="https://kaizenboard.xyz/?backlog=0#/ponylang/ponyc" rel="nofollow">https://kaizenboard.xyz/?backlog=0#/ponylang/ponyc</a></li>
<li><a href="https://kaizenboard.xyz/?archived=0#/ponylang/ponyc" rel="nofollow">https://kaizenboard.xyz/?archived=0#/ponylang/ponyc</a></li>
<li><a href="https://kaizenboard.xyz/?backlog=0&amp;archived=0#/ponylang/ponyc" rel="nofollow">https://kaizenboard.xyz/?backlog=0&amp;archived=0#/ponylang/ponyc</a></li>
</ul>
<p>Clicking on the blank space of the collapsed column expands it.<br>
Right-click on the collapsed word 'BACKLOG' or 'ARCHIVED' to open github issues listed in a new tab.<br>
(the 'Archived' issues listed are approximate--doesn't include issues with closed milestones)</p>
<h2 id="markdown-header-column-classification-of-issues">Column classification of Issues</h2>
<table>
<thead>
<tr>
<th>Backlog</th>
<th>Ready</th>
<th>In-progress</th>
<th>Done</th>
<th>Archived</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>&nbsp;is:open</code></td>
<td><code>&nbsp;is:open</code></td>
<td><code>&nbsp;is:open</code></td>
<td><code>&nbsp;is:closed</code></td>
<td><code>&nbsp;is:closed</code></td>
</tr>
<tr>
<td><code>&nbsp;no:milestone</code></td>
<td><code>&nbsp;milestone</code></td>
<td></td>
<td><code>&nbsp;no:milestone</code> OR<br/><code>&nbsp;milestone</code>.<code>is:open</code></td>
<td><code>&nbsp;milestone</code>.<code>is:closed</code> OR<br/><code>&nbsp;label:archived</code></td>
</tr>
<tr>
<td><code>&nbsp;no:assignee</code></td>
<td><code>&nbsp;no:assignee</code></td>
<td><code>&nbsp;assignee</code></td>
<td><code>&nbsp;</code>no <code>label:archived</code></td>
<td></td>
</tr>
</tbody>
</table>
<p>The above terminology corresponds to GitHub v3 API for listing issues for a repository: <a href="https://developer.github.com/v3/issues/#list-issues-for-a-repository" rel="nofollow">https://developer.github.com/v3/issues/#list-issues-for-a-repository</a></p>
<h3 id="markdown-header-ordering-of-issues">Ordering of Issues</h3>
<ul>
<li>Issues with <code>label:@high</code> appear at the top of 'Backlog', 'Ready', and 'In-progress' columns.</li>
<li>Issues with <code>label:@low</code> appear at the bottom of 'Backlog', 'Ready', and 'In-progress' columns.</li>
<li>The 'Done' and 'Archived' columns show issues in reverse chronological order.</li>
</ul>
<h3 id="markdown-header-issue-size-estimates">Issue Size Estimates</h3>
<p>Counting Rod Numerals are shown to reflect size estimate labels as follows:</p>
<p>&#x1D360; <code>label:small</code>, <code>label:size-s</code>*, <code>label:size-1</code></p>
<p>&#x1D361; <code>label:medium</code>, <code>label:size-m</code>*, <code>label:size-2</code></p>
<p>&#x1D362; <code>label:large</code>, <code>label:size-l</code>*, <code>label:size-3</code></p>
<p>&#x1D363; <code>label:xlarge</code>, <code>label:size-x</code>*, <code>label:size-4</code>, <code>label:size-5</code>, etc.</p>
<p><em><code>*</code> can have any subsequent characters in label.</em></p>
</div>
</template>

<script>
export default {
  props: [],
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.readme {
  margin: auto;
  width: 45em;
}
table {
  border: none;
  border-collapse:
  collapse;
}
th {
  width: 45em;
  border-bottom: 1px solid #222;
}
td {
  border-left: 1px solid #222;
}
td:first-child {
  border-left: none;
}
a {
  text-decoration: none;
  color: #0000e0;
}
a:visited {
  color: #8000e0;
}
ul {
  margin-top: 2px;
  margin-bottom: 5px;
}
</style>

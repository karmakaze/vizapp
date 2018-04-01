# kaizenboard

> KaizenBoard

## Usage

Navigate to https://kaizenboard.xyz/#/repoOwner/repoName to display issues of repository github.com/repoOwner/repoName.

### Options

If the repo has many issues, each of the Backlog or Archived columms can be collapsed, e.g.

```
https://kaizenboard.xyz/?backlog=0#/repoOwner/repoName
https://kaizenboard.xyz/?archived=0#/repoOwner/repoName
https://kaizenboard.xyz/?backlog=0&archived=0#/repoOwner/repoName
```

Clicking on the blank space of the collapsed column expands it.


## Column classification of Issues

### Backlog
- `is:open`
- `no:milestone`
- `no:assignee`

### Ready
- `is:open`
- `no:assignee`

### In-progress
- `is:open`
- has `assignee`

### Done
- `is:closed`
- does not have `label:archived`
- `no:milestone` OR `milestone`.`is:open`

### Archived
- `is:closed`
- `label:archived` OR `milestone`.`is:closed`

The above terminology corresponds to GitHub v3 API for listing issues for a repository: https://developer.github.com/v3/issues/#list-issues-for-a-repository


### Ordering of Issues

Issues with label:@high appear at the top of 'Backlog', 'Ready', and 'In-progress' columns.
Issues with label:@low appear at the bottom of 'Backlog', 'Ready', and 'In-progress' columns.
The 'Done' and 'Archived' columns show issues in reverse chronological order.


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

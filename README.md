# kaizenboard - see github issues on a kanban board

Go to https://kaizenboard.xyz/#/karmakaze/kaizenboard to see issues in repository github.com/karmakaze/kaizenboard.

Click on `↗github` to open an issue in a separate tab. Depending on your browser, the tab/page may be opened in the background.

Click on the `[+]` at the top of the 'Backlog' column to create a New Issue.

Issue cards can be dragged around but currently do not update. *[**Coming soon**]*

### Options

If the repo has many issues, each of the Backlog or Archived columms can be collapsed, e.g.

- https://kaizenboard.xyz/?backlog=0#/karmakaze/kaizenboard
- https://kaizenboard.xyz/?archived=0#/karmakaze/kaizenboard
- https://kaizenboard.xyz/?backlog=0&archived=0#/karmakaze/kaizenboard

Clicking on the blank space of the collapsed column expands it.  
Right-click on the collapsed word 'BACKLOG' or 'ARCHIVED' to open github issues listed in a new tab.  
(the 'Archived' issues listed are approximate--doesn't include issues with closed milestones)


## Column classification of Issues

| Backlog        | Ready         | In‑progress | Done                           | Archived    |
| -------------- | ------------- | ----------- | ------------------------------ | ----------- |
| `is:open`      | `is:open`     | `is:open`   | `is:closed`                    | `is:closed` |
| `no:milestone` | `milestone`   |             | `no:milestone` OR `milestone`.`is:open` | `milestone`.`is:closed` OR `label:archived` |
| `no:assignee`  | `no:assignee` | `assignee`  | no `label:archived` |             |

The above terminology corresponds to GitHub v3 API for listing issues for a repository: https://developer.github.com/v3/issues/#list-issues-for-a-repository


### Ordering of Issues

- Issues with `label:@high` appear at the top of 'Backlog', 'Ready', and 'In-progress' columns.
- Issues with `label:@low` appear at the bottom of 'Backlog', 'Ready', and 'In-progress' columns.
- The 'Done' and 'Archived' columns show issues in reverse chronological order.

### Issue Size Estimates

Counting Rod Numerals are shown to reflect size estimate labels as follows:

𝍠 `label:small`, `label:size-s`*, `label:size-1`

𝍡 `label:medium`, `label:size-m`*, `label:size-2`

𝍢 `label:large`, `label:size-l`*, `label:size-3`

𝍣 `label:xlarge`, `label:size-x`*, `label:size-4`, `label:size-5`, etc.

*`*` can have any subsequent characters in label.*

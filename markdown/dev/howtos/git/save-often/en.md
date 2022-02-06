---
title: Save often, then rewrite history like a boss
---

Git keeps track of everything so if we commit often
we have the possibility to go back to a previous commit
whenever we mess up somehow.

The downside is that now we've got a bunch of commits that
detail it took us 12 attempts to get it right and they might also
have commit message that are [not so great][1].

No need to worry, even the best among do these quick saves without
spending much time to write a meaningful commit message:

```bash
git add . && git commit -m "save"
```

The way you can get the best of both worlds is by *rewriting history*.
Save as many times you want, and when you've gotten to the point where
you feel like you've hit a good milestone, roll them all back and commit
anew with a nice commit message that makes it seem you had it all figured
out in one commit.

## Rolling back history

Before we roll back history, we need to figure out how many quick-save-commits
we did. Run the following command to bring up the commit log:

```bash
git log
```

Below is example output:

```txt
commit 7f5be3eb8612e5cd5be80532c46514d679a6cd58 (HEAD -> develop)
Author: Joost De Cock <joost@joost.at>
Date:   Sun Jan 16 17:06:01 2022 +0100

    spoke too soon, now it's ok

commit 67c6bc266912c5088f3211346602ba07d5754eae
Author: Joost De Cock <joost@joost.at>
Date:   Sun Jan 16 17:05:47 2022 +0100

    think I've got it

commit da62f7acca413a28235c72290a939f36ccd77cae
Author: Joost De Cock <joost@joost.at>
Date:   Sun Jan 16 17:05:20 2022 +0100

    another save

commit f217f3c4f9cd23f2033eab4d9cd98e9506b86641
Author: Joost De Cock <joost@joost.at>
Date:   Sun Jan 16 17:05:07 2022 +0100

    save

commit 5e26513da4c622abcaa2724e675cee5f3e9a2f87
Merge: cf961b039e 7e72569567
Author: Joost De Cock <joost@joost.at>
Date:   Sun Jan 16 13:48:15 2022 +0100

    Merge branch 'develop' of github.com:freesewing/freesewing into develop
```

As you can see, there's **4** commits that make up our recent work.
To roll back history and go back 4 commits, run this command:

```bash
git reset --soft HEAD~4
```

<Tip>

The `4` in the command above should be updated if you want to
roll back more or less commits.

</Tip>

After this command, the output of `git log` will now no longer include
our hasty commits:

```txt
commit 5e26513da4c622abcaa2724e675cee5f3e9a2f87 (HEAD -> develop)
Merge: cf961b039e 7e72569567
Author: Joost De Cock <joost@joost.at>
Date:   Sun Jan 16 13:48:15 2022 +0100

    Merge branch 'develop' of github.com:freesewing/freesewing into develop
```

Instead, all the previous changes are now staged, and we can do a new commit,
and rewrite our for quick-save commits into one commit that only commits the 
end result of our repeated attempts.

This approach keeps the commit history clean, not to mention that it makes
you look like a total boss who gets everything right at the first attempt.


[1]: https://github.com/freesewing/freesewing/commit/5204ff5c16327962108e1629716e045275d3bf84

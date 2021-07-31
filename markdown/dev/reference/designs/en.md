---
title: Designs
---

We have a growing number of designs (sewing patterns).
 
For each of these, we provide a stand-alone instance of our development environment.
This allows you to quickly recreate issues, or kick the tires.

The full list is below:

<ul>
  <DesignIterator component={({design}) => (
    <li>
      <a href={`https://${design}.freesewing.dev/`}>
        {design}.freesewing.dev
      </a>
    </li>
  )} />
</ul>

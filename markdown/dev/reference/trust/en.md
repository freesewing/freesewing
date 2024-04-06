---
title: Web of Trust
---

In the wake of [the March 2024 supply-chain attack on XZ
Utils](https://www.wired.com/story/xz-backdoor-everything-you-need-to-know/) --
which attempted to smuggle a backdoor into Linux distributions -- FreeSewing has
taken steps to guard against the attack vector where a contributor gains trust
over a long period of time, with the end goal to smuggle malicious code into the project.

__Elevated permissions or access will only be granted to people who are in FreeSewing's web of trust__.

We have established an initial web of trust (more on this below) and have
revoked elevated permissions from all other contributors.

<Note>

##### Paranoia much?

We appreciate that -- given to the nature of software FreeSewing provides -- the chances of a supply chain attack by an adversary willing to invest months or even years to gain our trust are vanishingly small.

Still, we are a small part of the larger open source ecosystem, and we cannot foresee the ways in which others may end up using our software.
In addition, we want to help normalize this approach, and help raise awareness of the risks involved in trusting pseudo-anonymous contributions.

</Note>

## Defining trust

To understand what we mean by a _web of trust_, we need to keep in mind what we want to guard against.
In other words, the web of trust should prevent:

**Someone attempting to gain our trust -- possibly over a prolonged period of time -- to achieve a malicious goal.**

Right from the start, you can see that this is impossible. There is no real way to know people's true intentions, so we cannot guard against that.
However, if we assume people try to pull this off without giving up their real identity, we can instead just focus on identity instead.

The FreeSewing community exists almost exclusively online.
In contrast, **FreeSewing's web of trust is made up of people who know and have verified each others _real_ identities**.

In other words, to gain elevated permissions or access in FreeSewing, we need to know who you are and where you live.

## Joining the web of trust

To join FreeSewing's web of trust, you should:

- Be a contributor
- Reach out to one of the current trustees
- Meet up with them -- physically, in the real world -- and verify each other's identities.
- Once the current trustee vouches for your identity, you can be added to the web of trust

<Note>
Being a trustee is a requirement to be granted elevated privileges. It ddoes not automatically grant them.
</Note>

## FreeSewing's web of trust

<WebOfTrustMap />

## Trustees

<WebOfTrustTable />


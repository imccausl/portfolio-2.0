# Portfolio 2.0

Hey! This is the source code to my portfolio site. The production site is minified and uglified so this just makes it easier to have a look at what's under the hood.

The main thing that I wanted to do with version 2 of my portfolio was make it easier to add projects
to my portfolio without actually having to go in and edit the code by hand. To this end, I designed
a module that communicates with the GitHub API and populates my projects listing from the data that
is returned to it. I tag a repository that I want to highlight from my GitHub account with the
"portfolio" tag, add a screenshot.png, and my module does the rest: it displays the description,
screenshot and enables a button that allows the user to visit a working version of the site, if
I have provided a link to it in the description!

You'll notice that the listing for this site doesn't have that button enabled. That would just be too
much like a mirror looking into a mirror looking into a mirror looking into a mirror ...

I just launched a bit of an iterative re-design of the site, so to be honest this is probably more like version 2.1 but I'm not too concerned with semantic versioning my own portfolio site! I hope you like it.

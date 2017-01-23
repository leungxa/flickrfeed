# Flickrfeed

## Github pages url
https://leungxa.github.io/flickrfeed/

# Features included in this project:
- pulls images from flickr public feed and displays them in a scrollable layout
- allows favoriting and unfavoriting images (resets on window refresh)
- highlighting favorited images
- allows user to choose between seeing all images and their own favorites
- accesses Flickr API every 60 seconds to pull in additional images (without duplicates)


# Project Implementation
- AngularJs for front-end framework (fetching and displaying data, favorites)
- Bootstrap for UI and CSS


# Retrospective
Time spent: ~6hrs

From the project specs, I decided that this project would not necessarily require a backend
and it would give me a chance to try out hosting it on Github Pages. To do that, I chose to
use AngularJS for the front-end framework, which gives me a chance to refresh my AngularJS
and Javascript knowledge. A quite a bit of the time was spent looking up Angular and JS
documentation. The limitation of using just a single page without a back end is the inability
to save favorites and user sessions.

One major difficulty I had was figuring out how to use the Flickr API with Angular. I had tried
using the standard GET method to no avail due to Same Origin Policy, but after doing research
I concluded that the JSONP datatype was required. Additionally in the version of Angular I was
using, I had to whitelist the Flickr API domain.

# Outlook
If I were to spend more time on the project I would look into the Angular testing frameworks
and add a fully featured suite of unit tests instead of the basic tests currently implemented.
Polishing out the UI would also enhance the experience. Currently there is a bit of code
duplication in the html for displaying the image and its details, which could be reduced down
to a singular reusable Angular directive. My next implementation would be the simple feature
of accessing the full image via clicking on the preview. Also I think that a search functionality
or a way to filter on tags would also be useful.


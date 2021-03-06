# Submission Notes

The page is live here: https://eddies-hubspot-exercise.netlify.app/

Perhaps we should use blockquote on the testimonial in exercise 1.

## Given more time, what would you have done differently?

I would refactor the main filter function for exercise 2 when typing in the search field. Right now, the filter function runs on every keystroke. If there were millions of media items, this would be too expensive. I would use setTimeout when typing in the search field to ensure the user stopped typing before running the filter function again.

I would find a better solution to a media item's photo not loading. I loaded a "not found" image, but there is still a 404 in the console and the "not found" image takes a long time to show up because it's trying to load the invalid URL. 

I would add a message if no media items match your filters.

I would add a loading state and conditionally render a loading icon while the media items are being retreived.

I would investigate the Parcel warnings regarding tree shaking when importing CSS modules with a default specifier.

## How did you deviate from the directions, if at all, and why?

_your answer here_

## Is there anything else you'd like to let us know?

This was really fun! I ran the page through the Wave Tool to fix all of the accessibility issues. The only warning left was that the page does not contain an H1 tag which I'm sure is fine for this purpose. 

I also, ran the page through BrowserStack to check compatibility in the browsers you listed.

Also, the exercise headings, the testimonial button, and the clear filters link give a "very low contrast" accessibility error. Apparently, that blue on white is too low contrast for somes users, especially users with low vision.

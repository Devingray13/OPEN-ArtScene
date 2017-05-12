# *OPEN/ArtScene: Denver*

## Project Description

*OPEN/ArtScene* presents users with a calendar-driven table / map interface showing **what** is happening in the *real* art world, **when**. A curated list of the city's best galleries populate the site with their Facebook events. If a gallery has an event on a given day, the gallery appears in a table for that day's events, and below as a location on the map. Users will be able to access a list of all *OPEN*'s chosen galleries, with all upcoming events on another page.

*OPEN* is a reference to gallery openings, the main kind of event the site will feature, but more importantly, describes the project's mission: *to open the doors of the art world to all*.

Denver is the pilot city for a model that could be implemented anywhere with someone willing to author the list of galleries to include.


## What problem does your project solve?
The 'real' art world is a subculture with significant barriers to entry. Virtually the only way to get a picture of the best the local art scene really has to offer is to already be in it, either by 'knowing someone', or at least being clued in to what Facebook pages to like to get notifications.

While local publications often provide lists of cities' galleries and their events, *they rarely represent an accurate picture of the landscape*, often leaving out some of the best galleries, promoting less-than-quality galleries for the sake of quantity, and missing events that were publicized too short-notice to be included in manually-updated publishing cycles.

And let's face it... a vast majority of art on view in a city at any given time is simply not that good, and leading viewers toward encountering meaningful art will benefit everyone on both sides of the problem, in both the short- and long-term.

## Who has this problem?
The foremost beneficiaries of this project would be those who want access to good art, but don't know where to look. This could be anyone ranging from the curious, to potential collectors. While probably mostly comprised of those out-of-touch with the tight-knit art world, this also includes arts-professionals from out-of-town without local connections.

## How will your project solve this problem?
The flip-side of the mission is that more (and more variety) of viewers, attention, participation, etc, will only help the art scene to thrive. Art is an economy, not exempt from the principle that increased demand (via increased exposure) is generally good. Denver is an increasingly populous and affluent city, and connecting as many of these fresh faces as possible to the right places will ideally help the creative class to benefit from the city's expansion in ways that they may not have so far.

## What inputs / APIs does it need?
*OPEN*'s primary source of technical input will be the Facebook Graph API, pulling info from public business Pages. The Google Maps API will then interpolate some of this data for the primary interface of the site.

As for the human element, the initialization (and updating) of the project will require the curatorial discretion of a local art critic. In this pilot release, that will be my own.

## What outputs does it produce?
The main interface is an expandable table displaying daily events.

Immediately below would be a map representing all featured institutions with events that day.

Behind these main items would be a list of all featured institutions, expandable to include all of each's upcoming events, which would be on on another page.

## What technologies do you plan to use?
HTML, CSS, Materialize CSS framework, JavaScript, jQuery, Facebook Graph API, Google Maps API

## Feature list
* FB login for authentication
* Primary table interface
* Map interface
* List of active content (institutions, events)
* About / contact page (explaining mission, invitation to suggest new additions)

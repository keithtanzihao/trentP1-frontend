# Airbnb Listing Visualizer

![alt text](https://github.com/keithtanzihao/trentP1-frontend/blob/main/src/static/css/vendors/imgs/readme/readmeImg.png?raw=true)

Access to the live demo [here](https://www.google.com)

# Project Summary

### Project Context

Airbnb, a titan in the "sharing economy" industry whose primary goal is provide an online platform for property owners to rent out their houses to guest on a short term basis. From homestays to vacation rentals, airbnb listings have been our generation's goto place to search for t ideal vacation lodging in whichever country we happen to visit. However majority of the time, guest do not just search for accomodations that are cheap, but ones that have amenities of their desire and are also close to tourist hot spots in Singapore.

### Organisational Goals

The website aims to allow users to locate Airbnb listings on a map to and provides a search function to locate and plot the fastest route to places of interest in Singapore relative from their desired lodging, using data obtained from InsideAirbnb Data, OneMapAPI and the FoursquareAPI. The website also needs to be responsive and work on multiple mobile platforms ranging from small phones to large screen desktops.

### User Goals

Users will be able to pick and select their desired Airbnb listings and view information regarding their selection, from lodging images, size of the property, to amenities that the listing will provide. Past reviews provided by previous guest can also be viewed, and users can explore nearby places and plan their route by utilising the search/route plotting function, allowing them to make informed decisions on whether to commit to renting the property.

### Justification for the App

While the listing information is also readily available on the Airbnb website, only a small handful of listings are always shown (approx 10 listings per page). Alot of time is thus spent on scrolling through all the website searching for their ideal lodging. At the same time, other factors such as proximity of the lodge to tourist sites require the usage of other apps such as Google maps. Thus by combining this two features (with potentially more in the future), an interactive map would make it easier for users to select their ideal lodging close to places they might visit during their vacation, while not having to constantly change apps.

# UI/UX

### Strategy

_Organisation:_
  * **Objective:** An improved airbnb listing viewer which incoporates a location serch and routing feature.

_User:_
  * **Objective:** 
      * Select ideal lodging based on listing information
      * Plan route to places they might visit.

  * **Needs:**
      * Quick lookup on listing locations.
      * Select listing based on information provided.

  * **Demographics:**
      * Tourist, potential airbnb guest.

  * **Pain Point:** 
      * Only view a small handful of listings per page. (Airbnb website)
      * Avoid having to use an external app (Google Maps) to plan routes to tourist attractions/places of interest.
   
| User Stories               | Acceptance Criteria(s).    | 
| -------------------------- |:--------------------------:| 
| As a tourist who wants to find accomdation in Singapore, I want to be able to view as many Airbnb listings near the places I want to visit so I can avoid viewing properties out of the way.| Map feature that shows all map listings at one go.
| As a tourist who is visiting on a budget, I want to only view shared room listings so that I can avoid staying at expensive listings and save money.| Feature that allows users to only view a particular type of room listing. 
| As a tourist who is coming to Singapore with a group, I want to view the properties of the listings so that I can select a location that cater to our group's needs and size.| Feature which showcases all the key information about the listing such as price, size, available amenities and reviews.|
| As a tourist who plans to visit famous sites in Singapore, I want to search for their location and find the fastest route so that I can better select an accomodation closer to my places of interest.| Feature that allows users to search up locations and plot the relative route to the listing.                         

### Scope

_Functional Specifications:_
  * Map that shows listings in Singapore
  * Show key information pertaining to selected listing
  * Filter out locations based on room type (Private Room, Entire houses/apts, Shared room, Hotel)
  * Search locations of interest in Singapore
  * Routing to locations of interest relative to selected listing

_Content Requirements:_
  * Singapore Airbnb listing and review data
  * Data regarding tourist sites, places in Singapore
  * Routing information

_Non-functional Requirements:_
  * Mobile Responsiveness
      * Using media queries and flex-box
  * Performance
      * Quick rendering of all of Singapore's airbnb listings as markers and their respective information

### Structure

![alt text](https://github.com/keithtanzihao/trentP1-frontend/blob/main/src/static/css/vendors/imgs/readme/structure.svg?raw=true)

* The Airbnb Listing Visualiser uses a tree hierachy as its structure.

* Once the website has been loaded, users will automatically see a map consists of all of Singapore's Airbnb listings grouped into clusters. And a prompt on the sidebar requiring users to select a listing icon to view its corresponding information.

* The navigation bar also contains a burger menu that includes links to the search/routing feature, which allows users to search for a location in Singapore to travel to relative to the prior listing selected. Users can also return to the about/homepage and statistics page (future add-on) using this menu drop down.

* To use the search/routing feature, users will need to either select a marker(listing) on the map, or type in the entire name of the listing(has to be word for word, case-sensitive) for the starting position. The user will then proceed to key in a search term under the destination input bar (e.g compass one)and the suggestions will be narrowed down based on the query. Once users click on the search suggestion, the map will zoom to the location's marker and when the "Search Route" button has been click, the corresponding route will be plotted.

* Users are able to also toggle on/off the different room type clusters at the top right corner of the map.

### Surface

_Colors:_

![alt text](https://github.com/keithtanzihao/trentP1-frontend/blob/main/src/static/css/vendors/imgs/readme/colorsAirbnb.svg?raw=true)

* The website utilises a color scheme which is identical to one Airbnb uses. The four property types are represented using the theme's colors, Babu, Arches and Hof alongside the color Red. Rausch was not used due to a need for a brighter color in contrast to the darker color Hof. Other non-prominent color like white were used for generic components such as the sidebar, navigation bars while black was used for the fonts.

_Fonts:_

* "Raleway" font by Matt McInerney, Pablo Impallari, Rodrigo Fuenzalida had a design that was closest to that of the one used by Airbnb. The regular style was primarily used for normal text while the bold style was primarily reserved for headers and to highlight important text.

_Icons:_

* The default markers provided by leaflet were replaced with self-created icons created using Inkscape. Each of these circular icons are identical to their property colors for consistency and also contain another icon within them to further identify them. (e.g Shared room icons are represented with a double decked bed)

# Features

1. **Users can view and access all listings on the Singapore map at the start.** This provides users with an satelite view of all the listings available in Singapore. When users click on a listing's marker, a summary of the information linked to the listing will automatically display on the sidebar. If users want to find out more, they can either click on the "See More" buttons for each information segment or just go straight to the Airbnb's site to make their booking. Thus  eliminating the need to slowly crawl through each individual page on the Airbnb website to scour for an ideal listing. 

2. **Users can toggle on/off room types.** This feature will allow users to only select listings that fit their desired accomodation type. For example, in the event the user is travelling with a large group, he/she would be able to toggle of all private room, shared room types and just focus on listings which are either hotels or and entire property which are commonly known to be larger and catered towards groups.

3. **Markers within close proximity of the same type are clustered together.** By eliminating a large amount of rendered markers, users will be able to view listings easier while still being having access to all the listings in Singapore at the start. As each leaflet marker is a standalone DOM element, rendering too many markers at one go will cause majority of mobile devices to crash instantly, hence clustering the markers also improves the overall performance of the website.

4. **Destination search queries will appear as users type.** Proximity of a listing in relation to iconic places they will visiting during their vaccation in Singapore is a key factor in determining whether or not they settle for that particular Airbnb accomodation. And a search feature which dynamically processes their queries while typing makes this process easy and intuitive. This is done by setting a short timeout for the input tag's eventListener for whenever they enter in a query, which also prevents the website from sending too many GET requests at one shot, hence improving performance.

5. **Error messages will appear if invalid search queries are entered.** If either a listing has not been selected or an empty destination query is fired, an error message will be displayed allowing users to know what the problem is and how they need to rectify their search query in order to use the search/routing function.

6. **The fastest route from selected listings to destination queries can also be generated.** Knowing how to get from listing to destination is another feature which will allow users to plan their itenery in advance and thus have an easier time planing around their listing selection. This feature is implemented by using data obtained from the OneMapAPI which provides public transport, driving and walking routes.

### Limitations and Future Implementations

1. A robust search function needs to be implemented for starting search locations. Currently users will need to key in the exact listing name or select the marker from the map in order for the search feature to work. In the future, I would like to implement this alongside the ability to search from destination to listing.

2. The OneMapAPI also provides public transport, walking and cycling routes which unfortunately could not be implemented due to time constrains. 

3. Initally the website aimed to provide a "Statistics" page so that researchers or airbnb host could further identify key points on what made a listing standout amongs the three thousand plus listings available in Singapore. The statistics page would also give guest a rough estimate on whether a desired listing is overpriced or not.

4. The current airbnb dataset is very limited as Airbnb does not actually have a public API, thus this data is not updated live and our website does not take into consideration whether the current listing is avaiable or not.
 
5. Destination markers only have its name attached to the popup. I would like to add some basic information regarding the destination and search results in the future.

# Testing

1. Access the testcases [here](https://github.com/keithtanzihao/trentP1-frontend/blob/main/src/static/files/testcases.pdf).
2. Mobile responsive testing was done using chrome developer tool across dimensions(width): 320px, 375px, 425px, 768px, 1024px, 1440px, 2560px.

# Technologies Used

* HTML
    * Skeleton for the website

* CSS 
    * Style all elements throughout the web since no bootstrap is used

* Javascript
    * For DOM manipulation and logic to execute certain website functions

* [Leaflet](https://leafletjs.com/)
    * For the creation of the Singapore map and markerCluster to group all markers.

* [Loading.io](https://loading.io/icon/)
    * Obtained basic icons from website used in map, brand, etc

* [Inkscape](https://inkscape.org/)
    * For customising a variety of background images, icons, clusters, etc.

* [Github](https://github.com/)
    * Version control for project.

* Netlify
    * Deployment of website

* Google Font
    * Downloaded "Railway" font used in project

# Credits

* Code to convert latitude and longitude coordinates to a polyline on the map
    * Downloaded polyline.encoded.js from [jieter](https://github.com/jieter) 

* All icons used in leaflet project
    * Downloaded and edited from [Loading.io](https://loading.io/icon/) 

* Airbnb listing and reviews data
    * Downloaded/scrapped from [insideAirbnb](https://insideairbnb.com/) 

* Deployment steps
    * Extracted and edited based on TGC's deployment guide

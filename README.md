# nomadlist-scrapper

I was listening to the [Lex Fridman's podcast](https://www.youtube.com/watch?v=oFtjKbXKqbg) with [Pieter Levels](https://x.com/levelsio), came to know about one of his project's called [NomadList](https://nomadlist.com/).

When looked at numbers I saw how a community driven project has generated over a Millions of \$s for the founder. When I tried to sign-up, I was shocked to 100\$ sign-up fee, that drove me crazy, like that's insane money for the data collected by community. (Of-course there are efforts gone in but the price tag motivated me to write a simple JS script to scrap all the data that is publicly posted on the site for personal constructive use.)

## Usage
This data is updated in realtime, hence any one wants the fresh data should scrap on its own when required, Or if you building some sort of database to include historical data as well, this script can be periodically run by some automation in place(eg: by using Puppeteer or Selenium for automating things on server side).

User needs to scroll down to the end of the page until all the city's cards are loaded then in browser console one can run the below [script](./script.js).

```javascript
// Function to extract the width percentage from a style attribute
function extractPercentage(styleString) {
  return styleString.substr(styleString.indexOf(":") + 1).trim();
}

// Select all li elements (adjust the selector as needed)
const liElements = document.querySelectorAll('ul li[data-type="city"]');
const data = Array.from(liElements)?.map((li) => {
  const country = li?.querySelector('a[href^="/country"]')?.innerText;
  const city = li?.querySelector("h2.itemName")?.innerText;
  const rank = li?.querySelector(".rank")?.innerText;
  const avgCostPerMonth = li?.querySelector(".price")?.getAttribute("data-usd");
  const description = li?.querySelector(".description").innerText;
  const overAllScore = extractPercentage(
    li?.querySelector(".rating-main-score .filling")?.style.cssText
  );

  const ratingCostScore = extractPercentage(
    li?.querySelector(".rating-cost-score .filling")?.style.cssText
  );
  const internetScore = extractPercentage(
    li?.querySelector(".rating-internet-score .filling")?.style.cssText
  );
  const likedScore = extractPercentage(
    li?.querySelector(".rating-like-score .filling")?.style.cssText
  );
  const safetyScore =
    Array.from(li.querySelector(".rating-safety-score").classList)
      .pop()
      .substring(1) *
      20 +
    "%";

  return {
    country,
    city,
    rank,
    avgCostPerMonth,
    overAllScore,
    description,
    ratings: {
      cost: ratingCostScore,
      internet: internetScore,
      liked: likedScore,
      safety: safetyScore,
    },
  };
});

console.log(JSON.stringify(data, null, 2));
```

## Output
The above script will give array of JSON object in below structure. This repo also contains [sample output](./sample-output-22-Aug.json).

```json
[
  {
    "country": "Thailand",
    "city": "Chiang Mai",
    "rank": "1",
    "avgCostPerMonth": "1036",
    "overAllScore": "91.0055%;",
    "description": "Chiang Mai has had a deep Buddhist influence running over the last 1,000 years and this can be felt in the helpfulness, patience and generosity of the Thai and long-term transplants you come across. The city has an active community scene (nomads, spiritual seekers, hikers, creatives), several mountains with hiking spots and waterfalls surrounding the city, over 20 water bodies inside the city -- many have cafes and walks around, several public parks, and over 13 national parks with campgrounds within a 2hr drive. New cafes / art spaces are opening up every other week. Also, many temples that disseminate Buddhist teachings and run mindfulness retreats near and around the city. The nervous system of Chiang Mai is a relaxing one - the city often feels as an open space without walls. Burning season ( Feb - Apr) sees an AQI of 200+ and either requires you to stay indoors or travel elsewhere. May/June are on the hotter side, and July - Sep sees an average rainfall of an hour a day. Oct to Jan is a cool season with Dec to early Feb being the blooming season. While each season brings a different flavor with it, Chiang Mai is a paradise throughout excepting the burning season period. Other notes: English proficiency of the local population is basic. Old city is walking friendly and has many quiet spots, Nimman is the westerner friendly spot and also sees high traffic, Pong Noi is more artsy / hippie.",
    "ratings": {
      "cost": "100%;",
      "internet": "100%;",
      "liked": "88.8889%;",
      "safety": "80%"
    }
  }
]
```


## Disclaimer
This script is designed to scrape publicly available data from Nomad List. The data accessed and retrieved by this script is intended for personal use and educational purposes only.

By using this script, you acknowledge and agree to the following:
- **Public Data**: The information obtained through this script is publicly accessible on the Nomad List website. The author does not claim ownership of this data and makes no guarantees regarding its accuracy or completeness.

- **No Liability**: The author of this script is not liable for any actions taken based on the data retrieved. Users are responsible for ensuring that their use of this script complies with all applicable laws and regulations.

- **Respect for Terms of Service**: Users should review and adhere to the Terms of Service of Nomad List. This script should not be used in a manner that violates these terms or disrupts the normal functioning of the website.

- **Ethical Use**: Users are encouraged to use this script responsibly and ethically. Excessive scraping may lead to IP bans or other restrictions from the website.